import { GetMessageHistoryUseCase } from '../GetMessageHistoryUseCase';
import { InMemoryMessageRepository } from '../../../infrastructure/repositories/InMemoryMessageRepository';
import { Message } from '../../../domain/entities/Message';
import { MessageId } from '../../../domain/value-objects/MessageId';
import { MessageContent } from '../../../domain/value-objects/MessageContent';
import { UserId } from '../../../domain/value-objects/UserId';

describe('GetMessageHistoryUseCase', () => {
  let useCase: GetMessageHistoryUseCase;
  let messageRepository: InMemoryMessageRepository;

  beforeEach(() => {
    messageRepository = new InMemoryMessageRepository();
    useCase = new GetMessageHistoryUseCase(messageRepository);
  });

  describe('execute', () => {
    it('should return empty array when no messages', async () => {
      const result = await useCase.execute();
      expect(result).toEqual([]);
    });

    it('should return all messages as DTOs', async () => {
      const message1 = Message.create(
        MessageId.generate(),
        new MessageContent('Message 1'),
        UserId.generate()
      );
      const message2 = Message.create(
        MessageId.generate(),
        new MessageContent('Message 2'),
        UserId.generate()
      );

      await messageRepository.save(message1);
      await messageRepository.save(message2);

      const result = await useCase.execute();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('content');
      expect(result[0]).toHaveProperty('userId');
      expect(result[0]).toHaveProperty('timestamp');
      expect(result[0].content).toBe('Message 1');
    });
  });
});

