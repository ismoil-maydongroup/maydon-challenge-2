import { MessageContent } from '../MessageContent';

describe('MessageContent', () => {
  describe('constructor', () => {
    it('should create MessageContent with valid content', () => {
      const content = new MessageContent('Hello, world!');
      expect(content.toString()).toBe('Hello, world!');
    });

    it('should trim whitespace from content', () => {
      const content = new MessageContent('  Hello, world!  ');
      expect(content.toString()).toBe('Hello, world!');
    });

    it('should throw error when content is empty', () => {
      expect(() => new MessageContent('')).toThrow('MessageContent cannot be empty');
    });

    it('should throw error when content is only whitespace', () => {
      expect(() => new MessageContent('   ')).toThrow('MessageContent cannot be empty');
    });

    it('should throw error when content exceeds 5000 characters', () => {
      const longContent = 'a'.repeat(5001);
      expect(() => new MessageContent(longContent)).toThrow('MessageContent cannot exceed 5000 characters');
    });

    it('should accept content with exactly 5000 characters', () => {
      const content = 'a'.repeat(5000);
      const messageContent = new MessageContent(content);
      expect(messageContent.toString().length).toBe(5000);
    });
  });

  describe('equals', () => {
    it('should return true for equal content', () => {
      const content1 = new MessageContent('Hello');
      const content2 = new MessageContent('Hello');
      expect(content1.equals(content2)).toBe(true);
    });

    it('should return false for different content', () => {
      const content1 = new MessageContent('Hello');
      const content2 = new MessageContent('World');
      expect(content1.equals(content2)).toBe(false);
    });
  });
});

