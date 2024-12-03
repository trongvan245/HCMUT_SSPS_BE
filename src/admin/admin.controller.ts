import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ADD_ADMIN, GetUser } from "src/common/decorators";
import { JwtPayLoad } from "src/common/model";
import { AdminService } from "./admin.service";
import { addPrinterDto, updatePrinterDto } from "./dto";

@ApiBearerAuth()
@ApiTags("admin")
@Controller("admin")
@ADD_ADMIN()
export class AdminController {
  constructor(private adminService: AdminService) {}

  @ApiOperation({ summary: "ADMIN ONLY. Get history" })
  @Get("history")
  async getHistory(@GetUser() user: JwtPayLoad) {
    const history = await this.adminService.getHistory();
    return { message: "Success", history };
  }

  @ApiOperation({ summary: "ADMIN ONLY. Get history from printer" })
  @Get("history/:id")
  async getHistoryFromPrinter(@GetUser() user: JwtPayLoad, @Param("id") id: string) {
    console.log(id);
    const history = await this.adminService.getHistoryFromPrinter(id);
    return { message: "Success", history };
  }

  @ApiOperation({ summary: "Add printer" })
  @Post("addprinter")
  async addPrinter(@Body() { name, building, campsite, status }: addPrinterDto) {
    const res = await this.adminService.addPrinter({ name, building, campsite, status });
    return { message: "Create success", res };
  }

  @ApiOperation({ summary: "Update printer" })
  @Patch("updateprinter")
  async updatePrinter(@Body() { id, name, building, campsite, status }: updatePrinterDto) {
    const res = await this.adminService.updatePrinter({ id, name, building, campsite, status });
    return { message: "Update success", res };
  }
}
