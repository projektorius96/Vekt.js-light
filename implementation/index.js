import config from './configs/index.js';
import { ENUM } from "./primitives.js";

export default function diffContext({HTMLCanvas}, context){
    
    // DEV_NOTE # because we mix HTML Canvas (i.e. Canvas API) together with XML SVG (i.e. SVG) web technologies, we must do the following check:..
    if ( context instanceof CanvasRenderingContext2D ) {
                                            
            switch (context.canvas.id) {

                case CASE.grid :

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

/**
 * @alias
 */
const
    [COLOR, SHAPE, UI_EVENT, CASE] = Array(4).fill(ENUM)
    ;

export
    const
        ENUMS = Object.freeze({
            COLOR, SHAPE, UI_EVENT, CASE
        });

// DEV_NOTE (!) # excplicit runtime export for optional value overriding (see for `@override` metatag) of its JSON equivalent,..
// ..good example - GUI bindings attached to equivalent runtime values.
export
    const
        userConfigs = {
            stage : {
                /**
                 * @default
                 */
                ...config.stage,
                /**
                 * @override
                 */
                scale: 30,
            }
            ,
            layers: {
                grid : {
                    /**
                     * @default
                     */
                    ...config.layers.grid,
                    /**
                     * @override
                    */
                    strokeStyle: COLOR.magenta,
                }   
            }
        }
        ;
