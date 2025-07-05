export default class {

    static draw({HTMLCanvas, XMLSVG, ENUMS, id, scalingFactor = 1}) {

            Array(2)
            .fill( XMLSVG.Helpers.findByID( id ) )
            .on((path, operationCycle)=>{                                
                switch (operationCycle) {
                    // Step 1) : initializes actual path(s)
                    case 0 : path?.setPoints( path.parsePoints() , scalingFactor ) ; break ;
                    // Step 2) : transforms recently initialized path(s)
                    case 1:
                        void function transformations(){

                            const { width, height } = path?.getBoundingClientRect();
                            switch (id) {
                                case ENUMS.SHAPE.right_triangle:
                                    path.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        , 
                                        new DOMMatrix(
                                            HTMLCanvas.Helpers.Trigonometry.setTransform(0, stage.grid.SVG.X_IN_MIDDLE - (width / 2), stage.grid.SVG.Y_IN_MIDDLE - (height / 2))
                                        ).toString()
                                    )
                                break;
                                case ENUMS.SHAPE.unit_square:
                                    path.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        , 
                                        new DOMMatrix(
                                            HTMLCanvas.Helpers.Trigonometry.setTransform(45, stage.grid.SVG.X_IN_MIDDLE - (width / 2), stage.grid.SVG.Y_IN_MIDDLE - (height / 2))
                                        ).toString()
                                    )
                                break;
                            }

                        }()
                    break;
                }
            });
            
            return XMLSVG.Helpers.findByID( id );

    }

}