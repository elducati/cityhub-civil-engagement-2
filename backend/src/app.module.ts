import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
// Import other modules here (Proposal, Auth)

@Module({
  imports: [
    TypeOrmModule.forFeature([/* Entities */])
    UsersModule
  ],
  providers: [
    /* Services */
  ],
  exports: [
    UsersModule
  ]
})
export class AppModule {}