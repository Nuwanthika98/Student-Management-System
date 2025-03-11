import cron from 'node-cron';
import studentService from '../../modules/student/student.service.js';  
import backupService from '../database/db-backup.service.js';

class CronService {
    constructor() {
        this.startCronJob();
    }

    startCronJob() {
        cron.schedule('*/5 * * * *', async () => {
            console.log('Running cron job to generate and notify unique keys');
            await studentService.generateAndNotifyUniqueKeys();
        });

        cron.schedule('0 0 0 * * *', async () => {
            console.log('Running cron job to back up database');
            await backupService(); 
        });
    }
}

const cronService = new CronService();

export default cronService;
