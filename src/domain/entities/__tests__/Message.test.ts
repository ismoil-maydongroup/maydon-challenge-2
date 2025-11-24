import { Message } from '../Message';
import { MessageId } from '../../value-objects/MessageId';
import { MessageContent } from '../../value-objects/MessageContent';
import { UserId } from '../../value-objects/UserId';
import { Timestamp } from '../../value-objects/Timestamp';

describe('Message', () => {
  it('should create a message with all required fields', () => {
    const id = MessageId.generate();
    const content = new MessageContent('Test message');
    const userId = UserId.generate();
    const timestamp = Timestamp.now();

    const message = Message.create(id, content, userId, timestamp);

    expect(message.getId()).toBe(id);
    expect(message.getContent()).toBe(content);
    expect(message.getUserId()).toBe(userId);
    expect(message.getTimestamp()).toBe(timestamp);
  });

  it('should use current timestamp when not provided', () => {
    const id = MessageId.generate();
    const content = new MessageContent('Test message');
    const userId = UserId.generate();

    const before = new Date();
    const message = Message.create(id, content, userId);
    const after = new Date();

    const messageTimestamp = message.getTimestamp().toDate();
    expect(messageTimestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(messageTimestamp.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});

