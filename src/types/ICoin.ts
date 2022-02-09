export interface ICoin {
    id: 'string'
    image: {
        small: 'string'
    }
    market_data: {
        current_price: {
            rub: 'string',
            usd: 'string'
        }
    }
}