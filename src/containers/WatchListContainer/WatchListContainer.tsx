import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { selectWatchList } from "../../redux/selectors/watchListSelectors";
import { useGetCoinsByIdsQuery } from "../../services/api";
import { ICoinsNormalized } from "../../types/ICoin";
import { WatchList } from "../../components/components";
import { useDataCoins } from "../../hooks/useDataCoins";

const WatchListContainer: FC = () => {
    const watchList: string[] = useAppSelector(selectWatchList).data;

    // console.log(watchList);

    let dataCoins: ICoinsNormalized;
    
    // if (watchList.length) {
        const watchListString = watchList.join(',')
        
        const { data, refetch } = useGetCoinsByIdsQuery({currency: 'usd', ids: watchListString});
    
        dataCoins = useDataCoins(data, refetch)
    // }
    
    return (
        !watchList.length ? <WatchList dataCoins={undefined}/> : <WatchList dataCoins={dataCoins}/>
    )
}

export default WatchListContainer
