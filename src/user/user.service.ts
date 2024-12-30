import { Injectable } from "@nestjs/common";
import { JwtPayLoad } from "src/common/model";
import { PrismaService } from "src/prisma/prisma.service";
import { PurchasePagesDto } from "./dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async configPages(pages: number) {
    const users = await this.prisma.user.findMany();

    // Update each user with the new pages configuration
    const updatePromises = users.map(async (user) => {
      const newRemainPages = pages - user.maxPages + user.remainPages;
      const updateUser = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          remainPages: newRemainPages,
          maxPages: pages,
        },
      });
      return { user: updateUser.name, remainPages: updateUser.remainPages, maxPages: updateUser.maxPages };
    });

    const updateUsers = await Promise.all(updatePromises);
    return updateUsers;
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

  async getMe(user: JwtPayLoad) {
    await this.updateUserTotalPages(user.sub);
    const records = await this.prisma.printingRecord.findMany({
      where: {
        userId: user.sub,
      },
    });

    const getuser = await this.prisma.user.findUnique({
      where: {
        id: user.sub,
      },
    });
    const numOfDocuments = records.length;
    return {
      ...getuser,
      numOfDocuments,
    };
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

  async getAllUsers() {
    const users = await this.prisma.user.findMany();

    const usersWithTotalRecords = await Promise.all(
      users.map(async (user) => {
        const numOfDocuments = await this.prisma.printingRecord.count({
          where: { userId: user.id },
        });
        return {
          ...user,
          numOfDocuments,
        };
      }),
    );

    return usersWithTotalRecords;
  }
}
