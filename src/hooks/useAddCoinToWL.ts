import {
    addCoinToWatchList,
    removeCoinFromWatchList,
} from '../redux/reducers/watchListSlice';
import {
    selectWatchList,
    selectWatchListIds,
} from '../redux/selectors/watchListSelectors';
import { ICoin, ICoinWL } from '../types/ICoin';
import { useAppDispatch, useAppSelector } from './redux';

const useAddCoinToWL = () => {
    const watchList: ICoinWL[] = useAppSelector(selectWatchList);
    const watchListIds: string[] = useAppSelector(selectWatchListIds);

    const dispatch = useAppDispatch();

    const handleOnStar = (coin: ICoin | ICoinWL) => {
        const preparedCoin = {
            name: coin.name,
            id: coin.id,
            image: coin.image,
            symbol: coin.symbol,
        };

        if (!watchList.length) {
            dispatch(addCoinToWatchList(preparedCoin));
            return;
        }

        const findedElem = watchList.find(
            (findedCoin) => findedCoin.id === preparedCoin.id,
        );

        if (findedElem) {
            dispatch(removeCoinFromWatchList(findedElem));
        } else {
            dispatch(addCoinToWatchList(preparedCoin));
        }
    };

    return {
        watchListIds,
        handleOnStar,
    };
};

export default useAddCoinToWL;
