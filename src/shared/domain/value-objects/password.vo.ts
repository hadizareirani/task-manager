import * as bcrypt from 'bcrypt';

export class Password {
  constructor(private readonly password: string) {}
  async hashPassword() {
    const saltOrRounds = 10;
    return await bcrypt.hash(
      `${this.password}-${process.env.PASSWORD_HASH}`,
      saltOrRounds,
    );
  }

  static async isValid(password: string, username: string, hash: string) {
    return await bcrypt.compare(`${password}-${username}`, hash);
  }
}
