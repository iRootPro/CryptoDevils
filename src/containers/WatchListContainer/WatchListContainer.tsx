import { FC, useLayoutEffect, useMemo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import {
    selectWatchList,
    selectWatchListIds,
} from '../../redux/selectors/watchListSelectors';
import { useGetCoinsByIdsQuery } from '../../services/api';
import { ICoinRaw, ICoinsNormalized, ICoinWL } from '../../types/ICoin';
import { WatchList } from '../../components/components';
import { useDataCoins } from '../../hooks/useDataCoins';

const WatchListContainer: FC = () => {
    const watchListId: string[] = useAppSelector(selectWatchListIds);
    const watchListString = watchListId.join(',');

    let skip = false;

    let dataCoins: ICoinsNormalized;

    if (!watchListString) {
        skip = true;
    }

    let { data, refetch } = useGetCoinsByIdsQuery(
        {
            currency: 'usd',
            ids: watchListString,
            perPage: 250,
        },
        { skip },
    );

    dataCoins = useDataCoins(data, refetch);

    return <WatchList dataCoins={!watchListString ? [] : dataCoins} />;
};

export default WatchListContainer;
