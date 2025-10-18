const
    SLOPE_TERSER = 0.5
    ,
    /* DEV_NOTE (!) # DO NOT change the `GLOBAL_SCALAR`, it must remain constant for `parallelogram` to outline nicely, instead scale in `globals.css` */
    GLOBAL_SCALAR = 3
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
            SLOPE_TERSER,
            GLOBAL_SCALAR,
            GROW_ALONG_SLOPE
        }
    )
);