import { Email, Username } from '../value-object';

export class ResetPassword {
  private readonly _id: string;
  private _userId: string;
  private _resetToken: string;
  private _email: Email;
  private _username: Username;
  private _expiresAt: Date;
  private _isUsed: boolean;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(
    id: string,
    userId: string,
    resetToken: string,
    email: Email,
    username: Username,
    expiresAt: Date,
    isUsed = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  ) {
    this._id = id;
    this._userId = userId;
    this._resetToken = resetToken;
    this._email = email;
    this._username = username;
    this._expiresAt = expiresAt;
    this._isUsed = isUsed;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  static create(props: {
    id: string;
    userId: string;
    resetToken: string;
    email: Email;
    username: Username;
    expiresAt: Date;
    isUsed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): ResetPassword {
    return new ResetPassword(
      props.id,
      props.userId,
      props.resetToken,
      props.email,
      props.username,
      props.expiresAt,
      props.isUsed ?? false,
      props.createdAt ?? new Date(),
      props.updatedAt ?? new Date(),
    );
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get resetToken(): string {
    return this._resetToken;
  }

  get email(): Email {
    return this._email;
  }

  get username(): Username {
    return this._username;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  get isUsed(): boolean {
    return this._isUsed;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  markAsUsed(): void {
    this._isUsed = true;
    this.touch();
  }

  private touch(): void {
    this._updatedAt = new Date();
  }
}
