export class UserId {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }

  static generate(): UserId {
    return new UserId(`user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  }
}

