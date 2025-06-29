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
    PRINT
] = Array(4).fill(ENUM);

export const svg_container = getNamespace(import.meta.url);
customElements.define(svg_container, class extends HTMLElement {

    constructor({ options, paths }) {

        if ( setStyling.call( super() , options) ) {
            
            let interpolatedHTML = "";
                paths.forEach( (svgElement)=>interpolatedHTML += svgElement?.getHTML() );

            this.setHTMLUnsafe(/* html */`
                <svg id="${ options.id || svg_container }">
                    ${ interpolatedHTML }
                </svg>
            `);

            /**
             * > The following line makes `options` available within life cycle methods, e.g. `connectedCallback` accessed via `this.options`
             */
            Object.assign(this, {options, paths});

        }

        Object.assign(this, {options})
        return this;

    }
    

    /**
     * @implements
     */
    connectedCallback(){
            
            setCoords.call(this);
            window.addEventListener( UI_EVENT.resize , ()=> setCoords.call(this) );

            setMixin({ref: this.firstElementChild.children});

    }
        
})

function setMixin({ref}){
    Array
    .from(ref)
        .forEach((view)=>{           
            switch (view.tagName.toLowerCase()) {
                case CASE.path :
                    Object.assign(
                        view
                        , 
                        {
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
                                    return view.getAttribute(PRINT.transform)
                            }
                            ,
                            [METHOD.setTranslate]({translateX = 0, translateY = 0}){
                                    view.setAttribute(
                                        PRINT.transform
                                        ,
                                        `${PRINT.translate}(${translateX},${translateY})`
                                    )
                            }
                        }
                    ) ;
                break ;
            }
        })
}