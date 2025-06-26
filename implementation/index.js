import { ENUM } from "./primitives.js";
import * as conf from './configs/index.json' with { type: 'json' };
export const config = conf;

export default function diffContext({HTMLCanvas, userConfigs}, context){
    
    // DEV_NOTE # because we mix HTML Canvas (i.e. Canvas API) together with XML SVG (i.e. SVG) web technologies, we must do the following check:..
    if ( context instanceof CanvasRenderingContext2D ) {
                                            
            switch (context.canvas.id) {

                case CASE.grid :

                    HTMLCanvas.Views.Grid.draw({
                        context, 
                        options: {
                            ...userConfigs.grid,
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

// DEV_NOTE (!) # excplicit runtime export for optional value overriding (see for `@override` metatag),..
// ..good example - GUI bindings attached to equivalent runtime values.
export
    const
        userConfigs = {
            stage : {
                /**
                 * @default
                 */
                ...conf.stage,
                // /**
                //  * @override
                //  */
                // scale: 30,
            }
            ,
            grid : {
                /**
                 * @default
                 */
                ...config.layers.grid,
                // /**
                //  * @override
                // */
                // strokeStyle: COLOR.blue,
            }
        }
        ;
