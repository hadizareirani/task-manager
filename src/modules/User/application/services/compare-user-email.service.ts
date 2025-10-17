import { Injectable } from "@nestjs/common";
import { OperationResponse } from "src/shared/core/operation-response";
import { ErrorListEnum } from "src/shared/enums/error-list.enum";
import { Email } from "../../domain";

@Injectable()
export class CompareUserEmailService {
  constructor(
    
  ) {}

  async compare(
    email: string,
    validEmail: Email
  ): Promise<OperationResponse<Email, ErrorListEnum>> {
    const emailOrError =  Email.campare(email, validEmail);
    if (emailOrError.isFailure)
      return OperationResponse.fail(emailOrError.getError());
    return OperationResponse.success(emailOrError.getValue());
  }
}