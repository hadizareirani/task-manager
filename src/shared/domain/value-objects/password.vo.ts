import * as bcrypt from 'bcrypt';
import { Username } from 'src/modules/User/domain/value-object/username.vo';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { OperationResponse } from 'src/shared/responses/operation-response';

export class Password {
  constructor(private readonly _value: string) {}

  get value() {
    return this._value;
  }

  // static async isValid(password: string, username: string, hash: string) {
  //   return await bcrypt.compare(`${password}-${username}`, hash);
  // }

  static async create(password: string, username: Username) {
    if (!password)
      return OperationResponse.fail(ErrorListEnum.PasswordIsRequired);
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/~`\\|]).{8,}$/;

    if (!strongPasswordRegex.test(password))
      return OperationResponse.fail(ErrorListEnum.PasswordIsWeak);

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      `${password}-${username.value}-${process.env.PASSWORD_HASH}`,
      saltOrRounds,
    );
    return new Password(hashPassword);
  }
}
