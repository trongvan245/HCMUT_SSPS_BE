import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (isUserExist) {
      throw new ForbiddenException("User already exist");
    }
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException("Invalid Credentials");
    }

    const pwMatches = user.password === dto.password;

    if (!pwMatches) {
      throw new ForbiddenException("Invalid Credentials");
    }

    delete user.password;

    return user;
  }
}
