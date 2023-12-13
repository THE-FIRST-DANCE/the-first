import styled from 'styled-components';

interface ErrorMsgProps {
  msg: string;
}

const ErrorMsg = (props: ErrorMsgProps) => {
  return (
    props.msg && (
      <Container>
        <Error>{props.msg}</Error>
      </Container>
    )
  );
};

const Container = styled.div`
  animation: warningShake 0.82s ease-in-out;
`;

const Error = styled.span`
  font-family: var(--font-family-system);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: #ff0000;
`;

export default ErrorMsg;
