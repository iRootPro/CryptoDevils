type isOverflown = (el: HTMLDivElement) => boolean;
type ratio = (el: HTMLDivElement) => number;

const isOverflownWidth: isOverflown = ({ clientWidth, scrollWidth }) =>
    scrollWidth > clientWidth;

const clientScrollRatioPercentage: ratio = ({ clientWidth, scrollWidth }) =>
    (scrollWidth / clientWidth) * 100;

export { isOverflownWidth, clientScrollRatioPercentage };
