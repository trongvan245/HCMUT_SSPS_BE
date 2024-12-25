import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class PurchasePagesDto {
  @ApiProperty({ description: "Number of pages to purchase", example: 10 })
  @IsInt()
  @Min(1)
  pages: number;
}
