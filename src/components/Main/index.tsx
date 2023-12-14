/* eslint-disable react/self-closing-comp */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PostWithUser, Post } from '@interfaces/post.interface';
import Story from './Story';
import MainCard from './MainCard';
// eslint-disable-next-line import/order
import { getPostsUsers } from '@services/posts.service';

const Main = () => {
  const [mainPosts, setMainPosts] = useState<PostWithUser[]>([]);
  const [onlyPosts, setOnlyPosts] = useState<Post[]>([]);
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  //  -----------------------------------------useEffect start----------------------------------
  useEffect(() => {
    getPostsUsers().then((posts) => {
      setMainPosts(posts);
      const postsWithoutUser = posts.map((post) => {
        return {
          id: post.id,
          created_at: post.created_at,
          content: post.content,
          photos: post.photos,
          userId: post.userId,
          tags: post.tags,
          updated_at: post.updated_at,
        };
      });
      setOnlyPosts(postsWithoutUser);
    });
  }, [isPostDeleted]);
  //  -----------------------------------------useEffect start----------------------------------

  return (
    <Container>
      {/* MainCard에서 로그인 portal */}
      <div className="container start"></div>
      <Story />
      {/* 메인 카드 작성 */}
      <div style={{ margin: '0 auto' }}>
        {mainPosts.map((post, index) => (
          <MainCard
            key={post.id}
            post={post}
            onlyPost={onlyPosts[index]}
            setIsPostDeleted={setIsPostDeleted}
          />
        ))}
      </div>
    </Container>
  );
};

export default Main;

/* 중앙 컨테이너 정렬 */
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  font-family: var(--font-family-system);
`;
