import { Controller, Get, UseGuards } from "@nestjs/common";
import { ADD_ADMIN, GetUser } from "src/common/decorators";
import { JwtGuard } from "src/common/guards";
import { JwtPayLoad } from "src/common/model";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  getMe(@GetUser() user: JwtPayLoad) {
    return { msg: "Get me", user };
  }

  @Get("student")
  getStudent() {
    return { msg: "Get student" };
  }

  @Get("admin")
  @ADD_ADMIN()
  getAdmin() {
    return { msg: "Get admin" };
  }

  @Get("history")
  async getHistory(@GetUser() user: JwtPayLoad) {
    const history = await this.userService.getHistory(user);
    return { msg: "Get history", history };
  }
}
