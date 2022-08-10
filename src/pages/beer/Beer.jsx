import { useState } from 'react';
import BeerItem from './components/BeerItem';
import http from '../../helpers/Http';
import { useAsyncSetInterval } from './hooks/useInterval';
const Beer = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const getData = async () => {
    return http('api/v1/beers')
      .then((response) => response.json())
      .then((response) => {
        if (error) {
          setError(false)
        }
        setItems(response);
      })
      .catch((e) => {
        setError(true)
      });
  };

  useAsyncSetInterval(getData, 1000, {
    immediate: true,
  });

  return (
    <>
    {error && <p> There is an error while getting data. This data is not the latest result </p>}
    <table>
      <thead>
        <tr>
          <th align="left">Product</th>
          <th align="left">Temperature</th>
          <th align="left">Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <BeerItem key={item.id} {...item} />
        ))}
      </tbody>
    </table>
    </>

  );
};

export default Beer;
