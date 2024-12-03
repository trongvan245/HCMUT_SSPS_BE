import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtPayLoad } from "src/common/model";
import { PrismaService } from "src/prisma/prisma.service";
import { addPrinterDto } from "./dto/print.dto";

@Injectable()
export class PrintService {
  constructor(private prisma: PrismaService) {}

  async checkPrinterExist(location: string) {
    const res = await this.prisma.printer.findFirst({ where: { building: location } });
    return res;
  }

  async addPrinter({ location }: addPrinterDto) {
    if (await this.checkPrinterExist(location)) throw new ForbiddenException("Printer already exist");
    return this.prisma.printer.create({
      data: { building: location },
    });
  }

  async getPrinters() {
    return this.prisma.printer.findMany();
  }

  async createRecord(user: JwtPayLoad, filename: string, location: string) {
    return this.prisma.printingRecord.create({
      data: {
        url: filename,
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
      },
    });
  }

  async getHistory() {
    const history = await this.prisma.printingRecord.findMany();
    return history;
  }
  async getHistoryFromPrinter(location: string) {
    if (!(await this.checkPrinterExist(location))) throw new ForbiddenException("Printer not found");

    return this.prisma.printingRecord.findMany({
      where: {
        printer: {
          building: "H1",
        },
      },
      include: {
        printer: true,
        user: true,
      },
    });
  }
}
