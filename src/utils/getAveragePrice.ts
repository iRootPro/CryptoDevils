import {TradeType} from "../redux/reducers/portfolioSlice";

const getAveragePrice = (trades: Array<TradeType>) => {
    let sum: number = 0
    let quantity: number = 0
    trades.forEach(trade => {
        quantity += trade.quantity
        sum += trade.price * trade.quantity
    })
    return sum/quantity
}

export default getAveragePrice
