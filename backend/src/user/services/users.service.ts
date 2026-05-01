import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {} 

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      email: createUserDto.email,
      role: createUserDto.role,
    });
    
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}