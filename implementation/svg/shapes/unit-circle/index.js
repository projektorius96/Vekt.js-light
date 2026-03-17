import { transformPath } from '../../modules/transform-utils.js';

export default class {

  static init(id, {HTMLCanvas, XMLSVG, ENUMS, AnimationCounter, overrides = {}}) {

    const { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry;

    const {
      view
      ,
      animation
    } = overrides;

    const {
      fill
      ,
      dashed
      , 
      stroke
      ,
      strokeWidth
    } = view;

    const 
      shapeType = new Map([
        [ENUMS.SHAPE.circle, [0, 1, 360]],
        [ENUMS.SHAPE.square, [0, 90, 360]],
      ])
      ;

    /**
     * Case B: pre-compute all points once so the animation callback only needs
     * to slice this array — no trigonometry recalculation on every tick.
     *
     * For circle  : sample the unit circle at every 1° → 361 points.
     * For square  : the unit-circle corners at 0°/90°/180°/270°/360° give
     *   only 5 points (a 5-frame cycle).  That makes the single blank reset
     *   frame (count = 0) occupy 20 % of the cycle and flicker visibly.
     *   Fix: keep the same 4 diamond vertices but linearly interpolate between
     *   them, producing ~361 edge points — identical cycle length to circle so
     *   the reset frame is imperceptible (< 0.3 %).
     */
    const cornerPoints = setRange(...shapeType.get(animation?.type || ENUMS.SHAPE.circle)).map((deg) => ({
        x: Math.cos( Converters.degToRad( deg ) ) - 1 /* <== removes the annoying radius visible, when the shape is not filled */,
        y: Math.sin( Converters.degToRad( deg ) ),
    }));

    const allPoints = animation?.type === ENUMS.SHAPE.square
        ? interpolateCorners(cornerPoints)
        : cornerPoints;
    
    XMLSVG.Helpers.findByID(id)
    .setPaths([
        new XMLSVG.Views.Path({
            options: {
                id: ENUMS.ID.unit_circle,
                scaling: stage?.grid.GRIDCELL_DIM * 2.0,
                /* Start with a single invisible point; the animation progressively
                   reveals the rest of the circle on each AnimationCounter tick. */
                points: allPoints.slice(0, 1),

                /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */
                dashed: dashed ?? 1,
                strokeWidth: strokeWidth ?? 1,
                fill: fill || ENUMS.COLOR.none,
                stroke: stroke || ENUMS.COLOR.black,
            }
        })
    ]
    , 
    ({paths})=>Array.from(paths).on((path)=>{

      void function transform(){

        const { width } = path?.getBoundingClientRect() ?? {};
          transformPath(path, HTMLCanvas.Helpers, { offsetX: width * stage.grid.GRIDCELL_DIM });

      }()

      animate({ 
        AnimationCounter, 
        path, 
        allPoints, 
        overrides: {
          ...animation
        } 
      });

    })
    );

  }

}


function animate({AnimationCounter, path, allPoints, overrides}) {

  const scalingFactor = Number(path.dataset.scaling) || 1;

  const
    animConfig = {
        from: 0,
        /**
         * AnimationCounter increments count before invoking the callback, so
         * the callback receives count = 1, 2, …, allPoints.length − 1, then
         * count=0 at the cycle boundary (path reset to invisible), then 1 again.
         * With ~361 points the blank reset frame is < 0.3 % of the cycle.
         */
        to: allPoints.length,
        duration: 1,
        iterations: Infinity,
        ...overrides
    }
    ,
    animCounter = AnimationCounter({
        ...animConfig, callback: function ({ count }) {          
          
            /**
             * Case B: reveal one more point per tick by slicing the
             * pre-computed allPoints array.  This avoids recreating 360
             * setRange / Math.cos|sin calls on every animation frame.
             */
            path.setPoints(allPoints.slice(0, count + 1), scalingFactor);

        }
    })
  ;

  /**
   * @test
   */
  /* animCounter.pause(); */// # [PASSING]
  /* animCounter.play(); */// # [PASSING]

}

/**
 * Linearly interpolates between consecutive `corners` to produce a dense
 * sequence of edge points.  stepsPerSide is derived from the polygon's corner
 * count so the total output length matches the circle's 361-point array,
 * keeping the reset-blank frame imperceptible (< 0.3 % of the cycle).
 *
 * @param {{ x: number, y: number }[]} corners - closed polygon vertices
 *   (first === last)
 * @returns {{ x: number, y: number }[]}
 */
function interpolateCorners(corners) {

  const stepsPerSide = Math.round(360 / (corners.length - 1));
  const points = [];

  for (let i = 0; i < corners.length - 1; i++) {
    const from = corners[i];
    const to   = corners[i + 1];
    for (let t = 0; t < stepsPerSide; t++) {
      const alpha = t / stepsPerSide;
      points.push({
        x: from.x + (to.x - from.x) * alpha,
        y: from.y + (to.y - from.y) * alpha,
      });
    }
  }

  points.push(corners[corners.length - 1]); // closing vertex

  return points;

}