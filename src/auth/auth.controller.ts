import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("authenticate")
@Controller("auth")
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
    const user = await this.authService.signup(dto);
    return { msg: "Succes", user };
    // return await this.authService.signin(body);
  }

  @ApiOperation({ summary: "Signin" })
  @Post("signin")
  async signin(@Body() dto: AuthDto) {
    const user = await this.authService.signin(dto);
    return { msg: "Ok", user };
    // return await this.authService.signin(body);
  }
}
