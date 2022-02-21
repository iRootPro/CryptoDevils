import {FC, useCallback} from 'react';
import {Select} from 'antd';
import {BaseOptionType, DefaultOptionType} from 'antd/lib/select';
import {useGetCoinsListQuery} from '../../services/api';
import {useHistory} from 'react-router-dom';
import {ROUTES} from "../../constants/routes";
import {useAppDispatch} from "../../hooks/redux";
import {setSelectCoinForTrade} from "../../redux/reducers/portfolioSlice";
import {selectSelectedCoinForTrade} from "../../redux/selectors/portfolioSelectors";
import {useSelector} from "react-redux";

const { Option } = Select;

type typeProps = {
    getId?: boolean
}

const SearchEngine: FC<typeProps> = ({getId = false}) => {
    const { data } = useGetCoinsListQuery('');
    const dispatch = useAppDispatch()
    const history = useHistory();
    const selectedCoinForTrade = useSelector(selectSelectedCoinForTrade);

    const handlerOnSelect = useCallback((e: string) => {
        if(getId) {
            dispatch(setSelectCoinForTrade(e))
        } else {
            history.push(ROUTES.coin + '/' + e);
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

    return (
        <Select
            showSearch
            allowClear
            style={{ width: '300px', borderRadius: 10 }}
            value={ getId ? selectedCoinForTrade : null }
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
