# Ollama Qwen Training - JavaScript Version

This directory contains JavaScript/Node.js versions of the Ollama Qwen training tools for the career platform chatbot.

## Files

- **ollama_training_generator.js** - Generates JSONL training data from JSON files
- **ollama_chatbot.js** - Interactive/API chatbot using Ollama Qwen
- **ollama-package.json** - NPM scripts and dependencies
- **ollama-training-data.jsonl** - Generated training data (519 lines)
- **OLLAMA_SETUP_GUIDE.md** - Complete setup documentation
- **OLLAMA_TRAINING_REFERENCE.md** - Data reference manual

## Quick Start

### Option 1: Using Generated Training Data

The training data file (`ollama-training-data.jsonl`) is already generated with:
- **250** career profiles  
- **350** courses and programs
- **252** career roadmaps
- **30** Q&A training pairs
- **Total: 519 training entries**

### Option 2: Regenerate Training Data

```bash
# If you've updated the JSON files in /data
node ollama_training_generator.js
```

## Usage

### Start Interactive Chatbot

```bash
node ollama_chatbot.js
```

Example conversation:
```
🤔 You: What are high-demand careers in Technology?
🎓 Advisor: In Technology, high-demand careers include: Software Engineer, 
Data Scientist, AI/ML Engineer, Cloud Architect, Full Stack Developer...
```

### Ask Single Question

```bash
node ollama_chatbot.js --question "What skills do I need for AI/ML Engineer?" 
```

### Other Commands

```bash
# Check if Ollama is running
node ollama_chatbot.js --check

# Use different model size
node ollama_chatbot.js --model qwen:14b

# Custom Ollama URL
node ollama_chatbot.js --url http://192.168.1.100:11434

# Full help
node ollama_chatbot.js --help
```

## Prerequisites

