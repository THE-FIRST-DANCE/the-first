import { useState } from 'react';

const useToggle = (initValue?: boolean) => {
  const [isOpen, setOpen] = useState(initValue || false);

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const toggle = () => {
    setOpen(!isOpen);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useToggle;
