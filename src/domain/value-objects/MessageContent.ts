export class MessageContent {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('MessageContent cannot be empty');
    }
    if (value.length > 5000) {
      throw new Error('MessageContent cannot exceed 5000 characters');
    }
    this.value = value.trim();
  }

  toString(): string {
    return this.value;
  }

  equals(other: MessageContent): boolean {
    return this.value === other.value;
  }
}

