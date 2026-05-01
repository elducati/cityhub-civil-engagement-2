import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from '../entities/vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
  ) {}

  async createVote(proposalId: string, voterId: string, voteType: 'FOR' | 'AGAINST'): Promise<Vote> {
    const vote = this.voteRepository.create({
      proposal: { id: proposalId },
      voter: { id: voterId },
      voteType,
    });

    return this.voteRepository.save(vote);
  }

  async getVoteCounts(proposalId: string): Promise<{ for: number; against: number }> {
    const forVotes = await this.voteRepository.count({
      where: { proposal: { id: proposalId }, voteType: 'FOR' },
    });

    const againstVotes = await this.voteRepository.count({
      where: { proposal: { id: proposalId }, voteType: 'AGAINST' },
    });

    return { for: forVotes, against: againstVotes };
  }

  async hasUserVoted(proposalId: string, voterId: string): Promise<boolean> {
    const vote = await this.voteRepository.findOne({
      where: { proposal: { id: proposalId }, voter: { id: voterId } },
    });

    return !!vote;
  }
}
