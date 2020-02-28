import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import RegistrationMail from '../app/jobs/RegistraitonMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail, RegistrationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }
}

export default new Queue();
