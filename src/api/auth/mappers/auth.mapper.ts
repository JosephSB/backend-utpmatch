import { IAuth } from '../entities/auth.entity';

export const AuthMapper = (data: any): IAuth => {
  return {
    user_id: data.user_id,
    email: data.email,
    password: data.password,
    terms_conditions: data.terms_conditions,
    is_active: data.is_active,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};
