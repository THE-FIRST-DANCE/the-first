import Button from '@components/Button';
import Input from '@components/Input';
import ErrorMsg from '@components/common/ErrorMsg';
import { login } from '@services/auth.service';
import { setAuth } from '@utils/auth';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setErrorMsg('');
    login({
      email: data['email'],
      password: data['password'],
    })
      .then((data) => {
        setAuth(data);
        window.location.href = '/';
      })
      .catch((e) => {
        setErrorMsg(e.message);
      });
  };

  return (
    <Main>
      <Container>
        <Body>
          <Header>TheFirst</Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              label="이메일"
              placeholder="이메일"
              register={register}
              required
              errors={errors}
            />

            <Input
              id="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호"
              register={register}
              required
              errors={errors}
              minLength={6}
            />

            <div style={{ height: '1rem', padding: '0.5rem' }}>
              <ErrorMsg msg={errorMsg} />
            </div>

            <Button label="로그인" />
          </Form>
        </Body>
        <Bottom>
          <BottomText>
            계정이 없으신가요? <Link to="/register">가입하기</Link>
          </BottomText>
        </Bottom>
      </Container>
    </Main>
  );
};

export default LoginPage;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  max-width: 400px;
`;

const Body = styled.div`
  border: 1px solid black;
  border-radius: 2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-top: 36px;
  margin-bottom: 12px;
  font-size: 28px;
  font-weight: 700;
  line-height: 32px;
  font-style: italic;
`;

const Form = styled.form`
  width: 350px;
  margin: 0 2.5rem;
`;

const Bottom = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 2px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const BottomText = styled.div`
  line-height: 32px;

  a {
    margin-left: 0.25rem;
    color: #0095f6;
    font-weight: 600;
  }
`;
