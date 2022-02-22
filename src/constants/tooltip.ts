type Ttooltip = {
    marketCap: string;
    volume: string;
    supply: string;
};

const tooltip: Ttooltip = {
    marketCap: `The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.`,
    volume: `A measure of how much of a cryptocurrency was traded in the last 24 hours.`,
    supply: `The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.`,
};

export default tooltip;
