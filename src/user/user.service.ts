import { Injectable } from "@nestjs/common";
import { JwtPayLoad } from "src/common/model";
import { PrismaService } from "src/prisma/prisma.service";
import { PurchasePagesDto } from "./dto";

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

  async purchasePrintPages(user: JwtPayLoad, data: PurchasePagesDto) {
    const userRecord = await this.prisma.user.findUnique({
      where: {
        id: user.sub,
      },
    });

    // if (userRecord. < data.pages) {
    //   throw new Error("Insufficient balance");
    // }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.sub,
      },
      data: {
        remainPages: {
          increment: data.pages,
        },
      },
    });

    delete updatedUser.password;
    return updatedUser;
  }
}
