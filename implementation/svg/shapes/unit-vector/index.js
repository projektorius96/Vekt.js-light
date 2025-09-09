
export default class UnitVector {

    static draw({HTMLCanvas, XMLSVG, ENUMS}) {

            return (

                ({id})=>{

                    const path = XMLSVG.Helpers.findByID( id );
                                                    
                    void function initPoints() {

                        path.setPoints( path.parsePoints() , path.dataset.scaling ?? 1 );

                    }();
                    void function transformPoints() {

                        const
                            { setTransform } = HTMLCanvas.Helpers.Trigonometry
                            ,
                            { width, height } = path?.getBoundingClientRect()
                            ;
                        
                            path.setAttribute(
                                ENUMS.ATTRIBUTE.transform
                                , 
                                new DOMMatrix(
                                    setTransform({
                                        angle: ( path.dataset.angle || 0 )
                                        , 
                                        translateX: stage.grid.SVG.X_IN_MIDDLE
                                        , 
                                        translateY: stage.grid.SVG.Y_IN_MIDDLE})
                                ).toString()
                            )
                    
                    }();
            });

    }

    static [addArrowHead.name] = addArrowHead;
    static [drawAxis.name] = drawAxis;
    // static Helpers = {
    //     drawAxis
    // }

    /* static {
        Object.freeze(
            this.Helpers
        )
    } */

}

/**
 * 
 * @param {Object} `callee` - callee is `XMLSVG.Views.Path` 
 */
function drawAxis({HTMLCanvas, count = 1}) {

    /**
     * @dependencies
     */
    const 
        { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry
        ;
    

    /**
     * @alias
     */
    const OrderedPair = Array;

    const
        HAVER_CIRCLE = [0, 1, count]
        ,
        LIMIT_TO_0 = (1 / Number.MAX_SAFE_INTEGER)
        ;

    return ([
        ...OrderedPair.from([
            ...setRange(...HAVER_CIRCLE).map((deg) => {
                return ({
                    x: deg/stage.grid.GRIDCELL_DIM,
                    y: 0
                    // x: (/* Math.cos(Converters.degToRad( */deg/* )) */ + (TRANSLATE_X+2)/stage.grid.GRIDCELL_DIM) - 1 /* <== removes the radius, when the shape is not filled */,
                    // /* x: (1 * deg + TRANSLATE_X) - 1, */// DEV_TIP # "chamber effect"
                    // y: (LIMIT_TO_0 * /* Math.sin(Converters.degToRad( */deg/* )) */ + TRANSLATE_Y) - 0,
                });
            })
        ])
        ,
        // // DEV_NOTE # [FAILING]@if{called with `UnitVector.addArrowHead`}
        // ...UnitVector.addArrowHead({
        //     TRANSLATE_X,
        //     TRANSLATE_Y,
        //     sharpness: arrowHeadOptions.sharpness,
        //     length: arrowHeadOptions.length,
        // })
    ]);

}

/**
 * > Kudos to: ChatGPT for cleaner version of my brain of storm...
 */
function addArrowHead({sharpness=1, length=1, TRANSLATE_X = 0, TRANSLATE_Y = 0}) {

    // Arrowhead points in *local coords* (pointing along +X axis)
    const baseShape = [
        { x: 0,    y: 0 },                       // tip of arrow
        { x: -length, y:  length / sharpness },  // bottom wing
        { x: -length, y: -length / sharpness },  // top wing
        { x: 0,    y: 0 },                       // explicitly closing the arrow
    ];

    // Rotate + translate to actual orientation
    return baseShape.map(point => ({
        x: (point.x * Math.cos(0) - point.y * Math.sin(0) + TRANSLATE_X),
        y: (point.x * Math.sin(0) + point.y * Math.cos(0) + TRANSLATE_Y)
    }));

}
