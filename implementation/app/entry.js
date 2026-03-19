import './globals.css';
import AnimationCounter from './modules/animations.js';
import Ruler from './shapes/ruler/index.js';
import UnitCircle from './shapes/unit-circle/index.js';
import UnitSquare from './shapes/unit-square/index.js';
import UnitVector from './shapes/unit-vector/index.js';
import { CONSTANTS, ENUMS, PRINT } from './globals.js';
import { defaultVendorFontSize } from './modules/utils.js';
import { userConfig } from './user-config.js';

export default class {

    static setup({ XMLSVG }) {
        return ([
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.ruler }
            }),
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
         * @deps
         */
        const { Converters } = HTMLCanvas.Helpers.Trigonometry
            ,
            { GLOBAL_SCALAR } = CONSTANTS
            ;

        const 
            constants = { ENUMS, GLOBAL_SCALAR, QUADRANT: Converters.radToDeg(Math.PI / 2) }
            ,
            dependencies = { HTMLCanvas, XMLSVG, AnimationCounter, ...constants }
            ;

        const containers = Array.of(...this.setup({ XMLSVG }));

        const groups = containers.reduce((map, container) => {
            if (!map.has(container.id)) map.set(container.id, container);
            return map;
        }, new Map());

        // 3) central dispatcher and handlers
        const dispatcher = new EventTarget();
            if (dispatcher) {
                dispatcher.on(ENUMS.CASE.circle, ({type: id}) => {
                    UnitCircle.init(id, {
                        ...dependencies
                        ,
                        overrides: {
                            view: {
                                id: id || ENUMS.CASE.square,
                                dashed: 0, 
                                stroke: ENUMS.COLOR.magenta,
                                strokeWidth: 4, 
                                transformations: {
                                    skew: ( id === ENUMS.CASE.circle ? null : { X: { phi: -45 } } ),
                                }
                            }
                            , 
                            animation: (
                                true 
                                ?
                                {
                                    sense: PRINT./* COUNTER_ */CLOCKWISE
                                } 
                                : 
                                false
                            )
                        } 
                    })
                });
                dispatcher.on(!!!ENUMS.CASE.unit_square, ({type: id}) => {
                    UnitSquare.init(id, { ...dependencies })
                });
                dispatcher.on(/* !!! */ENUMS.CASE.axes, ({type: id}) => {
                    UnitVector.init(id, { ...dependencies })
                });
                dispatcher.on(ENUMS.CASE.ruler, ({type: id}) => {
                    Ruler.init(id, { ...dependencies, overrides: { ...userConfig.ruler.overrides, labelScaling: stage.grid.GRIDCELL_DIM / (4 * defaultVendorFontSize) } })
                });
            }

        // 4) dispatch once per unique id with grouped elements
        groups.forEach((container) => {
            dispatcher.dispatchEvent(new Event(container.id));
        });

    }

}