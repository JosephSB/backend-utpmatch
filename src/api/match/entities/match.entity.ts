import { IUser } from '@api/user/entities/user.entity';

export interface IMatch {
  match_id: string;
  transmitter: Omit<
    IUser,
    'career' | 'campus' | 'intention' | 'interests' | 'photos'
  >;
  receiver: Omit<
    IUser,
    'career' | 'campus' | 'intention' | 'interests' | 'photos'
  >;
}

export interface INewMatch {
  match_id: string;
  transmitter_id: string;
  receiver_id: string;
  status: {
    status_id: number;
    name: string;
  };
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
