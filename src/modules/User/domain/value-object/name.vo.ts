import { Result } from 'src/shared/core/result';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

export class Name {
  private constructor(private readonly _value: string) {}
  get value() {
    return this._value;
  }

  static create(raw: string): Result<Name, ErrorListEnum> {
    if (!raw) return Result.fail(ErrorListEnum.NameIsRequired);
    const trimName = raw.trim();
    if (trimName.length === 0 || trimName.length < 3 || trimName.length > 64)
      return Result.fail(ErrorListEnum.NameIsInvalid);
    return Result.ok(new Name(trimName));
  }

  static fromPersistence(name: string): Name {
    return new Name(name);
  }
}
