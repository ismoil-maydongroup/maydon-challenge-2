import { LLMRequestDTO, LLMResponseDTO } from '../dtos/LLMRequestDTO';
import { Message } from '../../domain/entities/Message';
import { MessageDomainService } from '../../domain/domain-services/MessageDomainService';
import { IMessageRepository } from '../../domain/repositories/IMessageRepository';
import { UserId } from '../../domain/value-objects/UserId';
import { MessageSent } from '../../domain/events/MessageSent';

export interface ILLMService {
  sendMessage(request: LLMRequestDTO): Promise<string>;
}

export class SendLLMRequestUseCase {
  constructor(
    private readonly llmService: ILLMService,
    private readonly messageRepository: IMessageRepository,
    private readonly messageDomainService: MessageDomainService,
    private readonly eventBus: (event: MessageSent) => void
  ) {}

  async execute(request: LLMRequestDTO): Promise<LLMResponseDTO> {
    try {
      const response = await this.llmService.sendMessage(request);

      // Save LLM response as a message
      const userIdVO = new UserId('llm-assistant');
      const message = this.messageDomainService.createMessage(
        response,
        userIdVO
      );
      
      await this.messageRepository.save(message);

      const event = MessageSent.create(message);
      this.eventBus(event);

      return { response };
    } catch (error) {
      return {
        response: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

