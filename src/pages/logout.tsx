import { removeAuth } from '@utils/auth';
import { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    removeAuth();
    window.location.href = '/';
  }, []);

  return <></>;
};

export default LogoutPage;
