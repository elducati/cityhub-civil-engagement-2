import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from '../entities/proposal.entity';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>,
  ) {}

  async create(createProposalDto: {
    title: string;
    description: string;
    authorId: string;
  }): Promise<Proposal> {
    const proposal = this.proposalRepository.create({
      title: createProposalDto.title,
      description: createProposalDto.description,
      status: 'DRAFT',
    });

    return this.proposalRepository.save(proposal);
  }

  async findAll(): Promise<Proposal[]> {
    return this.proposalRepository.find({
      where: { status: 'OPEN' },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Proposal | null> {
    return this.proposalRepository.findOne({ where: { id } });
  }

  async updateStatus(id: string, status: string): Promise<Proposal | null> {
    const proposal = await this.findOne(id);
    if (!proposal) return null;

    proposal.status = status as any;
    return this.proposalRepository.save(proposal);
  }
}
