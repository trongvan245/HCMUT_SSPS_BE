import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ADD_ADMIN, GetUser, Public } from "src/common/decorators";
import { JwtGuard } from "src/common/guards";
import { JwtPayLoad } from "src/common/model";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PurchasePagesDto, UpdatePagesDto } from "./dto";

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

  @ApiOperation({ summary: "Purchase print pages" })
  @Post("purchase-pages")
  async purchasePrintPages(@GetUser() user: JwtPayLoad, @Body() data: PurchasePagesDto) {
    const res = await this.userService.purchasePrintPages(user, data);
    return { msg: "Purchase pages", res };
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

  @ADD_ADMIN()
  @Post("admin/configpages")
  async configPages(@Body() { pages }: UpdatePagesDto) {
    const res = await this.userService.configPages(pages);
    return { msg: "Config pages", res };
  }

  @Get("history")
  async getHistory(@GetUser() user: JwtPayLoad) {
    const history = await this.userService.getHistory(user);
    return { msg: "Get history", history };
  }

  @Get("all")
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    const filterUser = users.map((user) => {
      delete user.password;
      return user;
    });
    return { msg: "Get all users", filterUser };
  }
}
