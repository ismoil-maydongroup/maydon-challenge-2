import { UserId } from '../value-objects/UserId';
import { Timestamp } from '../value-objects/Timestamp';

export class UserDisconnected {
  private constructor(
    private readonly userId: UserId,
    private readonly occurredAt: Timestamp
  ) {}

  static create(userId: UserId, occurredAt: Timestamp = Timestamp.now()): UserDisconnected {
    return new UserDisconnected(userId, occurredAt);
  }

  getUserId(): UserId {
    return this.userId;
  }

  getOccurredAt(): Timestamp {
    return this.occurredAt;
  }
}

