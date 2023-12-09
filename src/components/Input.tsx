import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
  placeholder?: string;
  minLength?: number;
  passwordCheck?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 300;
`;

const InputContainer = styled.input<{ errors: FieldErrors; id: string }>`
  height: 24px;
  padding: 9px 0 7px 8px;
  font-weight: 400;
  background-color: #fff;
  outline: none;
  background-color: rgb(250, 250, 250);

  border: 1px solid
    ${({ errors, id }) => (errors[id] ? '#ff0000' : 'rgb(167, 147, 147)')};
  border-radius: 3px;
`;

const Error = styled.span`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: #ff0000;
`;

const Input = ({
  id,
  label,
  type = 'text',
  register,
  required,
  errors,
  placeholder,
  minLength,
  passwordCheck,
}: InputProps) => {
  return (
    <Container>
      {label && <Label htmlFor={id}>{label}</Label>}

      <InputContainer
        id={id}
        type={type}
        errors={errors}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(id, {
          required: {
            value: required || false,
            message: `${id}을(를) 입력해주세요.`,
          },
          minLength: {
            value: minLength || 0,
            message: `${minLength}글자 이상 입력해주세요.`,
          },
          validate: (value) =>
            id === 'confirmPassword'
              ? value === passwordCheck || '비밀번호가 일치하지 않습니다.'
              : true,
        })}
      />

      {errors[id] && errors[id]?.message && (
        <Error>{errors[id]?.message?.toString() ?? ''}</Error>
      )}
    </Container>
  );
};
export default Input;