/* eslint-disable react/self-closing-comp */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PostWithUser, Post, HeartsInfo } from '@interfaces/post.interface';
import Story from './Story';
import MainCard from './MainCard';
// eslint-disable-next-line import/order
import {
  getPosts,
  getPostsUsers,
  getHeartsInfo,
} from '@services/posts.service';

const Main = () => {
  const [mainPosts, setMainPosts] = useState<PostWithUser[]>([]);
  const [onlyPosts, setOnlyPosts] = useState<Post[]>([]);
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  //  -----------------------------------------useEffect start----------------------------------
  /* 🟡 post + user 데이터 가져오기 🟡 */
  useEffect(() => {
    getPostsUsers().then((posts) => {
      console.log('getPostsUsers :', posts); // 가져온 포스트 출력
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
      <div className="container start"></div>
      <Story />
      {/* 메인 카드 작성 */}
      <div style={{ margin: '0 auto' }}>
        {/* {[...mainPosts].reverse().map((post, index) => ( */}
        {mainPosts.map((post, index) => (
          <MainCard
            key={post.id}
            post={post}
            onlyPost={onlyPosts[index]}
            setIsPostDeleted={setIsPostDeleted}
            // handleCloseClick={setModalOpen}
          />
        ))}
      </div>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
