import { IProposal, IProposalCreate, ProposalStatus } from '../entities/proposal.entity';

export interface IProposalRepository {
  findById(id: string): Promise<IProposal | null>;
  findAll(page: number, limit: number, status?: ProposalStatus): Promise<{ data: IProposal[]; total: number }>;
  create(authorId: string, data: IProposalCreate): Promise<IProposal>;
  updateStatus(id: string, status: ProposalStatus, reason?: string): Promise<IProposal>;
  incrementVoteCount(id: string): Promise<void>;
  decrementVoteCount(id: string): Promise<void>;
  findByAuthor(authorId: string): Promise<IProposal[]>;
}