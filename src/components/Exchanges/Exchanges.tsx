
import { Avatar, BackTop, Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Link from 'antd/lib/typography/Link';
import Text from 'antd/lib/typography/Text';
import { FC, useCallback, useState } from 'react';
import { IExchanges } from '../../types/IExchangesList';
import style from './Exchanges.module.scss';

type IExchangesProps = {
    data: IExchanges[],
};

const Exchanges: FC<IExchangesProps> = ({ data }) => {
    const [pageSize, setPageSize] = useState(50);

    const onChangeTable = useCallback(
        (pagination: TablePaginationConfig) => {
            if (pagination.pageSize) setPageSize(pagination.pageSize);
        },
        [pageSize],
    );

    const columns: ColumnsType<IExchanges> = [
        {
            title: 'Exchange',
            dataIndex: ['name', 'image'],
            sorter: {
                // eslint-disable-next-line no-nested-ternary
                compare: (a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0,
                multiple: 3,
            },
            render: (value, record) => {
                const { name, image, url } = record;
                const card = 
                    <div className={style.wrapper}>
                        <Avatar src={image} />
                        <Text className={`${style.name}`}>{name}</Text>
                    </div>;
                return (url.length > 0
                    ? <Link href={url} target="_blank">{card}</Link>
                    : card
                );
            },
        },
        {                                                                                  
            title: 'Trust score',
            sorter: (a, b) =>
                a.trust_score - b.trust_score,
            dataIndex: 'trust_score',
        },
        {
            title: 'Trade volume 24h btc',
            dataIndex: 'trade_volume_24h_btc',
            sorter: (a, b) => a.trade_volume_24h_btc - b.trade_volume_24h_btc,
            render: (volume) => volume.toFixed(2),
        },
        {
            title: 'Year established',
            dataIndex: 'year_established',
        },
        {
            title: 'Country',
            dataIndex: 'country',
        },
    ];

    return (
        <div>
            <BackTop />
            <Table
                columns={columns}
                dataSource={data}
                rowKey='id'
                onChange={onChangeTable}
                pagination={{ pageSize, position: ['bottomCenter'] }}
                scroll={{ x: 600 }}
            />
        </div>
    );
}

export default Exchanges;
