import { HTMLCanvas } from './src/views/index.js';
import diffContext, {
    ENUMS,
    userConfigs,
} from './implementation/index.js';

import package_json from './package.json' with { type: 'json' };

document.on(ENUMS.UI_EVENT.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    const 
        stage = new HTMLCanvas.ViewGroup.Stage({...userConfigs.stage});
            stage.append(...[
                new HTMLCanvas.ViewGroup.Layer({...userConfigs.grid})
            ]);

    window.on(ENUMS.UI_EVENT.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on( diffContext.bind(null, {HTMLCanvas, userConfigs}) );
        
    })

    // DEV_NOTE (!) # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
    window.dispatch( new Event(ENUMS.UI_EVENT.resize) );

});