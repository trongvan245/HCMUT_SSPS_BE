import { Controller, Get, UseGuards } from "@nestjs/common";
import { ADD_ADMIN, GetUser, Public } from "src/common/decorators";
import { JwtGuard } from "src/common/guards";
import { JwtPayLoad } from "src/common/model";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  async getMe(@GetUser() user: JwtPayLoad) {
    const res = await this.userService.getMe(user);
    delete res.password;
    return { msg: "Get me", user: res };
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
