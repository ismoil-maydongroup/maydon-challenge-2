import OpenAI from 'openai';
import { LLMRequestDTO, ILLMService } from '../../application/use-cases/SendLLMRequestUseCase';

export class OpenAIService implements ILLMService {
  private client: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.client = new OpenAI({ apiKey });
    }
  }

  async sendMessage(request: LLMRequestDTO): Promise<string> {
    if (!this.client) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
    }

    try {
      const messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [
        { role: 'system', content: 'You are a helpful assistant in a chat application.' },
      ];

      if (request.conversationHistory) {
        messages.push(...request.conversationHistory);
      }

      messages.push({ role: 'user', content: request.message });

      const completion = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages as any,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content || 'No response from LLM';
    } catch (error) {
      throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

