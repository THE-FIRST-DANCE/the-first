import { HrLine } from '@components/common/Line';
import { PostWithUser } from '@interfaces/post.interface';
import { User } from '@interfaces/user.interface';
import { getPostsWithUserByUserId } from '@services/posts.service';
import styled from 'styled-components';
import MyProfile, { SkeletonMyProfile } from './MyProfile';
import ProfilePosts, { SkeletonProfilePosts } from './ProfilePosts';
import { useEffect, useState } from 'react';

const usePosts = (userId: number) => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);

  const fetchPosts = () => {
    getPostsWithUserByUserId(userId)
      .then((posts) => {
        setPosts([...posts]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(fetchPosts, []);

  return posts;
};

interface ProfileProps {
  user: User;
}
const ProfileComponent = (props: ProfileProps) => {
  const { user } = props;

  const posts = usePosts(user.id);

  return (
    <Container>
      <MyProfile user={user} />
      <HrLine />
      <ProfilePosts posts={posts} />
    </Container>
  );
};

export const SkeletonProfileComponent = () => {
  return (
    <Container>
      <SkeletonMyProfile />
      <HrLine />
      <SkeletonProfilePosts />
    </Container>
  );
};

const Container = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Spoqa Han Sans Neo;

  .thumb-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    aspect-ratio: 1 / 1;

    border: ${({ theme }) => theme.lightTheme.borderColor};

    & > .img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .edit {
    border-bottom: ${({ theme }) => theme.lightTheme.borderColor};
  }
`;

// const EditButton = styled.button`
//   font-size: 0.75rem;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 1rem; /* 133.333% */
//   text-align: center;
//   letter-spacing: -0.015em;
//   color: #262626;

//   padding: 0.1rem 0.25rem;

//   border-radius: 0.25rem;
//   background: linear-gradient(
//     to right,
//     rgba(128, 128, 128, 0.5),
//     rgba(128, 128, 128, 0.5)
//   );
// `;

export default ProfileComponent;
