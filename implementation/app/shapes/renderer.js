import Ruler from './ruler/index.js';
import UnitVector from './unit-vector/index.js';
import UnitCircle from './unit-circle/index.js';

export default class {

    static drawPaths({dependencies, containers}) {

    /**
    * @deps
    */
    const 
        { ENUMS, XMLSVG, userConfig, defaultVendorFontSize } = dependencies
        ;

    const dispatcher = new EventTarget();
        if (dispatcher) {

            const 
                [ DO_ANIMATE, DONOT_ANIMATE ] = [true, false]
                ;

            dispatcher.on(ENUMS.CASE.ruler, ({type: id}) => {
                Ruler.init(id, { dependencies, overrides: { ...userConfig.ruler.overrides }  })
            });

            dispatcher.on(ENUMS.CASE.axes, ({type: id}) => {
                UnitVector.init(id, { dependencies })
            });

            dispatcher.on(ENUMS.CASE.circle, ({type: id}) => {
                UnitCircle.init(id, {
                    dependencies
                    ,
                    overrides: {
                        path: {
                            // DEV_NOTE # please comment out either side of "OR" statement to see the difference in action!
                            id: id || ENUMS.CASE.square,
                            dashed: 0, 
                            stroke: ENUMS.COLOR.magenta,
                            strokeWidth: 4, 
                            transformations: {
                                offsetX: stage.grid.GRIDCELL_DIM * 2,
                                skew: ( id === ENUMS.CASE.circle ? null : { X: { phi: -45 } } ),
                            }
                        }
                        , 
                        animation: (
                            DO_ANIMATE 
                            ?
                            {
                                sense: ENUMS.PRINT.COUNTER_CLOCKWISE
                            } 
                            : 
                            false
                        )
                    } 
                })
            });

            dispatcher ? drawContainers({dispatcher, containers}) : false ;

        }

    }
    
}

function drawContainers({dispatcher, containers}) {

    containers
        .reduce((mapping, container) => {
            if (!mapping.has(container.id)) mapping.set(container.id, container);
            return mapping;
        }, new Map())  
        .forEach((container) => {
            dispatcher.dispatchEvent(new Event(container.id));
        })
    ;

    return true;
    
}