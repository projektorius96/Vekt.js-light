import './globals.css';
import AnimationCounter from './modules/animations.js';
import UnitCircle from './shapes/unit-circle/index.js';
import UnitSquare from './shapes/unit-square/index.js';
import UnitVector from './shapes/unit-vector/index.js';
import { CONSTANTS, ENUMS } from './globals.js';

export default class {

    /**
     * @returns Instantiates `SVGSVGElement`, each internally presented as top-level `<svg-container>` web component
     */
    static setup({XMLSVG}) {
    
        return([
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: /* ENUMS.ID.HIDE ||  */ENUMS.ID.unit_square,
                }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: /* ENUMS.ID.HIDE ||  */ENUMS.ID.axes,
                }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: /* ENUMS.ID.HIDE ||  */ENUMS.ID.circle,
                }
            })
        ]);

    }

    /**
     * @returns {void} Instantiates `SVGPathElement`, each internally presented as `<svg-path>` nested under top-level XML-namespaced `<svg-container>` web component
     * @see {@link `default.setup`}
     */
    static render({HTMLCanvas, XMLSVG, ENUMS}) {

        /**
         * @alias
         * @type {Array<SVGElement>}
         */
        const 
            [SVGList, OrderedPair] = Array(2).fill(Array)
            ,
            aliases = { SVGList, OrderedPair }
            ;
        
        /**
         * @dependencies
         */
        const
            { Converters } = HTMLCanvas.Helpers.Trigonometry
            ,
            { GLOBAL_SCALAR } = CONSTANTS
            ,
            constants = { ENUMS, GLOBAL_SCALAR, QUADRANT: Converters.radToDeg(Math.PI/2) }
            ,
            dependencies = { HTMLCanvas, XMLSVG, ...constants, ...aliases }
            ;

        /**
         * @implementation
         */
        SVGList
        .of(...this.setup({XMLSVG}))
        .on(({id})=>{

                switch (id) {

                    case (ENUMS.CASE.circle) :
                        UnitCircle.init(id, {...dependencies});
                    break;
                    
                    case (ENUMS.CASE.unit_square) :
                        UnitSquare.init(id, {...dependencies})
                    break;
                        
                    case (ENUMS.CASE.axes) : 
                        UnitVector.init(id, {...dependencies})
                    break;

                }
        
        });
        
    }
    
}