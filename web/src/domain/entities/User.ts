export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: 'administrator' | 'client';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  role?: 'client';
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}
