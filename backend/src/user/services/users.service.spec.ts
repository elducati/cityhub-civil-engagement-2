import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
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