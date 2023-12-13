import Left from '@components/Left';
import ProfileComponent, {
  SkeletonProfileComponent,
} from '@components/Profile';
import NotFound from '@components/common/NotFound';
import { User } from '@interfaces/user.interface';
import { getUserByUsername } from '@services/users.service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const useUser = (username: string) => {
  const [user, setuser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  /* initialize user */
  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(username)
      .then((data) => setuser(data))
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [username]);

  return { user, isLoading };
};

const ProfilePage = () => {
  const { username = '' } = useParams();
  const { user, isLoading } = useUser(username);

  return (
    <Container>
      <Left />
      {isLoading ? (
        <SkeletonProfileComponent />
      ) : !user ? (
        <NotFound msg="유저를 찾을 수 없습니다💁‍♂️" />
      ) : (
        <ProfileComponent user={user} />
      )}
      <div style={{ flex: 1 }} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

export default ProfilePage;
