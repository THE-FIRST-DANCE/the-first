import { SkeletonImage, SkeletonText } from '@components/common/Skeleton';
import { Post } from '@interfaces/post.interface';
import styled from 'styled-components';

interface ProfilePostsProps {
  posts: Post[];
}

const ProfilePosts = (props: ProfilePostsProps) => {
  const { posts } = props;

  return (
    <Container>
      <PostCount>
        <span className="post">게시물</span>
        <span className="count">{posts.length}</span>
      </PostCount>
      <PostThumbContainer>
        {posts.map((post) => (
          // FIXME: 상세보기 모달로 변경해야됨
          <PostThumb
            key={post.id}
            onClick={() => console.log('상세보기 모달 포스트: ' + post.id)}
          >
            <img src={post.photos[0]} alt="thumb" className="img" />
          </PostThumb>
        ))}
      </PostThumbContainer>
    </Container>
  );
};

export const SkeletonProfilePosts = () => {
  return (
    <Container>
      <PostCount>
        <SkeletonText $width="sm" />
        <SkeletonText $width="ssm" />
      </PostCount>
      <PostThumbContainer>
        {Array.from({ length: Math.floor(Math.random() * (8 - 2)) + 2 }).map(
          (_, i) => (
            <PostThumb key={i}>
              <SkeletonImage />
            </PostThumb>
          )
        )}
      </PostThumbContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const PostCount = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  font-size: 0.875rem;
  font-style: normal;

  & span.post {
    font-weight: 700;
    line-height: 1rem; /* 114.286% */
  }

  & span.count {
    font-weight: 400;
    line-height: 1rem; /* 114.286% */
  }
`;

const PostThumbContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem;
  width: 100%;
`;

const PostThumb = styled.button`
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
`;

export default ProfilePosts;
