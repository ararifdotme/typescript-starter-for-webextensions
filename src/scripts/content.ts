import Scheduler from '../services/scheduler';

Scheduler.addTask(() => {
  console.log('Content script loaded and task added to scheduler.');
});