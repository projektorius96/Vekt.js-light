
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

    static [drawVector.name] = drawVector;

}

function drawVector({Helpers, path, angle, count, sharpness = 6, length = 1/6}) {
    
    /**
     * @dependencies
     */
    const 
        { Trigonometry } = Helpers
        ;
        
    // DEV_NOTE # arrowhead points in local coordinates system (pointing along positive X axis)
    const baseShape = [
        {x: 1, y: 0},
        { x:0, y:0 },                            // tip of arrow
        { x: -length, y:  length / sharpness },  // bottom wing
        { x: -length, y: -length / sharpness },  // top wing
        { x:0, y:0 },                            // explicitly closing the path
    ]   // Scale + offset 
    .map((point)=>{        
            return({
                x: (( Number( path.dataset.scaling ) * point.x ) + path.getPoints().at(-1)['x']/* + translationX */),
                y: (( Number( path.dataset.scaling ) * point.y ) + path.getPoints().at(-1)['y']/* + translationY */),
            })
    });
    
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


