import Button from '@components/Button';
import Input from '@components/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { registerUser } from '@services/auth.service';
import { useState } from 'react';
import { setAuth } from '@utils/auth';
import { getNameFromEmail } from '@utils/formatter';
import ErrorMsg from '@components/common/ErrorMsg';

const RegisterPage = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setErrorMsg('');
    registerUser({
      email: data['email'],
      name: getNameFromEmail(data['email']),
      username: data['username'],
      password: data['password'],
    })
      .then((auth) => {
        setAuth(auth);
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
              id="username"
              type="text"
              label="사용자 이름"
              placeholder="사용자 이름"
              register={register}
              required
              errors={errors}
              minLength={3}
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

            <Input
              id="confirmPassword"
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              register={register}
              required
              errors={errors}
              passwordCheck={watch('password')}
            />

            <div
              style={{
                height: '1rem',
                padding: '0.5rem',
              }}
            >
              <ErrorMsg msg={errorMsg} />
            </div>

            <Button label="가입" />
          </Form>
        </Body>
        <Bottom>
          <BottomText>
            계정이 있으신가요? <Link to="/login">로그인</Link>
          </BottomText>
        </Bottom>
      </Container>
    </Main>
  );
};

export default RegisterPage;

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
