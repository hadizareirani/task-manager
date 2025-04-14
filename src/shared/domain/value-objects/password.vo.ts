import * as bcrypt from 'bcrypt';

export class Password {
  constructor(
    private readonly password: string,
    private readonly username: string,
  ) {}
  async hashPassword() {
    const saltOrRounds = 10;
    return await bcrypt.hash(`${this.password}-${this.username}`, saltOrRounds);
  }

  static async isValid(password: string, username: string, hash: string) {
    return await bcrypt.compare(`${password}-${username}`, hash);
  }
}
