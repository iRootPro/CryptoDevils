export interface ICoinRaw {
    name: string;
    id: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
    symbol: string;
}
export interface ICoin {
    symbol: string;
    id: string;
    rank: number;
    dailychange: number;
    key: string;
    name: string;
    price: number;
    image: string;
    marketcap: number;
}

export interface ICoinWL {
    name: string;
    id: string;
    image: string;
    symbol: string;
}
export interface ICoinCard {
    name: string;
    id: string;
    image: string;
    symbol: string;
    type: 'cryptocurrencies' | 'watchlist-modal-list' | 'watchlist-modal-tag';
}

export type ICoinsResponse = ICoinRaw[] | undefined;
export type ICoinsNormalized = ICoin[] | undefined;

export type ICoinsData = {
    dataCoins: ICoinsNormalized;
};
