
export default class {

    static setTransfromPoints({HTMLCanvas, XMLSVG, ENUMS}) {

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
                                        translateY: stage.grid.SVG.Y_IN_MIDDLE
                                    })
                                ).toString()
                            )
                    
                    }();
            });

    }

    static [drawAxis.name] = drawAxis;
    static [addArrowHead.name] = addArrowHead;

}

/**
 * 
 * @param {Object} `callee` - callee is `XMLSVG.Views.Path` 
 */
function drawAxis({HTMLCanvas, count = 90}) {

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
        // DEV_NOTE (!) # DO NOT TOUCH [HAVER_CIRCLE] configuration
        HAVER_CIRCLE = [0, 1, count]
        ,
        LIM_TO_0 = (1 / Number.MAX_SAFE_INTEGER)
        ;

    return ([
        ...OrderedPair.from([
            ...setRange(...HAVER_CIRCLE).map((point) => {
                return ({
                    // DEV_NOTE # trigonometry co-function: sin(Math.PI/2 - theta) = cos(theta)
                    x: Math.sin( Math.PI/2 - Converters.degToRad(point) ),
                    // DEV_NOTE # we could just pass 0 to y-component, but this preserves the feel of Trigonometry-ness
                    y: LIM_TO_0 * Math.sin( Converters.degToRad(point) )
                });
            })
        ])
        ,
    ]);

}

function addArrowHead({/* angleDeg,  */sharpness = 3, length = 1/4, scaling = 1}) {
    
    /* const angle = Converters.degToRad(angleDeg); */

    // Arrowhead points in *local coords* (pointing along +X axis)
    const baseShape = [
        { x: 0,    y: 0 },                       // tip of arrow
        { x: -length, y:  length / sharpness },  // bottom wing
        { x: -length, y: -length / sharpness },  // top wing
        { x: 0,    y: 0 },                       // explicitly closing the path
    ];

    // Rotate + Scale
    return (
        baseShape
        .map((point) => {
            return ({
                // DEV_NOTE # This object of {x, y} pairs is nothing else than counter-clockwise matrix configuration for rotation transformation
                x: point.x * Math.cos(/* angle */0) - point.y * Math.sin(/* angle */0),
                y: point.x * Math.sin(/* angle */0) + point.y * Math.cos(/* angle */0)
            });
        })
        .map((point) => {
            return ({
                // DEV_NOTE # This object of {x, y} pairs is nothing else than counter-clockwise matrix configuration for rotation transformation
                x: scaling * point.x,
                y: scaling * point.y
            });
        })
    )
}


