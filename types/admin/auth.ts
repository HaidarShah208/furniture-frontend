export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: AdminProfile;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}
