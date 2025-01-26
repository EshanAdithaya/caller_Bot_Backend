import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto, NewPasswordDto, ResetPasswordDto, SignUpDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Request password reset' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto.email);
  }

  @Post('new-password')
  @ApiOperation({ summary: 'Set new password' })
  setNewPassword(@Body() newPasswordDto: NewPasswordDto) {
    return this.authService.setNewPassword(
      newPasswordDto.token,
      newPasswordDto.newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }
}
