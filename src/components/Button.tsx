import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <ButtonStyle type="submit" onClick={onClick}>
      {label}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background-color: rgb(0, 149, 246);
  opacity: 0.7;
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    background-color: #0095f6;
  }
  &:disabled {
    background-color: #b2dffc;
    cursor: not-allowed;
  }
`;
