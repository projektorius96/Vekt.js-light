/* import './styles.css' */
import UnitCircle from './shapes/unit-circle/index.js';
import UnitSquare from './shapes/unit-square/index.js';
import UnitVector from './shapes/unit-vector/index.js';
import { startAnimation } from '../modules/animations.js';

export default class {

    /**
     * **DEV_TIP**: Within `XMLSVG.ViewGroup.Container` call (see `default.registerContainersForSVG`), prefixing `options.id` value with a few exclamation mark (_one is enough, more improves readability_) will idiomatically opt-out from switch statement selection (see `default.drawPaths`)
     * 
     * @returns Instantiates `SVGSVGElement`, each internally presented as top-level `<svg-container>` web component
     */
    static registerContainersForSVG({XMLSVG}){     
        
        return([
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: 'parallelogram',
                }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: 'axes',
                }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: '!!!circle',
                }
            })
        ])

    }

    /**
     * @returns {void} Instantiates `SVGPathElement`, each internally presented as `<svg-path>` nested under top-level XML-namespaced `<svg-container>`
     * @see {@link `default.registerContainersForSVG`}
     */
    static drawPaths({HTMLCanvas, XMLSVG, ENUMS, userConfig, SVGList = Array}) {

        const SNAP_TO_GRID = 1 / Math.sin(Math.PI/4);

        const { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry;

        SVGList
        .of(...this.registerContainersForSVG({XMLSVG}))
        .on(
            
            ({id})=>{

                switch (id) {

                    case (ENUMS.CASE.parallelogram) :

                            XMLSVG.Helpers.findByID(id)
                            .setPaths([
                                new XMLSVG.Views.Path({
                                    options: {
                                        ...userConfig.svg.paths.unit_square.options,
                                        scaling: stage?.grid.GRIDCELL_DIM * 3,
                                        angle: 0,
                                    }
                                })
                            ]
                            , 
                            ({paths}) => SVGList.from(paths).on( UnitSquare.draw({HTMLCanvas, XMLSVG, ENUMS}) )
                            );
                        
                    break;

                    case (ENUMS.CASE.circle) :

                        XMLSVG.Helpers.findByID(id)
                        .setPaths([
                            new XMLSVG.Views.Path({
                                options: {
                                    id: ENUMS.PRINT.unit_circle,
                                    scaling: stage?.grid.GRIDCELL_DIM * 2.0,
                                    points: [
                                        ...setRange(0, 1, 360 * 2).map((deg)=>{
                                            return {
                                                x: 1 * Math.cos( Converters.degToRad( deg ) ) - 1 /* <== removes the radius, when the shape is not filled */,
                                                y: 1 * Math.sin( Converters.degToRad( deg ) ) - 0,
                                            }
                                        })
                                    ],
                                    /* DEV_NOTE # herein: dashed := [1.0..10]; to disable, pass either := 0|false */
                                    dashed: 0,
                                    strokeWidth: 3,
                                    fill: ENUMS.COLOR.none,
                                    stroke: ENUMS.COLOR.purple,
                                }
                            })
                        ], ({paths}) => SVGList.from(paths).on( UnitCircle.draw({HTMLCanvas, XMLSVG, ENUMS}) ));

                    break;

                    case (ENUMS.CASE.axes) :

                        XMLSVG.Helpers.findByID(id)
                        .setPaths([
                            ...Array(3).fill(XMLSVG.Views.Path).map((axis, i)=>{

                                const sharedOptions = {
                                    id: '',
                                    scaling: 1 * stage?.grid.GRIDCELL_DIM,
                                    angle: 0,
                                    points: [
                                        ...UnitVector.drawAxis({
                                            HTMLCanvas
                                        })
                                    ],
                                    /* DEV_NOTE # herein: dashed := [1.0..10]; to disable, pass either := 0|false */
                                    dashed: 0,
                                    strokeWidth: 3,
                                    fillStroke: ENUMS.COLOR.magenta
                                }
                                
                                const step = ++i;
                                switch (step) {
                                    case 1:
                                        return (
                                            axis = new axis({
                                                options: {
                                                    ...sharedOptions,
                                                    /**
                                                     * @override
                                                     */
                                                    id: ENUMS.PRINT.x_axis,
                                                    fillStroke: ENUMS.COLOR.green,
                                                    scaling: 1 * stage.grid.GRIDCELL_DIM,
                                                    angle: 0,
                                                }
                                            })
                                        )
                                    /* break; */
                                    case 2:
                                        return (
                                            axis = new axis({
                                                options: {
                                                    ...sharedOptions,
                                                    /**
                                                     * @override
                                                     */
                                                    id: ENUMS.PRINT.y_axis,
                                                    fillStroke: ENUMS.COLOR.blue,
                                                    scaling: 1 * stage?.grid.GRIDCELL_DIM,
                                                    angle: 135
                                                }
                                            })
                                        )
                                    /* break; */
                                    case 3:
                                        return (
                                            axis = new axis({
                                                options: {
                                                    ...sharedOptions,
                                                    /**
                                                     * @override
                                                     */
                                                    id: ENUMS.PRINT.z_axis,
                                                    fillStroke: ENUMS.COLOR.red,
                                                    scaling: 1 * stage?.grid.GRIDCELL_DIM,
                                                    angle: -90
                                                }
                                            })
                                        )
                                    /* break; */
                                }
                                
                            })
                        ], ({paths}) => {
                            
                            const sharedAnimProps = {duration: 10, from: 0, to: 180, iterations: Infinity}
                            
                            function renderRest(count = sharedAnimProps.to) {

                                SVGList.from(paths).on( UnitVector.setTransfromPoints({HTMLCanvas, XMLSVG, ENUMS}) );

                                // paths.x_axis.setPoints([
                                //     ...UnitVector.drawAxis({count, HTMLCanvas})
                                // ], 1);
                                // paths.y_axis.setPoints([
                                //     ...UnitVector.drawAxis({count, HTMLCanvas})
                                // ], 1);

                            } renderRest();

                            // const animShift = startAnimation({...sharedAnimProps, callback: function({count}) {

                            //         const reverseCountOnCondition = (c)=>{
                            //             if (c <= sharedAnimProps.to/2){
                            //                 return ({
                            //                     value: c
                            //                 })
                            //             } else /* (c > 90) */ {
                            //                 return ({
                            //                     value: sharedAnimProps.to - c
                            //                 })
                            //             }
                            //         }
                                
                            //         paths.z_axis.setPoints([
                            //             ...UnitVector.drawAxis({count: reverseCountOnCondition(count).value, HTMLCanvas})
                            //         ])
                                                                        
                            //         if (count === (sharedAnimProps.to)-1) {

                            //             paths.z_axis.dataset.angle *= -1;
                            //             SVGList.from(paths).on( UnitVector.setTransfromPoints({HTMLCanvas, XMLSVG, ENUMS}) );

                            //             renderRest(sharedAnimProps.to);
                                        
                            //             paths.z_axis.setPoints([
                            //             ...UnitVector.drawAxis({count: reverseCountOnCondition(count).value, HTMLCanvas})
                            //             ])
                                        
                            //         }

                            // }});
                            
                            // /* animShift.pause() */// # [PASSING]

                        });
                    break;
                }
        
        });
        
    }
}
