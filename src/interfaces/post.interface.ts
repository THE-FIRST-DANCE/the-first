// eslint-disable-next-line import/no-cycle
import { User } from './user.interface';

export interface Post {
  id: number;
  photos: string[];
  content: string;
  userId: number;
  tags?: string[];
  created_at: Date;
  updated_at: Date;
}

export interface PostPayload {
  content: string;
  photos: File[];
  userId: number;
  placeId: number;
  tags?: string[];
}

// 🟡 포스트 + 유저
export interface PostWithUser extends Post {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  placeId: any;
  user: User; //  <- User 추가 🟡
}

export interface HeartsInfo {
  id: number;
  user_id: number;
  post_id: number;
}
