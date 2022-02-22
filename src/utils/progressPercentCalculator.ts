type TprogressValue = (
    lowPrice24h: number,
    highPrice24h: number,
    currentPrice: number,
) => number;

const progressValue: TprogressValue = (
    lowPrice24h,
    highPrice24h,
    currentPrice,
) =>
    Math.round(
        (currentPrice - lowPrice24h) / ((highPrice24h - lowPrice24h) / 100),
    );

export default progressValue;
