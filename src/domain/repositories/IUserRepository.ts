import { User } from '../entities/User';
import { UserId } from '../value-objects/UserId';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  findBySessionId(sessionId: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: UserId): Promise<void>;
}

