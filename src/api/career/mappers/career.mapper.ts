import { ICareer } from '../entities/career.entity';

export const CareerMapper = (data: any): ICareer => {
  return {
    career_id: parseInt(data.career_id),
    name: data.name,
    is_active: data.is_active,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};
