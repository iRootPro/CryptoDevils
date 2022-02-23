import React, { FC } from 'react';
import {Typography} from 'antd'

const {Text} = Typography

type typeProps = {
    text: string
}

const InfoError:FC<typeProps> = ({text}) => (
    <Text style={{color: 'red', margin: 5}}>{text}</Text>
);

export default InfoError
