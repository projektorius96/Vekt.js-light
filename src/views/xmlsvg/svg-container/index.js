import setStyling from './index.css.js';
import { PRINT, getNamespace, setCoords, setPoints, drawLabel } from '../modules/index.js';
import { getScaledPointsFromDataset } from '../svg-path-geometry.js';

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
] = Array(4).fill(PRINT);

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
                [METHOD.setPaths](paths, callback) {

                    const { viewBox } = ATTR;
                    /* === INTERPOLATION === */
                        let interpolatedHTML = "";
                            /* this. */paths.forEach( (svgElement)=>interpolatedHTML += svgElement?.getHTML() );

                        const XML_NAMESPACE = 'xmlns=http://www.w3.org/2000/svg';
                        this.setHTMLUnsafe(/* html */`
                            <svg ${ XML_NAMESPACE } name="${ this.id }" viewBox="${ this.getAttribute(viewBox) }">${ interpolatedHTML }</svg>
                        `);
                        
                        if ( setMixin(this?.firstElementChild.children) ) callback({paths: this?.firstElementChild.children});
                    /* === INTERPOLATION === */

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
                             * @see `<root>/src/views/xmlsvg/svg-path/index.js` for its getter equivalent found under `this.#serializePoints` call
                             */
                            [METHOD.getPoints]() {
                                return getScaledPointsFromDataset(this);
                            },
                            [METHOD.setPoints](points, scalingFactor = 1){                                                    
                                this.attributes.d.value = setPoints.call(view, points, scalingFactor)
                                return true;
                            }
                            ,
                            [METHOD.getParent](){                    
                                return (
                                    this?.parentElement
                                )
                            }
                            ,
                            [METHOD.setLabel](/* arguments */){
                                
                                return (
                                    drawLabel(...arguments)
                                );
                                
                            }
                            ,
                            [METHOD.getCurrentMatrix](){

                                const { matrix } = this.transform.baseVal.consolidate();
                                
                                return (
                                    matrix    
                                );
                                
                            }
                        }
                    ) ;
                break ;
            }
        })

        return true;
}