import { IIntention } from '../entities/intention.entity';

export const IntentionMapper = (data: any): IIntention => {
  return {
    intention_id: parseInt(data.intention_id),
    name: data.name,
    is_active: data.is_active,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};
