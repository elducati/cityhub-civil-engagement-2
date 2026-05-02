import { IUser, IUserCreate, IUserUpdate } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByKeycloakId(keycloakId: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findByEmailHash(emailHash: string): Promise<IUser | null>;
  create(data: IUserCreate): Promise<IUser>;
  update(id: string, data: Partial<IUserUpdate>): Promise<IUser>;
  updateRole(id: string, role: string): Promise<IUser>;
  deactivate(id: string): Promise<IUser>;
  activate(id: string): Promise<IUser>;
  findAll(page: number, limit: number): Promise<{ data: IUser[]; total: number }>;
}