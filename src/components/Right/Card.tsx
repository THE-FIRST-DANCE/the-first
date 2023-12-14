import styled from 'styled-components';

import { UserWithPosts } from '@interfaces/user.interface';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  user: UserWithPosts;
}

function Card(props: CardProps) {
  const navigate = useNavigate();

  // 각 팔로우 버튼에 대한 이벤트 핸들러를 생성합니다.

  function handleClick() {
    navigate(`/u/${props.user.username}`);
  }

  return (
    <Container>
      <Box>
        <ImgBox>
          <ImgWrap>
            <ImgFrame>
              <ImgLink onClick={handleClick}>
                <Img src={props.user?.avatar} />
              </ImgLink>
            </ImgFrame>
          </ImgWrap>
        </ImgBox>
        <RecommendBox>
          <RecommendWrap>
            <RecommendFrame>
              <RecommendName onClick={handleClick}>
                {props.user.username}
              </RecommendName>
              <RecommendAim>Instagram 추천</RecommendAim>
            </RecommendFrame>
          </RecommendWrap>
        </RecommendBox>
        <SwitchBox>
          <SwitchWrap>
            <SwitchFrame>
              <SwitchName></SwitchName>
            </SwitchFrame>
          </SwitchWrap>
        </SwitchBox>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 287px;
  height: 60px;
  border-radius: 50;
  box-sizing: border-box;
`;

// 개별 추천 계정
const Box = styled.div`
  width: 287px;
  height: 44px;
  display: flex;
  padding: 8px 0px;
`;

const ImgBox = styled.div`
  width: 56px;
  height: 44px;
`;

const ImgWrap = styled.div`
  width: 44px;
  height: 44px;
  margin-right: 12px;
`;

const ImgFrame = styled.div`
  width: 44px;
  height: 44px;
`;

const ImgLink = styled.button`
  width: 44px;
  height: 100%;
`;

const Img = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;

const RecommendBox = styled.div`
  width: 185px;
  height: 44px;
`;

const RecommendWrap = styled.div`
  width: 185px;
  height: 36px;
  margin: 4px 0px;
`;

const RecommendFrame = styled.div`
  width: 185px;
  height: 36px;
`;

const RecommendName = styled.button`
  width: 185px;
  height: 18px;
  font-weight: 600;
  font-size: 14px;
`;

const RecommendAim = styled.div`
  height: 18px;
  font-weight: 300;
  font-size: 14px;
`;

const SwitchBox = styled.div`
  width: 45px;
  height: 44px;
`;

const SwitchWrap = styled.div`
  width: 45px;
  height: 18px;
  margin: 12px 0px;
`;

const SwitchFrame = styled.div`
  width: 45px;
  height: 18px;
`;

const SwitchName = styled.div`
  width: 45px;
  height: 18px;
  margin-left: 12px;
`;

export default Card;
