export default class {

    static draw({HTMLCanvas, XMLSVG, ENUMS}){

            return (

                ({id})=>{

                    const path = XMLSVG.Helpers.findByID( id );
                                                        
                        void function initPoints() {

                            path.setPoints( path.parsePoints() , path.dataset.scaling ?? 1 );

                        }();
                        void function transformPoints() {

                            const
                                { setTransform } = HTMLCanvas.Helpers.Trigonometry
                                ,
                                { width, height } = path?.getBoundingClientRect()
                                ;
                            
                                path.setAttribute(
                                    ENUMS.ATTRIBUTE.transform
                                    , 
                                    new DOMMatrix(
                                        setTransform(( path.dataset.angle || 0 ), stage.grid.SVG.X_IN_MIDDLE/*  - (width / 2) *//*  + (stage.grid.GRIDCELL_DIM * 2) */, stage.grid.SVG.Y_IN_MIDDLE/*  - (height / 2) */)
                                    ).toString()
                                )
                        
                        }();
            });
    }

    static [addArrowHead.name] = addArrowHead;

}

/**
 * > Kudos to: ChatGPT for cleaner version of my brain of storm
 */
function addArrowHead({sharpness=1, length=1, TRANSLATE_X = 0, TRANSLATE_Y = 0}) {

    // Arrowhead points in *local coords* (pointing along +X axis)
    const baseShape = [
        { x: 0,    y: 0 },                       // tip of arrow
        { x: -length, y:  length / sharpness },  // bottom wing
        { x: -length, y: -length / sharpness },   // top wing
        { x: 0,    y: 0 }, // explicitly closing the arrow
    ];

    // Rotate + translate to actual orientation
    return baseShape.map(point => ({
        x: (point.x * Math.cos(/* angle */0) - point.y * Math.sin(/* angle */0) + TRANSLATE_X),
        y: (point.x * Math.sin(/* angle */0) + point.y * Math.cos(/* angle */0) + TRANSLATE_Y)
    }));

}
