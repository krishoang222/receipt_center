import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSigninDto, AuthSignupDto } from './dto';
import { PrismaClient, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient({
  omit: {
    user: {
      hash: true,
    },
  },
});

@Injectable({})
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(dto: AuthSigninDto): Promise<{ accessToken: string }> {
    const { email, password } = dto;

    try {
      // find user
      const { hash, user } = await this.userService.findUser(email);
      // compare password
      const isPwMatched = await argon2.verify(hash, password);
      if (!isPwMatched) throw new UnauthorizedException('Wrong password');
      // sign JWT and return access token
      const payload = { sub: user.id, time: Date.now(), email };
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } catch (error) {
      throw error;
    }
  }
  async signUp(dto: AuthSignupDto): Promise<Omit<User, 'hash'>> {
    const { email, password, firstName } = dto;

    try {
      const hash = await argon2.hash(password);
      const user = await prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          hash,
        },
      });

      return user;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
