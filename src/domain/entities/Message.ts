import { MessageId } from '../value-objects/MessageId';
import { UserId } from '../value-objects/UserId';
import { Timestamp } from '../value-objects/Timestamp';
import { MessageContent } from '../value-objects/MessageContent';

export class Message {
  private constructor(
    private readonly id: MessageId,
    private readonly content: MessageContent,
    private readonly userId: UserId,
    private readonly timestamp: Timestamp
  ) {}

  static create(
    id: MessageId,
    content: MessageContent,
    userId: UserId,
    timestamp: Timestamp = Timestamp.now()
  ): Message {
    return new Message(id, content, userId, timestamp);
  }

  getId(): MessageId {
    return this.id;
  }

  getContent(): MessageContent {
    return this.content;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getTimestamp(): Timestamp {
    return this.timestamp;
  }
}

