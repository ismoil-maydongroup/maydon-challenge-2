import { UserId } from '../value-objects/UserId';
import { Timestamp } from '../value-objects/Timestamp';

export class User {
  private constructor(
    private readonly id: UserId,
    private readonly sessionId: string,
    private readonly connectedAt: Timestamp
  ) {}

  static create(
    id: UserId,
    sessionId: string,
    connectedAt: Timestamp = Timestamp.now()
  ): User {
    if (!sessionId || sessionId.trim().length === 0) {
      throw new Error('SessionId cannot be empty');
    }
    return new User(id, sessionId, connectedAt);
  }

  getId(): UserId {
    return this.id;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getConnectedAt(): Timestamp {
    return this.connectedAt;
  }
}

