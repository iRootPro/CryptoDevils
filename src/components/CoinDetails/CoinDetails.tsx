import { Card, Col, Row } from 'antd';

import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetCoinByIdQuery } from '../../services/api';
import Loader from '../Loader/Loader';
import CoinData from './CoinData/CoinData';
import CoinInfo from './CoinInfo/CoinInfo';

import { Chart } from '../Chart';

type CoinParams = {
    id: string;
};

const CoinDetails: FC = () => {
    const { id: coinId } = useParams<CoinParams>();
    const { data, isFetching, isLoading, refetch } =
        useGetCoinByIdQuery(coinId);
    if (isLoading) return <Loader />;
    return (
        <Row>
            {data && (
                <>
                    <CoinInfo data={data} isFetching={isFetching} />
                    <CoinData data={data} refetch={refetch} />
                    <Col span={24} style={{marginTop: 10}}>
                        <Card>
                            <Chart id={coinId} />
                        </Card>
                    </Col>
                </>
            )}
        </Row>
    );
};

export default CoinDetails;
