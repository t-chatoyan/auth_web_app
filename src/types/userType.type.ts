export type User = {
  id: number | null,
  name: string,
  username: string
}

export type LoginResponse = {
  accessToken: string;
};

export type RegisterParams = {
  username: string;
  name: string;
  password: string;
};

export type LoginParams = {
  username: string;
  password: string;
};