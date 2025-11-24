import { User } from '../entities/User';
import { Timestamp } from '../value-objects/Timestamp';

export class UserConnected {
  private constructor(
    private readonly user: User,
    private readonly occurredAt: Timestamp
  ) {}

  static create(user: User, occurredAt: Timestamp = Timestamp.now()): UserConnected {
    return new UserConnected(user, occurredAt);
  }

  getUser(): User {
    return this.user;
  }

  getOccurredAt(): Timestamp {
    return this.occurredAt;
  }
}

