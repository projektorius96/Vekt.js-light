import { transformPath } from '../../modules/transform-utils.js';
import { defaultVendorFontSize } from '../../modules/vendor-utils.js';

export default class {

    static [drawVector.name] = drawVector;

    static setTransfromPoints({ Helpers }) {

        return ({ id }) => {
            const path = document.getElementById(id);
                transformPath(path, Helpers, {});
        };

    }

    static init(id, { HTMLCanvas, XMLSVG, ENUMS, QUADRANT, GLOBAL_SCALAR, SVGList, AnimationCounter }) {

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

        const scaling = GLOBAL_SCALAR * stage.grid.GRIDCELL_DIM;
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

                const pathsPalette = SVGList.from(paths).map((path) => {
                    return path = path.style.stroke;
                });

                /* === ANIMATIONS === */

                void function draw_animations() {

                    const
                        animConfig = {
                            from: 0,
                            to: 360,
                            duration: 1,
                            iterations: Infinity
                        }
                        ,
                        animCounter = AnimationCounter({
                            ...animConfig, callback: function ({ count }) {

                                /* Use the `{count}` as the animation primitive to implement the progressing animation */

                            }
                        })
                        ;

                    /**
                     * @test
                     */
                    /* animCounter.pause(); */// # [PASSING]
                    /* animCounter.play(); */// # [PASSING]

                    /**
                     * > **NOTE:** Exposing [animCounter] to play|pause from DevTools with ease. 
                     * 
                     * @global
                     * @var
                     */
                    globalThis.animCounter1 = animCounter;

                }();

                /* === ANIMATIONS === */

                /**
                  * @override
                  */
                SVGList.from(paths).on((path, step) => {

                    // DEV-TIP # pass {0 | false} to [length] to hide arrow heads of line segment (or vector)
                    path.setPoints([
                        ...this.drawVector({ Helpers: HTMLCanvas.Helpers, path /* , length: false */ })
                    ], 1);

                    /* === LABELS === */

                    void function draw_labels() {

                        const
                            DEFAULT_FONT_SIZE = Number( getComputedStyle(document.body).fontSize.replace(CSS.px(0).unit, "") )
                            ,
                            kRES = Math.ceil(window.innerWidth / window.innerHeight)
                            , 
                            TEXT_SPACING = kRES * DEFAULT_FONT_SIZE
                            ;

                        /**
                         * @mutable
                         * @var
                         */
                        let
                            { e: x, f: y } = path.getCurrentMatrix()
                            ;

                        /**
                          * @override
                          * @type text positioning
                          */
                        switch (true) {
                            case (path.id === ENUMS.ID.north):
                                x += 0;
                                y += Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                break;
                            case (path.id === ENUMS.ID.south):
                                x += 0;
                                y -= Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                break;
                            case (path.id === ENUMS.ID.west):
                                x -= Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                y += 0;
                                break;
                            case (path.id === ENUMS.ID.east):
                                x += Math.ceil(path.dataset.scaling) + TEXT_SPACING;
                                y += 0;
                                break;
                        }

                        if (defaultVendorFontSize) {

                            const MAPPING = Object.freeze(
                                Object.assign(
                                    Object.create(null)
                                    ,
                                    {
                                        labels: {
                                            compass: new Map([
                                                [ENUMS.ID.east, ENUMS.ID.X.replace(/^/, '+')],
                                                [ENUMS.ID.south, ENUMS.ID.Y.replace(/^/, '+')],
                                                [ENUMS.ID.west, ENUMS.ID.X.replace(/^/, '-')],
                                                [ENUMS.ID.north, ENUMS.ID.Y.replace(/^/, '-')],
                                            ])
                                        }
                                    }
                                )
                            )

                            /**
                              * **DEV_NOTE**: apparently labels are drawn counter-clockwise, compared to arrow stroke clockwise direction...
                              * 
                              * @debugger
                              */
                            let color_culprit;
                            /* console.log(path.style.stroke); */
                            path.setLabel({
                                x,
                                y,
                                svg: path.getParent(),
                                text: MAPPING.labels.compass.get(path.id),
                                overrides: {
                                    fill: pathsPalette.at(-step)/* instead of ==> path.style.stroke */,
                                    scale: stage.grid.GRIDCELL_DIM / (2 * defaultVendorFontSize),
                                }
                            });
                        }

                    }();

                    /* === LABELS === */

                });

            });

    }

}

function drawVector({ Helpers, path, angle, sharpness = 6, length = 1 / 6 }) {
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
                x: ((Number(path.dataset.scaling) * point.x) + path.getPoints().at(-1)['x']),
                y: ((Number(path.dataset.scaling) * point.y) + path.getPoints().at(-1)['y']),
            });
        });

    transformPath(path, Helpers, { angle: angle ?? Number(path.dataset.angle) });

    return baseShape;

}


