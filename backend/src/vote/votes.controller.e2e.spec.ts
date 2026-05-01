import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { VotesController } from './votes.controller';
import { VotesService } from './services/votes.service';

describe('VotesController (e2e)', () => {
  let app: INestApplication;
  let votesService: VotesService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [VotesController],
      providers: [
        {
          provide: VotesService,
          useValue: {
            createVote: jest.fn(),
            getVoteCounts: jest.fn(),
            hasUserVoted: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    votesService = moduleFixture.get<VotesService>(VotesService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /votes', () => {
    it('should create a vote', async () => {
      const createVoteDto = {
        proposalId: 'prop-123',
        voterId: 'user-123',
        voteType: 'FOR',
      };

      const createdVote = {
        id: 'vote-123',
        ...createVoteDto,
        createdAt: new Date(),
      };

      (votesService.createVote as jest.Mock).mockResolvedValue(createdVote);

      const response = await request(app.getHttpServer())
        .post('/votes')
        .send(createVoteDto)
        .expect(201);

      expect(response.body).toEqual(createdVote);
    });
  });

  describe('GET /votes/counts/:proposalId', () => {
    it('should return vote counts', async () => {
      const voteCounts = { for: 10, against: 3 };

      (votesService.getVoteCounts as jest.Mock).mockResolvedValue(voteCounts);

      const response = await request(app.getHttpServer())
        .get('/votes/counts/prop-123')
        .expect(200);

      expect(response.body).toEqual(voteCounts);
    });
  });

  describe('GET /votes/check/:proposalId/:voterId', () => {
    it('should check if user has voted', async () => {
      (votesService.hasUserVoted as jest.Mock).mockResolvedValue(true);

      const response = await request(app.getHttpServer())
        .get('/votes/check/prop-123/user-123')
        .expect(200);

      expect(response.body).toBe(true);
    });
  });
});
