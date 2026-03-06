import { applyShapeTransform } from '../../modules/transform-utils.js';

export default class {

  static draw({ Helpers, path, skew = { Y: { phi: 0 } } }) {

    applyShapeTransform(path, Helpers, { skew });

  }

  static init(id, {HTMLCanvas, XMLSVG, ENUMS, QUADRANT, GLOBAL_SCALAR, OrderedPair, SVGList}) {
        
    XMLSVG.Helpers.findByID(id)
    .setPaths([
        new XMLSVG.Views.Path({
            options: {
                id: ENUMS.ID.unit_square,
                hidden: !true,
                
                /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */
                dashed: 0,

                strokeWidth: 1,
                /* fill: ENUMS.COLOR.magenta,
                stroke: ENUMS.COLOR.magenta, */
                fillStroke: ENUMS.COLOR.magenta,
                opacity: 0.25,
                scaling: stage.grid.GRIDCELL_DIM,
                angle: -3 * QUADRANT,
                points: [

                /* === ZERO VECTOR (opens the path) === */
                    ...OrderedPair.from([{x: 0, y: 0}]),
                /* === ZERO VECTOR (opens the path) === */

                /* === BASIS === */
                    ...OrderedPair.from([{x: 1, y: 0}]),
                    ...OrderedPair.from([{x: 1, y: 1}]),
                    ...OrderedPair.from([{x: 0, y: 1}]),
                /* === BASIS === */

                /* === ZERO VECTOR (closes the path) === */
                    ...OrderedPair.from([{x: 0, y: 0}]),
                /* === ZERO VECTOR (closes the path) === */
                
                ].map((basis)=>{
                    return({
                        x: basis.x * GLOBAL_SCALAR,
                        y: basis.y * GLOBAL_SCALAR,
                    })
                })
            }
        })
    ]
    , 
    ({paths}) => SVGList.from(paths).on((path)=>{
        
        // DEV_NOTE [CULPRIT-SOLVED] # matrix transformation cannot happen in homogeneous fashion, it must be separate matrix multiplication operation, with skew angle (rotation) would be disregarded (ignored)
        this.draw( { Helpers: HTMLCanvas.Helpers, path, skew: { X: { phi: -15 } } } )

    })
    );
        
  }

}
