import 'dotenv/config';
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const databaseUri = process.env.DATABASE_URI;
const backupPath = process.env.DATABASE_BACKUP_PATH;
const removeOldBackups = process.env.OLD_BACKUP_REMOVAL;
const localRange = process.env.LOCAL_BACKUP_RANGE;

if (!fs.existsSync(backupPath)) {
  fs.mkdirSync(backupPath, { recursive: true });
}

const backupService = async () => {
  try {
    console.log("Initializing local backup service...");
    
    const backupFilePath = path.join(backupPath, `mongodb_backup_${Date.now()}`);

    const command = `mongodump --uri=${databaseUri} --out=${backupFilePath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during backup: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`Backup completed successfully: ${backupFilePath}`);
    });

  } catch (error) {
    console.error("Error initializing backup: ", error);
  }
};

export default backupService;
