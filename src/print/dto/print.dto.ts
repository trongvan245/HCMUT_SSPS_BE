import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class addPrinterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "H1" })
  location: string;
}
