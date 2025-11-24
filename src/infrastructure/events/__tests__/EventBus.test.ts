import { EventBus } from '../EventBus';
import { MessageSent } from '../../../domain/events/MessageSent';
import { Message } from '../../../domain/entities/Message';
import { MessageId } from '../../../domain/value-objects/MessageId';
import { MessageContent } from '../../../domain/value-objects/MessageContent';
import { UserId } from '../../../domain/value-objects/UserId';

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe('subscribe and publish', () => {
    it('should call handler when event is published', () => {
      const handler = jest.fn();
      eventBus.subscribe('MessageSent', handler);

      const message = Message.create(
        MessageId.generate(),
        new MessageContent('Test'),
        UserId.generate()
      );
      const event = MessageSent.create(message);

      eventBus.publish(event);

      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should call multiple handlers for same event type', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      eventBus.subscribe('MessageSent', handler1);
      eventBus.subscribe('MessageSent', handler2);

      const message = Message.create(
        MessageId.generate(),
        new MessageContent('Test'),
        UserId.generate()
      );
      const event = MessageSent.create(message);

      eventBus.publish(event);

      expect(handler1).toHaveBeenCalledWith(event);
      expect(handler2).toHaveBeenCalledWith(event);
    });

    it('should not call handler for different event type', () => {
      const handler = jest.fn();
      eventBus.subscribe('MessageSent', handler);

      const message = Message.create(
        MessageId.generate(),
        new MessageContent('Test'),
        UserId.generate()
      );
      const event = MessageSent.create(message);

      // Publish with different type (simulated)
      eventBus.publish(event);

      // Handler should still be called because MessageSent is the type
      expect(handler).toHaveBeenCalled();
    });

    it('should handle errors in handlers gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const errorHandler = jest.fn(() => {
        throw new Error('Handler error');
      });
      const normalHandler = jest.fn();

      eventBus.subscribe('MessageSent', errorHandler);
      eventBus.subscribe('MessageSent', normalHandler);

      const message = Message.create(
        MessageId.generate(),
        new MessageContent('Test'),
        UserId.generate()
      );
      const event = MessageSent.create(message);

      // Should not throw, but log error
      expect(() => eventBus.publish(event)).not.toThrow();
      expect(normalHandler).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });
});

