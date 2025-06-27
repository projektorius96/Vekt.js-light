import { ENUM, getNamespace, setPoints } from "../modules/index.js";

export const svg_path = getNamespace(import.meta.url);
customElements.define(svg_path, class extends HTMLElement {
    
    constructor({options}) {

        if ( super() ) this.#initPath.call( this , options ) ;

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
                        />
                    `)
                )
            :
            false 
            ;

        return;

    }

});

/**
 * @alias
 */
const [
    PRINT
    , 
    COLOR
] = Array(2).fill(ENUM);