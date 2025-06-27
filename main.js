import { HTMLCanvas } from './src/views/index.js';
import VektLight, {
    ENUM,
    userConfigs,
} from './implementation/index.js';

import package_json from './package.json' with { type: 'json' };

document.on(ENUM.UI_EVENT.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    const
        stage = new HTMLCanvas.ViewGroup.Stage({...userConfigs.stage});

        Object.keys(userConfigs.layers).forEach((shape)=>{

            if (stage.children[shape] === undefined){
                
                stage.appendChild(
                    new HTMLCanvas.ViewGroup.Layer({...userConfigs.layers[shape]}),
                );
                
            }

        });

    window.on(ENUM.UI_EVENT.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on( VektLight.diffContext.bind(null, {HTMLCanvas}) );
        
    })

    // DEV_NOTE (!) # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
    window.dispatch( new Event(ENUM.UI_EVENT.resize) );

});