#!/usr/bin/env node
/**
 * Generate training data for Ollama Qwen model from career platform JSON files.
 * Creates JSONL format suitable for fine-tuning LLMs for career chatbot.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadData() {
    console.log('Loading data...');
    const basePath = path.join(__dirname, 'data');
    
    const careers = JSON.parse(fs.readFileSync(path.join(basePath, 'careers.json'), 'utf-8'));
    const courses = JSON.parse(fs.readFileSync(path.join(basePath, 'courses.json'), 'utf-8'));
    const roadmaps = JSON.parse(fs.readFileSync(path.join(basePath, 'roadmaps.json'), 'utf-8'));
    
    return { careers, courses, roadmaps };
}

function createCareerContext(careers) {
    const contexts = [];
    
    // Group careers by category
    const categories = {};
    Object.entries(careers).forEach(([careerId, career]) => {
        const category = career.category || 'Other';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push([careerId, career]);
    });
    
    // Generate context for each category
    Object.entries(categories).forEach(([category, careerList]) => {
        const careersInCategory = careerList
            .slice(0, 10)
            .map(([, c]) => `• ${c.title} (Salary: ${c.salary}, Demand: ${c.demand})`);
        
        const context = {
            type: 'career_category',
            category,
            count: careerList.length,
            sample_careers: careersInCategory.slice(0, 5),
            data: Object.fromEntries(careerList.slice(0, 10))
        };
        contexts.push(context);
    });
    
    // Generate individual career contexts
    Object.entries(careers).slice(0, 200).forEach(([careerId, career]) => {
        const context = {
            type: 'career_detail',
            career_id: careerId,
            title: career.title,
            category: career.category,
            salary: career.salary,
            demand: career.demand,
            description: career.description,
            skills: career.skills || [],
            full_data: career
        };
        contexts.push(context);
    });
    
    return contexts;
}

function createCourseContext(courses) {
    const contexts = [];
    
    // Group by category
    const byCategory = {};
    courses.forEach(course => {
        const cat = course.category || 'Other';
        if (!byCategory[cat]) {
            byCategory[cat] = [];
        }
        byCategory[cat].push(course);
    });
    
    // Category-level contexts
    Object.entries(byCategory).forEach(([category, courseList]) => {
        const sampleCourses = courseList
            .slice(0, 5)
            .map(c => `• ${c.title} (${c.provider})`);
        
        const avgRating = courseList.reduce((sum, c) => sum + (c.rating || 0), 0) / (courseList.length || 1);
        const avgPlacement = courseList.reduce((sum, c) => sum + (c.placementRate || 0), 0) / (courseList.length || 1);
        
        const context = {
            type: 'course_category',
            category,
            count: courseList.length,
            sample_courses: sampleCourses,
            avg_rating: avgRating,
            avg_placement_rate: avgPlacement
        };
        contexts.push(context);
    });
    
    // Individual course contexts
    courses.slice(0, 150).forEach(course => {
        const context = {
            type: 'course_detail',
            course_id: course.id,
            title: course.title,
            provider: course.provider,
            category: course.category,
            duration: course.duration,
            fee: course.fee,
            fee_label: course.feeLabel,
            rating: course.rating,
            placement_rate: course.placementRate,
            skills: course.skills || [],
            description: course.description,
            level: course.level,
            full_data: course
        };
        contexts.push(context);
    });
    
    return contexts;
}

function createRoadmapContext(roadmaps) {
    const contexts = [];
    
    Object.entries(roadmaps).slice(0, 100).forEach(([roadmapId, roadmapData]) => {
        if (roadmapData && roadmapData.steps) {
            const stepsSummary = (roadmapData.steps || [])
                .filter(step => typeof step === 'object')
                .map(step => ({
                    stage: step.stage,
                    title: step.title,
                    description: step.description
                }));
            
            const context = {
                type: 'career_roadmap',
                career_id: roadmapId,
                top_companies: roadmapData.topCompanies || [],
                num_steps: roadmapData.steps ? roadmapData.steps.length : 0,
                steps_summary: stepsSummary,
                full_data: roadmapData
            };
            contexts.push(context);
        }
    });
    
    return contexts;
}

function createQAPairs(careers, courses, roadmaps) {
    const qaPairs = [];
    
    // Career recommendation QAs
    const categories = new Set(Object.values(careers).map(c => c.category));
    
    categories.forEach(category => {
        const categoryCareers = Object.values(careers).filter(c => c.category === category);
        const highDemand = categoryCareers.filter(c => c.demand === 'Very High');
        
        if (highDemand.length > 0) {
            const questions = [
                `What are high-demand careers in ${category}?`,
                `Tell me about ${category} careers`,
                `Which ${category} jobs have high demand?`
            ];
            
            const answer = `In ${category}, high-demand careers include: ` +
                         highDemand.slice(0, 5)
                             .map(c => `${c.title} (₹${c.salary}, Demand: ${c.demand})`)
                             .join(', ');
            
            questions.forEach(q => {
                qaPairs.push({ question: q, answer });
            });
        }
    });
    
    // Course recommendation QAs
    const techCourses = courses.filter(c => c.category === 'Technology');
    if (techCourses.length > 0) {
        const highRated = techCourses
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 5);
        
        const questions = [
            'What are the best technology courses?',
            'Recommend me a tech course',
            'best courses for learning programming'
        ];
        
        const answer = 'Top-rated technology courses: ' +
                      highRated
                          .map(c => `${c.title} by ${c.provider} (Rating: ${c.rating}/5)`)
                          .join('; ');
        
        questions.forEach(q => {
            qaPairs.push({ question: q, answer });
        });
    }
    
    return qaPairs;
}

function generateJsonlTrainingFile() {
    console.log('Generating training data...');
    const { careers, courses, roadmaps } = loadData();
    
    const allContexts = [];
    
    // Create all context types
    allContexts.push(...createCareerContext(careers));
    allContexts.push(...createCourseContext(courses));
    allContexts.push(...createRoadmapContext(roadmaps));
    const qaPairs = createQAPairs(careers, courses, roadmaps);
    
    // Create output file
    const outputFile = path.join(__dirname, 'ollama-training-data.jsonl');
    
    console.log(`Writing ${allContexts.length} contexts and ${qaPairs.length} Q&A pairs to ${outputFile}...`);
    
    const writeStream = fs.createWriteStream(outputFile, 'utf-8');
    
    // Write metadata
    const metadata = {
        type: 'metadata',
        total_careers: Object.keys(careers).length,
        total_courses: courses.length,
        total_roadmaps: Object.keys(roadmaps).length,
        model: 'ollama-qwen',
        task: 'career-chatbot-training'
    };
    writeStream.write(JSON.stringify(metadata) + '\n');
    
    // Write contexts
    allContexts.forEach(context => {
        writeStream.write(JSON.stringify({
            type: 'context',
            data: context
        }) + '\n');
    });
    
    // Write Q&A pairs
    qaPairs.forEach(qa => {
        writeStream.write(JSON.stringify({
            type: 'training_qa',
            question: qa.question,
            answer: qa.answer
        }) + '\n');
    });
    
    writeStream.end();
    
    writeStream.on('finish', () => {
        console.log(`✓ Training file created: ${outputFile}`);
        console.log(`  Total training lines: ${allContexts.length + qaPairs.length + 1}`);
        generateMarkdownReference(careers, courses, roadmaps);
    });
    
    writeStream.on('error', err => {
        console.error(`✗ Error writing file: ${err}`);
    });
}

function generateMarkdownReference(careers, courses, roadmaps) {
    console.log('\nGenerating markdown reference...');
    const outputFile = path.join(__dirname, 'OLLAMA_TRAINING_REFERENCE.md');
    
    let content = '# Ollama Qwen Training Data Reference\n\n';
    content += 'This training data is designed for a career platform chatbot using Ollama Qwen.\n\n';
    
    // Summary
    content += '## Summary\n\n';
    content += `- **Total Careers**: ${Object.keys(careers).length}\n`;
    content += `- **Total Courses**: ${courses.length}\n`;
    content += `- **Total Career Roadmaps**: ${Object.keys(roadmaps).length}\n\n`;
    
    // Career Categories
    content += '## Career Categories\n\n';
    const categories = {};
    Object.entries(careers).forEach(([, career]) => {
        const cat = career.category || 'Other';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(career);
    });
    
    Object.entries(categories)
        .sort()
        .forEach(([category, careerList], i) => {
            content += `**${i + 1}. ${category}** (${careerList.length} careers)\n`;
            content += `   Sample careers: ${careerList.slice(0, 3).map(c => c.title).join(', ')}\n\n`;
        });
    
    // Top Courses by Rating
    content += '## Top Rated Courses\n\n';
    const topCourses = courses
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 10);
    
    topCourses.forEach((course, i) => {
        content += `${i + 1}. **${course.title}**\n`;
        content += `   - Provider: ${course.provider}\n`;
        content += `   - Rating: ${course.rating}/5\n`;
        content += `   - Placement Rate: ${course.placementRate}%\n`;
        content += `   - Fee: ${course.feeLabel}\n\n`;
    });
    
    // Sample Skills by Career
    content += '## Skills Required by Career\n\n';
    Object.entries(careers).slice(0, 15).forEach(([, career]) => {
        content += `**${career.title}**: ${(career.skills || []).join(', ')}\n`;
    });
    
    content += '\n---\n';
    content += '*Auto-generated training data for Ollama Qwen model*\n';
    
    fs.writeFileSync(outputFile, content, 'utf-8');
    console.log(`✓ Reference file created: ${outputFile}`);
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
    try {
        generateJsonlTrainingFile();
        console.log('\n✓ All training files will be generated successfully!');
    } catch (error) {
        console.error('✗ Error:', error.message);
        process.exit(1);
    }
}

export {
    loadData,
    createCareerContext,
    createCourseContext,
    createRoadmapContext,
    createQAPairs,
    generateJsonlTrainingFile
};
