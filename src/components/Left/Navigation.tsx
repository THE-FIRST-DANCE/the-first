import React from 'react';
import styled from 'styled-components';

import HomeIcon from '@assets/icons/home';
import SearchIcon from '@assets/icons/search';
import BoxIcon from '@assets/icons/box';

import { useNavigate } from 'react-router-dom';
import Search from './Search';
import Post from './Post';

const Navigation = () => {
  const navigate = useNavigate();

  const handleInteract = {
    refresh: () => {
      navigate('/');
    },
    search: () => {
      console.log('1');
    },
    make: () => {
      console.log('2');
    },
  };

  return (
    <Container>
      <Title>title.name</Title>
      <Interacts>
        <Search />
        <Post />
      </Interacts>
      <Others>
        <InteractElement icon={<div>others</div>} text="더보기" />
      </Others>
    </Container>
  );
};

export default Navigation;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 20px - 8px);
  top: 0;
  left: 0;

  /* FIXME: delete border & background-color, unnecessary */
  border: 1px solid black;
  background-color: white;

  width: var(--nav-medium-width);
  @media (max-width: 1264px) {
    width: var(--nav-narrow-width);
  }
  padding: 8px 12px 20px;
`;

const Title = styled.div`
  height: 29px;
  border: 1px solid black;

  padding-top: 25px;
  padding-bottom: 16px;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 19px;
`;

const Interacts = styled.div`
  height: 100%;
`;

const Others = styled.div`
  border: 1px solid black;
`;

const InteractElementContainer = styled.div`
  padding: 12px;
  margin: 4px 0;

  & > button {
    display: flex;
    flex-direction: row;
  }

  & div.icon {
    width: 32px;
    height: 32px;
  }

  & span.text {
    margin-left: 16px;
  }
`;

/* eslint-disable  @typescript-eslint/ban-types */
interface InteractElementProps {
  icon: React.ReactNode;
  text: string;
  callback?: Function;
}

const InteractElement = (props: InteractElementProps) => {
  return (
    <InteractElementContainer>
      <button type="button" onClick={() => props.callback && props.callback()}>
        <div className="icon">{props.icon}</div>
        <span className="text">{props.text}</span>
      </button>
    </InteractElementContainer>
  );
};
