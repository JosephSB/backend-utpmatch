export interface IAuth {
  user_id: string;
  email: string;
  password: string;
  terms_conditions: boolean;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPayloadToken {
  user_id: string;
  email: string;
}
