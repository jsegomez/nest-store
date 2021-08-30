import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

// Mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Models
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async finAll() {
    return await this.userModel.find();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const user = await this.userModel.findOne({ email: data.email });
    if (user) {
      throw new BadRequestException(
        `Ya existe un usuario con email: ${data.email}`,
      );
    }

    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async update(id: string, data: UpdateUserDto) {
    const user = this.userModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    return user;
  }

  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    return true;
  }
}
