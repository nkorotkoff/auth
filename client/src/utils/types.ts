export type User = {
  id: number;
  login: string;
  email: string;
};

export type RegisterType = {
  login: string;
  email: string;
  password: string;
};

export type LoginType = {
  login: string;
  password: string;
};
