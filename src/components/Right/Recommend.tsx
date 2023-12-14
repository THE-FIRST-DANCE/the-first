import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecommendCards from './RecommendCards';
import { UserWithPosts } from '@interfaces/user.interface';
import { getUserWithSomePostsByUserId } from '@services/users.service';

function Recommend() {
  const team = [8, 10, 19, 20, 21];
  const [users, setUsers] = useState<UserWithPosts[]>([]);

  useEffect(() => {
    Promise.all(
      team.map((userId) => getUserWithSomePostsByUserId(userId))
    ).then((fetchedUsers) => {
      setUsers(fetchedUsers);
      console.log(fetchedUsers);
    });
  }, []);

  return (
    <Container>
      <ViewBox>
        <FontBox>회원님을 위한 추천</FontBox>
        <ViewAll href="#">모두보기</ViewAll>
      </ViewBox>
      <Wrap>
        <Box>
          <RecommendCards users={users} />
        </Box>
      </Wrap>
    </Container>
  );
}
const Container = styled.div`
  // background-color: white;
  width: 319px;
  height: 329px;
  margin: 24px 0px 8px 0px;
`;

const Wrap = styled.div`
  width: 287px;
  height: 329px;
  margin: 0px 16px;
`;

const Box = styled.div`
  width: 303px;
  height: 329px;
`;
const ViewBox = styled.div`
  width: 303px;
  height: 19px;
  display: flex;
  border-top: 10px;
  margin: 5px 0px;
`;

const FontBox = styled.p`
  height: 19px;
  width: 235px;
  color: #606770;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
`;

const ViewAll = styled.a`
  width: 51px;
  height: 19px;
  color: black;
  font-weight: 900;
  display: block;
  font-size: 12px;
  line-height: 19px;
  text-align: right;
  &:hover {
    color: rgba(134, 142, 153, 0.75);
  }
`;

export default Recommend;
