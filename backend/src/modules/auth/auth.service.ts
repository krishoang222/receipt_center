import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSigninDto, AuthSignupDto } from './dto';
import { PrismaClient, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';

type SignInResponse = {
  accessToken: string;
};

type SignUpResponse = Pick<User, 'email' | 'firstName' | 'id'>;

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

  async signIn(dto: AuthSigninDto): Promise<SignInResponse> {
    const { email, password } = dto;

    try {
      // find user
      const { hash, user } = await this.userService.findUser(email);
      // compare password
      const isPwMatched = await argon2.verify(hash, password);
      if (!isPwMatched) throw new UnauthorizedException('Wrong password');
      // sign JWT and return access token
      const payload = {
        sub: user.id,
        time: Date.now(),
        email,
        firstName: user.firstName,
      };
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async signUp(dto: AuthSignupDto): Promise<SignUpResponse> {
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

      return {
        email: user.email,
        firstName: user.firstName,
        id: user.id,
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
