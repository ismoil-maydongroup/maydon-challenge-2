import { MessageDomainService } from '../MessageDomainService';
import { UserId } from '../../value-objects/UserId';
import { Timestamp } from '../../value-objects/Timestamp';

describe('MessageDomainService', () => {
  let service: MessageDomainService;

  beforeEach(() => {
    service = new MessageDomainService();
  });

  describe('createMessage', () => {
    it('should create a message with valid content and userId', () => {
      const userId = UserId.generate();
      const content = 'Hello, world!';

      const message = service.createMessage(content, userId);

      expect(message).toBeDefined();
      expect(message.getContent().toString()).toBe(content);
      expect(message.getUserId()).toBe(userId);
      expect(message.getId()).toBeDefined();
      expect(message.getTimestamp()).toBeDefined();
    });

    it('should use provided timestamp when given', () => {
      const userId = UserId.generate();
      const content = 'Hello, world!';
      const timestamp = new Timestamp(new Date('2024-01-01'));

      const message = service.createMessage(content, userId, timestamp);

      expect(message.getTimestamp()).toBe(timestamp);
    });
  });

  describe('validateMessageContent', () => {
    it('should return true for valid content', () => {
      expect(service.validateMessageContent('Valid message')).toBe(true);
    });

    it('should return false for empty content', () => {
      expect(service.validateMessageContent('')).toBe(false);
    });

    it('should return false for content with only whitespace', () => {
      expect(service.validateMessageContent('   ')).toBe(false);
    });

    it('should return false for content exceeding 5000 characters', () => {
      const longContent = 'a'.repeat(5001);
      expect(service.validateMessageContent(longContent)).toBe(false);
    });
  });
});

