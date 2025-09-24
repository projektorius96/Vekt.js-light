import { ENUMS } from "./utils.js";
import { userConfig } from "./user-config.js";
import Views from './svg/index.js';

export default class {

    /**
     * > IMPORTANT: `default.init` MUST be called before `default.draw`, otherwise expect an error `"ReferenceError: stage is not defined"`
     * @see default.draw
     * @static
     */
    static init({HTMLCanvas, XMLSVG}) {

        const stage = new HTMLCanvas.ViewGroup.Stage({...userConfig.canvas.stage});

            if ( stage ) {

                stage.appendChild(
                    new HTMLCanvas.ViewGroup.Layer({...userConfig.canvas.layers.grid})
                );

                // DEV_NOTE # checks if [Views] has the [Views.registerContainersForSVG] implemented, and only if implemented, calls
                if ('registerContainersForSVG' in Views) {

                    stage.append(
                    ...Views.registerContainersForSVG({XMLSVG})
                    );

                }

            return stage;

        }

    }

    /**
     * > `default.draw` MUST be called after `default.init`
     * @see default.init
     * @static
     */
    static draw({HTMLCanvas, XMLSVG}, context) {
    
        // DEV_NOTE # because we mix HTML Canvas (i.e. Canvas API) together with XML SVG (i.e. SVG) web technologies, we must do the following `context` check:..
        if ( context instanceof CanvasRenderingContext2D ) {
                                                
            switch (context.canvas.id) {

                case userConfig.canvas.layers.grid.id :
                
                    HTMLCanvas.Views.Grid.draw({
                        context, 
                        options: {
                            ...userConfig.canvas.layers.grid,
                        }
                    })

                break;

            }

        } else {

            // DEV_NOTE # likewise, checks if [Views] has the [Views.drawPaths] implemented, and only if implemented, calls
            if ('drawPaths' in Views) {

                Views.drawPaths({HTMLCanvas, XMLSVG, ENUMS});

            }

        }

    }

}
