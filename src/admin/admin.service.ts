import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { addPrinterDto, updatePrinterDto } from "./dto";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async checkPrinterExist(id: string) {
    const res = await this.prisma.printer.findFirst({ where: { id } });
    return res;
  }

  async getHistory() {
    const history = await this.prisma.printingRecord.findMany();
    return history;
  }

  async getHistoryFromPrinter(id: string) {
    if (!(await this.checkPrinterExist(id))) throw new ForbiddenException("Printer not found");

    return this.prisma.printingRecord.findMany({
      where: {
        printer: {
          id,
        },
      },
      include: {
        printer: true,
        user: true,
      },
    });
  }

  async addPrinter({ name, building, campsite, status }: addPrinterDto) {
    return this.prisma.printer.create({
      data: { name, status, building, campsite },
    });
  }

  async updatePrinter({ id, name, building, campsite, status }: updatePrinterDto) {
    if (!(await this.checkPrinterExist(id))) throw new NotFoundException("Printer not found");
    return this.prisma.printer.update({
      where: { id },
      data: { name, status, building, campsite },
    });
  }
}
