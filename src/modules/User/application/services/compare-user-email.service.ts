import { Injectable } from "@nestjs/common";
import { OperationResponse } from "src/shared/core/operation-response";
import { ErrorListEnum } from "src/shared/enums/error-list.enum";
import { Email } from "../../domain";

@Injectable()
export class CompareUserEmailService {
  constructor() {}

  compare(
    email: string,
    validEmail: Email
  ): OperationResponse<Email, ErrorListEnum> {
    const emailOrError =  Email.compare(email, validEmail);
    if (emailOrError.isFailure)
      return OperationResponse.fail(emailOrError.getError());
    return OperationResponse.success(emailOrError.getValue());
  }
}