import React, {FC} from 'react';

export const Margin:FC<typeProps> = ({children, offset}) => {
    return (
        <div style={{margin: `${offset}`}}>
            {children}
        </div>
    );
};

type typeProps = {
    offset: string
}


