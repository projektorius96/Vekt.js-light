import { ENUMS } from './utils.js';
export { ENUMS }

/* === CONSTANTS === */

const
    /* DEV_NOTE (!) # DO NOT change the `GLOBAL_SCALAR`, it must remain constant for `parallelogram` to outline nicely, scale in `globals.css` instead, if needed! */
    GLOBAL_SCALAR = 2 /* range := [1..4], ideally, trivial value would be zero (0), this would visually hide shapes that dependent on the constant, but it would not opt-out from rendering pipeline */
    ,
    GROW_ALONG_SLOPE = 1 / Math.sin(Math.PI/4)
    ,
    QUADRANT = 90 /* degrees per quadrant; used as the angle step for the four cardinal-axis vectors (east=0°, south=90°, west=180°, north=270°) */
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
            GROW_ALONG_SLOPE,
            QUADRANT,
        }
    )
);

/* === CONSTANTS === */