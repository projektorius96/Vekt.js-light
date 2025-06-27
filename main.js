import { HTMLCanvas, XMLSVG } from './src/views/index.js';
import Grid, {
    ENUMS,
    userConfigs,
} from './implementation/index.js';

import package_json from './package.json' with { type: 'json' };

document.on(ENUMS.UI_EVENT.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    const
        stage = new HTMLCanvas.ViewGroup.Stage({...userConfigs.stage});
                stage.append(...[
                    new HTMLCanvas.ViewGroup.Layer({...userConfigs.layers.grid})
                    ,
                    new XMLSVG.ViewGroup.Container({
                        options: {
                            id: 'svg-container-1',
                        },
                        paths: [
                            new XMLSVG.Views.Path({
                                options: {
                                    id: ENUMS.PRINT.unit_square,
                                    hidden: !true,
                                    dashed: 0/* herein: dashed := [0.1..1.0]; to disable, pass either := 0|false */,
                                    points: [],
                                    strokeWidth: 3,
                                    fill: ENUMS.COLOR.none,
                                    stroke: ENUMS.COLOR.green,
                                }
                            })
                        ]
                    })
                ])    

    window.on(ENUMS.UI_EVENT.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on( Grid.draw.bind(null, {HTMLCanvas}) );
            
            XMLSVG.Helpers.findBy(ENUMS.PRINT.unit_square)
            .setPoints(
                Array.prototype.map.call(
                    [
                        ...[{x: 0, y: 0}],
                        ...[{x: 1, y: 0}],
                        ...[{x: 1, y: 1}],
                        ...[{x: 0, y: 1}],
                        ...[{x: 0, y: 0}],
                    ]
                    ,
                    (coords)=>{                
                        return coords = { x: coords.x * stage.grid.GRIDCELL_DIM * 4, y: coords.y * stage.grid.GRIDCELL_DIM * 4 }
                    }
                )
            )
        
    })

    // DEV_NOTE (!) # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
    window.dispatch( new Event(ENUMS.UI_EVENT.resize) );

});