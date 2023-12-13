import styled from 'styled-components';

interface NotFoundProps {
  msg?: string;
}

const NotFound = (props: NotFoundProps) => {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <ErrorMsg>{props.msg ?? 'Page Not Found'}</ErrorMsg>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100vh;
  font-size: 2rem;
  color: #333;

  font-family: var(--font-family-system);
`;

const ErrorCode = styled.div`
  font-size: 5rem;
  font-weight: 600;
`;

const ErrorMsg = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

export default NotFound;
