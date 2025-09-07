function skewXMatrix(phi, translateX, translateY) {
    return new DOMMatrix([
        1, 0, Math.tan(phi), 1, translateX, translateY
    ]);
}

function skewYMatrix(phi, translateX, translateY) {
    return new DOMMatrix([
        1, Math.tan(phi), 0, 1, translateX, translateY
    ]);
}

/**
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

    if ( homogeneousCoords && skew ) {

        let transformedMatrix = new DOMMatrix();
            // DEV_NOTE (!) # under the hood SKIA follows column-vector multiplication conventional rule, thus following .multiply call will rotate first, then skew, as follows:
            if ( skew?.X ) transformedMatrix = (new DOMMatrix( skewXMatrix( degToRad( skew?.X?.phi ), z31, z32 ) )).multiply(homogeneousCoords) ;
            if ( skew?.Y ) transformedMatrix = (new DOMMatrix( skewYMatrix( degToRad( skew?.Y?.phi ), z31, z32 ) )).multiply(homogeneousCoords) ;        
        
        return (

            [...transformedMatrix.toString().replace(/^matrix\((.*)\)$/, '$1').split(', ')]

        );

    } else {

        return (

            [...homogeneousCoords]

        );

    }

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