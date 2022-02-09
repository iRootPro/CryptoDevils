import React from 'react';
import './App.css';
import Loader from './components/Loader/Loader';
import { useGetCoinsQuery } from './services/api';


function App() {
  const { data, isFetching } = useGetCoinsQuery('')
  if (!isFetching) return <Loader />
  console.log(data?.[0])
  return (
    <>
      {data?.map((coin) => (
        <div key={`coin ${coin.id}`}>
          <img src={coin.image.small} />
          <h1>{coin.id}</h1>
          <p>{coin.market_data.current_price.rub} / {coin.market_data.current_price.usd}</p>
        </div>
      ))}
    </>
  );
}

export default App;

