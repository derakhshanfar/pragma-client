import { useEffect, useRef } from 'react';

export function useAsyncSetInterval(callback, delay, { immediate } = {}) {
  if (typeof callback !== 'function') {
    throw new Error('CallBack should be a function')
  }
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (!immediate) return;
    if (delay === null || delay === false) return;
    savedCallback.current();
  }, [immediate, delay]);

  useEffect(() => {
    if (delay !== null) {
      let timeoutId;
      const run = () => {
        timeoutId = setTimeout(async () => {
          await savedCallback.current();
          run();
        }, delay);
      };
      run();
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [delay]);
}

export function useInterval(callback, delay) {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => {clearInterval(interval) };
    }

    return undefined;
  }, [delay]);
};