import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { Result } from 'src/shared/core/result';

export class Username {
  private constructor(private readonly _value: string) {}

  get value() {
    return this._value;
  }

  static create(username: string): Result<Username, ErrorListEnum> {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || trimmedUsername.length === 0 || trimmedUsername.length < 5) {
      return Result.fail(ErrorListEnum.UsernameIsWrong);
    }
    return Result.ok(new Username(trimmedUsername));
  }
  
}
