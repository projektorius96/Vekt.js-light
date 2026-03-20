import Ruler from './ruler/index.js';
import UnitCircle from './unit-circle/index.js';
import UnitSquare from './unit-square/index.js';
import UnitVector from './unit-vector/index.js';

export default function ({dependencies, containers}) {

    const 
        { ENUMS, userConfig } = dependencies
        ,
        { defaultVendorFontSize } = userConfig
        ;    

    // 3) central dispatcher and handlers (listeners)
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
                                sense: ENUMS.PRINT./* COUNTER_ */CLOCKWISE
                            } 
                            : 
                            false
                        )
                    } 
                })
            });
            dispatcher.on(ENUMS.CASE.unit_square, ({type: id}) => {
                UnitSquare.init(id, { ...dependencies })
            });
            dispatcher.on(!!!ENUMS.CASE.axes, ({type: id}) => {
                UnitVector.init(id, { ...dependencies })
            });
            dispatcher.on(!!!ENUMS.CASE.ruler, ({type: id}) => {
                Ruler.init(id, { ...dependencies, overrides: { ...userConfig.ruler.overrides, labelScaling: stage.grid.GRIDCELL_DIM / (4 * defaultVendorFontSize) }  })
            });
        }

        const groups = containers.reduce((map, container) => {
                    if (!map.has(container.id)) map.set(container.id, container);
                    return map;
                }, new Map())  

    // 4) dispatch once per unique id with grouped elements
    groups.forEach((container) => {
        dispatcher.dispatchEvent(new Event(container.id));
    });
    
}