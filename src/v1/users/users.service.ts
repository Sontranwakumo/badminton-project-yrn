import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InvalidUserException } from '../../commons/exceptions/InvalidUser.exception.js';
import { User } from '../../entities/user.entity.js';
import { error } from 'console';


@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user:User = User.create(createUserDto as any);
    await user.save().catch(error=>{
      throw new InvalidUserException("Username or Email existed");
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await User.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new InvalidUserException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    await user.save();
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.remove();
  }
}
