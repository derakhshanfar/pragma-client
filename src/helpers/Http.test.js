import http from './Http';

describe('Http', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should get timeout error if timeout exceeds', async () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    jest.spyOn(global, 'fetch').mockImplementation(spy);
    jest.spyOn(global, 'AbortController').mockImplementation(function () {
      this.abort = spy2;
      this.signal = 'test';
    });

    const timeout = 1;
    const url = '/test';
    http(url, {
      timeout,
    });

    jest.advanceTimersByTime(timeout + 1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url, {
      signal: 'test',
      timeout,
    });
  });
});
