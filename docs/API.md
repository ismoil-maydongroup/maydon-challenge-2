# API Documentation

## REST API Endpoints

### GET /api/messages

Retrieves all messages from the chat history.

**Response:**
```json
[
  {
    "id": "string",
    "content": "string",
    "userId": "string",
    "timestamp": "ISO 8601 string"
  }
]
```

**Example:**
```bash
curl http://localhost:3000/api/messages
```

### POST /api/messages

Sends a new message.

**Request Body:**
```json
{
  "content": "string",
  "userId": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "content": "string",
  "userId": "string",
  "timestamp": "ISO 8601 string"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"content": "Hello!", "userId": "user-123"}'
```

## WebSocket Events

### Client → Server Events

#### `sendMessage`
Sends a message to the chat.

**Payload:**
```json
{
  "content": "string",
  "userId": "string"
}
```

#### `llmRequest`
Sends a request to the AI assistant.

**Payload:**
```json
{
  "message": "string",
  "userId": "string"
}
```

### Server → Client Events

#### `connect`
Emitted when client successfully connects.

#### `disconnect`
Emitted when client disconnects.

#### `messageHistory`
Emitted when client connects, contains all previous messages.

**Payload:**
```json
[
  {
    "id": "string",
    "content": "string",
    "userId": "string",
    "timestamp": "ISO 8601 string"
  }
]
```

#### `newMessage`
Emitted when a new message is sent by any user.

**Payload:**
```json
{
  "id": "string",
  "content": "string",
  "userId": "string",
  "timestamp": "ISO 8601 string"
}
```

#### `llmResponse`
Emitted when AI assistant responds to a request.

**Payload:**
```json
{
  "response": "string"
}
```

#### `llmError`
Emitted when an error occurs processing an LLM request.

**Payload:**
```json
{
  "error": "string"
}
```

#### `error`
Emitted when a general error occurs.

**Payload:**
```json
{
  "message": "string"
}
```

## Message Format

All messages follow this structure:

```typescript
interface MessageDTO {
  id: string;           // Unique message identifier
  content: string;       // Message content (2-5000 characters)
  userId: string;       // User identifier (nickname)
  timestamp: string;    // ISO 8601 timestamp
}
```

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "Error message description"
}
```

Common error scenarios:
- Invalid message content (empty or too long)
- Missing required fields
- LLM API errors (when OpenAI API key is missing or invalid)
- Connection errors

