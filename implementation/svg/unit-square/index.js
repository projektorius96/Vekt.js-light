export default class {

    static draw({HTMLCanvas, XMLSVG, ENUMS, container}){

            return (
                ({id})=>{
                    
                    Array(2)
                    .fill( XMLSVG.Helpers.findByID( id ) )
                    .on((path)=>{
                                                        
                        function initPoints(){
                            path?.setPoints( path.parsePoints() , container[path.id]?.scalingFactor || 1 )
                        }
                        function transformPoints(){

                            const
                                { setTransform } = HTMLCanvas.Helpers.Trigonometry
                                ,
                                { width, height } = path?.getBoundingClientRect()
                                ;
                            
                            switch (path.id) {

                                case ENUMS.SHAPE.right_triangle:
                                    path.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        , 
                                        new DOMMatrix(
                                            setTransform(( container[path.id]?.angle || 0 ), stage.grid.SVG.X_IN_MIDDLE - (width / 2), stage.grid.SVG.Y_IN_MIDDLE - (height / 2))
                                        ).toString()
                                    )
                                break;

                                case ENUMS.SHAPE.unit_square:
                                    path.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        , 
                                        new DOMMatrix(
                                            setTransform(( container[path.id]?.angle || 0 ), stage.grid.SVG.X_IN_MIDDLE - (width / 2), stage.grid.SVG.Y_IN_MIDDLE - (height / 2))
                                        ).toString()
                                    )
                                break;

                            }
                        
                        };

                        [initPoints, transformPoints].on(f => f());

                    });

                }
            );

    }

}