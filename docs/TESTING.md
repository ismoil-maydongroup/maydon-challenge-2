# Testing Documentation

## Test Structure

The project uses **Jest** as the testing framework with **TypeScript** support. Tests are organized by layer following the DDD architecture.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Organization

Tests are located alongside their source files in `__tests__` directories:

```
src/
├── domain/
│   ├── entities/
│   │   └── __tests__/
│   ├── value-objects/
│   │   └── __tests__/
│   └── domain-services/
│       └── __tests__/
├── application/
│   └── use-cases/
│       └── __tests__/
└── infrastructure/
    ├── repositories/
    │   └── __tests__/
    └── events/
        └── __tests__/
```

## Test Coverage

### Domain Layer Tests

#### Value Objects
- **MessageId.test.ts**: Tests for message ID creation, validation, and equality
- **MessageContent.test.ts**: Tests for message content validation and constraints

#### Entities
- **Message.test.ts**: Tests for message entity creation and properties

#### Domain Services
- **MessageDomainService.test.ts**: Tests for message creation and validation logic

### Application Layer Tests

#### Use Cases
- **SendMessageUseCase.test.ts**: Tests for sending messages, event publishing
- **GetMessageHistoryUseCase.test.ts**: Tests for retrieving message history

### Infrastructure Layer Tests

#### Repositories
- **InMemoryMessageRepository.test.ts**: Tests for CRUD operations, querying

#### Events
- **EventBus.test.ts**: Tests for event subscription and publishing

## Writing New Tests

### Example: Testing a Value Object

```typescript
import { MessageId } from '../MessageId';

describe('MessageId', () => {
  it('should create a MessageId with a valid value', () => {
    const id = new MessageId('test-id-123');
    expect(id.toString()).toBe('test-id-123');
  });

  it('should throw error when value is empty', () => {
    expect(() => new MessageId('')).toThrow('MessageId cannot be empty');
  });
});
```

### Example: Testing a Use Case

```typescript
import { SendMessageUseCase } from '../SendMessageUseCase';
import { InMemoryMessageRepository } from '../../../infrastructure/repositories/InMemoryMessageRepository';

describe('SendMessageUseCase', () => {
  let useCase: SendMessageUseCase;
  let repository: InMemoryMessageRepository;

  beforeEach(() => {
    repository = new InMemoryMessageRepository();
    useCase = new SendMessageUseCase(repository, ...);
  });

  it('should send a message successfully', async () => {
    const result = await useCase.execute('Hello', 'user-123');
    expect(result.content).toBe('Hello');
  });
});
```

## Test Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Clear Naming**: Test names should clearly describe what is being tested
3. **Arrange-Act-Assert**: Structure tests with setup, execution, and verification
4. **Mock External Dependencies**: Use mocks for external services (e.g., OpenAI API)
5. **Coverage Goals**: Aim for high coverage of business logic (domain and application layers)

## Coverage Reports

After running `npm run test:coverage`, view the HTML report:

```
coverage/
└── index.html
```

Open this file in a browser to see detailed coverage information.

## Continuous Integration

Tests should be run in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage
```

## Future Test Additions

- Integration tests for Socket.io handlers
- Component tests for React components
- E2E tests with Playwright
- Performance tests for message handling

