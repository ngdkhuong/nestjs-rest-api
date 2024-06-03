import { Injectable } from '@nestjs/common';
import { Task } from './interface/task';

@Injectable()
export class TaskStoreService {
  public tasks: Task[] = [];

  public async addTask(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  public async getTask(uuid: string): Promise<Task> {
    const task = this.tasks.filter((i) => i.uuid === uuid);
    return task[0];
  }

  public async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }
}
