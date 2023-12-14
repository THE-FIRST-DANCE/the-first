import { Auth } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import { getWithExpiry, setWithExpiry } from './expire';

export function setAuth(auth: Auth) {
  setWithExpiry('access', auth, 3_600_000);
}

export function removeAuth() {
  sessionStorage.removeItem('access');
}

export function getAccessToken() {
  const accessToken = getWithExpiry('access')?.accessToken;
  return accessToken;
}

export function getLogonUser(): User | null {
  const access = getWithExpiry('access');

  if (!access) return null;

  return getWithExpiry('access')?.user;
}
