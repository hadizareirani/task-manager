import { Result } from 'src/shared/core/result';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

export class Email {
  private constructor(private readonly _value: string) {
    this.validate(_value);
  }

  private validate(email: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Result.fail(ErrorListEnum.EmailIsNotValid);
    }
    return email;
  }

  get value(): string {
    return this._value;
  }

  static create(email: string) {
    return Result.ok(new Email(email));
  }
}
