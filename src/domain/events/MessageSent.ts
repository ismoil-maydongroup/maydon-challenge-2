import { Message } from '../entities/Message';
import { Timestamp } from '../value-objects/Timestamp';

export class MessageSent {
  private constructor(
    private readonly message: Message,
    private readonly occurredAt: Timestamp
  ) {}

  static create(message: Message, occurredAt: Timestamp = Timestamp.now()): MessageSent {
    return new MessageSent(message, occurredAt);
  }

  getMessage(): Message {
    return this.message;
  }

  getOccurredAt(): Timestamp {
    return this.occurredAt;
  }
}

