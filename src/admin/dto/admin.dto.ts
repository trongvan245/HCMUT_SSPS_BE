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
  @ApiProperty({ example: "H1" })
  building: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Campsite 2" })
  campsite: string;

  @IsNotEmpty()
  @ApiProperty({ example: "AVAILABLE" })
  status: PrinterStatus;
}

export class updatePrinterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "d521b999-67d0-4444-8d5f-7111d94b713b" })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Chill Guy" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "H1" })
  building: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Campsite 2" })
  campsite: string;

  @IsNotEmpty()
  @ApiProperty({ example: "AVAILABLE" })
  status: PrinterStatus;
}
