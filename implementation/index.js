import { ENUMS } from "./utils.js";

export { 
    ENUMS 
}

/**
 * @type
 * NOTE: The `userConfig` defines shared writable structure, which besides its primary goal, i.e. setting user (developer) configs as well registering "layers" for `diffContext` switch statement control flow,.. 
 * ..it also optionally serves as a reference for mapping of GUI bindings,if any!
 */
export
    const
        userConfigs = {
            stage: {
                /* id: 'stage', */// (Default)
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
                unitSquare: {
                    id: ENUMS.CASE.unit_square?.replace('_', '-')
                }
            }
        }
        ;

export default class {

    static diffContext({HTMLCanvas}, context) {
    
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

                    case userConfigs.layers['unit-square'] :
                        // DEV_NOTE # shape implementation using Vekt.js-light exposed XMLSVG (SVG)
                    break;

                }
        }

    }

}
