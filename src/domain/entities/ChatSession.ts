import { UserId } from '../value-objects/UserId';
import { Timestamp } from '../value-objects/Timestamp';

export class ChatSession {
  private constructor(
    private readonly id: string,
    private readonly userId: UserId,
    private readonly createdAt: Timestamp
  ) {}

  static create(
    id: string,
    userId: UserId,
    createdAt: Timestamp = Timestamp.now()
  ): ChatSession {
    if (!id || id.trim().length === 0) {
      throw new Error('ChatSession id cannot be empty');
    }
    return new ChatSession(id, userId, createdAt);
  }

  getId(): string {
    return this.id;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getCreatedAt(): Timestamp {
    return this.createdAt;
  }
}

