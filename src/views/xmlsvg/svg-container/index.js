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

            /**
             * > The following line makes `options` available within life cycle methods, e.g. `connectedCallback` accessed via `this.options`
             */
            Object.assign(this, {options})

        }

        return this;

    }
    
    connectedCallback(){

            Object.assign(this, {

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
                            [METHOD.parsePoints](){
                                return(
                                    /* this.getAttribute("data-points") */// alternatively we access via `dataset`
                                    this.dataset.points
                                    .split(",")
                                    .map(Number)
                                    .map((vec2, i, attr)=>{
                                        if (i % 2 === 0) {
                                            return vec2 = {x: attr[i], y: attr[i+1]}
                                        }
                                    })
                                    .filter(Boolean)
                                );
                            }
                            ,
                            [METHOD.getPoints](){
                                return(
                                    this.attributes.d.value
                                );
                            }
                            ,
                            [METHOD.setPoints](points, scalingFactor){                      
                                this.attributes.d.value = setPoints.call(view, points, scalingFactor)
                            }
                            ,
                            [METHOD.getTranslate](){
                                    return view.getAttribute(ATTR.transform)
                            }
                            ,
                            [METHOD.setTranslate]({translateX = 0, translateY = 0}){
                                    view.setAttribute(
                                        ATTR.transform
                                        ,
                                        `${ATTR.translate}(${translateX},${translateY})`
                                    )
                            }
                        }
                    ) ;
                break ;
            }
        })

        return true;
}