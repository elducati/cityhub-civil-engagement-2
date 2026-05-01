import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        role: UserRole.USER,
        password: 'password123',
      };

      const createdUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createUserDto,
      };

      mockRepository.create.mockReturnValue(createdUser);
      mockRepository.save.mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        email: createUserDto.email,
        role: createUserDto.role,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const user = {
        id: userId,
        email: 'test@example.com',
        role: UserRole.USER,
      };

      mockRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne(userId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      const userId = 'nonexistent-id';

      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(userId);

      expect(result).toBeNull();
    });
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