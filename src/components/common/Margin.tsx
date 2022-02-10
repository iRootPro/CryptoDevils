import React, {FC} from 'react';

export const Margin:FC<typeProps> = ({
                                         children,
                                         horizontal = '0px',
                                         vertical='0px'}) => {
    return (
        <div style={{margin: `${vertical} ${horizontal}`}}>
            {children}
        </div>
    );
};

type typeProps = {
    horizontal?: string
    vertical?: string
}


