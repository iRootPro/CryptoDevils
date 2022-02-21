type TdateFormatter = (data: string) => string;

export const formatDate: TdateFormatter = (data) => {
    const date = new Date(data);
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

type TnumberFormatter = (number: number) => string;

export const formatUSD: TnumberFormatter = (number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 7,
    }).format(number);

export const formatUSDforTable: TnumberFormatter = (number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 5,
    }).format(number);

export const formatPercent: TnumberFormatter = (number) =>
    new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(number);

export const formatCrypto: TnumberFormatter = (number) =>
    new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 10,
    }).format(number);

export const formatSupply: TnumberFormatter = (number) =>
    new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);

type TformatUrl = (url: string) => string;

export const formatUrl: TformatUrl = (url) => {
    const lastChar = url.length - 1;
    if (url[lastChar] === '/') {
        url = url.substring(0, lastChar);
    }
    const formattedUrl = url.replace(/^https?:\/\//, '');
    return formattedUrl.length > 15
        ? `${formattedUrl.substring(0, 15)}...`
        : formattedUrl;
};

type TformatName = (name: string) => string;

export const formatName: TformatName = (name) => {
    return name.length > 20 ? `${name.substring(0, 20)}...` : name;
};

export const formatSymbol: TformatName = (symbol) => {
    return symbol.length > 15 ? `${symbol.substring(0, 15)}...` : symbol;
};

export const formatSupplySymbol: TformatName = (symbol) => {
    return symbol.length > 5 ? `${symbol.substring(0, 5)}...` : symbol;
};

export const formatDescription: TformatName = (description) => {
    return description.length > 1250
        ? `${description.substring(0, 1250)}...`
        : description;
};
