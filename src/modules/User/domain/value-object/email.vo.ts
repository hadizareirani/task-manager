export class Email {
  private constructor(private readonly _value: string) {
    this.validate(_value);
  }

  private validate(email: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  get value(): string {
    return this._value;
  }

  static create(email: string) {
    return new Email(email);
  }
}
