export class OperationResponse<TValue, EValue> {
  private result?: TValue;
  private error?: EValue;
  private isSuccess: boolean;

  constructor(value?: TValue, error?: EValue) {
    this.result = value;
    this.error = error;
    this.isSuccess = !error;
  }
  static success<TValue>(value: TValue): OperationResponse<TValue, never> {
    return new OperationResponse<TValue, never>(value);
  }

  static fail<EValue>(error: EValue): OperationResponse<never, EValue> {
    return new OperationResponse<never, EValue>(undefined, error);
  }

  public getValue(): TValue {
    if (!this.isSuccess) {
      throw new Error('Cannot get value from failed result');
    }
    return this.result!;
  }

  public getError(): EValue {
    if (this.isSuccess) {
      throw new Error('Cannot get error from successful result');
    }
    return this.error!;
  }

  isSucceeded(): boolean {
    return this.isSuccess;
  }
}
