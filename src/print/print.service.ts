import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtPayLoad } from "src/common/model";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PrintService {
  constructor(private prisma: PrismaService) {}

  async checkPrinterExist(location: string) {
    const res = await this.prisma.printer.findFirst({ where: { building: location } });
    return res;
  }

  async getPrinters() {
    return this.prisma.printer.findMany();
  }

  async createRecord(user: JwtPayLoad, fileName: string, url: string, location: string, pages: number, copies: number) {
    return this.prisma.printingRecord.create({
      data: {
        fileName,
        url,
        user: {
          connect: {
            id: user.sub,
          },
        },
        printer: {
          connect: {
            building: location,
          },
        },
        pages: Number(pages),
        copies: Number(copies),
      },
    });
  }
}
