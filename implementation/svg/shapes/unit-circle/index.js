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
    XMLSVG.Helpers.findByID(id)
    .setPaths([
        new XMLSVG.Views.Path({
            options: {
                id: ENUMS.ID.unit_circle,
                scaling: stage?.grid.GRIDCELL_DIM * 2.0,
                points: [
                    ...setRange(0, 1, 360 * 2).map((deg)=>{
                        return {
                            x: 1 * Math.cos( Converters.degToRad( deg ) ) - 1 /* <== removes the annoying radius visible, when the shape is not filled */,
                            y: 1 * Math.sin( Converters.degToRad( deg ) ) - 0,
                        }
                    })
                ],

                /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */
                dashed: dashed ?? 1,
                strokeWidth: strokeWidth ?? 1,
                fill: fill || ENUMS.COLOR.none,
                stroke: stroke || ENUMS.COLOR.black,
                // /**
                //  * @override
                //  */
                // ...overrideOptions
            }
        })
    ]
    , 
    ({paths})=>Array.from(paths).on((path)=>{

      // this.transform({Helpers: HTMLCanvas.Helpers, path, XMLSVG, ENUMS});
      void function transform(){

      const { width } = path?.getBoundingClientRect() ?? {};
        transformPath(path, HTMLCanvas.Helpers, { offsetX: width * stage.grid.GRIDCELL_DIM });

      }()

    })
    );

  }

}


function animate({AnimationCounter}) {

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

}