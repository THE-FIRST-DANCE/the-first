import { baseAxios } from '@axios';
import {
  UserWithPosts,
  User,
  ProfilePayload,
} from '@interfaces/user.interface';
import { validateUpdateUserPayload } from './validate.service';

interface UserIncludedPassword extends User {
  password?: string;
}

export async function getUserByUsername(username: string): Promise<User> {
  const res = await baseAxios.get<UserIncludedPassword[]>(
    `/users?username=${username}`
  );
  const user = res.data[0];

  if (user) {
    delete user.password;
  } else {
    throw new Error('User not found');
  }

  return user;
}

export async function getProfileByUsername(username: string) {
  const res = await baseAxios.get<UserWithPosts[]>(
    `/users?username=${username}`
  );

  return res.data[0];
}

export async function editProfile(profile: ProfilePayload) {
  if (!profile.id) throw new Error('Profile id not found');
  await validateUpdateUserPayload(profile);

  const res = await baseAxios.patch(`/users/${profile.id}`, profile);
  return res.data;
}

export async function getUserWithSomePostsByUserId(userId: number) {
  const res = await baseAxios.get<UserWithPosts>(
    `/users/${userId}?_embed=posts&_sort=id&_order=desc`
  );
  const data = res.data;
  data.posts = data.posts.slice(0, 3);

  return data;
}