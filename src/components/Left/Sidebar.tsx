import { useState } from 'react';
import styled, { css } from 'styled-components';
import SearchExtend from './SearchExtend';
import CreatePostExtend from './CreatePostExtend';
import BoxIcon from '@assets/icons/box';
import EtcIcon from '@assets/icons/etc';
import HomeIcon from '@assets/icons/home';
import LogoIcon from '@assets/icons/logo';
import SearchIcon from '@assets/icons/search';
import useModal from '@hooks/useModal';
import useToggle from '@hooks/useToggle';
import { useNavigate } from 'react-router-dom';
import { useLogonUser } from '@contexts/LogonUser';
import UserAvatar from '@components/common/UserAvatar';

interface NavItem {
  id: string;
  Icon: React.FC;
  label: string;
  callback: () => void;
}

const Sidebar = () => {
  const [selected, setSelected] = useState<string>('Home');
  const searchModal = useModal();
  const createPostModal = useModal();
  const othersToggler = useToggle();
  const navigate = useNavigate();
  const logonUser = useLogonUser();

  const handleClick = (item: NavItem) => {
    setSelected(item.id);
    item.callback();
  };

  const NAV_ITEMS = [
    {
      id: 'Home',
      Icon: HomeIcon,
      label: '홈',
      callback: () => {
        navigate('/redirect?dest=/', { replace: true });
      },
    },
    {
      id: 'Search',
      Icon: SearchIcon,
      label: '검색',
      callback: () => {
        searchModal.toggler.toggle();
      },
    },
    {
      id: 'NewPost',
      Icon: BoxIcon,
      label: '새 게시물',
      callback: () => {
        if (!logonUser) navigate('/login');
        createPostModal.toggler.open();
      },
    },
  ];

  return (
    <Container $open={searchModal.toggler.isOpen}>
      <button className="title" onClick={() => navigate('/redirect?dest=/')}>
        <LogoIcon width={147} height={40} />
      </button>
      <nav>
        {NAV_ITEMS.map((item) => (
          <Interact
            key={item.id}
            data-id={item.id}
            onClick={() => handleClick(item)}
            $selected={selected === item.id}
            $open={searchModal.toggler.isOpen}
          >
            <item.Icon />
            <span>{item.label}</span>
          </Interact>
        ))}
        {/* TODO: Others 좀 더 가독성 높도록 수정해야 함 */}
        <div style={{ height: '100%' }} />
        {logonUser && (
          <Interact
            data-id="UserProfile"
            onClick={() => navigate(`/u/${logonUser.username}`)}
            $open={searchModal.toggler.isOpen}
          >
            <UserAvatar
              username={logonUser.username}
              src={logonUser?.avatar}
              size={32}
            />
            <span>{logonUser.username}</span>
          </Interact>
        )}
        <Others $open={searchModal.toggler.isOpen}>
          <div className="others" onClick={othersToggler.toggle}>
            <EtcIcon />
            <span>더 보기</span>
          </div>
          {othersToggler.isOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                zIndex: 1,
                width: '266px',
                padding: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backgroundColor: 'white',
              }}
            >
              {logonUser && (
                <button
                  className="others-interact"
                  onClick={() => navigate('/logout', { replace: true })}
                >
                  logout
                </button>
              )}
              {!logonUser && (
                <button
                  className="others-interact"
                  onClick={() => navigate('/login')}
                >
                  login
                </button>
              )}
            </div>
          )}
        </Others>
      </nav>
      <SearchExtend
        open={searchModal.toggler.isOpen}
        observe={searchModal.ref}
      />
      <CreatePostExtend
        open={createPostModal.toggler.isOpen}
        closeHandler={createPostModal.toggler.close}
        observe={createPostModal.ref}
      />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div<{ $open?: boolean }>`
  display: flex;
  position: fixed;
  flex-direction: column;
  height: -webkit-fill-available;
  width: ${({ $open }) =>
    $open ? 'var(--nav-narrow-width)' : 'var(--nav-medium-width)'};
  z-index: 3;
  transition: width 0.3s ease-in-out;

  border: ${({ theme }) => theme.lightTheme.borderColor};

  background-color: ${({ theme }) => theme.lightTheme.bgColor};

  font-family: var(--font-family-system);

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  & > button.title {
    display: flex;
    align-items: center;
    height: 4rem;
    margin-bottom: 1rem;
    padding: 25px 12px 16px 12px;

    &:active {
      -webkit-tap-highlight-color: transparent;
    }
  }

  & > nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 0.5rem;
    height: 100%;
  }

  @media ${({ theme }) => theme.windowSize.lg} {
    width: var(--nav-narrow-width);
  }
`;

const Interact = styled.button<{
  'data-id': string;
  $selected?: boolean;
  $open?: boolean;
}>`
  padding: 12px;
  margin: 4px 0 4px;
  height: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 8px;

  &:active {
    scale: 0.99;
  }

  & > span {
    display: ${({ $open }) => ($open ? 'none' : 'inline')};
  }

  @media ${({ theme }) => theme.windowSize.lg} {
    & > span {
      display: none;
    }
  }

  transition: backdrop-filter 0.2s ease-in-out;

  &:hover {
    backdrop-filter: brightness(0.93);

    & svg {
      stroke: black;
      stroke-width: 1;
    }
  }

  ${({ $selected }) =>
    $selected &&
    css`
      & svg {
        stroke: black;
        stroke-width: 1;
      }
    `}
`;

const Others = styled.div<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: auto;
  position: relative;
  margin-bottom: 1rem;

  user-select: none;

  & > div.others {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
    padding: 12px;
    height: 1.5rem;
    cursor: pointer;

    background-color: ${({ theme }) => theme.lightTheme.bgColor};

    & > span {
      display: ${({ $open }) => ($open ? 'none' : 'inline')};
    }

    @media ${({ theme }) => theme.windowSize.lg} {
      & > span {
        display: none;
      }
    }
  }

  .others-interact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 12px;
    height: 1.5rem;
    cursor: pointer;
    border-radius: 8px;
    width: -webkit-fill-available;

    &:active {
      scale: 0.99;
    }

    & > span {
      display: ${({ $open }) => ($open ? 'none' : 'inline')};
    }

    @media ${({ theme }) => theme.windowSize.lg} {
      & > span {
        display: none;
      }
    }

    transition: backdrop-filter 0.2s ease-in-out;

    &:hover {
      backdrop-filter: brightness(0.93);

      & svg {
        stroke: black;
        stroke-width: 1;
      }
    }
  }
`;

Interact.defaultProps = {
  'data-id': 'Interact',
};
