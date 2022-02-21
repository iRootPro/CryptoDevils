import React, { FC, useEffect, useState } from 'react';
import { SeriesOptionsType } from 'highcharts';
import { useGetCoinByIdOHLCQuery } from '../../services/api';
import { configureOptions } from './ChartOptions';
import Chart from './Chart';
import Loader from '../Loader/Loader';

const ChartContainer: FC<TPropsChartContainer> = React.memo(function({ id, averagePrice }) {
    const [days, setDays] = useState<number | 'max'>(30);
    const [selected, setSelected] = useState(1);

    const { data, isLoading } = useGetCoinByIdOHLCQuery({ id, days });

    const [options, setOptions] = useState(
        configureOptions({ setDays, data, name: id, averagePrice, selected, setSelected })
    );
    const series: SeriesOptionsType[] = [{
        type: 'candlestick',
        id: 'main',
        name: id,
        data,
    }];

    useEffect(() => {
        const rangeSelector = options.rangeSelector;
        setOptions({...options, series, rangeSelector: {...rangeSelector, selected} })
    }, [data]);

    if (isLoading) return <Loader />
    if (!data) return null;

    return <Chart options={options} />
});

type TPropsChartContainer = { id: string, averagePrice?: number };

export default ChartContainer;
