import { Controller } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("student")
export class StudentController {}
