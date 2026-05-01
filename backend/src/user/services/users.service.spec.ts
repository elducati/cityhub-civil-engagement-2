import { Test, Testing } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { User } from '../entities/user.entity';

// Mock the repository for testing isolation
const mockUserRepository = { 
  create: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn() 
};

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    // Setup mock repository interaction (In a real setup, we'd use TestModule with actual DB setup)
    userRepository = mockUserRepository as unknown as Repository<User>;
    service = new UsersService(userRepository as any); // Injecting the mock for test context
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Successful User Creation
  it('should be able to create a new user', async () => {
    const mockUser = { id: 'mock-uuid', email: 'test@example.com', role: 'USER' };
    mockUserRepository.create.mockReturnValue(mockUser);
    mockUserRepository.save.mockResolvedValue(mockUser);

    const createUserDto = { email: 'test@example.com', role: 'USER', password: 'password123' };

    const result = await service.create(createUserDto);

    expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUser);
  });

  // Test Case 2: Finding a User
  it('should be able to find a user by ID', async () => {
    const mockUser = { id: 'mock-uuid', email: 'test@example.com', role: 'USER' };
    mockUserRepository.findOne.mockResolvedValue(mockUser);

    const result = await service.findOne('mock-uuid');

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 'mock-uuid' } });
    expect(result).toEqual(mockUser);
  });
}