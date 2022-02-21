import React, {FC, useState} from 'react';
import {useGetCoinByIdOHLCQuery} from '../../services/api';
import {configureOptions} from './ChartOptions';
import Chart from './Chart';
import Loader from '../Loader/Loader';

const ChartContainer: FC<TPropsChartContainer> = React.memo(function ({id, averagePrice}) {
    const [days, setDays] = useState<number | string>(30);
    const {data, isLoading} = useGetCoinByIdOHLCQuery({id, days});

    if (isLoading) return <Loader/>
    if (!data) return null;

    const options = configureOptions({setDays, data, name: id, averagePrice});
    return <Chart options={options}/>
});

type TPropsChartContainer = { id: string, averagePrice?: number };

export default ChartContainer;
