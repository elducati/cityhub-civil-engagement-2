import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProposalsService } from './services/proposals.service';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post()
  async create(@Body() createProposalDto: any) {
    return this.proposalsService.create(createProposalDto);
  }

  @Get()
  async findAll() {
    return this.proposalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.proposalsService.findOne(id);
  }
}
