import { Message } from '../../domain/entities/Message';
import { MessageId } from '../../domain/value-objects/MessageId';
import { IMessageRepository } from '../../domain/repositories/IMessageRepository';

export class InMemoryMessageRepository implements IMessageRepository {
  private messages: Map<string, Message> = new Map();

  async save(message: Message): Promise<void> {
    this.messages.set(message.getId().toString(), message);
  }

  async findById(id: MessageId): Promise<Message | null> {
    return this.messages.get(id.toString()) || null;
  }

  async findAll(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  async findByUserId(userId: string): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      message => message.getUserId().toString() === userId
    );
  }
}

