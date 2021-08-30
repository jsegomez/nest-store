import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

// Mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Models
import { Customer } from 'src/users/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async finAll() {
    return await this.customerModel.find();
  }

  async findById(id: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    return customer;
  }

  async create(data: CreateCustomerDto) {
    const customer = await this.customerModel.findOne({ email: data.email });
    if (customer) {
      throw new BadRequestException(
        `Ya existe un cliente con email: ${data.email}`,
      );
    }

    const newUser = new this.customerModel(data);
    return await newUser.save();
  }

  async update(id: string, data: UpdateCustomerDto) {
    const customer = await this.customerModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );

    if (!customer) {
      throw new NotFoundException(`Cliente con id: ${id} no encontrado`);
    }

    return customer;
  }

  async delete(id: string) {
    const customer = await this.customerModel.findByIdAndDelete(id);
    if (!customer) {
      throw new NotFoundException(`Cliente con id: ${id} no encontrado`);
    }

    return customer;
  }
}
