import { IMessageRepository } from '../../domain/repositories/IMessageRepository';
import { MessageDTO } from '../dtos/MessageDTO';

export class GetMessageHistoryUseCase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  async execute(): Promise<MessageDTO[]> {
    const messages = await this.messageRepository.findAll();
    
    return messages.map(message => ({
      id: message.getId().toString(),
      content: message.getContent().toString(),
      userId: message.getUserId().toString(),
      timestamp: message.getTimestamp().toISOString(),
    }));
  }
}

