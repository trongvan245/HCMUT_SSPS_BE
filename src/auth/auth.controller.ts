import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("ping")
  ping() {
    return { msg: "Hello World" };
  }

  @Post("signup")
  async signup(@Body() dto: AuthDto) {
    const user = await this.authService.signup(dto);
    return { msg: "Succes", user };
    // return await this.authService.signin(body);
  }

  @Post("signin")
  async signin(@Body() dto: AuthDto) {
    const user = await this.authService.signin(dto);
    return { msg: "Ok", user };
    // return await this.authService.signin(body);
  }
}
