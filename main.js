import { HTMLCanvas, XMLSVG } from './src/views/index.js';
import Implementation from './implementation/main.js';
import { observeJSONL } from './implementation/observers/fs/index.js';

import package_json from './package.json' with { type: 'json' };

document.on('DOMContentLoaded', async ()=>{
    
    document.title = package_json.name;

    const
        stage = Implementation.init({HTMLCanvas, XMLSVG})
        ;

    if (stage) {

        stage.on('click', async (e)=>{

            await observeJSONL(stage);

        }, {once: true})

    }
    
    window.on('resize', ()=>{

            HTMLCanvas
                .init({stage})
                    .on( Implementation.draw.bind(null, {HTMLCanvas, XMLSVG}) );
        
    })

    // DEV_NOTE (!) # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
    window.dispatch( new Event('resize') );

});