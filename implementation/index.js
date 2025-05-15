import { ENUM } from "./primitives.js";

/**
 * @alias
 */
const
    [COLOR, SHAPE, UI_EVENT, CASE] = Array(4).fill(ENUM)
    ;

export default function diffContext({HTMLCanvas, userConfigs}, context){
    
    // DEV_NOTE # because we mix HTML Canvas (i.e. Canvas API) together with XML SVG (i.e. SVG) web technologies, we must do the following check:..
    if ( context instanceof CanvasRenderingContext2D ) {
                                            
            switch (context.canvas.id) {

                case CASE.grid :

                    HTMLCanvas.Views.Grid.draw({
                        context, 
                        options: {
                            ...userConfigs.grid,
                            /**
                             * @override
                             */
                            strokeStyle: COLOR.blue
                        }
                    });

                break;

            }
    }

}

export
    const
        ENUMS = {
            COLOR, SHAPE, UI_EVENT, CASE
        }
        ;

export 
    const
        userConfigs = {
            stage : {
                /* id: 'stage',  */// (default)
                /* container: document.body, */// (default)
                scale: 30,
            }
            ,
            grid : {
                id: SHAPE.grid,
                hidden: !true,
                dotted: /* ! */true,
                lineWidth: 1,
                strokeStyle: COLOR.magenta,
                opacity: 1 /* values := [0..1] */
            }
        }
        ;
