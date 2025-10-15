import './globals.css';
import UnitCircle from './shapes/unit-circle/index.js';
import UnitSquare from './shapes/unit-square/index.js';
import UnitVector from './shapes/unit-vector/index.js';
import { startAnimation } from './modules/animations.js';

export default class {

    /**
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
                    id: 'hide:circle',
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
            GROW_ALONG_SLOPE = 1 / Math.sin(Math.PI/4)
            ,
            /* DEV_NOTE (!) # DO NOT change the `GLOBAL_SCALAR`, it must remain constant for `parallelogram` to outline nicely, instead scale in `globals.css` */
            GLOBAL_SCALAR = 3
            ;

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

                            UnitCircle.draw({Helpers: HTMLCanvas.Helpers, path, XMLSVG, ENUMS})

                        })
                        );

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

                                        strokeWidth: 0,
                                        fill: ENUMS.COLOR.grey,
                                        stroke: ENUMS.COLOR.black,
                                        stroke: 'black',
                                        opacity: 0.25,
                                        scaling: stage.grid.GRIDCELL_DIM,
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
                                        
                                        ].map((basis)=>{
                                            return({
                                                x: basis.x * GLOBAL_SCALAR,
                                                y: basis.y * GROW_ALONG_SLOPE,
                                            })
                                        })
                                    }
                                })
                            ]
                            , 
                            ({paths}) => SVGList.from(paths).on((path)=>{

                                UnitSquare.draw( { Helpers: HTMLCanvas.Helpers, path, skew: { X: { phi: -45 } } } )

                            })
                            );
                        
                    break;

                    case (ENUMS.CASE.axes) :                    
                        
                        XMLSVG.Helpers.findByID(id)
                        .setPaths([
                            ...Array(3).fill(XMLSVG.Views.Path).map((axis, i)=>{

                                const
                                    animationConfig = {
                                        count: 90
                                    }
                                    ,
                                    scaling = (GLOBAL_SCALAR * stage.grid.GRIDCELL_DIM) * ( Math.sin( Converters.degToRad( animationConfig.count ) ) )
                                    ,
                                    sharedOptions = {
                                        id: '',
                                        scaling,
                                        angle: 0,
                                        points: [
                                            {x: 1, y: 0}
                                        ],

                                        /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */

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
                                                    scaling: (GLOBAL_SCALAR * stage.grid.GRIDCELL_DIM)/*  * ( Math.sin( Converters.degToRad( 90 ) ) ) */,
                                                    angle: 0,
                                                }
                                            })
                                        )
                                    break;
                                    case 2:
                                        const Q3 = Converters.radToDeg(Math.PI/4);
                                        return (
                                            axis = new axis({
                                                options: {
                                                    ...sharedOptions,
                                                    /**
                                                     * @override
                                                     */
                                                    id: ENUMS.PRINT.y_axis,
                                                    fillStroke: ENUMS.COLOR.blue,
                                                    scaling: (GLOBAL_SCALAR * stage.grid.GRIDCELL_DIM) * ( Math.cos( Math.PI/4 ) ),
                                                    angle: Number(3 * Q3)
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
                                                    scaling: sharedOptions.scaling,
                                                    angle: -90
                                                }
                                            })
                                        );
                                    break;
                                }
                                
                            })
                        ], ({paths}) => {

                            const Helpers = HTMLCanvas.Helpers;

                            /**
                             * @override
                             */
                            SVGList.from(paths).on((path)=>{

                                // DEV_TIP # pass {0 | false} to [length] to hide arrow heads of line segment (or vector)
                                path.setPoints([
                                    ...UnitVector.drawVector({Helpers, path /* , length: false */})
                                ], 1);

                                /* === LABELS === */

                                        let 
                                            TEXT_SPACING = 10
                                            ,
                                            { e: x, f: y } = path.getCurrentMatrix();

                                        /**
                                         * @override
                                         */
                                        switch (true) {
                                            case ( path.id === ENUMS.ID.z_axis ) :
                                                y -= Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                            break;
                                            case ( path.id === ENUMS.ID.x_axis ) :
                                                x += Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                            break;
                                            case ( path.id === ENUMS.ID.y_axis ) :
                                                x -= Math.ceil(path.dataset.scaling) / GROW_ALONG_SLOPE + TEXT_SPACING;
                                                y += Math.ceil(path.dataset.scaling) / GROW_ALONG_SLOPE + TEXT_SPACING;
                                            break;
                                        }
                                    
                                    path.setLabel({x, y, svg: path.getParent(), text: path.id.replace("_axis", "").toUpperCase(), overrides: { fill: path.style.stroke }})
                                    
                                /* === LABELS === */

                            })

                            const
                                animConfig = {
                                    from: 0,
                                    to: 360,
                                    duration: 10,
                                    iterations: Infinity
                                }
                                ,
                                animShift = startAnimation({...animConfig, callback: function({count}) {
                                    
                                    const reverseCountOnCondition = (c)=>{
                                        if (c < animConfig.to){
                                            return ({
                                                value: c
                                            })
                                        } else {
                                            return ({
                                                value: animConfig.to - c
                                            })
                                        }
                                    }
                                                                        
                                    if ( count === animConfig.to-1 ) {
                                        
                                        paths.z_axis.setPoints([
                                        ...UnitVector.drawVector({
                                            Helpers, 
                                            path: paths.z_axis,
                                            /* length: false */
                                        })
                                    ], -1 *  Math.sin( Converters.degToRad( reverseCountOnCondition(count).value ) ))

                                    } else {

                                        paths.z_axis.setPoints([
                                        ...UnitVector.drawVector({
                                            Helpers, 
                                            path: paths.z_axis,
                                            /* length: false */
                                        })
                                    ], 1 *  Math.cos( Converters.degToRad( reverseCountOnCondition(count).value ) )) 

                                    }

                            }});
                            
                            /* animShift.pause() */// # [PASSING]

                        });

                    break;
                }
        
        });
        
    }
}
