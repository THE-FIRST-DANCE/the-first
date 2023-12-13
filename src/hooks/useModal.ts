import { useEffect, useRef } from 'react';
import useToggle from './useToggle';

interface ModalOptions {
  timeout?: number;
  clickOutsideToClose?: boolean;
}

const useModal = (
  options: ModalOptions = {
    clickOutsideToClose: true,
  }
) => {
  const toggler = useToggle();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    e.target === ref.current && toggler.close();
  };

  const handleClickInside = (e: MouseEvent) => {
    e.target !== ref.current && toggler.close();
  };

  useEffect(() => {
    if (options?.clickOutsideToClose) {
      ref.current?.addEventListener('click', handleClickOutside);
      return () => {
        ref.current?.removeEventListener('click', handleClickOutside);
      };
    } else {
      ref.current?.addEventListener('click', handleClickInside);
      return () => {
        ref.current?.removeEventListener('click', handleClickInside);
      };
    }
  });

  return { ref, toggler };
};

export default useModal;
