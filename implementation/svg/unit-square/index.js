export default class {

    static draw({HTMLCanvas, XMLSVG, ENUMS}){

            return (

                // DEV_NOTE # non-dataset props, such as `path.id`or simply destructured one as `id` within ES6 {} syntax notation, as follows:
                ({id})=>{
                    
                    Array(2)
                    .fill( XMLSVG.Helpers.findByID( id ) )
                    .on((path)=>{
                                                        
                        function initPoints() {

                            path?.setPoints( path.parsePoints() , path.dataset.scaling ?? 1 );

                        }
                        function transformPoints() {

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
                                            setTransform(( path.dataset.angle || 0 ), stage.grid.SVG.X_IN_MIDDLE - (width / 2), stage.grid.SVG.Y_IN_MIDDLE - (height / 2))
                                        ).toString()
                                    )
                                break;

                                case ENUMS.SHAPE.unit_square:
                                    path.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        , 
                                        new DOMMatrix(
                                            setTransform(( path.dataset.angle || 0 ), stage.grid.SVG.X_IN_MIDDLE - (width / 2), stage.grid.SVG.Y_IN_MIDDLE - (height / 2))
                                        ).toString()
                                    )
                                break;

                            }
                        
                        };;[initPoints, transformPoints].on(mount => mount());

                    });

                }

            );

    }

}