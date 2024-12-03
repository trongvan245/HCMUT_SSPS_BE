import { Injectable } from "@nestjs/common";
import { JwtPayLoad } from "src/common/model";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getHistory(user: JwtPayLoad) {
    return this.prisma.printingRecord.findMany({
      where: {
        user: {
          id: user.sub,
        },
      },
    });
  }
}
