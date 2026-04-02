import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');

// Helper to ensure data directory exists
const ensureDataDir = async () => {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (err) {}
};

// Simple In-Memory Cache
const cache = {
    collections: {},
    expiry: {}
};
const CACHE_TTL = 30000; // 30 seconds

// Generic read/write helpers
const readCollection = async (collection, defaultValue = []) => {
    const now = Date.now();
    if (cache.collections[collection] && cache.expiry[collection] > now) {
        // Return a DEEP CLONE to prevent in-memory mutation by callers
        return JSON.parse(JSON.stringify(cache.collections[collection]));
    }

    try {
        const filePath = path.join(DATA_DIR, `${collection}.json`);
        const data = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(data);
        
        // Cache original
        cache.collections[collection] = parsed;
        cache.expiry[collection] = now + CACHE_TTL;
        
        // Return a CLONE
        return JSON.parse(JSON.stringify(parsed));
    } catch (error) {
        if (error.code === 'ENOENT') return JSON.parse(JSON.stringify(defaultValue));
        console.error(`Error reading ${collection}:`, error.message);
        return JSON.parse(JSON.stringify(defaultValue));
    }
};

const saveCollection = async (collection, data) => {
    try {
        await ensureDataDir();
        const filePath = path.join(DATA_DIR, `${collection}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        // Update cache
        cache.collections[collection] = data;
        cache.expiry[collection] = Date.now() + CACHE_TTL;
        
        return true;
    } catch (error) {
        console.error(`Error writing ${collection}:`, error.message);
        throw error;
    }
};

// User operations
export const readUsers = () => readCollection('users');
export const saveUsers = (users) => saveCollection('users', users);
export const findUserByEmail = async (email) => {
    const users = await readUsers();
    const user = users.find(u => u.email === email);
    if (user && !user.role) user.role = 'student';
    return user;
};
export const findUserById = async (id) => {
    const users = await readUsers();
    const user = users.find(u => u._id === id || u.id === id);
    if (user && !user.role) user.role = 'student';
    return user;
};
export const addUser = async (userData) => {
    const users = await readUsers();
    const newUser = {
        _id: `u${Date.now()}`,
        id: `u${Date.now()}`,
        ...userData,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await saveUsers(users);
    return newUser;
};

// Career operations
export const readCareers = () => readCollection('careers', {});
export const saveCareers = (careers) => saveCollection('careers', careers);

// Course operations
export const readCourses = () => readCollection('courses');
export const saveCourses = (courses) => saveCollection('courses', courses);

// Student Profile operations
export const readProfiles = () => readCollection('studentProfiles');
export const saveProfiles = (profiles) => saveCollection('studentProfiles', profiles);
export const findProfileByUserId = async (userId) => {
    const profiles = await readProfiles();
    return profiles.find(p => p.userId === userId);
};
export const updateProfile = async (userId, updateData) => {
    const profiles = await readProfiles();
    let index = profiles.findIndex(p => p.userId === userId);
    if (index === -1) {
        const newProfile = { userId, ...updateData, savedCareers: [], selectedCareers: [], recommendations: [] };
        profiles.push(newProfile);
        index = profiles.length - 1;
    } else {
        profiles[index] = { ...profiles[index], ...updateData };
    }
    await saveProfiles(profiles);
    return profiles[index];
};

// Parent Preferences operations
export const readPreferences = () => readCollection('parentPreferences');
export const savePreferences = (prefs) => saveCollection('parentPreferences', prefs);
export const findPreferencesByParentId = async (parentId) => {
    const prefs = await readPreferences();
    return prefs.find(p => p.parentId === parentId);
};
export const updatePreferences = async (parentId, updateData) => {
    const prefs = await readPreferences();
    const index = prefs.findIndex(p => p.parentId === parentId);
    if (index === -1) {
        prefs.push({ parentId, ...updateData });
    } else {
        prefs[index] = { ...prefs[index], ...updateData };
    }
    await savePreferences(prefs);
};

// Feedback operations
export const readFeedback = () => readCollection('feedback');
export const saveFeedback = (feedback) => saveCollection('feedback', feedback);
export const addFeedback = async (feedbackData) => {
    const feedback = await readFeedback();
    const newFeedback = { _id: `f${Date.now()}`, ...feedbackData, createdAt: new Date().toISOString() };
    feedback.push(newFeedback);
    await saveFeedback(feedback);
    return newFeedback;
};

// Legacy compatibility
export const readRoadmaps = () => readCollection('roadmaps', {});
export const saveUserAssessment = async (userId, aiResult) => {
    return updateProfile(userId, {
        profile: aiResult.profile,
        lastAssessment: {
            matches: aiResult.careerMatches,
            date: new Date().toISOString()
        }
    });
};

export const resolveCareer = async (titleOrId) => {
    if (!titleOrId) return null;
    const careers = await readCareers();
    if (careers[titleOrId]) return { id: titleOrId, ...careers[titleOrId] };
    
    const list = Object.entries(careers).map(([id, data]) => ({ id, ...data }));
    const normalized = titleOrId.toLowerCase().trim();
    
    return list.find(c => 
        c.title.toLowerCase() === normalized || 
        c.title.toLowerCase().includes(normalized) || 
        normalized.includes(c.title.toLowerCase())
    ) || null;
};

/**
 * Enriches a list of matches (titles/scores) with full database objects including IDs.
 */
export const enrichCareerMatches = async (matches = []) => {
    if (!Array.isArray(matches)) return [];
    
    return Promise.all(matches.map(async (m) => {
        const resolution = await resolveCareer(m.id || m._id || m.title);
        if (resolution) {
            return {
                ...resolution,
                matchScore: m.matchScore,
                explanation: m.explanation || m.description
            };
        }
        return m;
    }));
};
