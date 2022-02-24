import { FC, useCallback, useLayoutEffect, useState } from 'react';
import { Select } from 'antd';
import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useGetCoinsListQuery } from '../../services/api';
import ROUTES from '../../constants/routes';
import { useAppDispatch } from '../../hooks/redux';
import { setSelectCoinForTrade } from '../../redux/reducers/portfolioSlice';
import { selectSelectedCoinForTrade } from '../../redux/selectors/portfolioSelectors';

import useWindowDimensions from '../../hooks/useWindowDimension';

const { Option } = Select;

type OptionT = DefaultOptionType | BaseOptionType | undefined;

type typeProps = {
    // eslint-disable-next-line react/require-default-props
    getId?: boolean;
};

const SearchEngine: FC<typeProps> = ({ getId }) => {
    const { data } = useGetCoinsListQuery('');
    const dispatch = useAppDispatch();
    const history = useHistory();
    const selectedCoinForTrade = useSelector(selectSelectedCoinForTrade);
    const { width } = useWindowDimensions();

    const handlerOnSelect = useCallback((e: string) => {
        if (getId) {
            dispatch(setSelectCoinForTrade(e));
        } else {
            history.push(`${ROUTES.coin}/${e}`);
        }
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

    const [searchWidth, setSearchWidth] = useState<string>('100%');

    useLayoutEffect(() => {
        if (width > 810) setSearchWidth('400px');
        else setSearchWidth('100%');
    }, [width]);

    return (
        <Select
            showSearch
            allowClear
            style={{
                width: '100%',
                maxWidth: searchWidth,
                borderRadius: 10,
            }}
            value={getId ? selectedCoinForTrade : null}
            onSelect={handlerOnSelect}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={filterOption}
            filterSort={filterSort}
        >
            {options}
        </Select>
    );
};

export default SearchEngine;
