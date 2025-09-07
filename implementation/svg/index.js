import UnitSquare from './shapes/unit-square/index.js';
import UnitCircle from './shapes/unit-circle/index.js';
import UnitVector from './shapes/unit-vector/index.js';
import Helpers from './shapes/Helpers.js';

export default class {

    /**
     * DEV_TIP: Within `XMLSVG.ViewGroup.Container` call (see `default.registerContainersForSVG`), prefixing `options.id` value with a few exclamation mark (_one is enough, more improves readability_) will idiomatically opt-out from switch statement selection (see `default.drawPaths`)
     * 
     * @returns Instantiates `SVGSVGElement`, each internally presented as top-level `<svg-container>` web component
     */
    static registerContainersForSVG({XMLSVG}){     
        
        return([
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: '!!!group_1',
                }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: '!!!group_2',
                }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: 'group_3',
                }
            })
        ])

    }

    /**
     * @returns {void} Instantiates `SVGPathElement`, each internally presented as `<svg-path>` nested under top-level XML-namespaced `<svg-container>`
     * @see {@link `default.registerContainersForSVG`}
     */
    static drawPaths({HTMLCanvas, XMLSVG, ENUMS, userConfig, SVGList = Array}) {

        const { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry;

        SVGList
        .of(...this.registerContainersForSVG({XMLSVG}))
        .on(
            
            ({id})=>{

                const HIDE_PATH = 0;

                switch (id) {

                    case (ENUMS.CASE.group_1) :

                            XMLSVG.Helpers.findByID(id)
                            .setPaths([
                                new XMLSVG.Views.Path({
                                    options: {
                                        ...userConfig.svg.paths.unit_square.options,
                                        scaling: stage?.grid.GRIDCELL_DIM * 2.5,
                                        angle: 0,
                                    }
                                })
                                ,
                                new XMLSVG.Views.Path({
                                    options: {
                                        ...userConfig.svg.paths.unit_square.options,
                                        scaling: stage?.grid.GRIDCELL_DIM * 2.0,
                                        angle: 0,
                                        /**
                                         * @override
                                         */
                                        id: ENUMS.PRINT.right_triangle,
                                        points: [
                                            ...userConfig.svg.paths.unit_square.options.points
                                                .filter((vec2, i) => {
                                                    if (i !== 2) return vec2;
                                                })
                                        ],
                                        stroke: ENUMS.COLOR.red
                                    }
                                })
                                ,
                            ]
                            , 
                            ({paths}) => SVGList.from(paths).on( UnitSquare.draw({HTMLCanvas, XMLSVG, ENUMS}) )
                            );
                        
                    break;

                    case (ENUMS.CASE.group_2) :

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

                    case (ENUMS.CASE.group_3) :

                        const TRANSLATE_X = 2; // if set to 0, this will point towards origin
                        XMLSVG.Helpers.findByID(id)
                        .setPaths([
                            ...Array(3).fill(XMLSVG.Views.Path).map((axis, i)=>{

                                const sharedOptions = {
                                    id: '',
                                    scaling: 1 * stage?.grid.GRIDCELL_DIM,
                                    angle: 0,
                                    points: [
                                        ...Helpers.drawAxis({
                                            setRange
                                            , 
                                            degToRad: Converters.degToRad
                                            , 
                                            arrowHeadOptions: {
                                                sharpness: 4, 
                                                length: 1/3
                                            }
                                            ,
                                            TRANSLATE_X
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
                                                    id: ENUMS.PRINT.axis_x,
                                                    fillStroke: ENUMS.COLOR.green,
                                                    scaling: stage?.grid.GRIDCELL_DIM * 1.5,
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
                                                    id: ENUMS.PRINT.axis_y,
                                                    fillStroke: ENUMS.COLOR.blue,
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
                                                    id: ENUMS.PRINT.axis_z,
                                                    fillStroke: ENUMS.COLOR.red,
                                                    scaling: stage?.grid.GRIDCELL_DIM * 1.5,
                                                    angle: -90
                                                }
                                            })
                                        )
                                    /* break; */
                                }
                                
                            })
                        ], ({paths}) => SVGList.from(paths).on( UnitVector.draw({HTMLCanvas, XMLSVG, ENUMS}) ));
                    break;
                }
        
            });
    }
}
