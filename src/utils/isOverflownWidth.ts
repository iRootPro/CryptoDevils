type element = (element: HTMLDivElement) => boolean;

const isOverflownWidth: element = ({ clientWidth, scrollWidth }) => {
    return scrollWidth > clientWidth;
};

export { isOverflownWidth };
