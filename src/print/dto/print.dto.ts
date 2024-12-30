import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class updateAllowedFileTypesDto {
  @ApiProperty({ example: ["pdf", "jpg", "jpeg", "png", "gif"], description: "Allowed file types" })
  @IsNotEmpty()
  @IsArray()
  allowedFileTypes: string[];
}
