export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  identity: string;
  password: string;
  roleType: string;
}

export interface UpdatePasswordRequest {
  newPassword: string;
  confirmPassword: string;
}


export interface UpdateFCMTokenRequest {
  fcmToken: string;
}
