import React, {FC} from 'react';

export const Margin: FC<typeProps> = ({
                                          children,
                                          horizontal = '0px',
                                          vertical = '0px',
                                      }) => (
    <div style={{margin: `${vertical} ${horizontal}`}}>
        {children}
    </div>
);

type typeProps = {
    horizontal?: string
    vertical?: string
}
