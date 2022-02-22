import React, { FC } from 'react';
import { Spin, Space } from 'antd';
import { useGetCoinMarketChartByIdQuery } from '../../services/api';
import MiniChart from './MiniChart';
import style from './MiniChartStyles.module.scss';

interface IMiniChartContainer {
    id: string;
}

// eslint-disable-next-line react/prop-types
const MiniChartContainer: FC<IMiniChartContainer> = React.memo(({ id }) => {
    const { data, isFetching } = useGetCoinMarketChartByIdQuery(id);

    if (isFetching)
        return (
            <div id="conteinerMiniChart" className={style.isFetchingStyle}>
                <Space size="middle">
                    <Spin />
                </Space>
            </div>
        );
    if (!data) return null;

    const { prices } = data;
    const priceDifference = prices[0][1] - prices[prices.length - 1][1];
    const color = priceDifference > 0 ? '#FF0000' : '#00FF00';

    return <MiniChart data={prices} color={color} />;
});

export default MiniChartContainer;
