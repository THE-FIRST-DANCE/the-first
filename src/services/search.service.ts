import { baseAxios } from '@axios';
import { User } from '@interfaces/user.interface';

export async function searchAll(keyword: string) {
  if (!keyword)
    return {
      users: [],
      tags: [],
      places: [],
    };

  const users = await searchUsers(keyword);
  const tags = await searchTags(keyword);
  const places = await searchPlaces(keyword);

  return {
    users,
    tags,
    places,
  };
}

export async function searchUsers(keyword: string): Promise<User[]> {
  const res1 = await baseAxios.get(`/users?username_like=${keyword}`);
  const res2 = await baseAxios.get(`/users?name_like=${keyword}`);

  return [...res1.data, ...res2.data];
}

export async function searchTags(keyword: string) {
  const res = await baseAxios.get(`/tags?name_like=${keyword}`);
  return res.data;
}

export async function searchPlaces(keyword: string) {
  const res = await baseAxios.get(`/places?name_like=${keyword}`);
  return res.data;
}
