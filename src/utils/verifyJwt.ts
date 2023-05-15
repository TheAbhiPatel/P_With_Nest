import { JwtService } from '@nestjs/jwt';

export const verifyJwt = async (jwtService: JwtService, token: string) => {
  try {
    const decoded = await jwtService.verifyAsync(token);

    return decoded;
  } catch (error) {
    console.log('................--------->>', error);

    return null;
  }
};
