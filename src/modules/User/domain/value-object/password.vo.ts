import * as bcrypt from 'bcrypt';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { OperationResponse } from 'src/shared/core/operation-response';

export class Password {
  constructor(private readonly _value: string) {}

  get value() {
    return this._value;
  }

  // static async isValid(password: string, username: string, hash: string) {
  //   return await bcrypt.compare(`${password}-${username}`, hash);
  // }

  static async create(password: string, username: string) {
    if (!password)
      return OperationResponse.fail(ErrorListEnum.PasswordIsRequired);
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/~`\\|]).{8,}$/;

    if (!strongPasswordRegex.test(password))
      return OperationResponse.fail(ErrorListEnum.PasswordIsWeak);

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      `${password}-${username}-${process.env.PASSWORD_HASH}`,
      saltOrRounds,
    );
    return OperationResponse.success(new Password(hashPassword));
  }
}
