import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordValidationDto {
  @ApiProperty({
    description: 'Forgot password token',
    example: '1azbc23def45ghij67klmno89pqrs0tuv',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
