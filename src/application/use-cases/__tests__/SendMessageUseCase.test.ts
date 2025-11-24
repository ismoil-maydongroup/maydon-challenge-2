import { SendMessageUseCase } from '../SendMessageUseCase';
import { InMemoryMessageRepository } from '../../../infrastructure/repositories/InMemoryMessageRepository';
import { MessageDomainService } from '../../../domain/domain-services/MessageDomainService';
import { EventBus } from '../../../infrastructure/events/EventBus';
import { MessageSent } from '../../../domain/events/MessageSent';

describe('SendMessageUseCase', () => {
  let useCase: SendMessageUseCase;
  let messageRepository: InMemoryMessageRepository;
  let messageDomainService: MessageDomainService;
  let eventBus: EventBus;
  let publishedEvents: any[];

  beforeEach(() => {
    messageRepository = new InMemoryMessageRepository();
    messageDomainService = new MessageDomainService();
    eventBus = new EventBus();
    publishedEvents = [];

    eventBus.subscribe('MessageSent', (event) => {
      publishedEvents.push(event);
    });

    useCase = new SendMessageUseCase(
      messageRepository,
      messageDomainService,
      (event) => eventBus.publish(event)
    );
  });

  describe('execute', () => {
    it('should send a message successfully', async () => {
      const content = 'Hello, world!';
      const userId = 'user-123';

      const result = await useCase.execute(content, userId);

      expect(result).toBeDefined();
      expect(result.content).toBe(content);
      expect(result.userId).toBe(userId);
      expect(result.id).toBeDefined();
      expect(result.timestamp).toBeDefined();
    });

    it('should save message to repository', async () => {
      const content = 'Hello, world!';
      const userId = 'user-123';

      await useCase.execute(content, userId);

      const messages = await messageRepository.findAll();
      expect(messages).toHaveLength(1);
      expect(messages[0].getContent().toString()).toBe(content);
    });

    it('should publish MessageSent event', async () => {
      const content = 'Hello, world!';
      const userId = 'user-123';

      await useCase.execute(content, userId);

      expect(publishedEvents).toHaveLength(1);
      expect(publishedEvents[0]).toBeInstanceOf(MessageSent);
    });

    it('should throw error for invalid message content', async () => {
      const content = '';
      const userId = 'user-123';

      await expect(useCase.execute(content, userId)).rejects.toThrow();
    });
  });
});

