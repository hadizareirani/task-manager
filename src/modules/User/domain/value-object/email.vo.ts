import { Result } from 'src/shared/core/result';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

export class Email {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  static create(raw: string): Result<Email, ErrorListEnum> {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
    if (!isValid) return Result.fail(ErrorListEnum.EmailIsNotValid);
    return Result.ok(new Email(raw));
  }

  static fromPersistence(email: string): Email {
    return new Email(email);
  }

  static campare(raw: string, validEmail: Email) {
    const value = this.create(raw);
    if(value.isFailure) return value;
    if(value.getValue().value !== validEmail.value) return Result.fail(ErrorListEnum.EmailIsNotValid);
    return value;
  }
}
