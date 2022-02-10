export default interface ICoin {
    name: 'string';
    id: 'string'
    image: {
        small: 'string'
    }
    market_data: {
        current_price: {
            rub: number,
            usd: number
        },
        price_change_percentage_24h_in_currency: {
            usd: number
        },
        market_cap: {
            usd: number
        }
    }
}