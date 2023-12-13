// eslint-disable-next-line import/no-cycle
import { Post } from './post.interface';

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface UserWithPosts extends User {
  posts: Post[];
}
export interface ProfilePayload extends Partial<Omit<User, 'id'>> {
  id: number | undefined;
}

export interface RegisterPayload {
  email: string;
  username: string;
  name: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
