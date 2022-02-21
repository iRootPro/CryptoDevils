import {FC} from 'react';
import {useAppSelector} from '../../hooks/redux';
import {selectWatchListIds,} from '../../redux/selectors/watchListSelectors';
import {useGetCoinsByIdsQuery} from '../../services/api';
import {ICoinsNormalized} from '../../types/ICoin';
import {WatchList} from '../../components/components';
import {useDataCoins} from '../../hooks/useDataCoins';

const WatchListContainer: FC = () => {
    const watchListId: string[] = useAppSelector(selectWatchListIds);
    const watchListString = watchListId.join(',');

    let dataCoins: ICoinsNormalized;

    const {data, refetch} = useGetCoinsByIdsQuery({
        currency: 'usd',
        ids: watchListString,
    });

    dataCoins = useDataCoins(data, refetch);

    return watchListString ? (
        <>
            <WatchList dataCoins={dataCoins}/>
        </>
    ) : (
        <WatchList dataCoins={[]}/>
    );
};

export default WatchListContainer;
