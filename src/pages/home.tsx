import Main from '@components/Main';
import Left from '@components/Left';
import Right from '@components/Right';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

function HomePage() {
  return (
    <Container>
      {/* left */}
      <Left />
      {/* main */}
      <Main />
      {/* right */}
      <Right />
    </Container>
  );
}

export default HomePage;
