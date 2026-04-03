# Ollama Qwen Training Setup Guide

## Overview

This guide explains how to train an Ollama Qwen model with your career platform data for a chatbot that understands careers, courses, and career roadmaps.

## Generated Training Files

### 1. **ollama-training-data.jsonl** (Main Training File)
- **Format**: JSON Lines (one JSON object per line)
- **Size**: Contains 519 training lines
- **Contents**:
  - 488 contextual data entries (careers, courses, roadmaps, roadmap steps)
  - 30 question-answer pairs
  - Metadata about the dataset
- **Use Case**: Fine-tuning Ollama Qwen model

### 2. **OLLAMA_TRAINING_REFERENCE.md**
- Human-readable reference document
- Career categories, top courses, skills required
- Reference for understanding the training data

### 3. **ollama_training_generator.py**
- Python script to regenerate training data
- Customize as needed for your platform

---

## Installation & Setup

### Step 1: Install Ollama

Download Ollama from [ollama.ai](https://ollama.ai)

```bash
# macOS/Linux
curl https://ollama.ai/install.sh | sh

# Windows
# Download from ollama.ai
```

### Step 2: Pull Qwen Model

```bash
ollama pull qwen:7b
# or for larger model:
ollama pull qwen:14b
```

---

## Method 1: Using Training Data with Ollama

### Option A: Fine-tuning Approach

```bash
# Create a Modelfile for custom training
cat > Modelfile << 'EOF'
FROM qwen:7b

# Set parameters
PARAMETER temperature 0.7
PARAMETER top_p 0.9

# Add training knowledge
SYSTEM You are an expert career counselor with comprehensive knowledge of careers, courses, and career pathways. Help students and parents make informed education decisions. Use the training data provided to give accurate, detailed recommendations.

EOF

# Create the custom model
ollama create career-advisor -f Modelfile
```

### Option B: Prompt Injection (Simpler)

Use the JSONL data directly in prompts:

```bash
ollama run qwen:7b

# Inside the Ollama prompt, paste relevant training data:
# Paste the career database and course information first
# Then ask questions like:

"Based on the career data provided, which technology careers have the highest demand?"
```

---

## Method 2: Use with API/Chat Interface

### Start Ollama Server

```bash
ollama serve
```

### Connect via API

**Python Example:**
```python
import requests
import json

def chat_with_career_advisor(question):
    # First, load training data
    with open('ollama-training-data.jsonl', 'r') as f:
        lines = f.readlines()
    
    # Build context from training data (filter relevant lines)
    context = ""
    for line in lines[:100]:  # Use first 100 lines as context
        data = json.loads(line)
        if data.get('type') in ['context', 'training_qa']:
            context += json.dumps(data.get('data')) + "\n"
    
    # Call Ollama API
    prompt = f"""
    You have access to this career platform data:
    {context}
    
    User Question: {question}
    
    Provide a helpful response based on the data provided.
    """
    
    response = requests.post('http://localhost:11434/api/generate', 
        json={
            'model': 'qwen:7b',
            'prompt': prompt,
            'stream': False,
        }
    )
    
    return response.json()['response']

# Example usage
answer = chat_with_career_advisor("What careers are available in Technology?")
print(answer)
```

**Node.js/JavaScript Example:**
```javascript
const fs = require('fs');

async function chatWithCareerAdvisor(question) {
    // Load training data
    const trainingData = fs.readFileSync('ollama-training-data.jsonl', 'utf-8')
        .split('\n')
        .slice(0, 100)
        .map(line => JSON.parse(line))
        .filter(d => ['context', 'training_qa'].includes(d.type))
        .map(d => JSON.stringify(d.data))
        .join('\n');
    
    const prompt = `
You have access to this career platform data:
${trainingData}

User Question: ${question}

Provide helpful response based on the data.
    `;
    
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        json: true,
        body: JSON.stringify({
            model: 'qwen:7b',
            prompt: prompt,
            stream: false
        })
    });
    
    const data = await response.json();
    return data.response;
}

chatWithCareerAdvisor("What skills do I need for AI/ML Engineer?")
    .then(console.log);
```

---

## Method 3: Create Custom Web Interface

### Simple React Integration

```javascript
// src/hooks/useOllamaCareerAdvisor.js
import { useState } from 'react';

export function useOllamaCareerAdvisor() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const askQuestion = async (question) => {
        try {
            setLoading(true);
            
            // Load relevant training data
            const response = await fetch('/ollama-training-data.jsonl');
            const trainingData = await response.text();
            
            // Build context
            const context = trainingData
                .split('\n')
                .slice(1, 51)  // Use relevant lines
                .map(line => {
                    try { return JSON.parse(line); } 
                    catch { return null; }
                })
                .filter(Boolean)
                .map(d => JSON.stringify(d.data))
                .join('\n');
            
            // Call Ollama API
            const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'qwen:7b',
                    prompt: `Career Data Context:\n${context}\n\nQuestion: ${question}`,
                    stream: false
                })
            });
            
            const data = await ollamaResponse.json();
            return data.response;
            
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { askQuestion, loading, error };
}
```

---

## Training Data Structure

### Metadata
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

### Context Entry Example
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
    "skills": ["DSA", "Java", "Python"]
  }
}
```

### Q&A Training Pair
```json
{
  "type": "training_qa",
  "question": "What are high-demand careers in Technology?",
  "answer": "In Technology, high-demand careers include: Software Engineer, Data Scientist, AI/ML Engineer, etc."
}
```

---

## Usage Examples

### Question: Career Recommendation
**Input**: "I'm good at coding and mathematics. What careers suit me?"

**Expected Output**: "Based on your skills, consider: Software Engineer, Data Scientist, AI/ML Engineer..."

### Question: Course Recommendation
**Input**: "How can I become a Data Scientist? What courses should I take?"

**Expected Output**: "To become a Data Scientist, follow these steps:
1. Learn Python fundamentals
2. Study machine learning with courses like Coursera ML course
3. Practice with datasets on Kaggle..."

### Question: Salary Information
**Input**: "What's the salary range for a Cloud Architect?"

**Expected Output**: "Cloud Architects in India earn ₹15L – ₹60L annually, with 'Very High' demand..."

---

## Performance Optimization

### Reduce Training Data Size (If Needed)
Edit `ollama_training_generator.py` and modify the slice limits:

```python
# careers context limit
all_contexts.extend(create_career_context(careers)[:300])

