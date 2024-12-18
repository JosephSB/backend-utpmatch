import { IUser } from '@api/user/entities/user.entity';
import { IMatch, IMatchRanking, INewMatch } from '../entities/match.entity';

export const NewMatchMapper = (data: any): INewMatch => {
  return {
    match_id: data.match_id,
    transmitter_id: data.transmitter_id,
    receiver_id: data.receiver_id,
    status: {
      status_id: parseInt(data.matchStatus.match_status_id),
      name: data.matchStatus.name,
    },
    is_active: data.is_active,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};

export const MatchMapper = (data: any): IMatch => {
  return {
    match_id: data.match_id,
    transmitter: {
      user_id: data.transmitter.user_id,
      email: data.transmitter.email,
      name: data.transmitter.userDetail[0].name,
      lastname: data.transmitter.userDetail[0].lastname,
      description: data.transmitter.userDetail[0].description,
      birthdate: data.transmitter.userDetail[0].birthdate,
      contact_phone: data.transmitter.userDetail[0].contact_phone,
      career: {
        ...data.transmitter.userDetail[0].career,
        career_id: parseInt(data.transmitter.userDetail[0].career.career_id),
      },
      campus: {
        ...data.transmitter.userDetail[0].campus,
        campus_id: parseInt(data.transmitter.userDetail[0].campus.campus_id),
      },
      photos: data.transmitter.photos,
      is_active: data.transmitter.is_active,
      createdAt: new Date(data.transmitter.userDetail[0].createdAt),
      updatedAt: new Date(data.transmitter.userDetail[0].updatedAt),
    },
    receiver: {
      user_id: data.receiver.user_id,
      email: data.receiver.email,
      name: data.receiver.userDetail[0].name,
      lastname: data.receiver.userDetail[0].lastname,
      description: data.receiver.userDetail[0].description,
      birthdate: data.receiver.userDetail[0].birthdate,
      contact_phone: data.receiver.userDetail[0].contact_phone,
      career: {
        ...data.receiver.userDetail[0].career,
        career_id: parseInt(data.receiver.userDetail[0].career.career_id),
      },
      campus: {
        ...data.receiver.userDetail[0].campus,
        campus_id: parseInt(data.receiver.userDetail[0].campus.campus_id),
      },
      photos: data.receiver.photos,
      is_active: data.receiver.is_active,
      createdAt: new Date(data.receiver.userDetail[0].createdAt),
      updatedAt: new Date(data.receiver.userDetail[0].updatedAt),
    },
  };
};

export const UserMatchMapper = (data: any): IUser => {
  return {
    user_id: data.user_id,
    email: data.email,
    name: data.userDetail[0].name,
    lastname: data.userDetail[0].lastname,
    description: data.userDetail[0].description,
    birthdate: data.userDetail[0].birthdate,
    contact_phone: data.userDetail[0].contact_phone,
    career: {
      ...data.userDetail[0].career,
      career_id: parseInt(data.userDetail[0].career.career_id),
    },
    campus: {
      ...data.userDetail[0].campus,
      campus_id: parseInt(data.userDetail[0].campus.campus_id),
    },
    intention: {
      ...data.userDetail[0].intention,
      intention_id: parseInt(data.userDetail[0].intention.intention_id),
    },
    interests: (data?.interests ?? []).map((x: any) => ({
      ...x.interest,
      interest_id: parseInt(x.interest.interest_id),
    })),
    photos: data.photos,
    is_active: data.is_active,
    createdAt: new Date(data.userDetail[0].createdAt),
    updatedAt: new Date(data.userDetail[0].updatedAt),
  };
};

export const MatchRankingMapper = (data: any): IMatchRanking => {
  return {
    user_id: data.user_id,
    name: data.name,
    lastname: data.lastname,
    photo_url: data.photo_url,
    total_matches: parseInt(data.total_matches),
  };
};
