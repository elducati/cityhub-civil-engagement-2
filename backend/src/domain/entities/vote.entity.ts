export enum VoteType {
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface IVote {
  id: string;
  proposalId: string;
  voterId: string;
  voteType: VoteType;
  createdAt: Date;
}

export interface IVoteCreate {
  proposalId: string;
  voterId: string;
  type: VoteType;
}