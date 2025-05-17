export class Username {
  constructor(private readonly _value: string) {}

  get value() {
    return this._value;
  }

  static create(username: string) {
    if (!username || username === '' || username.length < 5) return false;
    return new Username(username);
  }
}
