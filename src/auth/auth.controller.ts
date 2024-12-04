import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators";

@ApiTags("authenticate")
@Controller("auth")
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Ping" })
  @Get("ping")
  ping() {
    return { msg: "Hello World" };
  }

  @ApiOperation({ summary: "Signup" })
  @Post("signup")
  async signup(@Body() dto: AuthDto) {
    const token = await this.authService.signup(dto, "STUDENT");
    return { msg: "Success", token };
    // return await this.authService.signin(body);
  }

  @ApiOperation({ summary: "Signup as Admin" })
  @Post("signupadmin")
  async signupAdmin(@Body() dto: AuthDto) {
    const token = await this.authService.signup(dto, "ADMIN");
    return { msg: "Success", token };
    // return await this.authService.signin(body);
  }

  @ApiOperation({ summary: "Signin" })
  @Post("signin")
  async signin(@Body() dto: AuthDto) {
    const token = await this.authService.signin(dto);
    return { msg: "Success", ...token };
    // return await this.authService.signin(body);
  }
}
