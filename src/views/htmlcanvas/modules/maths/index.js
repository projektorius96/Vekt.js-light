function skewXMatrix(phi, translateX, translateY) {
    // signature: scaleX, skewX, skewY, scaleY, translateX, translateY
    return new DOMMatrix([
        1, 0, Math.tan(phi), 1, translateX, translateY
    ]);
}

function skewYMatrix(phi, translateX, translateY) {
    return new DOMMatrix([
        // signature: scaleX, skewX, skewY, scaleY, translateX, translateY
        1, Math.tan(phi), 0, 1, translateX, translateY
    ]);
}

/**
 * @tutorial
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations}
 * 
 * @param {Number} angle - user-friendly value in angle degrees
 * @param {Number} [x=0] - default component of ({x,y}) ordered pair  
 * @param {Number} [y=0] - default component of ({x,y}) ordered pair
 * 
 * @returns {Array} _this function generates a raw homogeneous matrix_
 */
export function setTransform({angle = 0, translateX = 0, translateY = 0, skew = false}) {

    const cos = Math.cos( degToRad( angle ) );
    const sin = Math.sin( degToRad( angle ) );

    let x11 = cos; 
    let y12 = sin;
    let x21 = -sin;
    let y22 = cos;
    let z31 = translateX;
    let z32 = translateY;

    const homogeneousCoords = [x11, y12, x21, y22, z31, z32];

    // Create a DOMMatrix for the base rotation + translation
    const baseMatrix = new DOMMatrix(homogeneousCoords);

    // If no skew (or skew is falsy), just return the base components
    if (!skew) {
        return [...homogeneousCoords];
    }

    // GOAL: Compose skew matrices with the base so rotation is preserved.
    /* MEMO: 
    - use zero translation in skew matrices here to avoid doubling translation that may impact orientation of pivot for rotation.
    - order matters, meaning apply base (rotation+translation) first, then skew-X, then skew-Y (if provided).
    - With DOMMatrix.multiply: newSkew.multiply(current) -> newSkew * current 
    */
    let resultMatrix;

    if (skew?.X) {
        const phiX = degToRad( skew?.X?.phi || 0 );
        const skewX = new DOMMatrix(skewXMatrix(phiX, 0, 0));
        resultMatrix = skewX.multiply(baseMatrix);
    }

    if (skew?.Y) {
        const phiY = degToRad( skew?.Y?.phi || 0 );
        const skewY = new DOMMatrix(skewYMatrix(phiY, 0, 0));
        resultMatrix = skewY.multiply(baseMatrix);
    }

    // Return in the same ordering you used before
    return [
        resultMatrix.a,
        resultMatrix.b,
        resultMatrix.c,
        resultMatrix.d,
        baseMatrix.e,
        baseMatrix.f
    ];
}

/**
 * @param {Number} deg - angle degrees, hence `"deg"`
 * @returns takes a the input and converts it to raw number in radians
 */
export function degToRad(deg){
    return (
        deg * (Math.PI / 180)
    )
}

/**
 * @param {Number} rad - in radians (_optionally in `Math.PI` rad_), hence `"rad"` 
 * @returns takes the input and converts it to "user-friendly" angle degrees
 */
export function radToDeg(rad){
    return (
        rad * (180 / Math.PI)
    )
}

/**
 * @param {Number} start              - range lower bound
 * @param {Number} step               - range step
 * @param {Number} end                - range upper bound
 * @param {Boolean} [isIncluded=true] - `isIncluded === true ? [start:end] : [start:end)`, where `[]` denotes "closed", and `()` "open" range (interval)
 * @param {Array} [skip=Array]        - let's say you need dashed polygon (more precisely - a dashed line)
 * @returns {Array}                     one-dimensional array holding a range
 */
export function setRange(start, step, end, isIncluded=true, skip = []){
    
    const range = [];
    
    loop1: for (start; start < end + isIncluded; start += step) {

        loop2: for (let items of skip) {

            if (items == start) {

                continue loop1;

            }

        }

        range.push(start)

    }

    return range;

}