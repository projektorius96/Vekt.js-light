export default class {

    static draw({HTMLCanvas, XMLSVG, ENUMS}){

            return (
                (path)=>{

                    Array(2)
                    .fill( XMLSVG.Helpers.findByID( path.id ) )
                    .on((_path)=>{
                        
                        function initPoints(){
                            _path?.setPoints( _path.parsePoints() , SVGPathElement[_path.id]?.scalingFactor || 1 );
                        };
                        function transformPoints(){

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
                                                setTransform(( SVGPathElement[_path.id]?.angle || 0 ), stage.grid.SVG.X_IN_MIDDLE + (width / 2), stage.grid.SVG.Y_IN_MIDDLE/*  - (height / 2) */)
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