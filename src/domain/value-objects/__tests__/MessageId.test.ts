import { MessageId } from '../MessageId';

describe('MessageId', () => {
  describe('constructor', () => {
    it('should create a MessageId with a valid value', () => {
      const id = new MessageId('test-id-123');
      expect(id.toString()).toBe('test-id-123');
    });

    it('should throw error when value is empty', () => {
      expect(() => new MessageId('')).toThrow('MessageId cannot be empty');
    });

    it('should throw error when value is only whitespace', () => {
      expect(() => new MessageId('   ')).toThrow('MessageId cannot be empty');
    });
  });

  describe('equals', () => {
    it('should return true for equal MessageIds', () => {
      const id1 = new MessageId('test-id');
      const id2 = new MessageId('test-id');
      expect(id1.equals(id2)).toBe(true);
    });

    it('should return false for different MessageIds', () => {
      const id1 = new MessageId('test-id-1');
      const id2 = new MessageId('test-id-2');
      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('generate', () => {
    it('should generate a unique MessageId', () => {
      const id1 = MessageId.generate();
      const id2 = MessageId.generate();
      
      expect(id1.toString()).toBeTruthy();
      expect(id2.toString()).toBeTruthy();
      expect(id1.equals(id2)).toBe(false);
    });
  });
});

