import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as db from '../utils/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@careerai.com';
        const existingAdmin = await db.findUserByEmail(adminEmail);
        
        if (existingAdmin) {
            console.log('✅ Admin user already exists:', adminEmail);
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const newAdmin = await db.addUser({
            name: 'System Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            isMinor: false,
            parentLinked: false
        });

        console.log(`🚀 Admin created successfully in JSON!`);
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: admin123`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
