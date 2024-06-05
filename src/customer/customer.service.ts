import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './interface/customer.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDTO } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  public async listCustomers(): Promise<Customer[]> {
    return await this.customerModel.find({});
  }

  public async createCustomer(customer: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = new this.customerModel(customer);
    return newCustomer.save();
  }

  public async updateCustomer(
    id: string,
    customerDto: CreateCustomerDTO,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      id,
      customerDto,
      { new: true },
    );
    return updatedCustomer;
  }

  public async getCustomer(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  public async removeCustomer(id: string): Promise<Customer[]> {
    return await this.customerModel.findByIdAndDelete(id);
  }
}
