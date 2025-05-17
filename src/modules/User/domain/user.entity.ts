import { Email } from 'src/shared/domain/value-objects/email.vo';

export class User {
  private readonly _id: string;
  private _username: string;
  private _email: Email;
  private _name: string;
  private _password: string;
  private _isDeleted: boolean;
  private _deletedAt: Date | null;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    username: string,
    email: Email,
    name: string,
    password: string,
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

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email.value;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
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

  private touch(): void {
    this._updatedAt = new Date();
  }
}
