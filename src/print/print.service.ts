import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtPayLoad } from "src/common/model";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PrintService {
  constructor(private prisma: PrismaService) {}

  async checkPrinterExist(id: string) {
    const res = await this.prisma.printer.findFirst({ where: { id } });
    return res;
  }

  async getPrinters() {
    return this.prisma.printer.findMany();
  }

  async updateUserTotalPages(userId: string) {
    //very inefficient
    const result = await this.prisma.printingRecord.aggregate({
      _sum: {
        pages: true,
      },
      where: {
        userId: userId,
      },
    });

    const user = await this.prisma.user.update({ where: { id: userId }, data: { totalPages: result._sum.pages || 0 } });
    return user;
  }

  async updatePrinterTotalPages(printerId: string) {
    const result = await this.prisma.printingRecord.aggregate({
      _sum: {
        pages: true,
      },
      where: {
        printerId: printerId,
      },
    });

    const printer = await this.prisma.printer.update({
      where: { id: printerId },
      data: { totalPages: result._sum.pages || 0 },
    });
    return printer;
  }

  async createRecord(
    user: JwtPayLoad,
    fileName: string,
    url: string,
    id: string,
    size: number,
    pages: number,
    copies: number,
  ) {
    const printer = await this.prisma.printer.findFirst({ where: { id } });
    if (printer.status === "NOT_AVAILABLE") throw new ForbiddenException("Printer is not available");

    const res = await this.prisma.printingRecord.create({
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
            id,
          },
        },
        filesize: Number(size),
        pages: Number(pages),
        copies: Number(copies),
      },
    });

    const updatedUser = await this.updateUserTotalPages(user.sub);
    const updatedPrinter = await this.updatePrinterTotalPages(id);
    return res;
  }
}
