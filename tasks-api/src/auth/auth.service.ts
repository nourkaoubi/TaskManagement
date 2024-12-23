// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email or password is missing');
    }

    console.log('Registering user with email:', email);
    console.log('Password before hashing:', password);

    const hashedPassword = await bcrypt.hash(password, 10); // Check if this line throws the error
    console.log('hashed', hashedPassword);
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }
}
