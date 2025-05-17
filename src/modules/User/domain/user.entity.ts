import { Email } from 'src/shared/domain/value-objects/email.vo';
import { Password } from 'src/shared/domain/value-objects/password.vo';
import { Username } from './value-object/username.vo';

export class User {
  private readonly _id: string;
  private _username: Username;
  private _email: Email;
  private _name: string;
  private _password: Password;
  private _isDeleted: boolean;
  private _deletedAt: Date | null;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    username: Username,
    email: Email,
    name: string,
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

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username.value;
  }

  get email(): string {
    return this._email.value;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password.value;
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
