import { HTMLCanvas } from './src/views/index.js';
import Implementation, { utils } from './implementation/index.js';

import package_json from './package.json' with { type: 'json' };

const { ENUMS } = utils;
document.on(ENUMS.UI_EVENT.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    const
        stage = Implementation.init({HTMLCanvas})

    window.on(ENUMS.UI_EVENT.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .forEach( Implementation.draw.bind(null, {HTMLCanvas}) );
        
    })

    // DEV_NOTE (!) # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
    window.dispatch( new Event(ENUMS.UI_EVENT.resize) );

});