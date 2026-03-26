import './globals.css';
import Renderer from './shapes/renderer.js';
import AnimationCounter from './modules/animations.js';
import { defaultVendorFontSize, transformPath } from './modules/utils.js';
import { CONSTANTS, ENUMS } from './globals.js';
import { userConfig } from './user-config.js';

export default class {

    static setup({ XMLSVG }) {

        return ([
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.ruler }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.axes } 
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.unit_square } 
            }),
        ]);

    }

    static renderer({ HTMLCanvas, XMLSVG, ENUMS }) {

        Renderer.drawPaths({
            containers: [...this.setup({ XMLSVG })]
            ,
            dependencies: {
                HTMLCanvas, 
                XMLSVG, 
                ENUMS,
                AnimationCounter, 
                userConfig, 
                defaultVendorFontSize,
                transformPath,
                ...CONSTANTS
            }
        })

    }

}