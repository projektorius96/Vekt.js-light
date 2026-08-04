import './globals.css';
import AnimationCounter from './modules/animations.js';
import { defaultVendorFontSize, transformPath } from './modules/utils.js';
import { CONSTANTS, ENUMS } from './globals.js';
import { userConfig } from './user-config.js';
import UnitCircle from './shapes/unit-circle/index.js';

export default class {

    static setup({ XMLSVG }) {

        return ([
            new XMLSVG.ViewGroup.Container({
                options: { id: ENUMS.ID.circle } 
            })
        ]);

    }

    static renderer({ HTMLCanvas, XMLSVG, ENUMS }) {

        const dependencies = 
            Object.assign(
                Object.create(null)
                ,
                {
                    HTMLCanvas, 
                    XMLSVG, 
                    ENUMS,
                    userConfig,
                    transformPath,
                    defaultVendorFontSize,
                }
        );

        UnitCircle.init(ENUMS.SHAPE.circle, {
            dependencies
            ,
            overrides: {
                path: {
                    // DEV_NOTE # please comment out either side of "OR" statement to see the difference in action!
                    id: ENUMS.ID.square,
                    dashed: 0, 
                    strokeWidth: 4, 
                    stroke: ENUMS.COLOR.green,
                    fill: ENUMS.COLOR.green,
                    transformations: {
                        /* ... */
                    }
                }
            } 
        })

    }

}