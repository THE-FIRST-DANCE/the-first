import { Place } from './place.interface';
import { Tag } from './tag.interface';
import { User } from './user.interface';

export interface SearchData {
  users: User[];
  tags: Tag[];
  places: Place[];
}

export type SearchType = 'user' | 'tag' | 'place';
