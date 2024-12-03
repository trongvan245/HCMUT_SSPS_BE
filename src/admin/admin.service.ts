import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { addPrinterDto } from "./dto";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async checkPrinterExist(location: string) {
    const res = await this.prisma.printer.findFirst({ where: { building: location } });
    return res;
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
          building: location,
        },
      },
      include: {
        printer: true,
        user: true,
      },
    });
  }

  async addPrinter({ name, location, status }: addPrinterDto) {
    if (await this.checkPrinterExist(location)) throw new NotFoundException("Printer already exist");
    return this.prisma.printer.create({
      data: { name, status, building: location },
    });
  }

  async updatePrinter({ name, location, status }: addPrinterDto) {
    if (!(await this.checkPrinterExist(location))) throw new NotFoundException("Printer not found");
    return this.prisma.printer.update({
      where: { building: location },
      data: { name, status },
    });
  }
}
