import { ENUM, getNamespace, setPoints } from "../modules/index.js";

/**
 * @alias
 */
const [
    PRINT
    , 
    COLOR
] = Array(2).fill(ENUM);

export const svg_path = getNamespace(import.meta.url);
customElements.define(svg_path, class extends HTMLElement {
    
    constructor({options}) {

        if ( super() ) {
            [
                this.#initPath
                , 
                this.#serializePoints
            ].forEach((f)=>f.call(this, options));
        }        

    }

    /* void */ #initPath(options) {

        !options.hidden 
            ?
                ( 
                    this.setHTMLUnsafe(/* html */`
                        <path
                            id="${ options.id }" 
                            d="${ setPoints.call(this, options.points) }"
                            stroke-dasharray="${ options.dashed  || 0 }"
                            stroke-width="${ options.strokeWidth || 0 }"
                            style="stroke:${ options.stroke || COLOR.black }; fill:${ options.fill || PRINT.none };"
                            data-scaling="${ options.scaling ?? 1 }"
                            data-angle="${ options.angle  || 0 }"
                            data-skewX="${ options.skewX  || 0 }"
                            data-skewY="${ options.skewY  || 0 }"
                        />
                    `)
                )
            :
            false 
            ;

        return;

    }

    /**
     * @see `<root>\\src\\views\\xmlsvg\\svg-container\\index.js` for its getter equivalent under `[METHOD.parsePoints]` namespace
     */
    /* void */ #serializePoints(options) {
        console.log(this);
        
        this.children[options.id].setAttribute("data-points", options.points.map(({x, y})=>[x, y].join(",").trim()))
    }

});