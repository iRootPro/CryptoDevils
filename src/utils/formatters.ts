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

export const formatUSDforTableMoney: TnumberFormatter = (number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
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

export const formatUSDNoDecimal: TnumberFormatter = (number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);

type TformatUrl = (url: string) => string;

export const formatUrl: TformatUrl = (url) => {
    const lastChar = url.length - 1;
    if (url[lastChar] === '/') {
        // eslint-disable-next-line no-param-reassign
        url = url.substring(0, lastChar);
    }
    const formattedUrl = url.replace(/^https?:\/\//, '');
    return formattedUrl.length > 15
        ? `${formattedUrl.substring(0, 15)}...`
        : formattedUrl;
};

type TformatName = (name: string) => string;

export const formatName: TformatName = (name) =>
    name.length > 15 ? `${name.substring(0, 15)}...` : name;

export const formatSymbol: TformatName = (symbol) =>
    symbol.length > 7 ? `${symbol.substring(0, 7)}...` : symbol;

export const formatSupplySymbol: TformatName = (symbol) =>
    symbol.length > 5 ? `${symbol.substring(0, 5)}...` : symbol;

type TformatDescription = (description: string, width: number) => string

export const formatDescription: TformatDescription = (description, width) => {
    let formattedText = description
    if (description.length > 1250) {
        if (width <= 991) {
            formattedText = description;
        } else if (width <= 1280) {
            formattedText = `${formattedText.substring(0, 1550)}...`
        } else if (width <= 1430) {
            formattedText = description;
        } else if (width <= 1462) {
            formattedText = `${formattedText.substring(0, 850)}...`
        } else if (width <= 1600) {
            formattedText = `${formattedText.substring(0, 950)}...`
        } else if (width <= 1732) {
            formattedText = `${formattedText.substring(0, 1050)}...`
        } else if (width > 1732) {
            formattedText = `${formattedText.substring(0, 1250)}...`
        }
    } else {
        formattedText = description;
    }
    return formattedText
}