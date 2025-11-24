import { Server as SocketIOServer, Socket } from 'socket.io';
import { MessageApplicationService } from '../../application/services/MessageApplicationService';
import { LLMApplicationService } from '../../application/services/LLMApplicationService';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';
import { UserConnected } from '../../domain/events/UserConnected';
import { UserDisconnected } from '../../domain/events/UserDisconnected';
import { MessageSent } from '../../domain/events/MessageSent';
import { EventBus } from '../events/EventBus';
import { MessageDTO } from '../../application/dtos/MessageDTO';

export function setupSocketHandlers(
  io: SocketIOServer,
  messageApplicationService: MessageApplicationService,
  llmApplicationService: LLMApplicationService,
  userRepository: IUserRepository,
  eventBus: EventBus
): void {
  // Subscribe to MessageSent events and broadcast to all clients
  eventBus.subscribe('MessageSent', (event) => {
    if (event instanceof MessageSent) {
      const message = event.getMessage();
      const messageDTO: MessageDTO = {
        id: message.getId().toString(),
        content: message.getContent().toString(),
        userId: message.getUserId().toString(),
        timestamp: message.getTimestamp().toISOString(),
      };
      io.emit('newMessage', messageDTO);
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    // Create user on connection
    const userId = UserId.generate();
    const user = User.create(userId, socket.id);
    userRepository.save(user);

    const userConnectedEvent = UserConnected.create(user);
    eventBus.publish(userConnectedEvent);

    // Send message history to new connection
    messageApplicationService.getMessageHistory().then(history => {
      socket.emit('messageHistory', history);
    });

    // Handle sending messages
    socket.on('sendMessage', async (data: { content: string; userId: string }) => {
      try {
        await messageApplicationService.sendMessage(
          data.content,
          data.userId
        );
        // Message will be broadcasted via event bus
      } catch (error) {
        socket.emit('error', {
          message: error instanceof Error ? error.message : 'Failed to send message',
        });
      }
    });

    // Handle LLM requests
    socket.on('llmRequest', async (data: { message: string; userId: string }) => {
      try {
        const response = await llmApplicationService.sendLLMRequest({
          message: data.message,
          userId: data.userId,
        });

        if (response.error) {
          socket.emit('llmError', { error: response.error });
        } else {
          // The LLM response is already saved as a message and broadcasted via event bus
          socket.emit('llmResponse', { response: response.response });
        }
      } catch (error) {
        socket.emit('llmError', {
          error: error instanceof Error ? error.message : 'Failed to process LLM request',
        });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      
      userRepository.findBySessionId(socket.id).then(user => {
        if (user) {
          const userDisconnectedEvent = UserDisconnected.create(user.getId());
          eventBus.publish(userDisconnectedEvent);
          userRepository.delete(user.getId());
        }
      });
    });
  });
}

