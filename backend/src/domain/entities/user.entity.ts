export enum UserRole {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: string;
  keycloakId: string;
  email: string;
  emailHash?: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUserUpdate {
  fullName?: string;
  role?: UserRole;
}