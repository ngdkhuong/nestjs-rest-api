// TODO mongodb
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [TaskModule, DatabaseModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
