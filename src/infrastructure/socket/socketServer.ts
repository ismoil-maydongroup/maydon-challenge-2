import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { MessageApplicationService } from '../../application/services/MessageApplicationService';
import { LLMApplicationService } from '../../application/services/LLMApplicationService';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { EventBus } from '../events/EventBus';
import { setupSocketHandlers } from './socketHandlers';

export function createSocketServer(
  httpServer: HTTPServer,
  messageApplicationService: MessageApplicationService,
  llmApplicationService: LLMApplicationService,
  userRepository: IUserRepository,
  eventBus: EventBus
): SocketIOServer {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  setupSocketHandlers(
    io,
    messageApplicationService,
    llmApplicationService,
    userRepository,
    eventBus
  );

  return io;
}

