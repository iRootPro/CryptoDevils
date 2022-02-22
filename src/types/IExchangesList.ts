export interface IExchanges {
    id: string,
    name: string,
    year_established: number | null,
    country: string | null,
    description: string,
    url: string,
    image: string,
    has_trading_incentive: boolean | null,
    trust_score: number,
    trust_score_rank: number,
    trade_volume_24h_btc: number,
    trade_volume_24h_btc_normalized: number,
};

export interface IExchangesListRequest {
    per_page: number,
    page: number,
}
