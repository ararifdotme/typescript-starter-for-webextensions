// File: src/services/scheduler.ts
// Description: This module provides a simple task scheduler that allows adding tasks to be executed later.

export default class Scheduler {
  private static tasks: Array<() => any> = []; // Array to hold tasks
  private static schedulerInterval: number = 1000; // Interval for executing tasks (in milliseconds)

  /**
   * Starts the scheduler to execute tasks at regular intervals.
   * @param task - The callback function to be executed.
   * @returns {number} - The interval ID for the scheduler.
   */
  public static addTask(task: () => any): number {
    return this.tasks.push(task);
  }

  public static run(): void {
    setInterval(() => {
      if (this.tasks.length > 0) {
        for (const task of this.tasks) {
          try {
            task(); // Execute the task
          } catch (error) {
            console.error('Error executing task:', error);
          }
        };
      }
    }, this.schedulerInterval);
  }
}

Scheduler.run(); // Start the scheduler when the module is loaded