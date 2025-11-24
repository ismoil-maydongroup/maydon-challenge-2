export class Timestamp {
  private readonly value: Date;

  constructor(value: Date | number) {
    if (value instanceof Date) {
      this.value = value;
    } else {
      this.value = new Date(value);
    }
  }

  toDate(): Date {
    return new Date(this.value);
  }

  toISOString(): string {
    return this.value.toISOString();
  }

  equals(other: Timestamp): boolean {
    return this.value.getTime() === other.value.getTime();
  }

  static now(): Timestamp {
    return new Timestamp(new Date());
  }
}

