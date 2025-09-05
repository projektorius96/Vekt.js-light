export default class {

    static forward({HTMLCanvas, XMLSVG, ENUMS}){

            return (
                (path)=>{

                    // DEV_NOTE # if it's single path, the `switch` statement is optional, however consistency matters !
                    switch (path.id) {

                        case ENUMS.CASE.unit_circle :

                            this.draw.call(path, Object.assign(...arguments, { scalingFactor: stage?.grid.GRIDCELL_DIM * 2.0 }));

                        break;

                    }
                
                }
            );

    }

    static draw({HTMLCanvas, XMLSVG, ENUMS, scalingFactor = 1, angle = 0}) {

            Array(2)
            .fill( XMLSVG.Helpers.findByID( this.id ) )
            .on((path, operationCycle)=>{                                
                switch (operationCycle) {
                    // Step 1) : populate SVGPathElement with points (value of 'd' attribute) as follows:
                    case 0 : path?.setPoints( path.parsePoints() , scalingFactor ) ; break ;
                    // Step 2) : transforms value of the 'd' attribute as follows:
                    case 1:
                        void function transformPoints(){

                            const
                                { setTransform } = HTMLCanvas.Helpers.Trigonometry
                                ,
                                { width, height } = path?.getBoundingClientRect()
                                ;
                            
                            switch (path.id) {
                                case ENUMS.SHAPE.unit_circle:
                                    path.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        ,
                                        new DOMMatrix(
                                            setTransform(angle, stage.grid.SVG.X_IN_MIDDLE + (width / 2), stage.grid.SVG.Y_IN_MIDDLE/*  - (height / 2) */)
                                        ).toString()
                                    )
                                break;
                            }

                        }();
                    break;
                }
            });
            
            return true;

    }

}