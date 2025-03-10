import cron from 'node-cron';
import studentService from '../../modules/student/student.service.js';  

class CronService {
    constructor() {
        this.startCronJob();
    }

    startCronJob() {
        cron.schedule('*/5 * * * *', async () => {
            console.log('Running cron job to generate and notify unique keys');
            await studentService.generateAndNotifyUniqueKeys();
        });
    }
}

const cronService = new CronService();

export default cronService;
