export interface ICoin {
    name: string;
    id: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
    symbol: string;
    isFavorite: boolean;
}

export type ICoinData = {
    coin: ICoin;
    rank: number;
    dailychange: number;
    key: string;
    name: string;
    price: number;
    image: string;
    marketcap: number;
};

export type ICoinID = {
    id: string;
};

export type CryptocurranciesProps = {
    dataCoins: ICoinData[] | undefined;
};
