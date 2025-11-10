/* === PATTERNS === */

/**
 * @example
 * 
 * ENUM.give;  //  'give'
 * ENUM.me;    //  'me'
 * ENUM.value; //  'value'
*/
export const 
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
    ENUMS = Object.freeze(
        Object.assign(
            Object.create(null)
            ,
            {
                [ENUM.PRINT]: ENUM,
                [ENUM.ID]: ENUM
            }
        )
    )
    ;

/* === PATTERNS === */

/* === CONSTANTS === */

const
    /* DEV_NOTE (!) # DO NOT change the `GLOBAL_SCALAR`, it must remain constant for `parallelogram` to outline nicely, scale in `globals.css` instead, if needed! */
    GLOBAL_SCALAR = 3 /* range := [1..4], ideally, trivial value would be zero (0), this would visually hide shapes that dependent on the constant, but it would not opt-out from rendering pipeline (switch statement) */
    ,
    GROW_ALONG_SLOPE = 1 / Math.sin(Math.PI/4)
    ;

/**
 * @type
 * 
 * > Shared constants
 */
export const CONSTANTS = Object.freeze(
    Object.assign(
        Object.create(null)
        ,
        {
            GLOBAL_SCALAR,
            GROW_ALONG_SLOPE
        }
    )
);

export 
    const MAPPING = Object.freeze(
        Object.assign(
            Object.create(null)
            ,
            {
                labels: {
                    compass: new Map([
                        [ENUMS.ID.east, ENUMS.PRINT.X.replace(/^/, '+')],
                        [ENUMS.ID.south, ENUMS.PRINT.Y.replace(/^/, '+')],
                        [ENUMS.ID.west, ENUMS.PRINT.X.replace(/^/, '-')],
                        [ENUMS.ID.north, ENUMS.PRINT.Y.replace(/^/, '-')],
                    ])
                }
            }
        )
    )
    ;

/* === CONSTANTS === */