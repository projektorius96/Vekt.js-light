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

    constructor({ options }) {

        if ( setStyling.call( super() , options) ) {

            /**
             * > The following line makes `options` available within life cycle methods, e.g. `connectedCallback` accessed via `this.options`
             */
            Object.assign(this, {options})

        }

        return this;

    }
    

    /**
     * @implements
     */
    connectedCallback(){

            this.id = this.options.id;
            Object.assign(this, {
                [METHOD.setPaths](paths){
                    let interpolatedHTML = "";
                        /* this. */paths.forEach( (svgElement)=>interpolatedHTML += svgElement?.getHTML() );

                    this.setHTMLUnsafe(/* html */`
                        <svg viewBox="${this.getAttribute('viewBox')}">${ interpolatedHTML }</svg>
                    `);
                    
                    setMixin(this?.firstElementChild.children);
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
                            [METHOD.parsePoints](){
                                return(
                                    this.getAttribute("options.points")
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