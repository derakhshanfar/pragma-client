import { renderHook } from '@testing-library/react-hooks';
import { useAsyncSetInterval } from './useInterval';

describe('useAsyncSetInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should not call the callback when initiate', async () => {
    const fn = jest.fn();
    const delay = 500;
    const wait = 3;
    renderHook(() => useAsyncSetInterval(fn, delay));

    for (let i = 0; i < wait; i++) {
      jest.advanceTimersByTime(delay);
      await Promise.resolve();
    }

    expect(fn).toBeCalledTimes(wait);
  });

  it('should call the callback when initiate', async () => {
    const fn = jest.fn();
    const delay = 500;
    const wait = 3;
    renderHook(() => useAsyncSetInterval(fn, delay, { immediate: true }));

    for (let i = 0; i < wait; i++) {
      jest.advanceTimersByTime(delay);
      await Promise.resolve();
    }

    expect(fn).toBeCalledTimes(wait + 1);
  });
});
