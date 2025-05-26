import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { OperationResponse } from 'src/shared/core/operation-response';
interface JwtPayload {
  id: string;
}
interface RequestWithUser extends Request {
  user?: JwtPayload;
}
@Injectable()
export class ResponseModelInterceptor<T>
  implements NestInterceptor<OperationResponse<T>, OperationResponse<T>>
{
  constructor(private readonly jwtService: JwtService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<OperationResponse<T>>> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const res = context.switchToHttp().getResponse<Response>();
    const userToken = req?.headers?.authorization?.split(' ')[1];
    if (userToken) {
      req.user = await this.jwtService.decode(userToken);
    }
    return next.handle().pipe(
      map((result: OperationResponse<T>) => {
        if (req.method === 'POST') {
          if (res.statusCode === 201) {
            res.status(HttpStatus.OK);
          }
        }
        return result;
      }),
    );
  }
}
