
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
                    // DEV_NOTE # Trigonometry co-function sin(Math.PI/2 - theta) = cos(theta)
                    x: Math.sin( Math.PI/2 - Converters.degToRad(point) ),
                    y: LIM_TO_0 * Math.sin( Converters.degToRad(point) )
                });
            })
        ])
        ,
    ]);

}