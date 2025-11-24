# Contributing Guide

Thank you for your interest in contributing to this project! This guide will help you get started.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone <your-fork-url>
   cd maydon-challenge-2
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Follow the existing code structure and patterns

## Testing

- Write tests for new features
- Ensure all tests pass: `npm test`
- Maintain or improve test coverage
- Follow the testing patterns in existing tests

## Architecture Guidelines

### Adding New Features

1. **Domain Layer First**: Define entities, value objects, and domain logic
2. **Application Layer**: Create use cases and services
3. **Infrastructure Layer**: Implement repositories and external services
4. **Presentation Layer**: Add UI components and API routes

### Example: Adding a New Feature

```typescript
// 1. Domain: Define value object
export class FeatureValue {
  // ...
}

// 2. Application: Create use case
export class FeatureUseCase {
  // ...
}

// 3. Infrastructure: Implement repository
export class FeatureRepository implements IFeatureRepository {
  // ...
}

// 4. Presentation: Add component
export function FeatureComponent() {
  // ...
}
```

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add message reactions feature
fix: Resolve socket connection issue
docs: Update API documentation
test: Add tests for MessageRepository
refactor: Simplify message validation logic
```

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Update documentation if needed
6. Submit a pull request with a clear description

## Code Review

- All PRs require review before merging
- Address review comments promptly
- Keep PRs focused and reasonably sized
- Update documentation for user-facing changes

## Questions?

Feel free to open an issue for questions or discussions about the codebase.

