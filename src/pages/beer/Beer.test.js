import { render, cleanup, waitFor } from '@testing-library/react';
import Beer from './Beer';
import http from '../../helpers/Http';
jest.mock('../../helpers/Http');

const mockChildComponent = jest.fn();
jest.mock('./components/BeerItem', () => (props) => {
  mockChildComponent(props);
  return <tr />;
});
describe('Beer component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('getData should call immediate after mount and should continue later', async () => {
    const apiResponse = {
      id: '1',
      name: 'tset',
      temperature: 10,
      status: 'normal',
    };
    const fn = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve([apiResponse]),
      });
    });

    http.mockImplementation(fn);

    render(<Beer />);
    expect(fn).toBeCalledTimes(1); // immediate call after;

    await waitFor(() => {
      expect(fn).toBeCalledTimes(3);
    });
  });

  it('should render beer item with valid props', async () => {
    const apiResponse = {
      id: '1',
      name: 'tset',
      temperature: 10,
      status: 'normal',
    };
    const fn = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve([apiResponse]),
      });
    });

    http.mockImplementation(fn);

    render(<Beer />);
    await waitFor(() => {
      expect(mockChildComponent).toHaveBeenCalledWith(
        expect.objectContaining(apiResponse)
      );
    });
  });
});
