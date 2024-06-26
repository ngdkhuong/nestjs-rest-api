import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interface/task';

@Injectable()
export class TaskStoreService {
  public tasks: Task[] = [];

  public async addTask(task: Task): Promise<Task> {
    this.tasks.push(task);
    return Promise.resolve(task);
  }

  public async getTask(id: string): Promise<Task> {
    const task = this.tasks.filter((i) => i.uuid === id);
    if (task && task.length > 0) {
      return Promise.resolve(task[0]);
    }
    throw new NotFoundException('Task not found');
  }

  public async getAllTasks(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  public async deleteTask(id: string): Promise<Task[]> {
    const newTasks = this.tasks.filter((i) => i.uuid !== id);
    this.tasks = newTasks;
    return Promise.resolve(this.tasks);
  }

  public async filterTask(filter: any): Promise<Task[]> {
    if (!filter) {
      return Promise.resolve(this.tasks);
    }
    return Promise.resolve(this.tasks.filter((i: Task) => i.duration > 0));
  }
}
