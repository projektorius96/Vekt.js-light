import { ENUM, getNamespace, setPoints } from "../modules/index.js";

/**
 * @alias
 */
const COLOR = ENUM;

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

    #initPath(options) {

        !options.hidden 
            ?
                ( 
                    this.setHTMLUnsafe(/* html */`
                        <path
                            id="${ options.id }" 
                            d="${ setPoints.call(this, options.points) }"
                            stroke-dasharray="${ options.dashed  || 0 }"
                            stroke-width="${ options.strokeWidth || 0 }"
                            style="opacity:${ options.opacity || 1 }; stroke:${ (options.stroke || options.fillStroke ) || COLOR.black }; fill:${ (options.fill || options.fillStroke) || COLOR.none };"
                        />
                    `)
                )
            :
            false 
            ;

            this.#setDataAttrs.call(
                this
                , 
                {
                    id: options.id,
                    dataset: new Map([
                        ['data-scaling', ( options.scaling ?? 1 )],
                        ['data-angle',    ( options.angle  || 0 )],
                        ['data-skew_x',  ( options.skew_x  || 0 )],
                        ['data-skew_y',  ( options.skew_y  || 0 )],
                    ])
                }
            )

        return;

    }

    #setDataAttrs({id, dataset}) {
        
        dataset.entries().forEach(([k, v])=>{
            this.children[id].setAttribute(k, v)
        })

        return;
        
    }

    /**
     * @see `<root>\\src\\views\\xmlsvg\\svg-container\\index.js` for its getter equivalent under `[METHOD.parsePoints]` namespace
     */
    #serializePoints(options) {        

        this.children[options.id].dataset.points = options.points.map(({x, y})=>[x, y].join(",").trim());

        return;

    }

});