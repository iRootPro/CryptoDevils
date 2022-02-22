function debounce<A = unknown, R = void>(
    fn: (args: A) => R,
    ms: number,
): [(args: A) => Promise<R>, () => void] {
    // eslint-disable-next-line no-undef
    let timer: NodeJS.Timeout;

    const debouncedFunc = (args: A): Promise<R> =>
        new Promise((resolve) => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                resolve(fn(args));
            }, ms);
        });

    const teardown = () => clearTimeout(timer);

    return [debouncedFunc, teardown];
}

export default debounce;
