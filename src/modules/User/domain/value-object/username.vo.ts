import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { OperationResponse } from 'src/shared/core/operation-response';

export class Username {
  constructor(private readonly _value: string) {}

  get value() {
    return this._value;
  }

  static create(username: string) {
    if (!username || username === '' || username.length < 5) {
      return OperationResponse.fail(ErrorListEnum.UsernameIsWrong);
    }
    return OperationResponse.success(new Username(username));
  }
}
