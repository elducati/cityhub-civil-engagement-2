import { Test, TestingModule } from '@nestjs/testing';
import { ProposalsService } from './proposals.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proposal } from '../entities/proposal.entity';

describe('ProposalsService', () => {
  let service: ProposalsService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProposalsService,
        {
          provide: getRepositoryToken(Proposal),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProposalsService>(ProposalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new proposal with DRAFT status', async () => {
      const createProposalDto = {
        title: 'Build a new park',
        description: 'A community park for families',
        authorId: 'user-123',
      };

      const createdProposal = {
        id: 'proposal-123',
        ...createProposalDto,
        status: 'DRAFT',
        createdAt: new Date(),
      };

      mockRepository.create.mockReturnValue(createdProposal);
      mockRepository.save.mockResolvedValue(createdProposal);

      const result = await service.create(createProposalDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        title: createProposalDto.title,
        description: createProposalDto.description,
        status: 'DRAFT',
      });
      expect(result.status).toBe('DRAFT');
    });
  });

  describe('findAll', () => {
    it('should return open proposals sorted by creation date', async () => {
      const proposals = [
        { id: 'prop-1', title: 'Park', status: 'OPEN', createdAt: new Date() },
        { id: 'prop-2', title: 'Library', status: 'OPEN', createdAt: new Date() },
      ];

      mockRepository.find.mockResolvedValue(proposals);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { status: 'OPEN' },
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(proposals);
    });
  });

  describe('updateStatus', () => {
    it('should update proposal status', async () => {
      const proposalId = 'proposal-123';
      const existingProposal = {
        id: proposalId,
        title: 'Park',
        status: 'DRAFT',
      };
      const updatedProposal = { ...existingProposal, status: 'OPEN' };

      mockRepository.findOne.mockResolvedValue(existingProposal);
      mockRepository.save.mockResolvedValue(updatedProposal);

      const result = await service.updateStatus(proposalId, 'OPEN');

      expect(result?.status).toBe('OPEN');
    });

    it('should return null if proposal not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.updateStatus('nonexistent', 'OPEN');

      expect(result).toBeNull();
    });
  });
});
