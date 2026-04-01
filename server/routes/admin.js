import express from 'express';
import { auth } from '../middleware/auth.js';
import { checkAdmin } from '../middleware/roles.js';
import * as db from '../utils/db.js';

const router = express.Router();

router.use(auth);
router.use(checkAdmin);

// A. User Management
router.get('/users', async (req, res) => {
  try {
    const { role } = req.query; // e.g. ?role=student
    const allUsers = await db.readUsers();
    const filteredUsers = role ? allUsers.filter(u => u.role === role) : allUsers;
    
    // Remove passwords
    const usersWithoutPassword = filteredUsers.map(u => {
      const { password, ...rest } = u;
      return rest;
    });
    
    res.json(usersWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.post('/user', async (req, res) => {
  try {
    const { name, email, password, role, age } = req.body;
    const users = await db.readUsers();
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // In a real app, I'd hash the password here.
    // For this local JSON db, we'll store it as provided or use a mock hash.
    const newUser = {
      _id: `u${Date.now()}`,
      id: `u${Date.now()}`,
      name,
      email,
      password: password || '12345678', // Use default if none provided
      role: role || 'student',
      age: parseInt(age) || 20,
      isMinor: parseInt(age) < 18,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await db.saveUsers(users);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

router.patch('/block-user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await db.readUsers();
    const index = users.findIndex(u => u._id === userId || u.id === userId);
    
    if (index !== -1) {
      users[index].isBlocked = true;
      await db.saveUsers(users);
      res.json({ message: 'User blocked successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error blocking user' });
  }
});

router.put('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await db.readUsers();
    
    // Normalize ID for comparison
    const targetId = userId.startsWith('u') ? userId : `u${userId}`;
    const index = users.findIndex(u => 
      (u._id && (u._id === userId || u._id === targetId)) || 
      (u.id && (u.id === userId || u.id === targetId))
    );
    
    if (index !== -1) {
      console.log(`[Admin] Updating user: ${userId}`);
      users[index] = { ...users[index], ...req.body };
      await db.saveUsers(users);
      res.json({ message: 'User updated successfully', user: users[index] });
    } else {
      console.warn(`[Admin] User not found for update: ${userId}`);
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('[Admin] User update error:', error.message);
    res.status(500).json({ message: 'Error updating user' });
  }
});

router.delete('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const currentAdminId = (req.user._id || req.user.id)?.toString();

    console.log(`[Admin] Delete request for: ${userId} by Admin: ${currentAdminId}`);

    if (userId === currentAdminId) {
      return res.status(400).json({ message: "You cannot delete your own admin account." });
    }

    const users = await db.readUsers();
    const originalLength = users.length;
    const filtered = users.filter(u => {
      const uId = (u._id || u.id)?.toString();
      return uId !== userId;
    });
    
    if (filtered.length < originalLength) {
      await db.saveUsers(filtered);
      console.log(`[Admin] Successfully deleted user: ${userId}`);
      res.json({ message: 'User deleted successfully' });
    } else {
      console.warn(`[Admin] User NOT found in database: ${userId}`);
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('[Admin] Delete error:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// B. Career Management (Fixed for Object/Dictionary structure)
router.post('/career', async (req, res) => {
  try {
    const careers = await db.readCareers();
    const id = req.body.id || `ind${Date.now().toString().slice(-4)}`;
    careers[id] = { ...req.body };
    await db.saveCareers(careers);
    res.status(201).json({ message: 'Career created', career: { id, ...careers[id] } });
  } catch (error) {
    console.error('[Admin] Career create error:', error.message);
    res.status(500).json({ message: 'Error creating career' });
  }
});

router.put('/career/:id', async (req, res) => {
  try {
    const careerId = req.params.id;
    const careers = await db.readCareers();
    
    if (careers[careerId]) {
      careers[careerId] = { ...careers[careerId], ...req.body };
      await db.saveCareers(careers);
      res.json({ message: 'Career updated', career: { id: careerId, ...careers[careerId] } });
    } else {
      res.status(404).json({ message: 'Career not found' });
    }
  } catch (error) {
    console.error('[Admin] Career update error:', error.message);
    res.status(500).json({ message: 'Error updating career' });
  }
});

router.delete('/career/:id', async (req, res) => {
  try {
    const careerId = req.params.id;
    const careers = await db.readCareers();
    if (careers[careerId]) {
      delete careers[careerId];
      await db.saveCareers(careers);
      res.json({ message: 'Career deleted' });
    } else {
      res.status(404).json({ message: 'Career not found' });
    }
  } catch (error) {
    console.error('[Admin] Career delete error:', error.message);
    res.status(500).json({ message: 'Error deleting career' });
  }
});

// C. Course Management
router.post('/course', async (req, res) => {
  try {
    const courses = await db.readCourses();
    const newCourse = { _id: `co${Date.now()}`, id: `co${Date.now()}`, ...req.body };
    courses.push(newCourse);
    await db.saveCourses(courses);
    res.status(201).json({ message: 'Course created', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course' });
  }
});

router.put('/course/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const courses = await db.readCourses();
    const index = courses.findIndex(c => c._id === courseId || c.id === courseId);
    
    if (index !== -1) {
      courses[index] = { ...courses[index], ...req.body };
      await db.saveCourses(courses);
      res.json({ message: 'Course updated', course: courses[index] });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
});

router.delete('/course/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const courses = await db.readCourses();
    const filtered = courses.filter(c => c._id !== courseId && c.id !== courseId);
    await db.saveCourses(filtered);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course' });
  }
});

// D. Analytics
router.get('/analytics', async (req, res) => {
  try {
    const allUsers = await db.readUsers();
    const totalUsers = allUsers.length;
    const minorUsers = allUsers.filter(u => u.isMinor === true).length;
    const adultUsers = totalUsers - minorUsers;
    
    // Aggregation for most selected careers can be added later
    res.json({
      totalUsers,
      minorUsers,
      adultUsers,
      mostSelectedCareers: [] // Stub
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating analytics' });
  }
});

export default router;
