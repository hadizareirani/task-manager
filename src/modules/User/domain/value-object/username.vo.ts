import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { Result } from 'src/shared/core/result';

export class Username {
  private constructor(private readonly _value: string) {
    this.validate(_value);
  }

  private validate(username: string) {
    if (!username || username === '' || username.length < 5) {
      return Result.fail(ErrorListEnum.UsernameIsWrong);
    }
    return username;
  }

  get value() {
    return this._value;
  }

  static create(username: string) {
    return Result.ok(new Username(username));
  }
}
