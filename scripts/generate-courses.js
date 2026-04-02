import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

const careersPath = path.join(DATA_DIR, 'careers.json');
const coursesPath = path.join(DATA_DIR, 'courses.json');

const careers = JSON.parse(fs.readFileSync(careersPath, 'utf8'));
let courses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));

// We will generate additional courses.
const newCoursesCount = 310;
let currentCoId = courses.length + 1;

const providers = ['Coursera', 'edX', 'Udacity', 'NPTEL', 'Skillshare', 'LinkedIn Learning', 'Pluralsight', 'FutureLearn', 'upGrad', 'Great Learning', 'Simplilearn'];
const modes = ['Online', 'Offline', 'Hybrid'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

// Map careers to keys and categories
const careersList = Object.entries(careers).map(([id, c]) => ({ id, ...c }));

const generateGenericCourse = (career) => {
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const mode = modes[Math.floor(Math.random() * modes.length)];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const durationMonths = Math.floor(Math.random() * 11) + 1;
    const isFree = Math.random() > 0.8;
    const fee = isFree ? 0 : Math.floor(Math.random() * 50000) + 1000;
    const feeLabel = isFree ? 'Free' : `₹${fee.toLocaleString('en-IN')}`;
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
    const enrolled = Math.floor(Math.random() * 50000) + 500;
    const placementRate = Math.floor(Math.random() * 20) + 75; // 75 to 94

    const prefixes = ['Mastering', 'Fundamentals of', 'Advanced', 'Introduction to', 'Professional', 'Diploma in'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const title = `${prefix} ${career.title}`;

    return {
        id: `co${currentCoId++}`,
        title: title,
        provider: `${provider}`,
        category: career.category,
        relatedCareers: [career.id],
        duration: `${durationMonths} months`,
        durationMonths: durationMonths,
        mode: mode,
        fee: fee,
        feeLabel: feeLabel,
        accreditation: `${provider} Certificate`,
        placementRate: placementRate,
        rating: parseFloat(rating),
        enrolled: enrolled,
        skills: career.skills || [],
        description: `Comprehensive course covering all aspects of becoming a successful ${career.title}.`,
        url: "#",
        location: mode === 'Offline' ? 'Various Cities' : 'Online',
        level: level
    };
};

// Generate courses based on careers (at least 1 per career, plus some extras)
careersList.forEach(career => {
    courses.push(generateGenericCourse(career));
});

// Generate another bunch to cross 300 additional
while (courses.length < 350) {
    const randomCareer = careersList[Math.floor(Math.random() * careersList.length)];
    courses.push(generateGenericCourse(randomCareer));
}

// Ensure unique IDs
courses.forEach((c, i) => {
    c.id = `co${i + 1}`;
});

fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2), 'utf8');

console.log(`Generated courses! Total courses: ${courses.length}`);
