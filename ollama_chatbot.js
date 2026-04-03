#!/usr/bin/env node
/**
 * Career chatbot using Ollama Qwen model with training data.
 * Quick integration script to run career chatbot with Ollama Qwen
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import http from 'http';
import { URL } from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class OllamaCareerChatbot {
    constructor(options = {}) {
        this.model = options.model || 'qwen:7b';
        this.ollamaUrl = options.ollamaUrl || 'http://localhost:11434';
        this.trainingFile = options.trainingFile || 'ollama-training-data.jsonl';
        this.contextData = [];
        
        this.systemPrompt = `You are an expert career counselor for a career platform.
You have access to comprehensive data about:
- 250+ career profiles with salary ranges, demand, and required skills
- 350+ courses and training programs
- 252+ career progression roadmaps

Provide accurate, helpful recommendations based on this data.
Be specific with salary ranges (in INR), demand levels, and required skills.
Always cite relevant data when making recommendations.
For unknown questions, acknowledge the limitation and redirect to career topics.`;
        
        this.loadTrainingData();
    }
    
    loadTrainingData() {
        const trainingPath = path.join(process.cwd(), this.trainingFile);
        
        if (!fs.existsSync(trainingPath)) {
            console.warn(`⚠️  Warning: Training file not found at ${trainingPath}`);
            console.warn('   Run: node ollama_training_generator.js');
            return;
        }
        
        console.log(`Loading training data from ${trainingPath}...`);
        try {
            const data = fs.readFileSync(trainingPath, 'utf-8');
            const lines = data.split('\n').filter(line => line.trim());
            
            lines.forEach((line, lineNum) => {
                try {
                    const parsed = JSON.parse(line);
                    if (['context', 'training_qa'].includes(parsed.type)) {
                        this.contextData.push(parsed);
                    }
                } catch (e) {
                    // Skip malformed lines
                }
            });
            
            console.log(`✓ Loaded ${this.contextData.length} training entries`);
        } catch (e) {
            console.error(`✗ Error loading training data: ${e.message}`);
        }
    }
    
    buildContext(question, numEntries = 20) {
        if (this.contextData.length === 0) {
            return '';
        }
        
        // Simple relevance scoring based on keywords
        const keywords = question.toLowerCase().split(/\W+/).filter(w => w.length > 2);
        const scoredEntries = [];
        
        this.contextData.slice(0, numEntries * 3).forEach(entry => {
            const data = entry.data || {};
            const dataStr = JSON.stringify(data).toLowerCase();
            
            // Count keyword matches
            let score = 0;
            keywords.forEach(kw => {
                if (dataStr.includes(kw)) score++;
            });
            
            if (score > 0) {
                scoredEntries.push({ score, entry });
            }
        });
        
        // Get top entries by score
        scoredEntries.sort((a, b) => b.score - a.score);
        const topEntries = scoredEntries.slice(0, numEntries);
        
        // Format as context
        let context = 'CAREER PLATFORM DATA:\n';
        topEntries.forEach(({ entry }) => {
            const data = entry.data || {};
            if (entry.type === 'context') {
                context += `\n${JSON.stringify(data, null, 2)}\n`;
            } else if (entry.type === 'training_qa') {
                context += `\nQ: ${entry.question}\nA: ${entry.answer}\n`;
            }
        });
        
        return context;
    }
    
    async checkConnection() {
        return new Promise((resolve) => {
            const url = `${this.ollamaUrl}/api/tags`;
            
            http.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        const tags = JSON.parse(data);
                        const models = tags.models.map(m => m.name.split(':')[0]);
                        const modelBase = this.model.split(':')[0];
                        
                        if (!models.includes(modelBase)) {
                            console.log(`✗ Model '${this.model}' not found!`);
                            console.log(`  Available models: ${[...new Set(models)].join(', ')}`);
                            console.log(`  Pull the model with: ollama pull ${this.model}`);
                            resolve(false);
                        } else {
                            console.log(`✓ Connected to Ollama at ${this.ollamaUrl}`);
                            console.log(`✓ Model available: ${this.model}`);
                            resolve(true);
                        }
                    } catch (e) {
                        resolve(false);
                    }
                });
            }).on('error', () => {
                console.log(`✗ Cannot connect to Ollama at ${this.ollamaUrl}`);
                console.log('  Make sure Ollama is running:');
                console.log('  $ ollama serve');
                resolve(false);
            });
        });
    }
    
    async ask(question) {
        try {
            const context = this.buildContext(question);
            
            const prompt = `${this.systemPrompt}

${context}

QUESTION: ${question}

ANSWER:`;
            
            const postData = JSON.stringify({
                model: this.model,
                prompt: prompt,
                stream: false,
                temperature: 0.7
            });
            
            return new Promise((resolve) => {
                const options = {
                    hostname: new URL(this.ollamaUrl).hostname,
                    port: new URL(this.ollamaUrl).port || 11434,
                    path: '/api/generate',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    }
                };
                
                const req = http.request(options, (res) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => {
                        try {
                            const response = JSON.parse(data);
                            resolve(response.response);
                        } catch (e) {
                            console.error('✗ Failed to parse response');
                            resolve(null);
                        }
                    });
                });
                
                req.on('error', (err) => {
                    console.error(`✗ Request error: ${err.message}`);
                    resolve(null);
                });
                
                req.setTimeout(60000, () => {
                    req.destroy();
                    console.error('✗ Request timeout - model taking too long to respond');
                    resolve(null);
                });
                
                req.write(postData);
                req.end();
            });
        } catch (error) {
            console.error(`✗ Error: ${error.message}`);
            return null;
        }
    }
    
    async interactiveChat() {
        console.log('\n' + '='.repeat(60));
        console.log('Career Advisor Chatbot - Powered by Ollama Qwen');
        console.log('='.repeat(60));
        console.log("Type 'exit' or 'quit' to end the conversation");
        console.log("Type 'help' for sample questions");
        console.log('='.repeat(60) + '\n');
        
        const sampleQuestions = [
            'What are high-demand careers in Technology?',
            'Tell me about Data Science careers and required skills',
            'What courses would help me become a Software Engineer?',
            "What's the salary range for Cloud Architects?",
            'I\'m interested in Design careers - options?'
        ];
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true
        });
        
        const prompt = () => {
            rl.question('\n🤔 You: ', async (input) => {
                const userInput = input.trim();
                
                if (['exit', 'quit'].includes(userInput.toLowerCase())) {
                    console.log('\n👋 Goodbye!');
                    rl.close();
                    return;
                }
                
                if (userInput.toLowerCase() === 'help') {
                    console.log('\n📚 Sample Questions:');
                    sampleQuestions.forEach(q => console.log(`   • ${q}`));
                    prompt();
                    return;
                }
                
                if (!userInput) {
                    prompt();
                    return;
                }
                
                console.log('\n⏳ Thinking...');
                const response = await this.ask(userInput);
                
                if (response) {
                    console.log(`\n🎓 Advisor: ${response}`);
                } else {
                    console.log('\n✗ Failed to get response. Is Ollama running?');
                }
                
                prompt();
            });
        };
        
        prompt();
    }
}

async function main() {
    const args = process.argv.slice(2);
    
    let model = 'qwen:7b';
    let url = 'http://localhost:11434';
    let trainingFile = 'ollama-training-data.jsonl';
    let question = null;
    let checkOnly = false;
    
    // Parse arguments
    for (let i = 0; i < args.length; i++) {
        if (['-m', '--model'].includes(args[i])) {
            model = args[++i];
        } else if (['-u', '--url'].includes(args[i])) {
            url = args[++i];
        } else if (['-t', '--training-file'].includes(args[i])) {
            trainingFile = args[++i];
        } else if (['-q', '--question'].includes(args[i])) {
            question = args[++i];
        } else if (['--check'].includes(args[i])) {
            checkOnly = true;
        } else if (['-h', '--help'].includes(args[i])) {
            console.log(`
Career Advisor Chatbot using Ollama Qwen

Usage: node ollama_chatbot.js [options]

Options:
  -m, --model <name>          Ollama model to use (default: qwen:7b)
  -u, --url <url>             Ollama API URL (default: http://localhost:11434)
  -t, --training-file <path>  Path to training data file
  -q, --question <text>       Ask a single question and exit
  --check                     Check connection to Ollama and exit
  -h, --help                  Show this help message

Examples:
  # Start interactive chat
  node ollama_chatbot.js
  
  # Ask a single question
  node ollama_chatbot.js --question "What careers are in Technology?"
  
  # Use different model
  node ollama_chatbot.js --model qwen:14b
  
  # Check connection
  node ollama_chatbot.js --check
            `);
            process.exit(0);
        }
    }
    
    // Create chatbot instance
    const chatbot = new OllamaCareerChatbot({
        model,
        ollamaUrl: url,
        trainingFile
    });
    
    // Check connection
    const connected = await chatbot.checkConnection();
    if (!connected) {
        process.exit(1);
    }
    
    // Handle different modes
    if (checkOnly) {
        console.log('\n✓ All systems ready!');
        process.exit(0);
    }
    
    if (question) {
        console.log(`\n🤔 Question: ${question}`);
        const response = await chatbot.ask(question);
        if (response) {
            console.log(`\n🎓 Answer: ${response}`);
        }
        process.exit(0);
    }
    
    // Start interactive chat
    await chatbot.interactiveChat();
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(err => {
        console.error('✗ Error:', err.message);
        process.exit(1);
    });
}

export default OllamaCareerChatbot;
