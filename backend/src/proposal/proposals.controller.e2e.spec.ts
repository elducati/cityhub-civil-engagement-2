import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './services/proposals.service';

describe('ProposalsController (e2e)', () => {
  let app: INestApplication;
  let proposalsService: ProposalsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProposalsController],
      providers: [
        {
          provide: ProposalsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    proposalsService = moduleFixture.get<ProposalsService>(ProposalsService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /proposals', () => {
    it('should create a proposal', async () => {
      const createProposalDto = {
        title: 'Build a park',
        description: 'A community park',
        authorId: 'user-123',
      };

      const createdProposal = {
        id: 'prop-123',
        ...createProposalDto,
        status: 'DRAFT',
      };

      (proposalsService.create as jest.Mock).mockResolvedValue(createdProposal);

      const response = await request(app.getHttpServer())
        .post('/proposals')
        .send(createProposalDto)
        .expect(201);

      expect(response.body).toEqual(createdProposal);
    });
  });

  describe('GET /proposals', () => {
    it('should return all open proposals', async () => {
      const proposals = [
        { id: 'prop-1', title: 'Park', status: 'OPEN' },
        { id: 'prop-2', title: 'Library', status: 'OPEN' },
      ];

      (proposalsService.findAll as jest.Mock).mockResolvedValue(proposals);

      const response = await request(app.getHttpServer())
        .get('/proposals')
        .expect(200);

      expect(response.body).toEqual(proposals);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /proposals/:id', () => {
    it('should return a single proposal', async () => {
      const proposal = {
        id: 'prop-123',
        title: 'Build a park',
        status: 'OPEN',
      };

      (proposalsService.findOne as jest.Mock).mockResolvedValue(proposal);

      const response = await request(app.getHttpServer())
        .get('/proposals/prop-123')
        .expect(200);

      expect(response.body).toEqual(proposal);
    });
  });
});
