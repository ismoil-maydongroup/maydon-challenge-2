# Architecture Documentation

## Overview

This application follows **Domain-Driven Design (DDD)** principles, providing a clean separation of concerns across multiple layers. The architecture ensures maintainability, testability, and scalability.

## Architecture Layers

### 1. Domain Layer (`src/domain/`)

The domain layer contains the core business logic and rules of the application. It is independent of infrastructure and presentation concerns.

#### Entities
- **Message**: Represents a chat message with id, content, userId, and timestamp
- **User**: Represents a connected user with id, sessionId, and connection timestamp
- **ChatSession**: Represents a chat session

#### Value Objects
- **MessageId**: Unique identifier for messages with validation
- **UserId**: Unique identifier for users with validation
- **Timestamp**: Immutable timestamp value object
- **MessageContent**: Message content with validation (2-5000 characters)

#### Domain Services
- **MessageDomainService**: Contains domain logic for message operations (creation, validation)

#### Domain Events
- **MessageSent**: Fired when a message is sent
- **UserConnected**: Fired when a user connects
- **UserDisconnected**: Fired when a user disconnects

#### Repository Interfaces
- **IMessageRepository**: Interface for message persistence
- **IUserRepository**: Interface for user persistence

### 2. Application Layer (`src/application/`)

The application layer orchestrates use cases and coordinates between domain and infrastructure layers.

#### Use Cases
- **SendMessageUseCase**: Handles sending a message
- **GetMessageHistoryUseCase**: Retrieves message history
- **SendLLMRequestUseCase**: Handles LLM chat requests

#### Application Services
- **MessageApplicationService**: Orchestrates message operations
- **LLMApplicationService**: Orchestrates LLM operations

#### DTOs (Data Transfer Objects)
- **MessageDTO**: Message data for API communication
- **UserDTO**: User data for API communication
- **LLMRequestDTO**: LLM request data
- **LLMResponseDTO**: LLM response data

### 3. Infrastructure Layer (`src/infrastructure/`)

The infrastructure layer implements technical concerns and external integrations.

#### Repositories
- **InMemoryMessageRepository**: In-memory implementation of IMessageRepository
- **InMemoryUserRepository**: In-memory implementation of IUserRepository

#### External Services
- **OpenAIService**: OpenAI API integration for LLM functionality

#### Event Bus
- **EventBus**: Simple in-memory event bus for domain events

#### Socket Handlers
- **socketHandlers**: Socket.io event handlers
- **socketServer**: Socket.io server setup

### 4. Presentation Layer (`src/app/`)

The presentation layer handles user interface and API endpoints.

#### Next.js Pages
- **page.tsx**: Main chat page

#### Components
- **MessageList**: Displays chat messages
- **MessageInput**: Input component for sending messages
- **LLMChat**: AI chat drawer interface
- **NicknameModal**: Modal for nickname entry

#### Hooks
- **useSocket**: Custom hook for Socket.io connection management

#### API Routes
- **app/api/messages/route.ts**: REST endpoints for message operations

## Data Flow

### Sending a Message

1. User types message in `MessageInput` component
2. `useSocket` hook emits `sendMessage` event via Socket.io
3. Socket handler receives event and calls `MessageApplicationService.sendMessage()`
4. `SendMessageUseCase` executes:
   - Validates message content
   - Creates domain `Message` entity
   - Saves to repository
   - Publishes `MessageSent` event
5. Event bus broadcasts event to all connected clients
6. Clients receive `newMessage` event and update UI

### LLM Request Flow

1. User opens AI chat drawer and sends message
2. Socket handler receives `llmRequest` event
3. `LLMApplicationService.sendLLMRequest()` is called
4. `SendLLMRequestUseCase` executes:
   - Calls OpenAI service
   - Creates message with userId 'llm-assistant'
   - Saves to repository
   - Publishes `MessageSent` event
5. AI response appears in both main chat and AI drawer

## Dependency Injection

Dependencies are wired together in `src/infrastructure/dependencies.ts`:

- Repositories are instantiated
- Domain services are created
- Use cases are constructed with dependencies
- Application services orchestrate use cases

## Benefits of This Architecture

1. **Separation of Concerns**: Each layer has a clear responsibility
2. **Testability**: Each layer can be tested independently
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to swap implementations (e.g., database instead of in-memory)
5. **Domain Focus**: Business logic is isolated and protected

## Future Enhancements

- Database persistence (replace in-memory repositories)
- User authentication
- Message reactions
- File attachments
- Private messaging
- Message search

