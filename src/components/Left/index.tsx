import styled from 'styled-components';
import Navigation from './Navigation';

const Left = () => {
  return (
    <Container>
      <Navigation />
    </Container>
  );
};

export default Left;

const Container = styled.div`
  flex: 1;
`;
