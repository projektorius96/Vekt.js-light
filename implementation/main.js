import Views from './svg/entry.js';
import { ENUMS, PRINT as STATIC_FIELD } from "./utils.js";
import { userConfig } from "./user-config.js";

export default class {

    /**
     * > IMPORTANT: `default.init` MUST be called before `default.render`, otherwise expect an error `"ReferenceError: stage is not defined"`
     * @see default.render
     * @static
     */
    static init({HTMLCanvas, XMLSVG}) {

        const { setup } = STATIC_FIELD;
        const stage = new HTMLCanvas.ViewGroup.Stage({...userConfig.canvas.stage});

            if ( stage ) {

                stage.appendChild(
                    new HTMLCanvas.ViewGroup.Layer({...userConfig.canvas.layers.grid})
                );

                // DEV_NOTE # checks if [Views] has the [Views.setup] implemented, and only if implemented, calls
                if (setup in Views) {

                    stage.append(
                    ...Views.setup({XMLSVG})
                    );

                }

            return stage;

        }

    }

    /**
     * > `default.render` MUST be called after `default.init`
     * @see default.init
     * @static
     */
    static render({HTMLCanvas, XMLSVG}, context) {

        const { render } = STATIC_FIELD;
    
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

            // DEV_NOTE # likewise, checks if [Views] has the [Views.render] implemented, and only if implemented, calls
            if (render in Views) {

                Views.render({HTMLCanvas, XMLSVG, ENUMS});

            }

        }

    }

}
