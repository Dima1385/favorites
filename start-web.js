const { exec } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const tmpDir = path.join(os.tmpdir(), 'expo-project');

console.log(`Setting up temporary directory at ${tmpDir}...`);

if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

const command = `set EXPO_NO_TYPESCRIPT_SETUP=1 && npx expo start --web`;
console.log(`Running: ${command}`);

const child = exec(command);

child.stdout.on('data', (data) => {
  process.stdout.write(data);
});

child.stderr.on('data', (data) => {
  process.stderr.write(data);
});

child.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
  process.exit(0); 