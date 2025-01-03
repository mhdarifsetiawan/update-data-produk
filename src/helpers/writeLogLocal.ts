import fs from 'fs';

const logFile = 'log.txt';

export const writeLog = (message: string) => {
  fs.appendFile(logFile, `${new Date().toISOString()} - ${message}\n`, (err) => {
    if (err) {
      console.error('Failed to write log file in local:', err);
    }
  });
};