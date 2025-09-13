import setStyling from './index.css.js'
import { ENUM, getNamespace, setCoords, setPoints } from "../modules/index.js";

/**
 * @alias
 */
const [
    UI_EVENT
    , 
    CASE
    ,
    METHOD
    ,
    ATTR
] = Array(4).fill(ENUM);

export const svg_container = getNamespace(import.meta.url);
customElements.define(svg_container, class extends HTMLElement {

    constructor({ options }) {

        if ( setStyling.call( super() , options) ) {

            this.id = options.id;
            this.scaling = options.scaling;

            /**
             * > The following line makes `options` available within life cycle methods, e.g. `connectedCallback` accessed via `this.options`
             */
            Object.assign(this, {options})

        }

        return this;

    }
    
    connectedCallback(){

            Object.assign(this, {

                [METHOD.getContainer](){
                    return this;
                }
                ,
                [METHOD.setPaths](paths, callback){
                                    
                    let interpolatedHTML = "";
                        /* this. */paths.forEach( (svgElement)=>interpolatedHTML += svgElement?.getHTML() );

                    const XML_NAMESPACE = 'xmlns=http://www.w3.org/2000/svg';
                    this.setHTMLUnsafe(/* html */`
                        <svg ${ XML_NAMESPACE } name="${ this.id }" viewBox="${ this.getAttribute('viewBox') }">${ interpolatedHTML }</svg>
                    `);
                    
                    if ( setMixin(this?.firstElementChild.children) ) callback({paths: this?.firstElementChild.children});

                    return true;
                }

            })
            
            setCoords.call(this);
            window.addEventListener( UI_EVENT.resize , ()=> setCoords.call(this) );

    }

    
        
})

function setMixin(htmlcollection){
    Array
    .from(htmlcollection)
        .forEach((view)=>{           
            switch (view.tagName.toLowerCase()) {
                case CASE.path :
                    Object.assign(
                        view
                        , 
                        {
                            /**
                             * @see `<root>\\src\\views\\xmlsvg\\svg-path\\index.js` for its getter equivalent under `this.#serializePoints` call
                             */
                            [METHOD.getPoints](){
                                return (
                                    this.dataset.points
                                    .split(",")
                                    .map(Number)
                                    .map((vec2, i, attr)=>{
                                        if (i % 2 === 0) {
                                            return vec2 = {x: attr[i], y: attr[i+1]}
                                        }
                                    })
                                    .filter(Boolean)
                                    .map((point)=>{
                                        return({
                                            x: Number(this.dataset.scaling) * point.x,
                                            y: Number(this.dataset.scaling) * point.y,
                                        })
                                    })
                                );
                            }
                            ,
                            [METHOD.setPoints](points, scalingFactor){                    
                                this.attributes.d.value = setPoints.call(view, points, scalingFactor)
                            }
                            ,
                            [METHOD.getParent](){                    
                                return (
                                    this?.parentElement
                                )
                            }
                        }
                    ) ;
                break ;
            }
        })

        return true;
}