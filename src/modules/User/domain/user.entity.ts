export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public name: string,
    public password: string,
    public isDeleted: boolean = false,
    public deletedAt?: Date | null,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
