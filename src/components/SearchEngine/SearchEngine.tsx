import { FC, useCallback } from 'react';
import { Select } from 'antd';
import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import { useGetCoinsListQuery } from '../../services/api';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const { Option } = Select;

const SearchEngine: FC = () => {
    const { data } = useGetCoinsListQuery('');
    const history = useHistory();

    const handlerOnSelect = useCallback((e: string) => {
        history.push(ROUTES.coin + '/' + e);
    }, []);

    const filterOption = useCallback(
        (input: string, option: OptionT) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) === 0,
        [],
    );

    const filterSort = useCallback(
        (optionA, optionB) =>
            optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase()),
        [],
    );

    const options = data?.map((d) => <Option key={d.id}>{d.name}</Option>);

    return (
        <Select
            showSearch
            allowClear
            style={{ width: '300px' }}
            value={null}
            onSelect={handlerOnSelect}
            placeholder='Search to Select'
            optionFilterProp='children'
            filterOption={filterOption}
            filterSort={filterSort}>
            {options}
        </Select>
    );
};

type OptionT = DefaultOptionType | BaseOptionType | undefined;

export default SearchEngine;
