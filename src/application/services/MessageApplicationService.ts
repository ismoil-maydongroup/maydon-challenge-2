import { SendMessageUseCase } from '../use-cases/SendMessageUseCase';
import { GetMessageHistoryUseCase } from '../use-cases/GetMessageHistoryUseCase';
import { MessageDTO } from '../dtos/MessageDTO';

export class MessageApplicationService {
  constructor(
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly getMessageHistoryUseCase: GetMessageHistoryUseCase
  ) {}

  async sendMessage(content: string, userId: string): Promise<MessageDTO> {
    return this.sendMessageUseCase.execute(content, userId);
  }

  async getMessageHistory(): Promise<MessageDTO[]> {
    return this.getMessageHistoryUseCase.execute();
  }
}

