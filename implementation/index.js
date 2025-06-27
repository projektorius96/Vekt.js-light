import { ENUMS } from "./utils.js";

export default class {

    static diffContext({HTMLCanvas}, context) {
    
        // DEV_NOTE # because we mix HTML Canvas (i.e. Canvas API) together with XML SVG (i.e. SVG) web technologies, we must do the following check:..
        if ( context instanceof CanvasRenderingContext2D ) {
                                                
                switch (context.canvas.id) {

                    case ENUM.CASE.grid :

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

/**
 * @type
 * NOTE: The `userConfig` defines shared writable structure, which besides its primary goal, it also serve as a reference for mapping of GUI bindings, if any !
 */
export
    const
        userConfigs = {
            stage: {
                /* id: "stage", */// (Default)
                scale: 30
            },
            layers: {
                grid: {
                    id: ENUM.SHAPE.grid,
                    strokeStyle: ENUM.COLOR.magenta,
                    hidden: !true,
                    dotted: true,
                    lineWidth: 1,
                    opacity: 1
                }
            }
        }
        ;

export const ENUM = ENUMS;
