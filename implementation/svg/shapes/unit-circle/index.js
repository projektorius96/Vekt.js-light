export default class {

    static draw({Helpers, path}) {

        if ( path.setPoints( path.getPoints() ) ) {

            /**
             * @dependencies
             */
            const 
                { Trigonometry } = Helpers
                ;

            const
                { width } = path?.getBoundingClientRect()
                ;
            
            path.setAttribute(
                'transform'
                ,
                new DOMMatrix(
                    Trigonometry.setTransform({
                        angle: ( path.dataset.angle || 0 )
                        , 
                        translateX: stage.grid.SVG.X_IN_MIDDLE + (width / 2)
                        ,
                        translateY: stage.grid.SVG.Y_IN_MIDDLE
                    })
                ).toString()
            );

        }
    }

}