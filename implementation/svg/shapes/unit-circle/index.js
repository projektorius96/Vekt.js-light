import { transformPath } from '../../modules/transform-utils.js';

export default class {

  static init(id, {HTMLCanvas, XMLSVG, ENUMS, SVGList}) {

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
                            x: 1 * Math.cos( Converters.degToRad( deg ) ) - 1 /* <== removes the radius, when the shape is not filled */,
                            y: 1 * Math.sin( Converters.degToRad( deg ) ) - 0,
                        }
                    })
                ],

                /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */
                dashed: 0,

                strokeWidth: 3,
                fill: ENUMS.COLOR.none,
                stroke: ENUMS.COLOR.purple,
            }
        })
    ]
    , 
    ({paths})=>SVGList.from(paths).on((path)=>{

      // this.transform({Helpers: HTMLCanvas.Helpers, path, XMLSVG, ENUMS});
      void function transform(){

      const { width } = path?.getBoundingClientRect() ?? {};
        transformPath(path, HTMLCanvas.Helpers, { offsetX: width / 2 });

      }()

    })
    );

  }

}