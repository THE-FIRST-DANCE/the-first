import { getColorFromUsername } from '@utils/formatter';
import styled from 'styled-components';

interface AvatarProps {
  username: string;
  src?: string;
  size?: number;
}

const UserAvatar = (props: AvatarProps) => {
  return (
    <Container $username={props.username} $size={props.size}>
      {props.src ? (
        <img src={props.src} alt="avatar" />
      ) : (
        <span>{props.username[0]}</span>
      )}
    </Container>
  );
};

const Container = styled.div<{ $username: string; $size?: number }>`
  width: ${(props) => props.$size || 32}px;
  height: ${(props) => props.$size || 32}px;
  border-radius: 50%;

  background-color: #e8e8e8;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    font-size: ${(props) => (props.$size ? props.$size / 2 : 16)}px;

    background-color: ${(props) => getColorFromUsername(props.$username)};
  }
`;

export default UserAvatar;
