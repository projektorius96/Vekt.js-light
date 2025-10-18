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
    ;

/**
    * @alias
*/
const
    [CASE, ATTR, UI_EVENT] = Array(3).fill(ENUM);

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
                    d += ` L ${scalingFactor * point.x} ${scalingFactor * point.y}`;
                }
            });
    
    return d;

}

/**
 * Draw a transform-safe, baseline-aligned label on your SVG viewport.
 *
 * @param {SVGSVGElement} svg       The <svg> root
 * @param {Number} x                X coordinate in your coordinate system
 * @param {Number} y                Y coordinate in your coordinate system
 * @param {String} text             The text to show (e.g. 'x', 'θ', 'Δv')
 * @param {Object} [opts]           Optional style overrides
 *   @param {String} opts.fontFamily Default: 'serif'
 *   @param {Number} opts.fontSize   Default: 16
 *   @param {String} opts.fontStyle  Default: 'italic'
 *   @param {String} opts.fill       Default: 'black'
 *   @param {Number} opts.dx         Fine-tune baseline offset (e.g. 0.1em)
 *   @param {Number} opts.dy         Fine-tune baseline offset (e.g. 0.1em)
 *   @param {Number} opts.scale      Apply local scale transform (default 1)
 */
export function drawLabel({svg, text, x, y, overrides = {}}) {

    const {
        dominantBaseline = 'middle',
        textAnchor = 'middle',
        fontFamily = 'cursive',
        fontStyle = 'italic',
        fill = 'black',
        fontSize = 16,
        dx = '0em',
        dy = '0em',
        scale = 2
    } = overrides;

    // Create text element
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('transform', `translate(${x}, ${y}) scale(${scale})`);
        t.setAttribute('text-anchor', textAnchor);
        t.setAttribute('dominant-baseline', dominantBaseline);
        t.setAttribute('font-family', fontFamily);
        t.setAttribute('font-size', fontSize);
        t.setAttribute('font-style', fontStyle);
        t.setAttribute('fill', fill);
        t.setAttribute('dx', dx);
        t.setAttribute('dy', dy);
        t.textContent = text;

    svg.appendChild(t);
    return t;

}
