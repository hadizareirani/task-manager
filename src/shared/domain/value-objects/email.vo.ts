export class Email {
  private constructor(private readonly value: string) {}

  static isValid(email: string): boolean {
    return !/^\S+@\S+\.\S+$/.test(email);
  }

  getValue(): string {
    return this.value;
  }
}
