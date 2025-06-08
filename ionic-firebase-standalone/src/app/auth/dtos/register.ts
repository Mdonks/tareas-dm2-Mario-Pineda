export interface RegisterDto {
    uid: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: string;
  }