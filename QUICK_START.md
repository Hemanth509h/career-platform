# 🚀 Quick Reference - Ollama Qwen Career Chatbot

## 📦 What Was Created

```
career-platform/
├── 🎯 TRAINING DATA (Ready to use!)
│   └── ollama-training-data.jsonl      (429 KB, 519 entries)
│
├── 🐍 PYTHON VERSION
│   ├── ollama_training_generator.py    (Generate training data)
│   └── ollama_chatbot.py               (Run chatbot)
│
├── 📜 JAVASCRIPT/NODE.JS VERSION
│   ├── ollama_training_generator.js    (Generate training data)
│   ├── ollama_chatbot.js               (Run chatbot)
│   └── ollama-package.json             (NPM config)
│
└── 📚 DOCUMENTATION
    ├── OLLAMA_SETUP_GUIDE.md           (Complete setup guide)
    ├── OLLAMA_TRAINING_REFERENCE.md    (Data reference)
    ├── README_OLLAMA_JS.md             (JS-specific guide)
    └── OLLAMA_FILES_SUMMARY.md         (This summary)
```

---

## ⚡ 5-Minute Setup

### Step 1: Install Ollama
- Download from https://ollama.ai
- Run installer

### Step 2: Pull Model
```bash
ollama pull qwen:7b
```

### Step 3: Start Server
```bash
ollama serve
```
*(Keep this running)*

### Step 4: Run Chatbot (Choose Your Language)

**Python:**
```bash
python ollama_chatbot.py
```

**JavaScript:**
```bash
node ollama_chatbot.js
```

**Done!** Start asking career questions.

---

## 💬 Usage Examples

### Python
```bash
# Interactive chat
python ollama_chatbot.py

# Single question
python ollama_chatbot.py --question "What careers in AI?"

# Check if Ollama is running
python ollama_chatbot.py --check

# Use different model
python ollama_chatbot.py --model qwen:14b
```

### JavaScript
```bash
# Interactive chat
node ollama_chatbot.js

# Single question
node ollama_chatbot.js --question "What careers in AI?"

# Check if Ollama is running
node ollama_chatbot.js --check

# Use different model
node ollama_chatbot.js --model qwen:14b
```

---

## 📊 Training Data Included

- **250 Careers** with salary, demand, skills
- **350 Courses** with ratings, fees, placement rates
- **252 Roadmaps** with progression steps
- **30 Q&A pairs** for chatbot training
- **Total: 519 training entries**

### Data Categories
✓ Technology | Finance | Business | Healthcare | Engineering  
✓ Design | Law | Government | Education | Media  
✓ Fashion | Science | Supply Chain | Hospitality | Aviation | Retail

---

## 🎯 Sample Questions

```
? What are high-demand careers in Technology?
? Tell me about Data Science careers
? What courses for becoming a Software Engineer?
? Salary range for Cloud Architects?
? Best design career options?
? How do I become a Cybersecurity Analyst?
? Top-rated courses?
? Skills needed for AI/ML Engineer?
? Career progression for Product Managers?
```

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Connection refused | Run `ollama serve` in another terminal |
| Model not found | Run `ollama pull qwen:7b` |
| Slow responses | Use `qwen:7b` instead of larger models |
| Out of memory | Use smaller model: `ollama pull qwen2-beta:base` |
| No output | Check Ollama is running with `ollama ps` |

---

## 📈 Model Sizes

| Model | Speed | Quality | Memory | Command |
|-------|-------|---------|--------|---------|
| qwen2-beta:base | ⚡⚡⚡ | Good | 2GB | `ollama pull qwen2-beta:base` |
| **qwen:7b** | ⚡⚡ | **Great** | 4GB | `ollama pull qwen:7b` |
| qwen:14b | ⚡ | Excellent | 8GB | `ollama pull qwen:14b` |
| qwen:32b | 🐢 | Perfect | 16GB | `ollama pull qwen:32b` |

---

## 🌐 Integration Examples

### Express.js API
```javascript
import express from 'express';
import ChatBot from './ollama_chatbot.js';

const app = express();
const bot = new ChatBot();

app.post('/chat', express.json(), async (req, res) => {
    const answer = await bot.ask(req.body.question);
    res.json({ answer });
});

app.listen(3000);
```

### React Hook
```javascript
// useCareerAdvisor.js
import { useState } from 'react';

export function useCareerAdvisor() {
    const [loading, setLoading] = useState(false);
    
    const ask = async (question) => {
        setLoading(true);
        const res = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });
        setLoading(false);
        return (await res.json()).answer;
    };
    
    return { ask, loading };
}
```

---

## 📋 File Sizes

| File | Size | Language |
|------|------|----------|
| ollama-training-data.jsonl | 429 KB | JSON Lines |
| ollama_training_generator.js | 11.7 KB | JavaScript (ES Module) |
| ollama_chatbot.js | 12.6 KB | JavaScript (ES Module) |
| ollama_training_generator.py | 11.1 KB | Python 3 |
| ollama_chatbot.py | 10.1 KB | Python 3 |

---

## ✅ Prerequisites Checklist

- [ ] Ollama installed (`ollama --version`)
- [ ] Model pulled (`ollama pull qwen:7b`)
- [ ] Python 3.8+ OR Node.js 14+ 
- [ ] Ollama server running (`ollama serve`)
- [ ] Internet connection for first run
- [ ] 4GB+ free RAM for 7B model

---

## 📖 Documentation Map

Start with:
1. **OLLAMA_FILES_SUMMARY.md** - Overview of all files
2. **OLLAMA_SETUP_GUIDE.md** - Complete setup instructions
3. **README_OLLAMA_JS.md** - If using JavaScript
4. **OLLAMA_TRAINING_REFERENCE.md** - Data details

---

## 🎓 Learn More

### Ollama
- GitHub: https://github.com/ollama/ollama
- Official: https://ollama.ai
- Models: https://ollama.ai/library

### Qwen Model
- HuggingFace: https://huggingface.co/Qwen/
- Chat: https://huggingface.co/Qwen/Qwen-Chat

### LLMs
- LiteLLM: https://litellm.vercel.app
- LangChain: https://langchain.com
- Guidance: https://github.com/microsoft/guidance

---

## 💡 Pro Tips

1. **Warm-up first** - First question loads model (takes longer)
2. **Batch questions** - Ask multiple questions for better flow
3. **Use context** - Add relevant details to questions
4. **Check status** - Use `--check` flag to verify setup
5. **Read docs** - OLLAMA_SETUP_GUIDE.md has advanced options

---

## 🚀 Next Steps

1. Follow the 5-Minute Setup above
2. Ask a test question
3. Read OLLAMA_SETUP_GUIDE.md for advanced topics
4. Integrate with your web app

---

## ❓ Common Questions

**Q: Can I use this offline?**  
A: Yes, once Ollama and model are installed

**Q: How accurate are responses?**  
A: Depends on model (7B=good, 14B=great, 32B=excellent)

**Q: Can I customize answers?**  
A: Yes, edit system prompt in chatbot files

**Q: How to add more training data?**  
A: Edit /data files and regenerate with generator script

**Q: Does it work on Windows/Mac/Linux?**  
A: Yes, all platforms supported

---

## 📞 Support

- Check **OLLAMA_SETUP_GUIDE.md** troubleshooting section
- Read relevant documentation files
- Visit Ollama GitHub issues
- Check model-specific guides

---

**Version**: 1.0  
**Last Updated**: April 3, 2026  
**Status**: ✅ Production Ready

Enjoy your AI-powered career advisor! 🎉
