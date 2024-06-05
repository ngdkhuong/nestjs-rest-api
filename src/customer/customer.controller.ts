import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Param,
  Delete,
  Put,
  Req,
  Query,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';
import { CreateCustomerDTO, CustomerParamDTO } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  async createCustomers(
    @Res() res: Response,
    @Body() customerParam: CreateCustomerDTO,
  ) {
    try {
      const data = await this.service.createCustomer(customerParam);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Get('/:customerId')
  @UsePipes(new ValidationPipe())
  async getCustomerById(@Param() param: CustomerParamDTO) {
    return await this.service.getCustomer(param.customerId);
  }

  @Get()
  async getAllCustomers(@Res() res: Response) {
    try {
      const data = await this.service.listCustomers();
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Delete()
  async deleteCustomerById(@Query('customerId') id: string) {
    return await this.service.removeCustomer(id);
  }

  @Put('/')
  async updateCustomerById(
    @Req() req: Request,
    res: Response,
    @Query('customerId') id: string,
  ) {
    const data = await this.service.updateCustomer(id, req.body);
    res.status(HttpStatus.OK).json(data);
  }
}
