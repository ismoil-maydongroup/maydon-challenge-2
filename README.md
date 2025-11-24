# Full-Stack Chat Application

A real-time chat application built with Next.js, implementing Domain-Driven Design (DDD) architecture, featuring WebSocket support and LLM integration.

## Technology Stack

- **Frontend**: Next.js 14+ (App Router) + TypeScript
- **Backend**: Next.js API Routes + Custom Server for Socket.io
- **UI Components**: Ant Design (Antd)
- **Styling**: Tailwind CSS
- **Real-time**: Socket.io (WebSockets)
- **LLM Integration**: OpenAI API (optional)
- **Architecture**: Domain-Driven Design (DDD)
- **Storage**: In-memory (messages lost on server restart)

## Features

- ✅ Real-time bidirectional messaging via WebSockets
- ✅ Message history on connection
- ✅ User identification (session-based)
- ✅ LLM integration (OpenAI) for chatbot responses
- ✅ Clean DDD architecture with separation of concerns
- ✅ Modern UI with Ant Design components and Tailwind CSS
- ✅ Works with multiple browser tabs (same user can chat with themselves)

## Architecture

This application follows Domain-Driven Design (DDD) principles with clear separation of concerns:

### Domain Layer
- **Entities**: Message, User, ChatSession
- **Value Objects**: MessageId, UserId, Timestamp, MessageContent
- **Domain Services**: MessageDomainService
- **Domain Events**: MessageSent, UserConnected, UserDisconnected
- **Repository Interfaces**: IMessageRepository, IUserRepository

### Application Layer
- **Use Cases**: SendMessageUseCase, GetMessageHistoryUseCase, SendLLMRequestUseCase
- **Application Services**: MessageApplicationService, LLMApplicationService
- **DTOs**: MessageDTO, UserDTO, LLMRequestDTO

### Infrastructure Layer
- **Repositories**: InMemoryMessageRepository, InMemoryUserRepository
- **External Services**: OpenAIService (LLM integration)
- **Socket Handlers**: Socket.io event handlers
- **Event Bus**: Simple in-memory event bus

### Presentation Layer
- **Next.js Pages**: Chat page and components
- **API Routes**: REST endpoints for message operations
- **Socket.io**: Real-time communication
- **UI Components**: Ant Design components

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) OpenAI API key for LLM features

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maydon-challenge-2
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# OpenAI API Key (optional, for LLM features)
OPENAI_API_KEY=your_openai_api_key_here

# Server Port (default: 3000)
PORT=3000

# Socket.io Server URL (default: same origin)
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Open multiple browser tabs to test chatting with yourself!

## Usage

### Sending Messages

1. Type your message in the input field at the bottom
2. Press Enter or click the Send button
3. Messages appear in real-time for all connected clients

### Using LLM Chat

1. Click the "Chat with AI" button in the header
2. Type your question or message in the modal
3. Click "Send to AI"
4. The AI response will appear in the main chat as a message from "llm-assistant"

### Testing with Multiple Tabs

1. Open the application in one browser tab
2. Open the same URL in another tab (or different browser)
3. Send messages from one tab - they will appear in real-time in all tabs

## Project Structure

```
maydon-challenge-2/
├── app/                           # Next.js app directory
│   ├── layout.tsx                # Root layout with Antd ConfigProvider
│   ├── page.tsx                  # Main chat page
│   ├── api/                      # Next.js API routes
│   │   └── messages/             # Message API endpoints
│   ├── components/               # Presentation layer components
│   │   ├── MessageList.tsx
│   │   ├── MessageInput.tsx
│   │   └── LLMChat.tsx
│   ├── hooks/                    # Custom React hooks
│   │   └── useSocket.ts
│   └── globals.css               # Tailwind CSS imports
├── src/
│   ├── domain/                   # Domain layer
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── domain-services/
│   │   ├── events/
│   │   └── repositories/
│   ├── application/              # Application layer
│   │   ├── use-cases/
│   │   ├── services/
│   │   └── dtos/
│   ├── infrastructure/           # Infrastructure layer
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── events/
│   │   └── socket/
│   └── types/                   # Shared TypeScript types
├── server.js                    # Custom Next.js server for Socket.io
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## LLM Integration

The application includes optional LLM integration using OpenAI's API. To enable this feature:

1. Obtain an OpenAI API key from [OpenAI](https://platform.openai.com/)
2. Add it to your `.env` file as `OPENAI_API_KEY`
3. The LLM chat feature will be available in the UI

If the API key is not provided, the LLM features will show an error message when attempting to use them.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### TypeScript

The entire codebase is written in TypeScript for type safety across all layers.

## Architecture Decisions

### Why DDD?

Domain-Driven Design was chosen to:
- Separate business logic from infrastructure concerns
- Make the codebase more maintainable and testable
- Clearly define domain boundaries
- Enable easier future migrations (e.g., database persistence)

### Why In-Memory Storage?

For simplicity and to focus on the core chat functionality, messages are stored in-memory. This means:
- Messages are lost on server restart
- No database setup required
- Easy to extend with a database later (repository pattern makes this straightforward)

### Why Custom Next.js Server?

Socket.io requires a persistent connection, which works best with a custom server. The custom server allows:
- Socket.io integration alongside Next.js
- Single port for both HTTP and WebSocket connections
- Simplified deployment

## Future Enhancements

- [ ] Database persistence (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Private/direct messaging
- [ ] Message reactions
- [ ] File attachments
- [ ] Message search
- [ ] User presence indicators
- [ ] Typing indicators
- [ ] Message read receipts

## License

ISC

## Author

Built as part of the Maydon Challenge 2

