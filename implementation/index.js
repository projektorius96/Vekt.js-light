import { ENUMS } from "./utils.js";

export { 
    ENUMS 
}

export
    const
        userConfigs = {
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
                },
                unit_square: {
                    id: 'unit-square'
                }
            }
        }
        ;

export default class {

    static draw({HTMLCanvas}, context) {
    
        // DEV_NOTE # because we mix HTML Canvas (i.e. Canvas API) together with XML SVG (i.e. SVG) web technologies, we must do the following check:..
        if ( context instanceof CanvasRenderingContext2D ) {
                                                
                switch (context.canvas.id) {

                    case userConfigs.layers.grid.id :

                        HTMLCanvas.Views.Grid.draw({
                            context, 
                            options: {
                                ...userConfigs.layers.grid,
                            }
                        });

                    break;

                }
        }

    }

}
