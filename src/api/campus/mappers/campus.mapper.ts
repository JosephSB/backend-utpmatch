import { ICampus } from '../entities/campus.entity';

export const CampusMapper = (data: any): ICampus => {
  return {
    campus_id: parseInt(data.campus_id),
    name: data.name,
    is_active: data.is_active,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};
