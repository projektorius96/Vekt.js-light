/**
 * @example
 * 
 * ENUM.give;  //  'give'
 * ENUM.me;    //  'me'
 * ENUM.value; //  'value'
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
    ,
    /**
        * @alias
    */
    [CASE, ATTR, UI_EVENT] = Array(3).fill(ENUM);
    ;

export { ENUM }

export function getNamespace(import_meta_url) {

    return (
        new URL(import_meta_url).pathname.split('/').at(-2)
    );

}

/**
 * > NOTE: This function does set up `viewBox` attribute for an instance of `SVGElement` or other relevant interface(s)
 * 
 * @returns 
 */
export function setCoords() {

        this.setAttribute(ATTR.viewBox, `${0} ${0} ${Math.ceil(window.innerWidth)} ${Math.ceil(window.innerHeight)}`)
    
}

/**
 * 
 * @param {Array} points - list of points comprising a `path`, where such `path` is assigned to `SVGPathElement.attributes.d` internally;
 * @returns {SVGPathElement.attributes.d} path
 */
export function setPoints(points = [], scalingFactor = 1) {
    
    if (points.length === 0) return "";
        let d = `M 0 0`;
            points.forEach((point, i) => {
                if (i > 0){
                    d += ` L ${point.x * scalingFactor} ${point.y * scalingFactor}`;
                }
            });
    
    return d;

}