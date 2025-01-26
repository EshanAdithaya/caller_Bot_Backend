import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  private transporter;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async signup(signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const user = new this.userModel({
      ...signUpDto,
      password: hashedPassword,
    });
    await user.save();
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async resetPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    await this.transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">here</a> to reset your password.`,
    });

    return { message: 'Reset link sent to email' };
  }

  async setNewPassword(token: string, newPassword: string) {
    const user = await this.userModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    return { message: 'Password updated successfully' };
  }

  async getProfile(userId: string) {
    return this.userModel.findById(userId).select('-password');
  }

  private generateToken(user: User) {
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}