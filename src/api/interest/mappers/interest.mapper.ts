import { IInterest } from '../entities/interest.entity';

export const InterestMapper = (data: any): IInterest => {
  return {
    interest_id: parseInt(data.interest_id),
    name: data.name,
    is_active: data.is_active,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};
