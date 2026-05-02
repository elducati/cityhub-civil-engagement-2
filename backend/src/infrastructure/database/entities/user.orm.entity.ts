import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { VoteOrm } from './vote.orm.entity';

export enum UserRole {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class UserOrm {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'keycloak_id', unique: true })
  keycloakId!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'email_hash', unique: true, nullable: true })
  emailHash?: string;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => VoteOrm, (vote) => vote.voter)
  votes?: VoteOrm[];
}