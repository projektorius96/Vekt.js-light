import './globals.css';
import { CONSTANTS, MAPPING } from './globals.js';
import AnimationCounter from './modules/animations.js';
import UnitCircle from './shapes/unit-circle/index.js';
import UnitSquare from './shapes/unit-square/index.js';
import UnitVector from './shapes/unit-vector/index.js';

export default class {

    /**
     * @returns Instantiates `SVGSVGElement`, each internally presented as top-level `<svg-container>` web component
     */
    static registerContainersForSVG({XMLSVG}){
    
        return([
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: 'unit_square',
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
                    /* DEV_NOTE (!) # adding random prefix such as "HIDE:", it will opt-out from control flow in switch block (see `default.drawPaths`) */
                    id: 'HIDE:circle',
                }
            })
        ])

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
        
        const
            { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry
            ,
            { GLOBAL_SCALAR } = CONSTANTS
            ,
            QUADRANT = Converters.radToDeg(Math.PI/2)
            ;

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

                                    /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */
                                    dashed: 0,

                                    strokeWidth: 3,
                                    fill: ENUMS.COLOR.none,
                                    stroke: ENUMS.COLOR.purple,
                                }
                            })
                        ]
                        , 
                        ({paths})=>SVGList.from(paths).on((path)=>{

                            UnitCircle.draw({Helpers: HTMLCanvas.Helpers, path, XMLSVG, ENUMS});

                        })
                        );

                    break;
                    
                    case (ENUMS.CASE.unit_square) :

                            XMLSVG.Helpers.findByID(id)
                            .setPaths([
                                new XMLSVG.Views.Path({
                                    options: {
                                        id: ENUMS.PRINT.unit_square,
                                        hidden: !true,
                                        
                                        /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */
                                        dashed: 0,

                                        strokeWidth: 1,
                                        /* fill: ENUMS.COLOR.magenta,
                                        stroke: ENUMS.COLOR.magenta, */
                                        fillStroke: ENUMS.COLOR.magenta,
                                        opacity: 0.25,
                                        scaling: stage.grid.GRIDCELL_DIM,
                                        angle: -1 * QUADRANT,
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
                                        
                                        ].map((basis)=>{
                                            return({
                                                x: basis.x * GLOBAL_SCALAR,
                                                y: basis.y * GLOBAL_SCALAR,
                                            })
                                        })
                                    }
                                })
                            ]
                            , 
                            ({paths}) => SVGList.from(paths).on((path)=>{
                                
                                // DEV_NOTE [CULPRIT-SOLVED] # matrix transformation cannot happen in homogeneous fashion, it must be separate matrix multiplication operation, with skew angle (rotation) would be disregarded (ignored)
                                UnitSquare.draw( { Helpers: HTMLCanvas.Helpers, path/* , skew: { X: { phi: -0 } } */ } )

                            })
                            );
                        
                    break;

                    case (ENUMS.CASE.axes) :                    
                        
                    const NUMBER_OF_AXIS = 4;
                        XMLSVG.Helpers.findByID(id)
                        .setPaths([
                            ...Array(NUMBER_OF_AXIS).fill(XMLSVG.Views.Path).map((axis, i)=>{

                                const
                                    animationConfig = {
                                        count: 90
                                    }
                                    ,
                                    sharedOptions = {
                                        id: '',
                                        scaling: 0,
                                        angle: 0,
                                        points: [
                                            /* DEV_NOTE (!) # mandatory basis vectors */
                                            {x: 1, y: 0}
                                        ],

                                        /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */

                                        dashed: false,
                                        strokeWidth: 3,
                                        fillStroke: ENUMS.COLOR.magenta
                                    }
                                
                                const step = i;
                                switch (step) {

                                    case 0:
                                        return (
                                            axis = new axis({
                                                options: {
                                                    ...sharedOptions,
                                                    
                                                    /**
                                                     * @override
                                                     */
                                                    id: ENUMS.PRINT.east,
                                                    fillStroke: ENUMS.COLOR.green,
                                                    scaling: (GLOBAL_SCALAR * stage.grid.GRIDCELL_DIM),
                                                    angle: step * QUADRANT,
                                                }
                                            })
                                        );
                                    break;
                                    case 1:
                                        return (
                                            axis = new axis({
                                                options: {
                                                    ...sharedOptions,
                                                    
                                                    /**
                                                     * @override
                                                     */
                                                    id: ENUMS.PRINT.south,
                                                    fillStroke: ENUMS.COLOR.black,
                                                    scaling: (GLOBAL_SCALAR * stage.grid.GRIDCELL_DIM),
                                                    angle: step * QUADRANT,
                                                }
                                            })
                                        );
                                    break;

                                    case 2:
                                        return (
                                            axis = new axis({
                                                options: {

                                                    ...sharedOptions,
                                                    
                                                    /**
                                                     * @override
                                                     */
                                                    id: ENUMS.PRINT.west,
                                                    fillStroke: ENUMS.COLOR.blue,
                                                    scaling: GLOBAL_SCALAR *stage.grid.GRIDCELL_DIM,
                                                    angle: step * QUADRANT
                                                    
                                                }
                                            })
                                        );
                                    break;

                                    case 3:
                                        return (
                                            axis = new axis({
                                                options: {
                                                    ...sharedOptions,
                                                    
                                                    /**
                                                     * @override
                                                     */
                                                    id: ENUMS.PRINT.north,
                                                    fillStroke: ENUMS.COLOR.red,
                                                    scaling: (GLOBAL_SCALAR * stage.grid.GRIDCELL_DIM),
                                                    angle: step * QUADRANT
                                                }
                                            })
                                        );
                                    break;

                                }
                                
                            })
                        ], ({paths}) => {

                            const pathsPalette = SVGList.from(paths).map((path)=>{
                                return path = path.style.stroke;
                            });
                            

                            /* === ANIMATIONS === */

                                    // void function draw_animations() {

                                    //     const
                                    //         animConfig = {
                                    //             from: 0,
                                    //             to: 360,
                                    //             duration: 1,
                                    //             iterations: Infinity
                                    //         }
                                    //         ,
                                    //         animCounter = AnimationCounter({...animConfig, callback: function({count}) {
                                                
                                    //             /* Use the `{count}` as the animation primitive to implement the progressing animation */

                                    //         }})
                                    //     ;
                                    
                                    //     /**
                                    //      * @test
                                    //      */
                                    //     /* animCounter.pause(); */// # [PASSING]
                                    //     /* animCounter.play(); */// # [PASSING]

                                    //     /**
                                    //      * > **NOTE:** Exposing [animCounter] to play|pause from DevTools with ease. 
                                    //      * 
                                    //      * @global
                                    //      * @var
                                    //      */
                                    //     globalThis.animCounter1 = animCounter;
                                        
                                    // }();

                            /* === ANIMATIONS === */
                            
                            /**
                             * @override
                             */
                            SVGList.from(paths).on((path, step)=>{

                                // DEV-TIP # pass {0 | false} to [length] to hide arrow heads of line segment (or vector)
                                path.setPoints([
                                    ...UnitVector.drawVector({Helpers: HTMLCanvas.Helpers, path /* , length: false */})
                                ], 1);

                                /* === LABELS === */

                                    void function draw_labels() {

                                        const 
                                            TEXT_SPACING = 10
                                            ;

                                        let
                                            { e: x, f: y } = path.getCurrentMatrix()
                                            ;
                                        
                                        /**
                                         * @override
                                         * @type text positioning
                                         */
                                        switch (true) {
                                            case ( path.id === ENUMS.ID.north ) :
                                                x += 0;
                                                y += Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                            break;
                                            case ( path.id === ENUMS.ID.south ) :
                                                x += 0;
                                                y -= Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                            break;
                                            case ( path.id === ENUMS.ID.west ) :
                                                x -= Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                                y += 0;
                                            break;
                                            case ( path.id === ENUMS.ID.east ) :
                                                x += Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                                y += 0;
                                            break;
                                        }
                                        
                                        /**
                                         * @arbitrary
                                         * 
                                         * NOTE: _this is more-less de-facto (if not standardised) font size for majority of modern browser vendors._
                                         */
                                        const defaultVendorFontSize = window
                                                .getComputedStyle(document.documentElement)
                                                .getPropertyValue('font-size').replace(CSS.px.name, "");
                                        if (defaultVendorFontSize) {

                                            /**
                                             * **DEV_NOTE**: apparently labels are drawn counter-clockwise, compared to arrow stroke clockwise direction...
                                             * 
                                             * @debugger
                                             */
                                            let color_culprit;
                                            /* console.log(path.style.stroke); */                                            
                                            path.setLabel({
                                                x, 
                                                y, 
                                                svg: path.getParent(), 
                                                text: MAPPING.labels.compass.get(path.id), 
                                                overrides: {
                                                    fill: pathsPalette.at(-step)/* instead of ==> path.style.stroke */, 
                                                    scale: stage.grid.GRIDCELL_DIM / (2 * defaultVendorFontSize),
                                                }
                                            });
                                        }

                                    }();
                                    
                                /* === LABELS === */

                            });

                        });

                    break;
                }
        
        });
        
    }
}