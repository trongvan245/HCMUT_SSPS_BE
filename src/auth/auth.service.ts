import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}
  async signup(dto: AuthDto, role: UserRole) {
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
        role,
      },
    });

    return this.signToken(user.id, user.email, user.role);
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

    return this.signToken(user.id, user.email, user.role);
  }

  async signToken(userId: string, email: string, userRole: UserRole) {
    const payload = {
      sub: userId,
      email,
      role: userRole,
    };

    const secret = this.configService.get<string>("jwt_secret");
    return this.jwt.signAsync(payload, {
      expiresIn: "1d",
      secret: secret,
    });
  }
}
