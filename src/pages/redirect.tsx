import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const { search } = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(search);
    const dest = query.get('dest');

    if (dest) navigate(dest);
    else navigate(-1);
  }, []);

  return <></>;
};

export default RedirectPage;
