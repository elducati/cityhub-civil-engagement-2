export enum ProposalStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export interface IProposal {
  id: string;
  title: string;
  description: string;
  category?: string;
  location?: string;
  status: ProposalStatus;
  voteCount: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProposalCreate {
  title: string;
  description: string;
  category?: string;
  location?: string;
}

export interface IProposalUpdate {
  status?: ProposalStatus;
  reason?: string;
}