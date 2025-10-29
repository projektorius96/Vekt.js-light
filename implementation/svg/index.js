import './globals.css';
import { CONSTANTS } from './globals.js';
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
            { SLOPE_TERSER, GLOBAL_SCALAR, GROW_ALONG_SLOPE } = CONSTANTS
            ,
            { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry
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
                                                y: basis.y * GLOBAL_SCALAR * SLOPE_TERSER,
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
                                            /* DEV_NOTE # basis vectors */
                                            {x: 1, y: 0}
                                        ],

                                        /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */

                                        dashed: false,
                                        strokeWidth: 3,
                                        fillStroke: ENUMS.COLOR.magenta
                                    }
                                
                                const step = ++i; // DEV_NOTE # zero+1 based "integers"
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
                                                    scaling: (GLOBAL_SCALAR * stage.grid.GRIDCELL_DIM),
                                                    angle: 0,
                                                }
                                            })
                                        );
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
                                                    scaling: GLOBAL_SCALAR * ((GROW_ALONG_SLOPE * SLOPE_TERSER) * stage.grid.GRIDCELL_DIM),
                                                    angle: Number(3 * Q3)
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

                                // DEV-TIP # pass {0 | false} to [length] to hide arrow heads of line segment (or vector)
                                path.setPoints([
                                    ...UnitVector.drawVector({Helpers, path /* , length: false */})
                                ], 1);

                                /* === LABELS === */

                                        let 
                                            TEXT_SPACING = 10
                                            ,
                                            { e: x, f: y } = path.getCurrentMatrix()
                                            ;
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
                                                y += Math.ceil(path.dataset.scaling) / GROW_ALONG_SLOPE + TEXT_SPACING * 3;
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
                                    path.setLabel({
                                        x, 
                                        y, 
                                        svg: path.getParent(), 
                                        text: path.id.replace("_axis", "").toUpperCase(), 
                                        overrides: { 
                                            fill: path.style.stroke, 
                                            scale: stage.grid.GRIDCELL_DIM / (2 * defaultVendorFontSize),
                                        }
                                    })
                                    
                                /* === LABELS === */

                            })

                            const
                                animConfig = {
                                    from: -90,
                                    to: 360,
                                    duration: 10,
                                    iterations: Infinity
                                }
                                ,
                                animCounter = AnimationCounter({...animConfig, callback: function({count}) {
                                    
                                    const reverseCountOnCondition = (c)=>{
                                        if (c < animConfig.to) {
                                            return ({
                                                value: c
                                            })
                                        } else {
                                            return ({
                                                value: animConfig.to - c
                                            })
                                        }
                                    }
                                                                        
                                    // existing z-axis animation (unchanged behavior)
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

                                    // ---- ADJUSTED: animate y-axis counter-clockwise towards x-axis (max 90°) ----
                                    try {
                                        // t drives the animation (0..359). reverseCountOnCondition returns same here.
                                        const t = reverseCountOnCondition(count).value/2;

                                        // base angle for y-axis (as set originally) = 135 degrees    
                                        const baseYAngle = Number(paths.y_axis.dataset.angle);

                                        // compute progress in [0..1..0] with period 180° using absolute sine
                                        // Math.abs(Math.sin(rad(t))) yields 0 -> 1 -> 0 every 180°,
                                        // so progress will smoothly go toward 1 then back to 0.
                                        const progress = Math.abs(Math.sin( Converters.degToRad( t ) ));

                                        const animatedYAngle = 1 * baseYAngle * progress;

                                        // update y-axis visual (rotate arrow). UnitVector.drawVector will set transform using the passed `angle`.
                                        if (paths.y_axis) {
                                            paths.y_axis.setPoints(
                                                [
                                                    ...UnitVector.drawVector({
                                                        Helpers,
                                                        path: paths.y_axis,
                                                        angle: animatedYAngle,
                                                    })
                                                ],
                                                1 * GROW_ALONG_SLOPE                                            );
                                        }

                                        // Now update parallelogram (unit_square) so it follows x/y axes each frame.
                                        const unitSquarePath = XMLSVG.Helpers.findByID(ENUMS.PRINT.unit_square);
                                        const xAxisPath = paths.x_axis || XMLSVG.Helpers.findByID(ENUMS.PRINT.x_axis);
                                        const yAxisPath = paths.y_axis || XMLSVG.Helpers.findByID(ENUMS.PRINT.y_axis);

                                        if (unitSquarePath && xAxisPath && yAxisPath) {
                                            // get transforms (DOMMatrix-like expected)
                                            const mx = xAxisPath.getCurrentMatrix ? xAxisPath.getCurrentMatrix() : (xAxisPath.getCTM ? xAxisPath.getCTM() : null);
                                            const my = yAxisPath.getCurrentMatrix ? yAxisPath.getCurrentMatrix() : (yAxisPath.getCTM ? yAxisPath.getCTM() : null);
                                            const mPar = unitSquarePath.getCurrentMatrix ? unitSquarePath.getCurrentMatrix() : (unitSquarePath.getCTM ? unitSquarePath.getCTM() : null);

                                            if (mx && my && mPar) {
                                                // endpoints in screen coordinates
                                                const originScreen = new DOMPoint(0, 0).matrixTransform(mx);    // should be same for both axes
                                                const xEndScreen = new DOMPoint(1, 0).matrixTransform(mx);
                                                const yEndScreen = new DOMPoint(1, 0).matrixTransform(my);

                                                // vector components (from origin)
                                                const ux = xEndScreen.x - originScreen.x;
                                                const uy = xEndScreen.y - originScreen.y;
                                                const vx = yEndScreen.x - originScreen.x;
                                                const vy = yEndScreen.y - originScreen.y;

                                                const lenU = Math.hypot(ux, uy) || 1;
                                                const lenV = Math.hypot(vx, vy) || 1;

                                                // normalized dot and cross (2D scalar cross)
                                                /* const dotNorm = (ux * vx + uy * vy) / (lenU * lenV); */
                                                const crossNorm = (ux * vy - uy * vx) / (lenU * lenV);

                                                // compute parallelogram corners in screen coordinates
                                                const A = originScreen;
                                                const B = xEndScreen;
                                                const D = yEndScreen;
                                                const C = new DOMPoint(
                                                    B.x + (D.x - A.x),
                                                    B.y + (D.y - A.y)
                                                );

                                                // map screen-space corners back into unit_square local coordinates
                                                const invPar = (typeof mPar.inverse === 'function') ? mPar.inverse() : (new DOMMatrix(mPar)).inverse();
                                                const localA = new DOMPoint(A.x, A.y).matrixTransform(invPar);
                                                const localB = new DOMPoint(B.x, B.y).matrixTransform(invPar);
                                                const localC = new DOMPoint(C.x, C.y).matrixTransform(invPar);
                                                const localD = new DOMPoint(D.x, D.y).matrixTransform(invPar);

                                                // set the path points (local coords) and close the path
                                                unitSquarePath.setPoints(
                                                    [
                                                        { x: localA.x, y: localA.y },
                                                        { x: localB.x, y: localB.y },
                                                        { x: localC.x, y: localC.y },
                                                        { x: localD.x, y: localD.y },
                                                        { x: localA.x, y: localA.y }
                                                    ].map((basis)=>{
                                                        return({
                                                            x: basis.x * GLOBAL_SCALAR,
                                                            y: basis.y * GLOBAL_SCALAR/*  * SLOPE_TERSER */,
                                                        })
                                                    }), stage.grid.GRIDCELL_DIM);

                                                // set visibility/opacity: show parallelogram proportional to |sin θ| (crossNorm)
                                                const baseOpacity = 0.25;
                                                const visualOpacity = Math.min(1, Math.max(0, Math.abs(crossNorm)));
                                                try {
                                                    unitSquarePath.style.opacity = String(baseOpacity * visualOpacity);
                                                    if (visualOpacity < 0.02) {
                                                        unitSquarePath.style.display = 'none';
                                                    } else {
                                                        unitSquarePath.style.display = '';
                                                    }
                                                } catch (e) {
                                                    try {
                                                        unitSquarePath.setAttribute('opacity', String(baseOpacity * visualOpacity));
                                                    } catch (e2) { /* ignore */ }
                                                }

                                                // // Expose debug-ish values on dataset for inspection
                                                // unitSquarePath.dataset.__dot = String(dotNorm.toFixed(3));
                                                // unitSquarePath.dataset.__cross = String(crossNorm.toFixed(3));
                                            }
                                        }

                                    } catch (err) {
                                        console.warn('axes animation frame failed', err);
                                    }

                                    // ---- end adjusted logic ----

                            }});
                            
                            /* animCounter.pause(); */// # [PASSING]
                            /* animCounter.play(); */// # [PASSING]

                            /**
                             * > **NOTE:** Exposing [animCounter] to play|pause from DevTools with ease. 
                             * 
                             * @global
                             * @var
                             */
                            globalThis.animCounter = animCounter;

                        });

                    break;
                }
        
        });
        
    }
}