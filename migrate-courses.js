import { allCourses } from './src/services/courseData.js';
import fs from 'fs/promises';
import path from 'path';

async function migrate() {
    await fs.writeFile('./server/data/courses.json', JSON.stringify(allCourses, null, 2));
    console.log('Successfully migrated courses to courses.json');
}

migrate();
