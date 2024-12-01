import { IUser } from '@api/user/entities/user.entity';

export interface IMatch {
  match_id: string;
  transmitter: Omit<IUser, 'intention' | 'interests'>;
  receiver: Omit<IUser, 'intention' | 'interests'>;
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

export interface IMatchRanking {
  user_id: string;
  name: string;
  lastname: string;
  photo_url: string;
  total_matches: number;
}
