import { transformPath } from '../../modules/transform-utils.js';

export default class {

    static setTransfromPoints({ Helpers }) {

        return ({ id }) => {
            const path = document.getElementById(id);
                transformPath(path, Helpers, {});
        };

    }

    static init(id, { HTMLCanvas, XMLSVG, ENUMS, QUADRANT, GLOBAL_SCALAR }) {

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
                { id: ENUMS.ID.east, fillStroke: ENUMS.COLOR.green, angleMultiplier: 0 },
                { id: ENUMS.ID.south, fillStroke: ENUMS.COLOR.black, angleMultiplier: 1 },
                { id: ENUMS.ID.west, fillStroke: ENUMS.COLOR.blue, angleMultiplier: 2 },
                { id: ENUMS.ID.north, fillStroke: ENUMS.COLOR.red, angleMultiplier: 3 },
            ]
            ;

        const scaling = Math.floor((window.innerHeight/2)) * GLOBAL_SCALAR;
        XMLSVG.Helpers.findByID(id)
            .setPaths([
                ...AXES_CONFIG.map(({ id, fillStroke, angleMultiplier }) =>
                    new PathView({
                        options: {
                            ...sharedOptions,
                            id,
                            fillStroke,
                            scaling,
                            angle: angleMultiplier * QUADRANT,
                        },
                    })
                ),
            ], ({ paths }) => {

                /**
                  * @override
                  */
                SVGList.from(paths).on((path) => {

                    // DEV-TIP # pass {0 | false} to [length] to hide arrow heads of line segment (or vector)
                    path.setPoints([
                        ...drawVector({ Helpers: HTMLCanvas.Helpers, path , length: false })
                    ], Number(path.dataset.scaling));

                });

            });

    }

}

function drawVector({ Helpers, path, angle, sharpness = 4, length = 2 }) {
    // DEV_NOTE # arrowhead points in local coordinates system (pointing along positive X axis)
    const baseShape = [
        { x: 1, y: 0 },
        { x: 0, y: 0 },                            // tip of arrow
        { x: -length, y: length / sharpness },  // bottom wing
        { x: -length, y: -length / sharpness },  // top wing
        { x: 0, y: 0 },                            // MUST explicitly close the path!
    ]   // Scale + offset 
        .map((point) => {
            return ({
                x: ((Number(path.dataset.scaling/stage.grid.GRIDCELL_DIM) * point.x) + path.getPoints().at(-1)['x']),
                y: ((Number(path.dataset.scaling/stage.grid.GRIDCELL_DIM) * point.y) + path.getPoints().at(-1)['y']),
            });
        });

    transformPath(path, Helpers, { angle: angle ?? Number(path.dataset.angle) });

    return baseShape;

}

