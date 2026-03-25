import Ruler from './ruler/index.js';
import UnitSquare from './unit-square/index.js';
import UnitVector from './unit-vector/index.js';

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

            const [ DO_ANIMATE, DONOT_ANIMATE ] = [true, false];

            dispatcher.on(ENUMS.CASE.ruler, ({type: id}) => {
                Ruler.init(id, { dependencies, overrides: { ...userConfig.ruler.overrides, labelScaling: (stage.grid.GRIDCELL_DIM / (4 * defaultVendorFontSize) /* !important */ ) }  })
            });

            dispatcher.on(ENUMS.CASE.axes, ({type: id}) => {
                UnitVector.init(id, { dependencies })
            });

            dispatcher.on(ENUMS.CASE.unit_square, ({type: parentID}) => {                

                XMLSVG.Helpers.findByID(parentID)?.clearPaths();

                const children = 3;
                    Array
                    .from({length: children})
                    .fill(UnitSquare.init).forEach((initPath, cycle)=>{                        
                        
                        // DEV_NOTE # as of now the "childID" is 1-based
                        let childID = ++cycle;                        

                        switch (true) {

                            case (childID === 1) : {
                                initPath(parentID, {
                                    dependencies,
                                    overrides: {
                                        path: {
                                            id: `${parentID}_${childID}`,
                                            fillStroke: ENUMS.COLOR.darkgrey,
                                            SCALE_XY: 1,
                                            transformations: {
                                                SCALE_X: 1,
                                                SCALE_Y: 2,
                                                angle: -90,
                                                skew: { X: { phi: -45 } },
                                            } 
                                        } 
                                    } 
                                })
                                break;
                            }
                            case (childID === 2) : {
                                initPath(parentID, {
                                    dependencies,
                                    overrides: {
                                        path: {
                                            id: `${parentID}_${childID}`,
                                            fillStroke: ENUMS.COLOR.green,
                                            SCALE_XY: 1,
                                            transformations: {
                                                SCALE_X: 2,
                                                SCALE_Y: 1,
                                                angle: -90,
                                                skew: { Y: { phi: -45 } },
                                            } 
                                        } 
                                    } 
                                })
                                break;
                            }
                            case (childID === 3) : {
                                initPath(parentID, {
                                    dependencies,
                                    overrides: {
                                        path: {
                                            id: `${parentID}_${childID}`,
                                            fillStroke: ENUMS.COLOR.red,
                                            SCALE_XY: 2,
                                            transformations: {
                                                offsetX: stage.grid.GRIDCELL_DIM * 1,
                                                offsetY: -1 * stage.grid.GRIDCELL_DIM*3,
                                                SCALE_X: 1,
                                                SCALE_Y: 1,
                                                angle: 0,
                                                skew: { X: { phi: 0 } },
                                            } 
                                        } 
                                    } 
                                })
                                break;
                            }
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