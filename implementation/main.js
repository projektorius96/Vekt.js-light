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

            stage.append(...[
                new HTMLCanvas.ViewGroup.Layer({...userConfig.canvas.layers.grid})
                ,
                new XMLSVG.ViewGroup.Container({
                    options: {
                        id: 'svg-container-1',
                    },
                    paths: [
                        new XMLSVG.Views.Path({
                            options: {
                                ...userConfig.svg.paths.unit_square.options,
                            }
                        })
                        ,
                        new XMLSVG.Views.Path({
                            options: {
                                ...userConfig.svg.paths.unit_square.options,
                                /**
                                 * @override
                                 */
                                id: ENUMS.PRINT.right_triangle,
                                points: [
                                    ...userConfig.svg.paths.unit_square.options.points
                                        .filter((vec2, i)=>{
                                            if (i !== 2) return vec2;
                                        })
                                ],
                                stroke: 'red'
                            }
                        })
                        ,
                    ]
                })
            ]);

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
                    });

                break;

            }

        } 
        /* DEV_NOTE # context of HTML, XML (including SVG, e.g. "XMLSVG"): */
        else {

            Views.initSVG({XMLSVG, ENUMS})

        }

    }

}
