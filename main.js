import { HTMLCanvas } from './src/views/index.js';
import diffContext, {
    ENUMS,
    userConfigs,
    config
} from './implementation/index.js';

import package_json from './package.json' with { type: 'json' };

document.on(ENUMS.UI_EVENT.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    const
        stage = new HTMLCanvas.ViewGroup.Stage({...userConfigs.stage});

        Object.keys(config.layers).forEach((shape)=>{
            if (stage.children[shape] === undefined){
                
                console.log(config.layers[shape]);

                stage.appendChild(
                    new HTMLCanvas.ViewGroup.Layer({...config.layers[shape]}),
                );
                
            }
        })

    window.on(ENUMS.UI_EVENT.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on( diffContext.bind(null, {HTMLCanvas, userConfigs}) );
        
    })

    // DEV_NOTE (!) # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
    window.dispatch( new Event(ENUMS.UI_EVENT.resize) );

});