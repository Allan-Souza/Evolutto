export interface UserAccount {
  id: string;
  username: string;
  password?: string; // Optional because we don't always need to expose it
  role: string;
  avatar: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: UserAccount;
  message?: string;
}
