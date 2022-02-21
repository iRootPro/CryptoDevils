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
export type ICoinsNormalized = ICoin[];

export type ICoinsData = {
    dataCoins: ICoinsNormalized;
};

export type ICoinIdData = {
    id: string;
    symbol: string;
    name: string;
    description: {
        en: string;
    };
    links: {
        homepage: string[];
        blockchain_site: string[];
        official_forum_url: string[];
        chat_url: string[];
        subreddit_url: string;
        repos_url: {
            github: string[];
        };
    };
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    country_origin: string;
    genesis_date: string;
    market_cap_rank: number;
    categories: string[];
    market_data: {
        current_price: {
            usd: number;
            btc: number;
            eth: number;
        };
        ath: {
            usd: number;
        };
        ath_change_percentage: {
            usd: number;
        };
        ath_date: {
            usd: string;
        };
        circulating_supply: number;
        market_cap: {
            usd: number;
        };
        high_24h: {
            usd: number;
        };
        low_24h: {
            usd: number;
        };
        market_cap_change_percentage_24h: number;
        price_change_percentage_24h_in_currency: {
            usd: number;
            btc: number;
            eth: number;
        };
        price_change_percentage_24h: number;
        total_volume: {
            usd: number;
        };
        total_supply: number;
    };
    sentiment_votes_down_percentage: number;
    sentiment_votes_up_percentage: number;
};
