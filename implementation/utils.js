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

/**
 * 
 * @param {Object} object 
 * @returns an instance of deeply (not just shallowly) immutable object
 */
function deepFreeze(object) {
    // Retrieve the property names defined on object
    const propNames = Object.getOwnPropertyNames(object);

    // Freeze properties before freezing self
    for (const name of propNames) {
        const value = object[name];

        // Recursively freeze if the value is an object or array
        if (value && typeof value === ATTRIBUTE.object) {
            deepFreeze(value);
        }
    }

    return Object.freeze(object);
}


export { ENUMS, deepFreeze };
