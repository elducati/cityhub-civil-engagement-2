import { IsEmail, IsRole } from 'class-validator';
import { MinLength } from 'class-validator';
import { UserRole } from '../common/enums/user-role.enum'; // Assuming enum exists

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsRole()
  role: UserRole;

  @MinLength(3)
  password: string;
}