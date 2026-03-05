/**
 * Single enum module: Proxy-based ENUM returns property name as string.
 * ENUMS aggregates all logical groups used across the codebase.
 *
 * @example
 * ENUM.give;  // 'give'
 * ENUM.me;    // 'me'
 * ENUMS.COLOR.black; // 'black'
 */
const ENUM = new Proxy(Object.create(null), {
    get(_nil, key) {
        return `${key}`;
    },
});

const [COLOR, SHAPE, UI_EVENT, CASE, ATTRIBUTE, PRINT, ID] = Array(7).fill(ENUM);
const ENUMS = Object.freeze({
    COLOR,
    SHAPE,
    UI_EVENT,
    CASE,
    ATTRIBUTE,
    PRINT,
    ID,
});

export { ENUM, ENUMS };
