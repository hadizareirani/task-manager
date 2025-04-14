import { ErrorListEnum } from '../enums/error-list.enum';

export class OperationResponse<TValue> {
  private result?: TValue;
  private error?: ErrorListEnum | null;
  private isSuccess: boolean;

  constructor(value: TValue, error?: ErrorListEnum) {
    this.result = value;
    this.error = error || null;
    this.isSuccess = !error;
  }
  static success<T>(value: T): OperationResponse<T> {
    return new OperationResponse(value);
  }

  static fail<T>(error: ErrorListEnum): OperationResponse<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new OperationResponse<T>(null as any, error);
  }

  getValue(): TValue | undefined {
    return this.result;
  }

  getError(): ErrorListEnum | null | undefined {
    return this.error;
  }

  isSucceeded(): boolean {
    return this.isSuccess;
  }
}
