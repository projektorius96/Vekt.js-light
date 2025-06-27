import { HTMLCanvas, XMLSVG } from './src/views/index.js';
import Grid, {
    ENUMS,
    userConfig,
} from './implementation/index.js';

import package_json from './package.json' with { type: 'json' };

document.on(ENUMS.UI_EVENT.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    const
        stage = new HTMLCanvas.ViewGroup.Stage({...userConfig.canvas.stage});
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
                                    id: ENUMS.PRINT.unit_square,
                                    ...userConfig.svg.paths.unit_square.options
                                }
                            })
                            ,
                        ]
                    })
                ])    

    window.on(ENUMS.UI_EVENT.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on( Grid.draw.bind(null, {HTMLCanvas, XMLSVG}) );
        
    })

    // DEV_NOTE (!) # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
    window.dispatch( new Event(ENUMS.UI_EVENT.resize) );

});