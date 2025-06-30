import { execSync } from 'child_process';
import fs from 'fs';

function runCheck(command: string, errorMsg: string): void {
  try {
    console.log(`\x1b[33m> ${command}\x1b[0m`);
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    console.error(`\x1b[31mERROR: ${errorMsg}\x1b[0m`);
    process.exit(1);
  }
}

function runPrePushChecks(): void {
  console.log('\x1b[36mRunning pre-push checks...\x1b[0m');

  // TypeScript type check
  runCheck('npm run type-check', 'TypeScript type check failed. Push aborted.');

  // Build project
  runCheck('npm run build', 'Build failed. Push aborted.');

  // Check build outputs
  if (!fs.existsSync('dist')) {
    console.error("\x1b[31mERROR: Build output directory 'dist' not found.\x1b[0m");
    process.exit(1);
  }
  if (!fs.existsSync('types')) {
    console.error("\x1b[31mERROR: Types output directory 'types' not found.\x1b[0m");
    process.exit(1);
  }

  console.log('\x1b[32mSUCCESS: Pre-push checks passed! Safe to push.\x1b[0m');
  console.log('\x1b[32mINFO: Your Vercel deployment should work correctly.\x1b[0m');
}

export { runPrePushChecks, runCheck }; 