1. **Node.js** 14+ - [Download](https://nodejs.org/)
2. **Ollama** - [Download](https://ollama.ai/)
3. **Qwen Model** pulled in Ollama

### Install Ollama & Qwen

```bash
# Install Ollama (follow https://ollama.ai/)

# Pull the model
ollama pull qwen:7b

# Start Ollama server
ollama serve
```

## Setup Instructions

### Step 1: Verify Node.js

```bash
node --version  # Should be 14.0.0 or higher
npm --version
```

### Step 2: Verify Ollama

In another terminal:

```bash
ollama serve     # Keep this running

# In another terminal, test:
curl http://localhost:11434/api/tags
```

### Step 3: Run Chatbot

```bash
# In the project directory
node ollama_chatbot.js
```

## API Integration

### Embed in Express.js

```javascript
import express from 'express';
import OllamaCareerChatbot from './ollama_chatbot.js';

const app = express();
const chatbot = new OllamaCareerChatbot({
    model: 'qwen:7b',
    ollamaUrl: 'http://localhost:11434'
});

app.post('/api/chat', express.json(), async (req, res) => {
    const { question } = req.body;
    const answer = await chatbot.ask(question);
    res.json({ question, answer });
});

app.listen(3000, () => console.log('Running on port 3000'));
```

### Use in React

```javascript
// hooks/useCareerAdvisor.js
import { useState } from 'react';

export function useCareerAdvisor() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ask = async (question) => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });
            const data = await res.json();
            return data.answer;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { ask, loading, error };
}

// ChatComponent.jsx
import { useCareerAdvisor } from '../hooks/useCareerAdvisor';

export function ChatComponent() {
    const { ask, loading } = useCareerAdvisor();
    
    const handleQuestion = async (q) => {
        const answer = await ask(q);
        console.log(answer);
    };
    
    return (
        <button onClick={() => handleQuestion('What careers in tech?')}>
            Ask Question
        </button>
    );
}
```

## Training Data Format

Each line in `ollama-training-data.jsonl` is a valid JSON object:

### Metadata Entry
```json
{
  "type": "metadata",
  "total_careers": 250,
  "total_courses": 350,
  "total_roadmaps": 252,
  "model": "ollama-qwen",
  "task": "career-chatbot-training"
}
```

### Career Context
```json
{
  "type": "context",
  "data": {
    "type": "career_detail",
    "career_id": "ind01",
    "title": "Software Engineer",
    "category": "Technology",
    "salary": "₹5L – ₹50L",
    "demand": "Very High",
    "description": "Design and build software applications.",
    "skills": ["DSA", "Java", "Python"],
    "full_data": { ... }
  }
}
```

### Q&A Training Pair
```json
{
  "type": "training_qa",
  "question": "What are high-demand careers in Technology?",
  "answer": "In Technology, high-demand careers include: Software Engineer..."
}
```

## Example Questions the Chatbot Can Answer

- "What are high-demand careers in Technology?"
- "Tell me about Data Science careers and required skills"
- "What courses would help me become a Software Engineer?"
- "What's the salary range for Cloud Architects?"
- "I'm interested in Design careers - what options are available?"
- "Which courses have the highest placement rates?"
- "How do I become a Cybersecurity Analyst?"

## Troubleshooting

### Issue: Connection refused
```
✗ Cannot connect to Ollama at http://localhost:11434
```
**Solution:**
```bash
ollama serve
# In another terminal, try again
```

### Issue: Model not found
```
✗ Model 'qwen:7b' not found!
```
**Solution:**
```bash
ollama pull qwen:7b
```

### Issue: Slow response
**Solution:** Use smaller model for faster response:
```bash
ollama pull qwen2-beta:base  # 3B - very fast
node ollama_chatbot.js --model qwen2-beta:base
```

Or larger for better quality:
```bash
ollama pull qwen:14b  # More accurate but slower
node ollama_chatbot.js --model qwen:14b
```

### Issue: Out of memory
**Solution:** Use quantized smaller model or reduce training context size.

## Performance Tips

1. **Use smaller model for faster responses:**
   ```bash
   node ollama_chatbot.js --model qwen2-beta:base
   ```

2. **Batch questions for better performance:**
   - Ask multiple questions to warm up the model
   - First question takes longest, subsequent are faster

3. **Reduce context for speed:**
   Edit `ollama_chatbot.js`, change `buildContext` numEntries:
   ```javascript
   buildContext(question, numEntries = 10)  // Reduce from 20 to 10
   ```

## Model Comparison

| Model | Size | Speed | Quality | Memory |
|-------|------|-------|---------|--------|
| qwen2-beta:base | 3B | ⚡⚡⚡ Very Fast | Good | 2GB |
| qwen:7b | 7B | ⚡⚡ Fast | Great | 4GB |
| qwen:14b | 14B | ⚡ Moderate | Excellent | 8GB |
| qwen:32b | 32B | Slow | Perfect | 16GB |

## Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY ollama*.js ./
COPY data/ ./data/
COPY ollama-training-data.jsonl ./

RUN npm install

ENV OLLAMA_URL=http://ollama:11434

CMD ["node", "ollama_chatbot.js"]
```

Build and run:
```bash
docker build -t career-chatbot .
docker run --network host career-chatbot
```

## Advanced: Modifying Training Data

### Add New Career

Edit `data/careers.json`, then regenerate:
```bash
node ollama_training_generator.js
```

### Add New Course

Edit `data/courses.json`, then regenerate:
```bash
node ollama_training_generator.js
```

### Customize System Prompt

Edit `ollama_chatbot.js`, in `OllamaCareerChatbot` constructor:
```javascript
this.systemPrompt = `Your custom prompt here...`;
```

## Resources

- [Ollama Documentation](https://github.com/ollama/ollama)
- [Qwen Model](https://huggingface.co/Qwen/)
- [Node.js Docs](https://nodejs.org/docs/)
- [Career Platform Docs](./README.md)

## License

MIT

---

**Last Updated:** April 2026  
**Training Data:** 519 entries  
**Models Supported:** Qwen 7B, 14B, 32B
