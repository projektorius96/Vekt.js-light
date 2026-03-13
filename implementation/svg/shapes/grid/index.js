import { transformPath } from '../../modules/transform-utils.js';

/**
 * SVG-first grid grading implementation — Desmos-style coordinate plane.
 *
 * Each grid line is drawn as a single `<path>` element, reusing the same
 * `PathView` + `transformPath` pattern as `UnitVector`.  Every line is a
 * plain line segment with no arrowhead — equivalent to calling
 * `UnitVector.drawVector` with `{ length: false }` (the technique is
 * documented in the DEV-TIP comment inside `unit-vector/index.js`).
 *
 * Axis lines (row = 0, col = 0) receive heavier `strokeWidth` / `opacity`
 * via their path options, but share the same drawing logic as regular grid
 * lines for consistency.
 */
export default class {

    static init(id, { HTMLCanvas, XMLSVG, ENUMS, SVGList }) {

        const
            PathView = XMLSVG.Views.Path
            ,
            { GRIDCELL_DIM, SVG: { X_IN_MIDDLE, Y_IN_MIDDLE } } = stage.grid
            ,
            cols = Math.ceil(X_IN_MIDDLE / GRIDCELL_DIM)
            ,
            rows = Math.ceil(Y_IN_MIDDLE / GRIDCELL_DIM)
            ;

        /* === SHARED LINE OPTIONS === */

        const sharedLine = {
            points:      [{ x: 0, y: 0 }, { x: 1, y: 0 }],
            dashed:      false,
            fill:        ENUMS.COLOR.none,
        };

        /* === BUILD PATH LIST === */

        const gridPaths = [];

        // ── Horizontal lines ──────────────────────────────────────────────────
        for (let r = -rows; r <= rows; r++) {

            const isXAxis = r === 0;

            gridPaths.push(
                new PathView({
                    options: {
                        ...sharedLine,
                        // DEV-TIP: axis lines re-use UnitVector's drawVector call
                        // with { length: false } — see callback below.
                        id:          `grid_h_${ r < 0 ? 'n' + Math.abs(r) : r }`,
                        scaling:     2 * X_IN_MIDDLE,
                        strokeWidth: isXAxis ? 2 : 1,
                        stroke:      isXAxis ? ENUMS.COLOR.black : ENUMS.COLOR.grey,
                        opacity:     isXAxis ? 0.8 : 0.25,
                        angle:       0,
                    },
                })
            );

        }

        // ── Vertical lines ────────────────────────────────────────────────────
        for (let c = -cols; c <= cols; c++) {

            const isYAxis = c === 0;

            gridPaths.push(
                new PathView({
                    options: {
                        ...sharedLine,
                        id:          `grid_v_${ c < 0 ? 'n' + Math.abs(c) : c }`,
                        scaling:     2 * Y_IN_MIDDLE,
                        strokeWidth: isYAxis ? 2 : 1,
                        stroke:      isYAxis ? ENUMS.COLOR.black : ENUMS.COLOR.grey,
                        opacity:     isYAxis ? 0.8 : 0.25,
                        angle:       90,
                    },
                })
            );

        }

        /* === RENDER === */

        XMLSVG.Helpers.findByID(id)
            .setPaths(gridPaths, ({ paths }) => {

                /**
                 * @arbitrary
                 * NOTE: de-facto font-size for majority of modern browser vendors.
                 */
                const defaultVendorFontSize = Number(
                    window
                        .getComputedStyle(document.documentElement)
                        .getPropertyValue('font-size')
                        .replace(CSS.px.name, '')
                );

                SVGList.from(paths).on((path) => {

                    const { id: pathId } = path;

                    /* ── horizontal line (incl. x-axis at row 0) ── */
                    if (pathId.startsWith('grid_h_')) {

                        const tag = pathId.replace('grid_h_', '');
                        const row = tag.startsWith('n')
                            ? -parseInt(tag.slice(1))
                            :  parseInt(tag);

                        // Full-viewport-width line segment — no arrowhead
                        // (conceptually: UnitVector.drawVector with { length: false })
                        transformPath(path, HTMLCanvas.Helpers, {
                            offsetX: -X_IN_MIDDLE,
                            offsetY: row * GRIDCELL_DIM,
                        });

                        /* ── y-axis tick labels (skip origin row) ── */
                        if (row !== 0 && defaultVendorFontSize) {

                            path.setLabel({
                                svg:  path.getParent(),
                                text: String(-row),  // negate: SVG y↓ vs. math y↑
                                x:    X_IN_MIDDLE - GRIDCELL_DIM / 4,
                                y:    Y_IN_MIDDLE + row * GRIDCELL_DIM,
                                overrides: {
                                    textAnchor: 'end',
                                    scale:      GRIDCELL_DIM / (2 * defaultVendorFontSize),
                                    fill:       ENUMS.COLOR.grey,
                                },
                            });

                        }

                    /* ── vertical line (incl. y-axis at col 0) ── */
                    } else if (pathId.startsWith('grid_v_')) {

                        const tag = pathId.replace('grid_v_', '');
                        const col = tag.startsWith('n')
                            ? -parseInt(tag.slice(1))
                            :  parseInt(tag);

                        // Full-viewport-height line segment — no arrowhead
                        // (conceptually: UnitVector.drawVector with { length: false })
                        transformPath(path, HTMLCanvas.Helpers, {
                            angle:   90,
                            offsetX: col * GRIDCELL_DIM,
                            offsetY: -Y_IN_MIDDLE,
                        });

                        /* ── x-axis tick labels (skip origin column) ── */
                        if (col !== 0 && defaultVendorFontSize) {

                            path.setLabel({
                                svg:  path.getParent(),
                                text: String(col),
                                x:    X_IN_MIDDLE + col * GRIDCELL_DIM,
                                y:    Y_IN_MIDDLE + GRIDCELL_DIM / 4,
                                overrides: {
                                    scale: GRIDCELL_DIM / (2 * defaultVendorFontSize),
                                    fill:  ENUMS.COLOR.grey,
                                },
                            });

                        }

                    }

                });

            });

    }

}
