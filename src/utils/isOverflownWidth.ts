type element = (el: HTMLDivElement) => boolean;

const isOverflownWidth: element = ({ clientWidth, scrollWidth }) =>
    scrollWidth > clientWidth;

export default isOverflownWidth;
