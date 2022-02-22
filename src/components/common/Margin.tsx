/* eslint-disable react/require-default-props */
import React, { FC } from 'react';

type typeProps = {
    horizontal?: string;
    vertical?: string;
};

const Margin: FC<typeProps> = ({
    children,
    horizontal = '0px',
    vertical = '0px',
}) => <div style={{ margin: `${vertical} ${horizontal}` }}>{children}</div>;

export default Margin;
