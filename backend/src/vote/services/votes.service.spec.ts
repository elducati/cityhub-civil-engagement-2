import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from './votes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vote } from '../entities/vote.entity';

describe('VotesService', () => {
  let service: VotesService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      count: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesService,
        {
          provide: getRepositoryToken(Vote),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createVote', () => {
    it('should create a vote', async () => {
      const proposalId = 'prop-123';
      const voterId = 'user-123';
      const voteType = 'FOR' as const;

      const createdVote = {
        id: 'vote-123',
        proposal: { id: proposalId },
        voter: { id: voterId },
        voteType,
        createdAt: new Date(),
      };

      mockRepository.create.mockReturnValue(createdVote);
      mockRepository.save.mockResolvedValue(createdVote);

      const result = await service.createVote(proposalId, voterId, voteType);

      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith(createdVote);
      expect(result.voteType).toBe('FOR');
    });
  });

  describe('getVoteCounts', () => {
    it('should return vote counts for a proposal', async () => {
      const proposalId = 'prop-123';

      mockRepository.count
        .mockResolvedValueOnce(10) // FOR votes
        .mockResolvedValueOnce(3); // AGAINST votes

      const result = await service.getVoteCounts(proposalId);

      expect(result).toEqual({ for: 10, against: 3 });
      expect(mockRepository.count).toHaveBeenCalledTimes(2);
    });
  });

  describe('hasUserVoted', () => {
    it('should return true if user has voted', async () => {
      const proposalId = 'prop-123';
      const voterId = 'user-123';

      mockRepository.findOne.mockResolvedValue({ id: 'vote-123' });

      const result = await service.hasUserVoted(proposalId, voterId);

      expect(result).toBe(true);
    });

    it('should return false if user has not voted', async () => {
      const proposalId = 'prop-123';
      const voterId = 'user-123';

      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.hasUserVoted(proposalId, voterId);

      expect(result).toBe(false);
    });
  });
});
