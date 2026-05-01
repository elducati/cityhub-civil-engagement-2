import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proposal } from '../proposal/entities/proposal.entity';
import { User } from '../user/entities/user.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Proposal, proposal => proposal.votes)
  proposal: Proposal;

  @ManyToOne(() => User, user => user.votes)
  voter: User;

  @Column({
    type: 'enum', 
    enum: ['FOR', 'AGAINST'],
    default: 'FOR'
  })
  voteType: 'FOR' | 'AGAINST';

  @Column()
  votedAt: Date;
}