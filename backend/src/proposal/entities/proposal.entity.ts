import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Index } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Vote } from '../vote/vote.entity';

@Entity()
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum', 
    enum: ['DRAFT', 'OPEN', 'POSTED', 'CLOSED'],
    default: 'DRAFT'
  })
  status: 'DRAFT' | 'OPEN' | 'POSTED' | 'CLOSED';

  @ManyToOne(() => User, user => user.proposals)
  author: User;

  @OneToMany(() => Vote, vote => vote.proposal)
  votes: Vote[];
}