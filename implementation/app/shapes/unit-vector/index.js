import { transformPath } from '../../modules/utils.js';

export default class {

    static init(id, { dependencies }) {

        /**
         * @deps
        */
        const {
            HTMLCanvas, 
            XMLSVG, 
            ENUMS,
            QUADRANT,
            GLOBAL_SCALAR,
            transformPath,
            defaultVendorFontSize,
            AnimationCounter, 
            userConfig,  
        } = dependencies;

        /**
         * @alias
         */
        const [
            SVGList
        ] = [Array];

        const
            PathView = XMLSVG.Views.Path
            ,
            sharedOptions = {
                id: '',
                scaling: 0,
                angle: 0,
                points: [{ x: 1, y: 0 }],
                dashed: false,
                strokeWidth: 3,
                fillStroke: ENUMS.COLOR.magenta,
            }
            ,
            AXES_CONFIG = [
                { id: ENUMS.ID.south, fillStroke: ENUMS.COLOR.black, angleMultiplier: -1 },
                { id: ENUMS.ID.east, fillStroke: ENUMS.COLOR.black, angleMultiplier: 0 },
                { id: ENUMS.ID.west, fillStroke: ENUMS.COLOR.black, angleMultiplier: 1 },
            ]
            ;

        const isMobile = screen.orientation.type.includes('portrait');
        
        XMLSVG.Helpers.findByID(id).setPaths([

                ...AXES_CONFIG.map(({ id, fillStroke, angleMultiplier }) => {

                    return(
                        new PathView({
                            options: {
                                ...sharedOptions,
                                id,
                                fillStroke,
                                scaling: stage.grid.GRIDCELL_DIM,
                                angle: angleMultiplier * QUADRANT,
                            }
                        })
                    )

                })

            ], ({ paths }) => {

                SVGList.from(paths).on((path) => {

                    /**
                     * @override
                     */
                    if (path.id === 'west') {

                        path.dataset.angle = 135
                        path.dataset.scaling = path.dataset.scaling/1.2
                        
                    }

                    const INFINITE_LENGTH = !true;
                        if (INFINITE_LENGTH) {
                            path.setPoints([
                                ...drawVector({ Helpers: HTMLCanvas.Helpers, path, length: 0 })
                            ], Number(GLOBAL_SCALAR * (path.dataset.scaling)));
                        } else {
                            path.setPoints([
                                ...drawVector({ Helpers: HTMLCanvas.Helpers, path, sharpness: 6, length: stage.grid.GRIDCELL_DIM/6 })
                            ], Number(GLOBAL_SCALAR * (path.dataset.scaling / Math.ceil(stage.grid.GRIDCELL_DIM))));
                        }

                });

            });

    }

}

function drawVector({ Helpers, path, angle, sharpness = 1, length = 1 }) {

    // DEV_NOTE # arrowhead points in local coordinates system (pointing along positive X axis)
    const baseShape = [
        { x: 1, y: 0 },
        { x: 0, y: 0 },                            // tip of arrow
        { x: -length, y: length / sharpness },     // bottom wing
        { x: -length, y: -length / sharpness },    // top wing
        { x: 0, y: 0 },                            // MUST explicitly close the path!
    ]   // Scale + offset 
        .map((point) => {
            return ({
                x: point.x + (path.getPoints().at(-1)['x']),
                y: point.y + (path.getPoints().at(-1)['y']),
            });
        });

    /* transformPath(path, Helpers, { angle: angle ?? Number(path.dataset.angle) }); */
    transformPath(path, {
        Helpers
        , 
        transformations: {
            offsetX: stage.grid.GRIDCELL_DIM,
            offsetY: -1 * stage.grid.GRIDCELL_DIM,
            angle: angle ?? Number(path.dataset.angle)
        } 
    });

    return baseShape;

}

