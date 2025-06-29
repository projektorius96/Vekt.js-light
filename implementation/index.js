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
                            id: ENUMS.PRINT.unit_square,
                            hidden: !true,
                            dashed: 0/* herein: dashed := [0.1..1.0]; to disable, pass either := 0|false */,
                            points: [
                                ...[
                                    ...[{x: 0, y: 0}],
                                    ...[{x: 1, y: 0}],
                                    ...[{x: 1, y: 1}],
                                    ...[{x: 0, y: 1}],
                                    ...[{x: 0, y: 0}],
                                ]
                            ],
                            strokeWidth: 3,
                            fill: ENUMS.COLOR.none,
                            stroke: ENUMS.COLOR.green,
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

            Array(2)
                .fill( XMLSVG.Helpers.findByID( ENUMS.PRINT.unit_square ) )
                .forEach( (path, operationCycle)=>{
                    switch (operationCycle) {
                        case 0:
                            path.setPoints(
                                /* points: */
                                userConfig.svg.paths.unit_square.options.points
                                ,
                                /* scalingFactor: */
                                stage.grid.GRIDCELL_DIM * 4
                            )
                        break;
                        case 1:
                            const { width, height } = path.getBoundingClientRect();
                            path.setTranslate({
                                translateX: stage.grid.SVG.X_IN_MIDDLE - (width / 2),
                                translateY: stage.grid.SVG.Y_IN_MIDDLE - (height / 2),
                            })
                        break;
                    }
                } );
            
            /* === [userConfig.svg.paths.unit_square] === */

        }

    }

}
