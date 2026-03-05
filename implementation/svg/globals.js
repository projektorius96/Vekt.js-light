import { PRINT, ENUMS } from '../utils.js';
export { PRINT, ENUMS }

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
                        [ENUMS.ID.east, ENUMS.ID.X.replace(/^/, '+')],
                        [ENUMS.ID.south, ENUMS.ID.Y.replace(/^/, '+')],
                        [ENUMS.ID.west, ENUMS.ID.X.replace(/^/, '-')],
                        [ENUMS.ID.north, ENUMS.ID.Y.replace(/^/, '-')],
                    ])
                }
            }
        )
    )
    ;

/* === CONSTANTS === */