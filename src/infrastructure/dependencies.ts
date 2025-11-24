import { InMemoryMessageRepository } from "./repositories/InMemoryMessageRepository";
import { InMemoryUserRepository } from "./repositories/InMemoryUserRepository";
import { OpenAIService } from "./services/OpenAIService";
import { EventBus } from "./events/EventBus";
import { MessageDomainService } from "../domain/domain-services/MessageDomainService";
import { SendMessageUseCase } from "../application/use-cases/SendMessageUseCase";
import { GetMessageHistoryUseCase } from "../application/use-cases/GetMessageHistoryUseCase";
import { SendLLMRequestUseCase } from "../application/use-cases/SendLLMRequestUseCase";
import { MessageApplicationService } from "../application/services/MessageApplicationService";
import { LLMApplicationService } from "../application/services/LLMApplicationService";

// Create infrastructure instances
export const messageRepository = new InMemoryMessageRepository();
export const userRepository = new InMemoryUserRepository();
export const openAIService = new OpenAIService();
export const eventBus = new EventBus();

// Create domain services
export const messageDomainService = new MessageDomainService();

// Create use cases
export const sendMessageUseCase = new SendMessageUseCase(
  messageRepository,
  messageDomainService,
  (event) => eventBus.publish(event)
);

export const getMessageHistoryUseCase = new GetMessageHistoryUseCase(
  messageRepository
);

export const sendLLMRequestUseCase = new SendLLMRequestUseCase(
  openAIService,
  messageRepository,
  messageDomainService,
  (event) => eventBus.publish(event)
);

// Create application services
export const messageApplicationService = new MessageApplicationService(
  sendMessageUseCase,
  getMessageHistoryUseCase
);

export const llmApplicationService = new LLMApplicationService(
  sendLLMRequestUseCase
);
