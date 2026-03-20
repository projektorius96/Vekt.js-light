import './globals.css';
import AnimationCounter from './modules/animations.js';
import { CONSTANTS, ENUMS } from './globals.js';
import { defaultVendorFontSize } from './modules/utils.js';
import { userConfig } from './user-config.js';

import Renderer from './shapes/renderer.js';

export default class {

    static setup({ XMLSVG }) {

        return ([
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.ruler }
            }),
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.unit_square } 
            }),
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.axes } 
            }),
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.circle } 
            })
        ]);

    }

    static render({ HTMLCanvas, XMLSVG, ENUMS }) {

        Renderer({
            containers: [...this.setup({ XMLSVG })]
            ,
            dependencies: {
                HTMLCanvas, 
                XMLSVG, 
                CONSTANTS, 
                ENUMS, 
                AnimationCounter, 
                userConfig, 
                defaultVendorFontSize
            }
        })

    }

}