import Router from '@router';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';
import LogonUser from '@contexts/LogonUser';
import useStayLogin from '@hooks/useStayLogin';

function App() {
  const logonUser = useStayLogin();

  return (
    <ThemeProvider theme={theme}>
      <LogonUser.Provider value={logonUser}>
        <GlobalStyle />
        <Router />
      </LogonUser.Provider>
    </ThemeProvider>
  );
}

export default App;
