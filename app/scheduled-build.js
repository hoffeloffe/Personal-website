const cron = require('node-cron');
const { exec } = require('child_process');

console.log('Build scheduler started...');

// Schedule build every day at 2:00 AM
cron.schedule('0 2 * * *', () => {
  console.log(`Starting scheduled build at ${new Date().toISOString()}`);
  
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Build error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Build stderr: ${stderr}`);
      return;
    }
    console.log(`Build output: ${stdout}`);
    console.log('Build completed successfully!');
  });
});

// Keep the process running
console.log('Scheduler is running. Press Ctrl+C to stop.');
