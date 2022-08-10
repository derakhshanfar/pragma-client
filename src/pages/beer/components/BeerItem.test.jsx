import { render, screen } from '@testing-library/react';
import BeerItem from './BeerItem';

describe('Beer Item', () => {
  it('should render row', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const beer = 'test';
    const temperature = '10';
    const status = 'normal';
    render(<BeerItem name={beer} temperature={temperature} status={status} />, {
      container: document.body.appendChild(tbody),
    });

    const row = screen.getByRole('row');
    const columns = row.querySelectorAll('td');
    expect(columns.length).toBe(3);
    expect(columns[0]).toHaveTextContent(beer);
    expect(columns[1]).toHaveTextContent(temperature);
    expect(columns[2]).toHaveTextContent(status);
  });
});
