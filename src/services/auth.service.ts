import { baseAxios } from '@axios';
import { Auth } from '@interfaces/auth.interface';
import { LoginPayload, RegisterPayload } from '@interfaces/user.interface';
import { AxiosError } from 'axios';
import { validateStoreUserPayload } from './validate.service';

export async function registerUser(payload: RegisterPayload) {
  await validateStoreUserPayload(payload);

  try {
    const res = await baseAxios.post('/register', payload);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    if (error.response && error.response.status === 400) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    throw error;
  }
}

export async function login(payload: LoginPayload) {
  try {
    const res = await baseAxios.post<Auth>('/login', payload);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    if (error.response && error.response.status === 400) {
      throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    throw error;
  }
}
