import { Email, Name, Password, Username } from "./value-object";


export class User {
  private readonly _id: string;
  private _username: Username;
  private _email: Email;
  private _name: Name;
  private _password: Password;
  private _isDeleted: boolean;
  private _deletedAt: Date | null;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(
    id: string,
    username: Username,
    email: Email,
    name: Name,
    password: Password,
    isDeleted = false,
    deletedAt: Date | null = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  ) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._name = name;
    this._password = password;
    this._isDeleted = isDeleted;
    this._deletedAt = deletedAt;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  static create(props: {
    id: string;
    username: Username;
    email: Email;
    name: Name;
    password: Password;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
    deletedAt?: Date | null;
  }): User {
    return new User(
      props.id,
      props.username,
      props.email,
      props.name,
      props.password,
      props.isDeleted ?? false,
      props.deletedAt ?? null,
      props.createdAt ?? new Date(),
      props.updatedAt ?? new Date(),
    );
  }

  get id(): string {
    return this._id;
  }

  get username(): Username {
    return this._username;
  }

  get email(): Email {
    return this._email;
  }

  get name(): Name {
    return this._name;
  }

  get password(): Password {
    return this._password;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateName(newName: Name): void {
    this._name = newName;
    this.touch();
  }

  changePassword(newPassword: Password): void {
    this._password = newPassword;
    this.touch();
  }
  
  changeEmail(newEmail: Email): void {
    this._email = newEmail;
    this.touch();
  }

  private touch(): void {
    this._updatedAt = new Date();
  }
}
