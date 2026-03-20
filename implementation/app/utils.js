/**
 * Single enum module: Proxy-based ENUM returns property name as string.
 * ENUMS aggregates all logical groups used across the codebase.
 *
 * @example
 * ENUM.give;  // 'give'
 * ENUM.me;    // 'me'
 * ENUMS.COLOR.black; // 'black'
 */
const Print = new Proxy(Object.create(null), {
    get(_nil, key) {
        return `${key}`;
    },
});

const [PRINT, COLOR, SHAPE, UI_EVENT, CASE, ATTRIBUTE, ID] = Array(7).fill(Print);
const ENUMS = Object.freeze({
    PRINT,
    COLOR,
    SHAPE,
    UI_EVENT,
    CASE,
    ATTRIBUTE,
    ID,
});

export { ENUMS };
