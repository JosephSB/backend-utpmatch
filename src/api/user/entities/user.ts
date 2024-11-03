export interface IUser {
  user_id: string;
  email: string;
  password: string;
  terms_conditions: boolean;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
