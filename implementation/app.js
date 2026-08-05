import './globals.css';
import { userConfig } from './user-config.js';
import { defaultVendorFontSize, transformPath } from './modules/utils.js';
import UnitCircle from './shapes/unit-circle/index.js';

export default class {

    static setup({ XMLSVG }) {

        return ([
            new XMLSVG.ViewGroup.Container({
                options: { id: 'renderer' }
            })
        ]);

    }

    static renderer({HTMLCanvas, XMLSVG, ENUMS}) {        

        const 
            dependencies = 
                {
                    HTMLCanvas, XMLSVG, ENUMS, userConfig, transformPath,
                }
        ;

        const [renderer] = this.setup({XMLSVG});

        const scalingFactor = 1;
        UnitCircle.init(renderer.id, {
            dependencies
            ,
            overrides: {
                path: {
                    id: ENUMS.ID.circle_top,
                    stroke: ENUMS.COLOR.green,
                    fill: ENUMS.COLOR.green,
                    dashed: 0, 
                    strokeWidth: 4,
                    scalingFactor, 
                    transformations: {
                        offsetX: stage.grid.GRIDCELL_DIM * scalingFactor,
                    }
                }
            }
        })

    }

}