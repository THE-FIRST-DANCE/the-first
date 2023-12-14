import styled from 'styled-components';
import AccountSwitch from './AccountSwitch';
import Recommend from './Recommend';

const Right = () => {
  return (
    <Container>
      <Wrap>
        <Box>
          <AccountSwitch />
          <Recommend />
        </Box>
      </Wrap>
    </Container>
  );
};

export default Right;

const Container = styled.div`
  flex: 1;
`;

const Wrap = styled.div`
  width: 319px;
  height: 700px;
  margin-left: 64px;

  display: flex;
`;

const Box = styled.div`
  width: 319px;
  margin-top: 36px;

  height: 546px;
`;
