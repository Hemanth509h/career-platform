import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../data/users.json');

export const readUsers = async () => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return empty array
            return [];
        }
        console.error('Error reading JSON DB:', error.message);
        throw error;
    }
};

export const saveUsers = async (users) => {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing to JSON DB:', error.message);
        throw error;
    }
};

export const findUserByEmail = async (email) => {
    const users = await readUsers();
    return users.find(u => u.email === email);
};

export const addUser = async (user) => {
    const users = await readUsers();
    // Simple ID generation for JSON storage
    const newUser = {
        id: `u${Date.now()}`,
        ...user,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await saveUsers(users);
    return newUser;
};

export const saveUserAssessment = async (email, aiResult) => {
    const users = await readUsers();
    const index = users.findIndex(u => u.email === email);
    if (index !== -1) {
        users[index].profile = aiResult.profile;
        users[index].lastAssessment = {
            matches: aiResult.careerMatches,
            date: new Date().toISOString()
        };
        await saveUsers(users);
        return users[index];
    }
    return null;
};
