import { ICoinRaw, ICoinsResponse } from '../types/ICoin';
import { ICoinListWL } from '../types/ICoinList';

type IUseDataCoins = (data: ICoinsResponse) => ICoinListWL;

const useListDataCoins: IUseDataCoins = (data) => {
    const dataCoins: ICoinListWL = data?.map((coin: ICoinRaw) => ({
        id: coin.id,
        name: coin.name,
        image: coin.image,
        symbol: coin.symbol,
    }));

    return dataCoins;
};

export default useListDataCoins;
