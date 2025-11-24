export interface LLMRequestDTO {
  message: string;
  userId: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface LLMResponseDTO {
  response: string;
  error?: string;
}

