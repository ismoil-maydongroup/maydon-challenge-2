import { InMemoryMessageRepository } from '../InMemoryMessageRepository';
import { Message } from '../../../domain/entities/Message';
import { MessageId } from '../../../domain/value-objects/MessageId';
import { MessageContent } from '../../../domain/value-objects/MessageContent';
import { UserId } from '../../../domain/value-objects/UserId';

describe('InMemoryMessageRepository', () => {
  let repository: InMemoryMessageRepository;

  beforeEach(() => {
    repository = new InMemoryMessageRepository();
  });

  describe('save', () => {
    it('should save a message', async () => {
      const message = Message.create(
        MessageId.generate(),
        new MessageContent('Test message'),
        UserId.generate()
      );

      await repository.save(message);
      const found = await repository.findById(message.getId());

      expect(found).toBeDefined();
      expect(found?.getId().equals(message.getId())).toBe(true);
    });
  });

  describe('findById', () => {
    it('should return message when found', async () => {
      const message = Message.create(
        MessageId.generate(),
        new MessageContent('Test message'),
        UserId.generate()
      );

      await repository.save(message);
      const found = await repository.findById(message.getId());

      expect(found).toBeDefined();
      expect(found?.getId().equals(message.getId())).toBe(true);
    });

    it('should return null when message not found', async () => {
      const id = MessageId.generate();
      const found = await repository.findById(id);

      expect(found).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return empty array when no messages', async () => {
      const messages = await repository.findAll();
      expect(messages).toEqual([]);
    });

    it('should return all saved messages', async () => {
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

      await repository.save(message1);
      await repository.save(message2);

      const messages = await repository.findAll();
      expect(messages).toHaveLength(2);
    });
  });

  describe('findByUserId', () => {
    it('should return messages for specific user', async () => {
      const userId1 = UserId.generate();
      const userId2 = UserId.generate();

      const message1 = Message.create(
        MessageId.generate(),
        new MessageContent('Message 1'),
        userId1
      );
      const message2 = Message.create(
        MessageId.generate(),
        new MessageContent('Message 2'),
        userId1
      );
      const message3 = Message.create(
        MessageId.generate(),
        new MessageContent('Message 3'),
        userId2
      );

      await repository.save(message1);
      await repository.save(message2);
      await repository.save(message3);

      const userMessages = await repository.findByUserId(userId1.toString());
      expect(userMessages).toHaveLength(2);
      expect(userMessages.every(m => m.getUserId().equals(userId1))).toBe(true);
    });
  });
});

