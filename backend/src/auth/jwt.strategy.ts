import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // Adjust the import path as necessary

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() { // Inject UsersService if needed for fetching user details
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'yourSecretKey', // It's safer to use environment variables for secrets
    });
  }

  async validate(payload: any) {
    // Optionally, add more logic here, e.g., loading a user profile
    return { userId: payload.sub, username: payload.username };
  }
}
