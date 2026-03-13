/**
 * Single enum module: Proxy-based ENUM returns property name as string.
 * ENUMS aggregates all logical groups used across the codebase.
 *
 * @example
 * ENUM.give;  // 'give'
 * ENUM.me;    // 'me'
 * ENUMS.COLOR.black; // 'black'
 */
const PRINT = new Proxy(Object.create(null), {
    get(_nil, key) {
        return `${key}`;
    },
});

const [COLOR, SHAPE, UI_EVENT, CASE, ATTRIBUTE, ID] = Array(8).fill(PRINT);
const ENUMS = Object.freeze({
    COLOR,
    SHAPE,
    UI_EVENT,
    CASE,
    ATTRIBUTE,
    ID,
});

export { PRINT, ENUMS };
