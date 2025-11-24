# Project Summary

## Overview

This is a full-stack real-time chat application built with Next.js, implementing Domain-Driven Design (DDD) architecture. The application features WebSocket support for real-time messaging and optional LLM integration for AI-powered chat assistance.

## Key Features

✅ **Real-time Messaging**: WebSocket-based bidirectional communication  
✅ **User Nicknames**: Custom nickname system with localStorage persistence  
✅ **AI Chat Integration**: Dedicated AI chat drawer with OpenAI integration  
✅ **DDD Architecture**: Clean separation of concerns across layers  
✅ **Comprehensive Testing**: Unit tests for all layers  
✅ **Modern UI**: Ant Design components with Tailwind CSS  
✅ **Type Safety**: Full TypeScript implementation  

## Technology Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Backend**: Node.js, Express, Socket.io
- **UI**: Ant Design, Tailwind CSS
- **Testing**: Jest, React Testing Library
- **LLM**: OpenAI API (optional)

## Architecture

The application follows Domain-Driven Design with four distinct layers:

1. **Domain Layer**: Business logic, entities, value objects, domain services
2. **Application Layer**: Use cases, application services, DTOs
3. **Infrastructure Layer**: Repositories, external services, event bus
4. **Presentation Layer**: Next.js pages, components, API routes

## Project Structure

```
maydon-challenge-2/
├── src/
│   ├── domain/              # Domain layer (business logic)
│   ├── application/         # Application layer (use cases)
│   ├── infrastructure/      # Infrastructure layer (repositories, services)
│   └── app/                 # Presentation layer (Next.js)
├── docs/                    # Documentation
├── server.ts               # Custom Next.js server
└── tests/                  # Test files (alongside source)
```

## Testing

- **7 test suites** covering domain, application, and infrastructure layers
- **Jest** configuration with TypeScript support
- **Coverage reporting** available
- Tests located in `__tests__` directories alongside source files

## Documentation

Comprehensive documentation available in `docs/`:

- **ARCHITECTURE.md**: Detailed architecture explanation
- **API.md**: REST API and WebSocket event documentation
- **TESTING.md**: Testing guide and best practices
- **CONTRIBUTING.md**: Contribution guidelines

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment: Copy `.env.example` to `.env`
3. Run development server: `npm run dev`
4. Run tests: `npm test`

## Future Enhancements

- Database persistence
- User authentication
- Private messaging
- Message reactions
- File attachments
- Message search

## License

ISC

