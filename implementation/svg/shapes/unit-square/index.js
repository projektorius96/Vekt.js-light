export default class {

    static draw({HTMLCanvas, XMLSVG, ENUMS, skew = { X: { phi: 0 } }}){

            return (

                ({id})=>{

                    const path = XMLSVG.Helpers.findByID( id );
                                                        
                        void function initPoints() {

                            path.setPoints( path.getPoints() , path.dataset.scaling ?? 1 );

                        }();
                        void function transformPoints() {

                            const
                                { setTransform } = HTMLCanvas.Helpers.Trigonometry
                                /* ,
                                { width, height } = path?.getBoundingClientRect() */
                                ;
                            
                            path.setAttribute(
                                ENUMS.ATTRIBUTE.transform
                                , 
                                new DOMMatrix(
                                    setTransform({
                                        angle: ( path.dataset.angle || 0 )
                                        , 
                                        translateX: stage.grid.SVG.X_IN_MIDDLE/*  - (width / 2) */
                                        , 
                                        translateY: stage.grid.SVG.Y_IN_MIDDLE/*  - (height / 2) */
                                        ,
                                        skew
                                    })
                                ).toString()
                            )
                        
                        }();
            });
    }

}
