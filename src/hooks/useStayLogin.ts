import { getLogonUser } from '@utils/auth';
import { useEffect, useState } from 'react';

const useStayLogin = () => {
  const [logonUser, setLogonUser] = useState(getLogonUser());

  const updateUser = () => {
    console.log('update');
    setLogonUser(getLogonUser());
  };

  // Check user information every minute
  useEffect(() => {
    const intervalId = setInterval(updateUser, 1 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return logonUser;
};

export default useStayLogin;
