import { Place } from './place.interface';
import { Tag } from './tag.interface';
import { User } from './user.interface';

export interface History {
  id: number;
  type: 'user' | 'tag' | 'place';
  data: User | Tag | Place;
}

export interface HistoryPayload {
  type: 'user' | 'tag' | 'place';
  data: Partial<User & Tag & Place>;
}
