export class Email {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static create(email: string): Email {
    return new Email(email);
  }
}
