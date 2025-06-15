import { LoginDto } from "./login";
import { RegisterDto } from "./register";

export interface FirebaseAuthResponse {
    data?:RegisterDto|LoginDto;
    success: boolean;
    message: string | null;
  }