import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string;
}

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  email: string;
}

export class NewPasswordDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  newPassword: string;
}
