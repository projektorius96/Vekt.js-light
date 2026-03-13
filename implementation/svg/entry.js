import './globals.css';
import AnimationCounter from './modules/animations.js';
import UnitCircle from './shapes/unit-circle/index.js';
import UnitSquare from './shapes/unit-square/index.js';
import UnitVector from './shapes/unit-vector/index.js';
import { CONSTANTS, ENUMS } from './globals.js';

// Example: EventTarget + grouping approach for render()
export default class {

    static setup({ XMLSVG }) {
        return ([
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.unit_square } 
            }),
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.axes } 
            }),
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.circle } 
            })
        ]);
    }

    static render({ HTMLCanvas, XMLSVG, ENUMS }) {

        /**
         * @alias
         */
        const 
            [SVGList, OrderedPair] = Array(2).fill(Array)
            ,
            aliases = { SVGList, OrderedPair }
            ;

        /**
         * @deps
         */
        const { Converters } = HTMLCanvas.Helpers.Trigonometry
            ,
            { GLOBAL_SCALAR } = CONSTANTS
            ;

        const 
            constants = { ENUMS, GLOBAL_SCALAR, QUADRANT: Converters.radToDeg(Math.PI / 2) }
            ,
            dependencies = { HTMLCanvas, XMLSVG, AnimationCounter, ...constants, ...aliases }
            ;

        const containers = SVGList.of(...this.setup({ XMLSVG }));

        const groups = containers.reduce((map, container) => {
            if (!map.has(container.id)) map.set(container.id, container);
            return map;
        }, new Map());

        // 3) central dispatcher and handlers
        const dispatcher = new EventTarget();
            if (dispatcher) {

                dispatcher.addEventListener(ENUMS.CASE.circle, ({type: id}) => {
                    UnitCircle.init(id, { ...dependencies })
                });
                dispatcher.addEventListener(ENUMS.CASE.unit_square, ({type: id}) => {
                    UnitSquare.init(id, { ...dependencies })
                });
                dispatcher.addEventListener(ENUMS.CASE.axes, ({type: id}) => {
                    UnitVector.init(id, { ...dependencies })
                });

            }

        // 4) dispatch once per unique id with grouped elements
        groups.forEach((container) => {
            dispatcher.dispatchEvent(new Event(container.id));
        });

    }

}