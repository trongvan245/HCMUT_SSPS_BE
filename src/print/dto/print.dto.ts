import { IsNotEmpty, IsString } from "class-validator";

export class addPrinterDto {
  @IsString()
  @IsNotEmpty()
  location: string;
}
