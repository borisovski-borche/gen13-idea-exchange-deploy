export interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface RegisterReq {
  username: string;
  email: string;
  password: string;
}

export interface RefreshTokenRes {
  token: string;
  refreshToken: string;
}
