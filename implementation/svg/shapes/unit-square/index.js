export default class {

    static draw({Helpers, path/* , skew = { X: { phi: 0 } } */}) {
                                                
        if ( path.setPoints( path.getPoints() ) ) {

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
                        /* ,
                        skew */
                    })
                ).toString()
            );
        
        }
    }

}
