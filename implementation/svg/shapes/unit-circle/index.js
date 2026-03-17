import { transformPath } from '../../modules/transform-utils.js';

export default class {

  static init(id, {HTMLCanvas, XMLSVG, ENUMS, AnimationCounter, overrides = {}}) {

    const {
      fill
      ,
      dashed
      , 
      stroke
      ,
      strokeWidth
    } = overrides;
    
    const { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry;

    /**
     * Case B: pre-compute all circle points once (0°..360°, inclusive) so the
     * animation callback only needs to slice this array — no trigonometry
     * recalculation on every tick.
     */
    const allPoints = setRange(0, 1, 360).map((deg) => ({
        x: Math.cos( Converters.degToRad( deg ) ) - 1 /* <== removes the annoying radius visible, when the shape is not filled */,
        y: Math.sin( Converters.degToRad( deg ) ),
    }));

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

      animate({ AnimationCounter, path, allPoints });

    })
    );

  }

}


function animate({AnimationCounter, path, allPoints}) {

  const scalingFactor = Number(path.dataset.scaling) || 1;

  const
    animConfig = {
        from: 0,
        /**
         * AnimationCounter increments count before invoking the callback, so
         * the callback receives count = 1, 2, …, allPoints.length − 1.
         * When count would reach allPoints.length the counter resets to 0
         * (no callback), restarting the draw-and-loop cycle.
         */
        to: allPoints.length,
        duration: 1,
        iterations: Infinity
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