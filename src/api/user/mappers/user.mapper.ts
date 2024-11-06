import { IUser } from '../entities/user.entity';

export const UserMapper = (data: any): IUser => {
  return {
    user_id: data.user_id,
    email: data.user.email,
    name: data.name,
    lastname: data.lastname,
    description: data.description,
    birthdate: data.birthdate,
    contact_phone: data.contact_phone,
    career: { ...data.career, career_id: parseInt(data.career.career_id) },
    campus: { ...data.campus, campus_id: parseInt(data.campus.campus_id) },
    intention: {
      ...data.intention,
      intention_id: parseInt(data.intention.intention_id),
    },
    interests: data.user.interests.map((x: any) => ({
      ...x.interest,
      interest_id: parseInt(x.interest.interest_id),
    })),
    photos: data.user.photos,
    is_active: data.is_active,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};
