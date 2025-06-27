/* === enum === */

/**
 * @example
 * 
 * ENUM.give; // 'give'
 * ENUM.me; // 'me'
 * ENUM.value; // 'value'
*/
const
    ENUM = 
        new Proxy( Object.create(null) , {
            get(nil, key){
                return (
                    key = `${key}`
                );
            }
        })
    ;

/**
 * @alias
 */
const
    [COLOR, SHAPE, UI_EVENT, CASE, PRINT] = Array(5).fill(ENUM)
    ;

export
    const
        ENUMS = Object.freeze({
            COLOR, SHAPE, UI_EVENT, CASE, PRINT
        })
        ;

/* === enum === */


