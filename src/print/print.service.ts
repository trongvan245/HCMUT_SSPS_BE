import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtPayLoad } from "src/common/model";
import { PrismaService } from "src/prisma/prisma.service";
import { addPrinterDto } from "./dto/print.dto";

@Injectable()
export class PrintService {
  constructor(private prismaService: PrismaService) {}

  async checkPrinterExist(location: string) {
    return await this.prismaService.printer.findFirst({ where: { location } });
  }

  async addPrinter({ location }: addPrinterDto) {
    if (await this.checkPrinterExist(location)) throw new ForbiddenException("Printer already exist");
    return this.prismaService.printer.create({
      data: { location },
    });
  }

  async createRecord(user: JwtPayLoad, filename: string, location: string) {
    return this.prismaService.printingRecord.create({
      data: {
        url: filename,
        user: {
          connect: {
            id: user.sub,
          },
        },
        printer: {
          connect: {
            location,
          },
        },
      },
    });
  }

  async getHistory() {
    const history = await this.prismaService.printingRecord.findMany();
    return history;
  }
  async getHistoryFromPrinter(location: string) {
    if (!(await this.checkPrinterExist(location))) throw new ForbiddenException("Printer not found");

    return this.prismaService.printingRecord.findMany({
      where: {
        printer: {
          location,
        },
      },
    });
  }
}
