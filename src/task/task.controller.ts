import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Response } from 'express';
import { QueryParamDto, TaskDto, TaskParamDto } from './dto/task.dto';

@Controller('hello')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    const data = this.taskService.getAllTasks();
    return res.status(200).send(data);
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe())
  async getTaskById(@Param() param: TaskParamDto) {
    return await this.taskService.getTask(param.id);
  }

  @Get('/filter/data')
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  async filterTaskById(
    @Query('filter') reqParam: QueryParamDto,
    @Res() res: Response,
  ) {
    const data = await this.taskService.filterTask(reqParam.filter);
    return res.status(200).send(data);
  }

  @Delete('/:id')
  async deleteTaskById(@Param() param: TaskParamDto, @Res() res: Response) {
    const data = this.taskService.deleteTask(param.id);
    return res.status(200).json({
      message: 'Delete Task',
      data,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    const data = this.taskService.addTask(task);
    return res.status(200).send(data);
  }
}
