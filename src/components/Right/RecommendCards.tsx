import styled from 'styled-components';

import Card from './Card';
import { UserWithPosts } from '@interfaces/user.interface';

interface RecommendCardsProps {
  users: UserWithPosts[];
}
function RecommendCards(props: RecommendCardsProps) {
  return (
    <CardBox>
      <CardWrap>
        {props.users.map((user) => (
          <Card user={user} />
        ))}
      </CardWrap>
    </CardBox>
  );
}

const CardBox = styled.div`
  width: 287px;
  height: 300px;
`;

const CardWrap = styled.div`
  width: 287px;
  height: 300px;
`;

export default RecommendCards;