# courses context limit  
for course in courses[:50]:  # Reduce from 150 to 50
    ...
```

Then regenerate:
```bash
python ollama_training_generator.py
```

### Model Selection by Use Case

| Model | Size | Speed | Quality | Recommendation |
|-------|------|-------|---------|---|
| qwen:7b | 7B | Fast ⚡ | Good | Recommended for chatbots |
| qwen:14b | 14B | Moderate | Better | Better accuracy, slower |
| qwen2-beta:base | 3B | Very Fast | Decent | Mobile/edge devices |

---

## Docker Deployment

### docker-compose.yml Extension

```yaml
ollama:
  image: ollama/ollama:latest
  ports:
    - "11434:11434"
  volumes:
    - ollama-data:/root/.ollama
    - ./ollama-training-data.jsonl:/app/training-data.jsonl
  environment:
    - MODEL_NAME=qwen:7b
  command: serve

volumes:
  ollama-data:
```

Run with:
```bash
docker-compose up ollama
```

---

## Testing the Setup

```bash
# Test Ollama is running
curl http://localhost:11434/api/tags

# Generate a test response
curl http://localhost:11434/api/generate \
  -d '{
    "model": "qwen:7b",
    "prompt": "What is a Software Engineer?",
    "stream": false
  }'
```

---

## Regenerating Training Data

When you update your careers, courses, or roadmaps data:

```bash
# Update your JSON files in /data directory
# Then regenerate:
python ollama_training_generator.py

# This creates updated:
# - ollama-training-data.jsonl
# - OLLAMA_TRAINING_REFERENCE.md
```

---

## Troubleshooting

### Issue: "Connection refused" when calling Ollama
**Solution**: Make sure Ollama server is running
```bash
ollama serve
```

### Issue: Model not responding well
**Solution**: Increase model size
```bash
ollama pull qwen:14b
```

### Issue: Training data not being used
**Solution**: Pass training data in system prompt or explicitly in each request

---

## Advanced: Custom Fine-tuning

For advanced users wanting to truly fine-tune the model:

```bash
# Create training dataset in LLAMA format
# Contact Ollama documentation for GGUF format conversion

# Once model is ready:
ollama create custom-career-model -f Modelfile
```

---

## Resources

- [Ollama Documentation](https://github.com/ollama/ollama)
- [Qwen Model Card](https://huggingface.co/Qwen/Qwen)
- [LLM Fine-tuning Guide](https://huggingface.co/docs/transformers/training)
- [Career Platform Documentation](./README.md)

---

**Generated**: 2026
**Training Data Points**: 519
**Models Supported**: Qwen 7B, 14B, 32B
