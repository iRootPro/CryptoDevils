import { FC, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Input, Select, Button } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';
import styles from './ModalSearch.module.scss';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { GroupProps } from 'antd/lib/input';
import { SearchOutlined } from '@ant-design/icons';

type searchprops = {
    select: boolean;
    selectProps: {
        defaultValue: string;
    };
    onSearch: (data: {}) => void;
    selectOptions: number[];
    placeholder: string;
};

const ModalSearch: FC<searchprops> = ({
    select,
    selectProps,
    onSearch,
    selectOptions,
    placeholder,
}) => {
    const size = 'default';
    const initialSelectValue =
        select && selectProps ? selectProps.defaultValue : '';
    const [clearVisible, setClearVisible] = useState(false);
    const [selectValue, setSelectValue] = useState('');

    const handleSearch = () => {
        // const data = {
        //     modal: ReactDOM.findDOMNode(this.refs.searchInput).value,
        // };
        // if (select) {
        //     data.modal = selectValue;
        // }
        // if (onSearch) onSearch(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClearVisible(e.target.value !== '');
    };

    const handleSelectChange = (value: string) => {
        setSelectValue(value);
    };

    const handleClearInput = () => {
        // ReactDOM.findDOMNode(this.refs.searchInput).value = '';
        setClearVisible(false);
        // handleSearch();
    };

    return (
        <Input.Group compact size={size} className={styles.search}>
            <Input
                prefix={<SearchOutlined style={{ marginRight: '5px' }} />}
                onChange={handleInputChange}
                onPressEnter={handleSearch}
                placeholder={placeholder}
            />
            {clearVisible && <Icon type='cross' onClick={handleClearInput} />}
        </Input.Group>
    );
};

export default ModalSearch;
