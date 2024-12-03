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
  @ApiParam({
    name: "location",
    description: "The location of the printer to fetch history for",
    required: true,
    type: String, // Specify the type of the parameter
  })
  @Get("history/:location")
  async getHistoryFromPrinter(@GetUser() user: JwtPayLoad, @Param() { location }: { location: string }) {
    const history = await this.adminService.getHistoryFromPrinter(location);
    return { message: "Success", history };
  }

  @ApiOperation({ summary: "Add printer" })
  @Post("addprinter")
  async addPrinter(@Body() { name, location, status }: addPrinterDto) {
    const res = await this.adminService.addPrinter({ name, location, status });
    return { message: "Create success", res };
  }

  @ApiOperation({ summary: "Update printer" })
  @Patch("updateprinter")
  async updatePrinter(@Body() { name, location, status }: updatePrinterDto) {
    const res = await this.adminService.updatePrinter({ name, location, status });
    return { message: "Update success", res };
  }
}
