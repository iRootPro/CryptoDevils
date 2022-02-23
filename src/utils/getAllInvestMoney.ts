import {useSelector} from "react-redux";
import {selectPortfolios} from "../redux/selectors/portfolioSelectors";
import {PortfolioType} from "../redux/reducers/portfolioSlice";
import {useGetCoinsByIdsQuery} from "../services/api";

type AllInvestMoneyType = {
    summaryInvest: number,
    summaryDataMarket: number
}

const getAllPortfoliosTrades = (portfolios: Array<PortfolioType>) => portfolios.map(p => Object.values(p.trades)).flat(2)

const getAllCoins = (portfolios: Array<PortfolioType>) => {
    const allCoins: Array<string> = []
    portfolios.map(p => Object.keys(p.trades).flat(2).forEach(item => allCoins.push(item.toLowerCase())))
    return  Array.from(new Set(allCoins))
}

const getAllInvestMoney = (): AllInvestMoneyType => {
    const portfolios = useSelector(selectPortfolios)
    const allCoins = getAllCoins(portfolios)
    const {data} = useGetCoinsByIdsQuery({
        currency: 'usd',
        ids: allCoins.join(',')
    })
    const allTrades = getAllPortfoliosTrades(portfolios)
    let summary: number = 0
    let summaryDataMarket: number = 0
    allTrades.forEach(trade => {
        summary += trade.quantity * trade.price
    })

    allTrades.forEach(trade => {
        const foundCoin = data?.find(c => trade.coin === c.name)
        if(foundCoin) {
            summaryDataMarket += trade.quantity * foundCoin.current_price
        }
    })

    return {
        summaryInvest: summary,
        summaryDataMarket,
    }
}

export default getAllInvestMoney
