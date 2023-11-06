import useModal from '@hooks/useModal';
import { useRef } from 'react';
import styled from 'styled-components';

interface ModalProps {
  window: React.ReactNode;
  children: React.ReactNode;
  position?: Position;
}

/**
 * 모달 컴포넌트입니다.
 * @param {ModalProps} props - 모달에 필요한 속성들을 담은 객체입니다.
 * @returns  모달 컴포넌트를 반환합니다.
 */
const Modal = (props: ModalProps) => {
  const { open, openModal, closeModal } = useModal();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        {props.children}
      </button>
      <Background onClick={handleClickOutside} open={open}>
        <Window position={props.position} ref={ref}>
          {props.window}
        </Window>
      </Background>
    </>
  );
};

export default Modal;

const Background = styled.div<{ open: boolean }>`
  position: fixed;
  display: ${(props) => (props.open ? 'flex' : 'none')};

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;

type Position =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

const Window = styled.div<{ position?: Position }>`
  margin: ${(props) => {
    switch (props.position) {
      case 'left':
        return 'auto 0';
      case 'right':
        return 'auto 0 auto auto';
      case 'top':
        return '0 auto auto auto';
      case 'bottom':
        return 'auto auto 0 auto';
      case 'center':
        return 'auto auto';
      case 'top-left':
        return '0';
      case 'top-right':
        return '0 0 0 auto';
      case 'bottom-left':
        return 'auto 0 0 0';
      case 'bottom-right':
        return 'auto 0 0 auto';
      default:
        return 'auto';
    }
  }};
`;
