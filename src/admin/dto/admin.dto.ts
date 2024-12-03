import { ApiProperty } from "@nestjs/swagger";
import { PrinterStatus } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class addPrinterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Printer tai nha H1" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "H1/Campsite 2" })
  location: string;

  @IsNotEmpty()
  @ApiProperty({ example: "AVAILABLE" })
  status: PrinterStatus;
}

export class updatePrinterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Chill Guy" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "H1/Campsite 2" })
  location: string;

  @IsNotEmpty()
  @ApiProperty({ example: "AVAILABLE" })
  status: PrinterStatus;
}
