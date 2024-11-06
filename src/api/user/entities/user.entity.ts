import { ICampus } from '@api/campus/entities/campus.entity';
import { ICareer } from '@api/career/entities/career.entity';
import { IIntention } from '@api/intentions/entities/intention.entity';
import { IInterest } from '@api/interest/entities/interest.entity';
import { IPhoto } from '@api/photos/entities/photo.entity';

export interface IUser {
  user_id: string;
  email: string;
  name: string;
  lastname: string;
  description: string;
  birthdate: Date;
  contact_phone: string;
  photos: IPhoto[];
  career: ICareer;
  campus: ICampus;
  intention: IIntention;
  interests: IInterest[];
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
