export interface ICoinListItem {
    id: string;
    symbol: string;
    name: string;
}

export type ICoinList = ICoinListItem[];

export interface ICoinListItemWL {
    id: string;
    symbol: string;
    name: string;
    image: string;
}

export type ICoinListWL = ICoinListItemWL[] | undefined;
