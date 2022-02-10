export default interface ICoin {
  name: "string";
  id: "string";
  image: "string";
  current_price: number;
  market_cap: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  symbol: 'string';
}
