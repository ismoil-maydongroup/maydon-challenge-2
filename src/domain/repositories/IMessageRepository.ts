import { Message } from '../entities/Message';
import { MessageId } from '../value-objects/MessageId';

export interface IMessageRepository {
  save(message: Message): Promise<void>;
  findById(id: MessageId): Promise<Message | null>;
  findAll(): Promise<Message[]>;
  findByUserId(userId: string): Promise<Message[]>;
}

