import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VotesService } from './services/votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  async create(@Body() createVoteDto: any) {
    const { proposalId, voterId, voteType } = createVoteDto;
    return this.votesService.createVote(proposalId, voterId, voteType);
  }

  @Get('counts/:proposalId')
  async getVoteCounts(@Param('proposalId') proposalId: string) {
    return this.votesService.getVoteCounts(proposalId);
  }

  @Get('check/:proposalId/:voterId')
  async hasUserVoted(
    @Param('proposalId') proposalId: string,
    @Param('voterId') voterId: string,
  ) {
    return this.votesService.hasUserVoted(proposalId, voterId);
  }
}
