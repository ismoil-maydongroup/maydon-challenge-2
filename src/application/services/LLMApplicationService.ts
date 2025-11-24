import { SendLLMRequestUseCase } from '../use-cases/SendLLMRequestUseCase';
import { LLMRequestDTO, LLMResponseDTO } from '../dtos/LLMRequestDTO';

export class LLMApplicationService {
  constructor(private readonly sendLLMRequestUseCase: SendLLMRequestUseCase) {}

  async sendLLMRequest(request: LLMRequestDTO): Promise<LLMResponseDTO> {
    return this.sendLLMRequestUseCase.execute(request);
  }
}

