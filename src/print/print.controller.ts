import { Body, Controller, Get, NotFoundException, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PrintService } from "./print.service";
import { ADD_ADMIN, GetUser } from "src/common/decorators";
import { JwtPayLoad } from "src/common/model";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { addPrinterDto } from "./dto/print.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Print")
@Controller("print")
export class PrintController {
  constructor(private printService: PrintService) {}

  @ApiOperation({ summary: "Add printer" })
  @Post("addprinter")
  @ADD_ADMIN()
  async addPrinter(@Body() { location }: addPrinterDto) {
    const res = await this.printService.addPrinter({ location });
    return { message: "Create success", res };
  }

  @ApiOperation({ summary: "Upload file" })
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: "./uploads", // Directory where files will be saved
        filename: (req, file, callback) => {
          // Generate a unique filename
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadFile(
    @GetUser() user: JwtPayLoad,
    @UploadedFile() file: Express.Multer.File,
    @Body("data") location: string,
  ) {
    if (!file) throw new NotFoundException("No file uploaded or file is not image");
    if (!location) throw new NotFoundException("Location is required");
    if (!(await this.printService.checkPrinterExist(location))) throw new NotFoundException("Printer not found");

    const record = await this.printService.createRecord(user, file.filename, location);

    return { message: "File uploaded successfully", file: file.filename, location };
  }

  @ApiOperation({ summary: "Get history" })
  @Get("history")
  async getHistory(@GetUser() user: JwtPayLoad) {
    const history = await this.printService.getHistory();
    return { message: "Success", history };
  }

  @ApiOperation({ summary: "Get history from printer" })
  @Get("history/:location")
  async getHistoryFromPrinter(@GetUser() user: JwtPayLoad, @Param() { location }: { location: string }) {
    const history = await this.printService.getHistoryFromPrinter(location);
    return { message: "Success", history };
  }
}
