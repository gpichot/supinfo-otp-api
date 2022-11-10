import { Route, Post, Body, Controller } from "tsoa";

function generateOTP(n = 6) {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < n; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const otpRegister = new Map<string, string>();

@Route("/otp")
export class OTPController extends Controller {
  @Post("/login")
  public async postOTP(@Body() body: { email: string }) {
    const otp = generateOTP();
    otpRegister.set(body.email, otp);
    return {
      message: otp,
      status: 200,
    };
  }

  @Post("/code")
  public async postCode(@Body() body: { email: string; code: string }) {
    const otp = otpRegister.get(body.email);
    if (!otp || otp !== body.code) {
      this.setStatus(401);
      return {
        message: "not allowed",
        status: 200,
      };
    }
    return {
      message: "granted",
      status: 200,
    };
  }
}

export default OTPController;
