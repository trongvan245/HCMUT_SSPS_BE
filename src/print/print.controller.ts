import { Body, Controller, Get, NotFoundException, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PrintService } from "./print.service";
import { ADD_ADMIN, GetUser } from "src/common/decorators";
import { JwtPayLoad } from "src/common/model";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { updateAllowedFileTypesDto } from "./dto/print.dto";

@ApiBearerAuth()
@ApiTags("print")
@Controller("print")
export class PrintController {
  constructor(private printService: PrintService) {}

  @ApiOperation({ summary: "Get all printers" })
  @Get("getprinters")
  async getPrinters() {
    const printers = await this.printService.getPrinters();
    return { message: "Success", printers };
  }

  @ApiOperation({ summary: "Upload file" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "File upload",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary", // Indicates a file input
        },
        id: {
          type: "string", // Example of additional form data
        },
        copies: {
          type: "number", // Example of additional form data
        },
        pages: {
          type: "number", // Example of additional form data
        },
      },
    },
  })
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
      fileFilter: (req, file, callback) => {
        // if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
        //   return callback(null, false);
        // }
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
    @Body("id") id: string,
    @Body("copies") copies: number,
    @Body("pages") pages: number,
  ) {
    const fileExtension = extname(file.originalname).toLowerCase().substring(1);
    const allowfiletype = await this.printService.getAllowedFileTypes();
    if (!allowfiletype.includes(fileExtension)) throw new NotFoundException("File type not allowed");

    if (!file) throw new NotFoundException("No file uploaded or file is not image");
    if (!id) throw new NotFoundException("ID is required");
    if (!(await this.printService.checkPrinterExist(id))) throw new NotFoundException("Printer not found");
    const record = await this.printService.createRecord(
      user,
      file.originalname,
      file.filename,
      id,
      file.size,
      pages as number,
      copies as number,
    );

    return { message: "File uploaded successfully", record };
  }

  @Get("types")
  async getAllowedFileTypes() {
    const types = await this.printService.getAllowedFileTypes();
    return { types };
  }

  @Post("updatetypes")
  async updateAllowedFileTypes(@Body() { allowedFileTypes }: updateAllowedFileTypesDto) {
    await this.printService.updateAllowedFileTypes(allowedFileTypes);
    return { message: "Allowed file types updated successfully" };
  }
}
