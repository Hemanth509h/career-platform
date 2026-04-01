import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runCommand = (command, args, name) => {
  // Use a unique name for the child process variable
  const child = spawn(command, args, { shell: true, stdio: 'inherit' });
  
  child.on('error', (err) => {
    console.error(`[${name}] Failed to start:`, err);
  });

  child.on('close', (code) => {
    console.log(`[${name}] Exited with code ${code}`);
    if (code !== 0 && code !== null) {
        process.exit(code);
    }
  });

  return child;
};

console.log('🚀 Starting CareerAI Multi-Role Platform...');

// Start Backend (with --watch for auto-restart on file changes)
const backend = runCommand('node', ['--watch', 'server/index.js'], 'Backend');

// Start Frontend
const frontend = runCommand('npx', ['vite'], 'Frontend');

// Handle termination
const cleanup = () => {
    console.log('\n🛑 Shutting down...');
    try {
        backend.kill();
        frontend.kill();
    } catch (e) {}
    process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
