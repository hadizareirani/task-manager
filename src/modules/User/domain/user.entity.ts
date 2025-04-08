export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public name: string,
    private _password: string,
    public isDeleted: boolean = false,
    public deletedAt?: Date,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  get password() {
    return this._password;
  }
}
