import App from './app/index.js';
import { ENUMS } from "./app/utils.js";
import { userConfig } from "./app/user-config.js";

export default class {

    /**
     * > IMPORTANT: `default.setup MUST be called before `default.renderer`, otherwise expect an error `"ReferenceError: stage is not defined"`
     * @see default.renderer
     * @static
     */
    static setup({HTMLCanvas, XMLSVG}) {

        const { setup } = ENUMS.PRINT;
        
        const stage = new HTMLCanvas.ViewGroup.Stage({...userConfig.canvas.stage});
            if ( stage ) {

                stage.appendChild(
                    new HTMLCanvas.ViewGroup.Layer({...userConfig.canvas.layers.grid})
                );

                // DEV_NOTE # checks if [App] has the [App.setup] implemented, iff implemented - call it!
                if (setup in App) {

                    stage.append(
                    ...App[setup]({XMLSVG})
                    );

                }

            return stage;

        }

    }

    /**
     * > `default.renderer` MUST be called after `default.setup`
     * @see default.setup
     * @static
     */
    static renderer({HTMLCanvas, XMLSVG}, context) {

        const { renderer } = ENUMS.PRINT;
    
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

        }

        // DEV_NOTE # likewise, checks if [App] has the [App.render] implemented, iff implemented - call it!
        if (renderer in App) {

            App[renderer]({HTMLCanvas, XMLSVG, ENUMS});

        }

        return true;

    }

}
