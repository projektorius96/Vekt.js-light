
export default class {

    static setTransfromPoints({Helpers}) {

            return (

                ({id})=>{
                    
                    const path = document.getElementById( id );

                    if( path.setPoints( path.getPoints() ) ) {

                        /**
                         * @dependencies
                         */
                        const 
                            { Trigonometry } = Helpers
                        ;
                        
                            path.setAttribute(
                                'transform'
                                , 
                                new DOMMatrix(
                                    Trigonometry.setTransform({
                                        angle: ( path.dataset.angle || 0 )
                                        , 
                                        translateX: stage.grid.SVG.X_IN_MIDDLE
                                        , 
                                        translateY: stage.grid.SVG.Y_IN_MIDDLE
                                    })
                                ).toString()
                            )
                    
                    }

                }
            );

    }

    static [drawAxis.name] = drawAxis;
    static [addArrowHead.name] = addArrowHead;

}

/**
 * 
 * @param {Object} `callee` - callee is `XMLSVG.Views.Path` 
 */
function drawAxis({Helpers, count = 90}) {

    /**
     * @dependencies
     */
    const 
        { Trigonometry } = Helpers
        ,
        { Converters, setRange } = Trigonometry
        ;
    
    /**
     * @alias
     */
    const OrderedPair = Array;

    const
        // DEV_NOTE (!) # DO NOT TOUCH [HAVER_CIRCLE] configuration
        HAVER_CIRCLE = [0, 1, count/* *2 */]
        ;

    return ([
        ...OrderedPair.from([
            ...setRange(...HAVER_CIRCLE).map((point) => {
                return ({
                    // DEV_NOTE # trigonometry co-function: sin(Math.PI/2 - theta) = cos(theta)
                    x: Math.sin( Math.PI/2 - Converters.degToRad(point) ),
                    y: 0
                });
            })
        ])
        ,
    ]);

}

function addArrowHead({Helpers, path, angle, sharpness = 6, length = 1/6}) {
    
    // DEV_NOTE # arrowhead points in local coordinates system (pointing along positive X axis)
    const baseShape = [
        { x:0, y:0 },                            // tip of arrow
        { x: -length, y:  length / sharpness },  // bottom wing
        { x: -length, y: -length / sharpness },  // top wing
        { x:0, y:0 },                            // explicitly closing the path
    ]   // Scale + offset 
    .map((point)=>{
            return({
                x: ( Number( path.dataset.scaling ) * point.x ) + path.getPoints()[0]['x'],
                y: ( Number( path.dataset.scaling ) * point.y ) + path.getPoints()[0]['y'],
            })
    });

    /**
     * @dependencies
     */
    const 
        { Trigonometry } = Helpers
        ;
    
    path.setAttribute(
        'transform'
        , 
        new DOMMatrix(
            Trigonometry.setTransform({
                angle: angle || Number( path.dataset.angle )
                , 
                translateX: stage.grid.SVG.X_IN_MIDDLE
                , 
                translateY: stage.grid.SVG.Y_IN_MIDDLE
            })
        ).toString()
    )

    return baseShape;

}


