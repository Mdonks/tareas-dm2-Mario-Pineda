export interface RegisterDto {
    uid: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    dni: string;
    phone?: string;
    role: string;
    bDay?: string;
  }