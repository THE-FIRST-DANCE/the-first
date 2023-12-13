import { baseAxios } from '@axios';
import { ProfilePayload, RegisterPayload } from '@interfaces/user.interface';

export async function validateUpdateUserPayload(payload: ProfilePayload) {
  const isExistEmail = await baseAxios.get(`/users?email=${payload.email}`);
  const isExistUsername = await baseAxios.get(
    `/users?username=${payload.username}`
  );

  if (isExistEmail.data.length > 0 && isExistEmail.data[0].id !== payload.id)
    throw new Error('이미 존재하는 이메일입니다.');

  if (
    isExistUsername.data.length > 0 &&
    isExistUsername.data[0].id !== payload.id
  )
    throw new Error('이미 존재하는 유저네임입니다.');

  return true;
}

export async function validateStoreUserPayload(payload: RegisterPayload) {
  const isExistEmail = await baseAxios.get(`/users?email=${payload.email}`);
  const isExistUsername = await baseAxios.get(
    `/users?username=${payload.username}`
  );

  if (isExistEmail.data.length > 0)
    throw new Error('이미 존재하는 이메일입니다.');

  if (isExistUsername.data.length > 0)
    throw new Error('이미 존재하는 유저네임입니다.');

  return true;
}
