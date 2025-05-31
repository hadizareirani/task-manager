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
}
