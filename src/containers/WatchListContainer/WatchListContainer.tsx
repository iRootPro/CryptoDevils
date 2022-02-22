import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { selectWatchListIds } from '../../redux/selectors/watchListSelectors';
import { useGetCoinsByIdsQuery } from '../../services/api';
import { WatchList } from '../../components/components';
import useDataCoins from '../../hooks/useDataCoins';

const WatchListContainer: FC = () => {
    const watchListId: string[] = useAppSelector(selectWatchListIds);
    const watchListString = watchListId.join(',');

    let skip = false;

    if (!watchListString) {
        skip = true;
    }

    const { data, refetch } = useGetCoinsByIdsQuery(
        {
            currency: 'usd',
            ids: watchListString,
            perPage: 250,
        },
        { skip },
    );

    const dataCoins = useDataCoins(refetch, data);

    return <WatchList dataCoins={!watchListString ? [] : dataCoins} />;
};

export default WatchListContainer;
