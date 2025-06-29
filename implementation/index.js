import { ENUMS } from "./utils.js";

export { 
    ENUMS 
}

export
    const
        userConfig = {
            canvas: {
                stage: {
                    scale: 30
                },
                layers: {
                    grid: {
                        id: ENUMS.CASE.grid,
                        strokeStyle: ENUMS.COLOR.magenta,
                        hidden: !true,
                        dotted: true,
                        lineWidth: 1,
                        opacity: 1
                    }
                }
            }
            ,
            svg: {
                paths: {
                    unit_square: {
                        options: {
                            hidden: !true,
                            dashed: 0/* herein: dashed := [0.1..1.0]; to disable, pass either := 0|false */,
                            points: [],
                            strokeWidth: 3,
                            fill: ENUMS.COLOR.none,
                            stroke: ENUMS.COLOR.green,
                        }
                        ,
                        /**
                         * @override `SVGPathElement.prototype.getPoints()`
                         */
                        getPoints(){
                            return (
                                Array.prototype.map.call(
                                    [
                                        ...[{x: 0, y: 0}],
                                        ...[{x: 1, y: 0}],
                                        ...[{x: 1, y: 1}],
                                        ...[{x: 0, y: 1}],
                                        ...[{x: 0, y: 0}],
                                    ]
                                    ,
                                    (coords)=>{
                                        let scalingFactor = 4;                
                                        return coords = { x: coords.x * stage.grid.GRIDCELL_DIM * scalingFactor, y: coords.y * stage.grid.GRIDCELL_DIM * scalingFactor }
                                    }
                                )
                            )
                        }
                        ,
                        transform: {
                            translate: (svgPath)=>{

                                const [
                                    unit_square$width
                                    , 
                                    unit_square$height
                                ] = [
                                    svgPath.getBoundingClientRect().width
                                    , 
                                    svgPath.getBoundingClientRect().height
                                ];
                                
                                svgPath.setAttribute(
                                    ENUMS.PRINT.transform
                                    , 
                                    `${ENUMS.PRINT.translate}(${stage.grid.SVG.X_IN_MIDDLE - (unit_square$width / 2)},${stage.grid.SVG.Y_IN_MIDDLE - (unit_square$height / 2)})`
                                )
                                    
                                return true;

                            }
                            ,
                        }
                    }
                }
            }
        }
        ;

export default class {

    static draw({HTMLCanvas, XMLSVG}, context) {
    
        // DEV_NOTE # because we mix HTML Canvas (i.e. Canvas API) together with XML SVG (i.e. SVG) web technologies, we must do the following check:..
        if ( context instanceof CanvasRenderingContext2D ) {
                                                
            switch (context.canvas.id) {

                case userConfig.canvas.layers.grid.id :

                    HTMLCanvas.Views.Grid.draw({
                        context, 
                        options: {
                            ...userConfig.canvas.layers.grid,
                        }
                    });

                break;

            }

        } else {

            /* === [userConfig.svg.paths.unit_square] === */

            Array
                .from({length: 2})
                .fill( XMLSVG.Helpers.findBy(ENUMS.PRINT.unit_square) )
                    .forEach((shape, operationCycle)=>{
                        switch (operationCycle) {
                            case 0:
                                shape.setPoints(
                                    userConfig
                                    .svg.paths
                                    .unit_square
                                    .getPoints()
                                )
                            break;
                            case 1:
                                userConfig
                                .svg.paths
                                .unit_square
                                    .transform.translate(shape)
                            break;
                        }
                    })
            
            /* === [userConfig.svg.paths.unit_square] === */

        }

    }

}
