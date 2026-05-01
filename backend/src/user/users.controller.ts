import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }
}
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}