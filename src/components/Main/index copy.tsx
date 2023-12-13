import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PostAndUser, Post } from '@interfaces/post.interface';
import Story from './Story';
import MainCard from './MainCard';
// eslint-disable-next-line import/order
import { getPosts, getPostsUsers } from '@services/posts.service';

const Main = () => {
  const [mainPosts, setMainPosts] = useState<PostAndUser[]>([]);
  const [onlyPosts, setOnlyPosts] = useState<Post[]>([]);

  /* post + user 데이터 가져오기  */
  useEffect(() => {
    getPostsUsers()
      .then((posts) => {
        // console.log('getPostsUsers :', posts); // 가져온 포스트 출력
        setMainPosts(posts);
      })
      .catch((err) => {
        // console.error(err); // 에러 발생 시 출력
      });
  }, []);

  /* post만 */
  useEffect(() => {
    const getPostsFun = async () => {
      const result = await getPosts();
      // console.log('getPostsFun :', result);
      setOnlyPosts(result);
    };
    getPostsFun();
  }, []);

  return (
    <Container>
      <Story />
      {/* 메인 카드 작성 */}
      <div style={{ margin: '0 auto' }}>
        {[...mainPosts].reverse().map((post, index) => (
          <MainCard key={post.id} post={post} onlyPost={onlyPosts[index]} />
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
