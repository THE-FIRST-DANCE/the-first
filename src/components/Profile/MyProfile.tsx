import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlusIcon from '@assets/icons/plus';
import { SkeletonImage, SkeletonText } from '@components/common/Skeleton';
import { useLogonUser } from '@contexts/LogonUser';
import { ProfilePayload, User } from '@interfaces/user.interface';
import { registerPhoto } from '@services/posts.service';
import { editProfile } from '@services/users.service';
import UserAvatar from '@components/common/UserAvatar';
import ErrorMsg from '@components/common/ErrorMsg';

const useEditProfile = (user: User) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfilePayload>(user);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();

  const editHandler = {
    start: () => {
      editDataHandler.init();
      setIsEditing(true);
    },
    cancel: () => {
      editDataHandler.init();
      setIsEditing(false);
    },
    submit: () => {
      editProfile({
        ...profile,
        id: user?.id,
      })
        .then((data) => {
          setProfile(data);
          navigate(`/redirect?dest=/u/${user.username}`);
          setIsEditing(false);
        })
        .catch((e) => {
          setErrorMsg(e.message);
          return;
        });
    },
  };

  const editDataHandler = {
    init: () => {
      setProfile(user);
    },
    username: (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfile({ ...profile, username: e.target.value });
    },
    name: (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfile({ ...profile, name: e.target.value });
    },
    bio: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setProfile({ ...profile, bio: e.target.value });
    },
    avatar: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];

      registerPhoto(file)
        .then((url) => {
          setProfile({ ...profile, avatar: url });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    email: (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfile({ ...profile, email: e.target.value });
    },
  };

  useEffect(() => {
    setErrorMsg('');
  }, [profile]);

  return { isEditing, profile, errorMsg, editHandler, editDataHandler };
};

interface MyProfileProps {
  user: User;
}
const MyProfile = (props: MyProfileProps) => {
  const { isEditing, profile, errorMsg, editHandler, editDataHandler } =
    useEditProfile(props.user);
  const logonUser = useLogonUser();

  return (
    profile && (
      <Container>
        <Header>
          <Input
            className="username"
            readOnly={!isEditing}
            onChange={editDataHandler.username}
            value={profile.username}
            $length={profile.username?.length}
          />
          {isEditing ? (
            <>
              <EditButton onClick={editHandler.submit}>완료</EditButton>
              <EditButton onClick={editHandler.cancel}>취소</EditButton>
            </>
          ) : (
            logonUser?.id === profile.id && (
              <EditButton onClick={editHandler.start}>편집</EditButton>
            )
          )}
          <ErrorMsg msg={errorMsg} />
        </Header>
        <Main className="main">
          <Avatar>
            <UserAvatar
              username={props.user.username}
              src={profile.avatar}
              size={90}
            />

            {isEditing && (
              <label
                htmlFor="avatar"
                style={{ position: 'absolute', cursor: 'pointer' }}
              >
                <PlusIcon />
              </label>
            )}

            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={editDataHandler.avatar}
              hidden
            />
          </Avatar>
          <UserInformation>
            <Input
              className="name"
              readOnly={!isEditing}
              onChange={editDataHandler.name}
              value={profile.name}
              $length={profile.name?.length}
            />
            <textarea
              className="bio"
              readOnly={!isEditing}
              onChange={editDataHandler.bio}
              value={profile?.bio ?? '자기 소개글이 없습니다.'}
            />
            <Input
              className="email"
              readOnly={!isEditing}
              onChange={editDataHandler.email}
              value={profile.email}
              $length={profile.email?.length}
            />
          </UserInformation>
        </Main>
      </Container>
    )
  );
};

export default MyProfile;

export const SkeletonMyProfile = () => {
  return (
    <Container>
      <Header>
        <SkeletonText $width="md" />
      </Header>
      <Main className="main">
        <Avatar>
          <SkeletonImage />
        </Avatar>
        <UserInformation>
          <SkeletonText $width="sm" />
          <SkeletonText $width="full" />
          <SkeletonText $width="lg" />
        </UserInformation>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  height: 2.25rem;
  padding: 0.625rem 0.75rem;
  align-items: center;
  align-self: stretch;
  gap: 0.5rem;
  width: auto;

  .username {
    content: ' ';
    color: #000;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1rem; /* 72.727% */
  }
`;

const Main = styled.div`
  display: flex;
  padding: 0.625rem 0.75rem;
  align-items: center;
  gap: 2.375rem;
  align-self: stretch;
`;

const Avatar = styled.div`
  display: flex;
  width: 5.625rem;
  height: 5.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  position: relative;

  border-radius: 50%;
  overflow: hidden;

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1875rem;
  flex: 1 0 0;

  .name {
    font-family: Spoqa Han Sans Neo;
    color: #000;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1rem; /* 123.077% */
  }

  textarea.bio {
    font-family: Spoqa Han Sans Neo;
    align-self: stretch;
    color: #000;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem; /* 133.333% */

    resize: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    outline: none;
    cursor: default;
    border-bottom: 1px solid #dbdbdb;
  }
  textarea.bio:read-only {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
  }

  .email {
    color: #004b8b;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem; /* 123.077% */
  }
`;

const EditButton = styled.button`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 133.333% */
  text-align: center;
  letter-spacing: -0.015em;
  color: #262626;

  padding: 0.1rem 0.25rem;

  border-radius: 0.25rem;
  background: linear-gradient(
    to right,
    rgba(128, 128, 128, 0.5),
    rgba(128, 128, 128, 0.5)
  );
`;

const Input = styled.input<{ $length?: number }>`
  font-family: Spoqa Han Sans Neo;
  color: #000;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; /* 123.077% */

  min-width: 5rem;
  width: ${({ $length }) => $length ?? 0}ch;

  border-bottom: 1px solid #dbdbdb;

  &:read-only {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
  }
`;
