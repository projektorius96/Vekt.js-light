export default class {

  static init(id, {dependencies, overrides}) {

    const {
      HTMLCanvas, 
      XMLSVG, 
      ENUMS,
      transformPath,
      userConfig, 
    } = dependencies;

    const { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry;

    const 
      { path } = overrides
      ,
      {
        fill
        ,
        dashed
        , 
        stroke
        ,
        strokeWidth
        ,
        transformations
      } = path
      ;
    
    const 
      tearoff$setRange = 
        (deg)=>{          
          return({
                x: /* ____________________________________________ */ 1   * Math.cos( Converters.degToRad( deg ) ) - 1  /* <== removes the annoying radius visible, when the shape is not filled */,
                y: -1 * Number( 1 ) * Math.sin( Converters.degToRad( deg ) ),
          });
        }
      ,
      allPoints = 
        setRange(0, 1, 360).map(tearoff$setRange);
      
    XMLSVG.Helpers.findByID(id)
    .setPaths([
        new XMLSVG.Views.Path({
            options: {
                id: overrides.path.id ?? id,
                scaling: stage?.grid?.GRIDCELL_DIM * (overrides?.path?.scalingFactor ?? 1),
                /* Start with a single invisible point; the animation progressively
                   reveals the rest of the circle on each AnimationCounter tick. */
                points: allPoints,

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

      transformPath(path, {
        Helpers: HTMLCanvas.Helpers
        , 
        transformations
        ,
        afterTransform: ({path})=> path.setPoints(allPoints, path.dataset.scaling)
      });

      })
    );

  }

}