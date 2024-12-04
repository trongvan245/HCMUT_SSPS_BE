import { Injectable } from "@nestjs/common";
import { JwtPayLoad } from "src/common/model";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(user: JwtPayLoad) {
    return this.prisma.user.findUnique({
      where: {
        id: user.sub,
      },
    });
  }

  async getHistory(user: JwtPayLoad) {
    const records = await this.prisma.printingRecord.findMany({
      where: {
        user: {
          id: user.sub,
        },
      },
      select: {
        id: true,
        fileName: true,
        url: true,
        pages: true,
        copies: true,
        printer: {
          select: {
            name: true,
          },
        },
        createAt: true,
        filesize: true,
      },
    });

    return records.map((record) => ({
      ...record,
      printer: record.printer.name,
    }));
  }
}
