import * as bcrypt from 'bcrypt';

export class Password {
  constructor(private readonly _value: string) {}

  get value() {
    return this._value;
  }

  // static async isValid(password: string, username: string, hash: string) {
  //   return await bcrypt.compare(`${password}-${username}`, hash);
  // }

  static async create(password: string, username: string) {
    if (!password || !username) return false;
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      `${password}-${username}-${process.env.PASSWORD_HASH}`,
      saltOrRounds,
    );
    return new Password(hashPassword);
  }
}
