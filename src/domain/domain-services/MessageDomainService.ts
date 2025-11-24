import { Message } from "../entities/Message";
import { MessageId } from "../value-objects/MessageId";
import { MessageContent } from "../value-objects/MessageContent";
import { UserId } from "../value-objects/UserId";
import { Timestamp } from "../value-objects/Timestamp";

export class MessageDomainService {
  createMessage(
    content: string,
    userId: UserId,
    timestamp?: Timestamp
  ): Message {
    const messageId = MessageId.generate();
    const messageContent = new MessageContent(content);
    const messageTimestamp = timestamp || Timestamp.now();

    return Message.create(messageId, messageContent, userId, messageTimestamp);
  }

  validateMessageContent(content: string): boolean {
    try {
      new MessageContent(content);
      return true;
    } catch {
      return false;
    }
  }
}
