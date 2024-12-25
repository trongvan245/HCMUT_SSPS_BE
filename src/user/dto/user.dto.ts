import { IsInt, Min } from "class-validator";

export class PurchasePagesDto {
    @IsInt()
    @Min(1)
    pages: number;
}