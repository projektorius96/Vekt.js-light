export default class {

    static draw({HTMLCanvas, XMLSVG, ENUMS}){

            return (

                ({id})=>{

                    const path = XMLSVG.Helpers.findByID( id ); console.log(path.id);
                                                        
                        void function initPoints() {

                            path.setPoints( path.parsePoints() , path.dataset.scaling ?? 1 );

                        }();
                        void function transformPoints() {

                            const
                                { setTransform } = HTMLCanvas.Helpers.Trigonometry
                                ,
                                { width, height } = path?.getBoundingClientRect()
                                ;
                            
                            switch (id) {
                                case ENUMS.CASE.unit_vector:
                                    path.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        , 
                                        new DOMMatrix(
                                            setTransform(( path.dataset.angle || 0 ), stage.grid.SVG.X_IN_MIDDLE - (width / 2), stage.grid.SVG.Y_IN_MIDDLE - (height / 2))
                                        ).toString()
                                    )
                                break;

                                case ENUMS.CASE.unit_vector_with_head:
                                    path.setAttribute(
                                        ENUMS.ATTRIBUTE.transform
                                        , 
                                        new DOMMatrix(
                                            setTransform(( path.dataset.angle || 0 ), stage.grid.SVG.X_IN_MIDDLE - (width / 2), stage.grid.SVG.Y_IN_MIDDLE - (height / 2))
                                        ).toString()
                                    )
                                break;
                            }
                        
                        }();
            });
    }

}
