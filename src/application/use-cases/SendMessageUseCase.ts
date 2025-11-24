import { Message } from '../../domain/entities/Message';
import { MessageDomainService } from '../../domain/domain-services/MessageDomainService';
import { IMessageRepository } from '../../domain/repositories/IMessageRepository';
import { UserId } from '../../domain/value-objects/UserId';
import { MessageSent } from '../../domain/events/MessageSent';
import { MessageDTO } from '../dtos/MessageDTO';

export class SendMessageUseCase {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly messageDomainService: MessageDomainService,
    private readonly eventBus: (event: MessageSent) => void
  ) {}

  async execute(content: string, userId: string): Promise<MessageDTO> {
    const userIdVO = new UserId(userId);
    
    if (!this.messageDomainService.validateMessageContent(content)) {
      throw new Error('Invalid message content');
    }

    const message = this.messageDomainService.createMessage(content, userIdVO);
    
    await this.messageRepository.save(message);

    const event = MessageSent.create(message);
    this.eventBus(event);

    return {
      id: message.getId().toString(),
      content: message.getContent().toString(),
      userId: message.getUserId().toString(),
      timestamp: message.getTimestamp().toISOString(),
    };
  }
}

