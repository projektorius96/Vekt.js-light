export default class {

    static draw({HTMLCanvas, XMLSVG, ENUMS}){

            return (
                (path)=>{
                    switch (path.id) {

                        case ENUMS.CASE.unit_circle :

                            this.init.call(path, { HTMLCanvas, XMLSVG, ENUMS, id: path.id, scalingFactor: stage?.grid.GRIDCELL_DIM * 2 });

                        break;

                    }
                }
            );

    }

    static init({HTMLCanvas, XMLSVG, ENUMS, id, scalingFactor = 1, angle = 0}) {

            Array(2)
            .fill( XMLSVG.Helpers.findByID( this.id ) )
            .on((path, operationCycle)=>{                                
                switch (operationCycle) {
                    // Step 1) : initializes actual path(s)
                    case 0 : path?.setPoints( path.parsePoints() , scalingFactor ) ; break ;
                    // Step 2) : transforms recently initialized path(s)
                    case 1:
                        void function transformations(){

                            const { width, height } = path?.getBoundingClientRect();
                            switch (id) {
                                case ENUMS.SHAPE.unit_circle:
                                    path.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        ,
                                        new DOMMatrix(
                                            HTMLCanvas.Helpers.Trigonometry.setTransform(angle, stage.grid.SVG.X_IN_MIDDLE + (width / 2), stage.grid.SVG.Y_IN_MIDDLE/*  - (height / 2) */)
                                        ).toString()
                                    )
                                break;
                            }

                        }()
                    break;
                }
            });
            
            return true;

    }

}