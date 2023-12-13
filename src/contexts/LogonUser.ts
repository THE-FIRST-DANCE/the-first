import { User } from '@interfaces/user.interface';
import { createContext, useContext } from 'react';

const LogonUser = createContext<User | null>(null);

export const useLogonUser = () => {
  const currentUser = useContext(LogonUser);

  return currentUser;
};

export default LogonUser;
