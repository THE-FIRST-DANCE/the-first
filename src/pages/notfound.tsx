import NotFound from '@components/common/NotFound';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <Container>
      <NotFound />
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
