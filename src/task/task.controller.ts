import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './interface/task';
import { Response } from 'express';

@Controller('hello')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    const data = this.taskService.getAllTasks();
    return res.status(200).send(data);
  }

  @Post()
  async createTask(@Req() req: Request, @Res() res: Response) {
    const data = this.taskService.addTask(req.body);
    return res.status(200).send(data);
  }
}
