import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { OperationResponse } from 'src/shared/responses/operation-response';

export class Email {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }
  static create(email: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return OperationResponse.fail(ErrorListEnum.EmailIsNotValid);
    }
    return OperationResponse.success(new Email(email));
  }
}
