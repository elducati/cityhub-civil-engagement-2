import { IVote, IVoteCreate, VoteType } from '../entities/vote.entity';

export interface IVoteRepository {
  findById(id: string): Promise<IVote | null>;
  findByUserAndProposal(userId: string, proposalId: string): Promise<IVote | null>;
  findByProposal(proposalId: string): Promise<IVote[]>;
  create(data: IVoteCreate): Promise<IVote>;
  delete(id: string): Promise<void>;
  deleteByUserAndProposal(userId: string, proposalId: string): Promise<void>;
  countByProposal(proposalId: string): Promise<number>;
}