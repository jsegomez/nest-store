import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return await this.orderModel.find().exec();
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id);
  }

  async create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return await newModel.save();
  }

  async update(id: string, changes: UpdateOrderDto) {
    return await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  async delete(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }
}
