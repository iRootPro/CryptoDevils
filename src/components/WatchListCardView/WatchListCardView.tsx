import { Col, Row } from 'antd';
import { FC } from 'react';
import { ICoinsData } from '../../types/ICoin';
import WatchListCardItem from './WatchListCardItem/WatchListCardItem';

const WatchListCardView: FC<ICoinsData> = ({ dataCoins }) => {
    const cols = dataCoins?.map((item) => (
        <Col
            key={`WL_card_item_col_${item.id}`}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={8}
            xxl={6}
        >
            <WatchListCardItem
                name={item.name}
                id={item.id}
                key={`WL_card_item_${item.id}`}
                symbol={item.symbol}
                rank={item.rank}
                dailychange={item.dailychange}
                price={item.price}
                image={item.image}
                marketcap={item.marketcap}
            />
        </Col>
    ));

    return <Row gutter={[16, 16]}>{cols}</Row>;
};

export default WatchListCardView;
