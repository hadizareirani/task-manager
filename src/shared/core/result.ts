export class Result<T, E> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error?: E;
  private readonly value?: T;

  private constructor(isSuccess: boolean, value?: T, error?: E) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.value = value;
    this.error = error;
  }

  public static ok<T>(value: T): Result<T, never> {
    return new Result<T, never>(true, value);
  }

  public static fail<E>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error('Cannot get value from failed result');
    }
    return this.value!;
  }

  public getError(): E {
    if (!this.isFailure) {
      throw new Error('Cannot get error from successful result');
    }
    return this.error!;
  }
}
