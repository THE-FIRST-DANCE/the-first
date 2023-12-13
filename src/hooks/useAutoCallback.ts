import { useEffect, useRef } from 'react';

/**
 * Calls the provided callback function after a specified delay, unless the status array changes.
 * @param status An array of dependencies that, when changed, will cancel the callback.
 * @param callback The function to be called after the delay.
 * @param delay The delay, in milliseconds, before the callback is called. Defaults to 1000ms.
 */
export default function useAutoCallback(
  status: any[],
  callback: Function,
  delay?: number
) {
  const renderRef = useRef(0); // 0: initial render, 1: after initial render
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (renderRef.current === 0) {
        renderRef.current = 1;
        return;
      }
      callback();
      // console.log('callback called');
    }, delay || 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [...status, delay]);
}
