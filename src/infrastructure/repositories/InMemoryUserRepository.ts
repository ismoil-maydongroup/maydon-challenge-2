import { User } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();
  private sessionToUser: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.getId().toString(), user);
    this.sessionToUser.set(user.getSessionId(), user);
  }

  async findById(id: UserId): Promise<User | null> {
    return this.users.get(id.toString()) || null;
  }

  async findBySessionId(sessionId: string): Promise<User | null> {
    return this.sessionToUser.get(sessionId) || null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async delete(id: UserId): Promise<void> {
    const user = this.users.get(id.toString());
    if (user) {
      this.users.delete(id.toString());
      this.sessionToUser.delete(user.getSessionId());
    }
  }
}

