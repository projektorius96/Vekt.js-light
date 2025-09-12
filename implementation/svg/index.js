import './globals.css';
import UnitCircle from './shapes/unit-circle/index.js';
import UnitSquare from './shapes/unit-square/index.js';
import UnitVector from './shapes/unit-vector/index.js';
import { startAnimation } from './modules/animations.js';

export default class {

    /**
     * **DEV_TIP**: Within `XMLSVG.ViewGroup.Container` call (see `default.registerContainersForSVG`), prefixing `options.id` value with a few exclamation mark (_one is enough, more improves readability_) will idiomatically opt-out from switch statement selection (see `default.drawPaths`)
     * 
     * @returns Instantiates `SVGSVGElement`, each internally presented as top-level `<svg-container>` web component
     */
    static registerContainersForSVG({XMLSVG}){
        
        const sharedOptions = {
            scaling: 1,
            id: ''
        }
        
        return([
            new XMLSVG.ViewGroup.Container({
                options: {
                    ...sharedOptions,
                    /**
                     * @override
                     */
                    id: 'parallelogram',
                }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    ...sharedOptions,
                    /**
                     * @override
                     */
                    id: 'axes',
                }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    ...sharedOptions,
                    /**
                     * @override
                     */
                    id: '!!!circle',
                }
            })
        ].map((container)=>{            
            return container;
        }))

    }

    /**
     * @returns {void} Instantiates `SVGPathElement`, each internally presented as `<svg-path>` nested under top-level XML-namespaced `<svg-container>`
     * @see {@link `default.registerContainersForSVG`}
     */
    static drawPaths({HTMLCanvas, XMLSVG, ENUMS}) {

        /**
         * @alias
         */
        const 
            [SVGList, OrderedPair] = Array(2).fill(Array);
        
        const SNAP_TO_GRID = 1 / Math.sin(Math.PI/4);

        const { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry;

        SVGList
        .of(...this.registerContainersForSVG({XMLSVG}))
        .on(
            
            ({id})=>{

                switch (id) {

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
                    
                    case (ENUMS.CASE.parallelogram) :

                            XMLSVG.Helpers.findByID(id)
                            .setPaths([
                                new XMLSVG.Views.Path({
                                    options: {
                                        id: ENUMS.PRINT.unit_square,
                                        hidden: !true,
                                        
                                        /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */
                                        dashed: 0,

                                        strokeWidth: 1,
                                        fill: ENUMS.COLOR.grey,
                                        stroke: ENUMS.COLOR.black,
                                        stroke: 'black',
                                        opacity: 0.25,
                                        scaling: stage?.grid.GRIDCELL_DIM * 1,
                                        angle: 0,
                                        points: [

                                        /* === ZERO VECTOR (opens the path) === */
                                            ...OrderedPair.from([{x: 0, y: 0}]),
                                        /* === ZERO VECTOR (opens the path) === */

                                        /* === BASIS === */
                                            ...OrderedPair.from([{x: 1, y: 0}]),
                                            ...OrderedPair.from([{x: 1, y: 1}]),
                                            ...OrderedPair.from([{x: 0, y: 1}]),
                                        /* === BASIS === */

                                        /* === ZERO VECTOR (closes the path) === */
                                            ...OrderedPair.from([{x: 0, y: 0}]),
                                        /* === ZERO VECTOR (closes the path) === */
                                        
                                        ]
                                    }
                                })
                            ]
                            , 
                            ({paths}) => SVGList.from(paths).on( UnitSquare.draw({HTMLCanvas, XMLSVG, ENUMS, skew: { X: { phi: -45 } }}) )
                            );
                        
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
                                        }),
                                    ],
                                    /* DEV_NOTE # herein: dashed := [1.0..10]; to disable, pass either := 0|false */
                                    dashed: false,
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
                                                    /* scaling: 1 * stage.grid.GRIDCELL_DIM, */
                                                    angle: 0,
                                                }
                                            })
                                        )
                                    break;
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
                                                    scaling: 1 * stage?.grid.GRIDCELL_DIM * SNAP_TO_GRID,
                                                    angle: 135
                                                }
                                            })
                                        )
                                    break;
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
                                        );
                                    break;
                                }
                                
                            })
                        ], ({paths}) => {

                            SVGList.from(paths).on( UnitVector.setTransfromPoints({HTMLCanvas, XMLSVG, ENUMS}) );
                            void function overridePaths(){

                                // EXAMPLE # override direction of [paths.z_axis]
                                // paths.z_axis.setPoints([
                                //     ...UnitVector.drawAxis({/* count: 90, */ HTMLCanvas})
                                // ], Number( -1 * paths.z_axis.dataset.scaling ))
                                
                                paths.y_axis.setPoints([
                                    ...UnitVector.drawAxis({count: 90, HTMLCanvas})
                                ], Number( 1 * paths.y_axis.dataset.scaling ))

                                void function z_axis(){

                                    const                                   
                                        { e: translateX, f: translateY } = paths.z_axis.transform.baseVal.getItem(0).matrix
                                        ;
                                    
                                    const arrowHead
                                        = new XMLSVG.Views.Path({
                                            options: {
                                                ...JSON.parse(paths.z_axis.dataset.options),
                                                /**
                                                 * @override
                                                 */
                                                id: `z_vector`, 
                                                points: [
                                                    ...UnitVector.addArrowHead({scaling: Number( paths.z_axis.dataset.scaling )})
                                                ]
                                            }
                                            })
                                        ;
                                                                        
                                    arrowHead.children.z_vector.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        , 
                                        new DOMMatrix(
                                            HTMLCanvas.Helpers.Trigonometry.setTransform({
                                                angle: ( Number( paths.z_axis.dataset.angle ) )
                                                , 
                                                translateX: stage.grid.SVG.X_IN_MIDDLE
                                                , 
                                                translateY: stage.grid.SVG.Y_IN_MIDDLE - stage.grid.GRIDCELL_DIM
                                            })
                                        ).toString()
                                    )
                                    
                                    paths.z_axis.getParent().insertAdjacentHTML(
                                        'beforeend'
                                        ,
                                        arrowHead.children.z_vector.outerHTML
                                    )
                                    
                                }();
                                

                            }();

                        });
                    break;
                }
        
        });
        
    }
}
