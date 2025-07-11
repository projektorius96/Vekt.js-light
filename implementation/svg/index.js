import UnitSquare from './unit-square/index.js';
import UnitCircle from './unit-circle/index.js';

export default class {

    static registerContainersForSVG({XMLSVG}){

        return([
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: 'group_1',
                }
            })
            ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: 'group_2',
                }
            })
        ])

    }

    static drawPaths({HTMLCanvas, XMLSVG, ENUMS, userConfig, SVGList = Array}) {

        SVGList
        .of(...this.registerContainersForSVG({XMLSVG}))
        .on((container)=>{

        const { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry;

            switch (container.id) {

                case ENUMS.CASE.group_1 :

                        XMLSVG.Helpers.findByID(container.id)
                        .setPaths([
                            new XMLSVG.Views.Path({
                            options: {
                                ...userConfig.svg.paths.unit_square.options,
                            }
                            })
                            ,
                            new XMLSVG.Views.Path({
                                options: {
                                    ...userConfig.svg.paths.unit_square.options,
                                    /**
                                     * @override
                                     */
                                    id: ENUMS.PRINT.right_triangle,
                                    points: [
                                        ...userConfig.svg.paths.unit_square.options.points
                                            .filter((vec2, i) => {
                                                if (i !== 2) return vec2;
                                            })
                                    ],
                                    stroke: ENUMS.COLOR.red
                                }
                            })
                            ,
                        ]
                        , 
                        ({paths}) => SVGList.from(paths).on( UnitSquare.draw({HTMLCanvas, XMLSVG, ENUMS}) )
                        );
                    
                break;

                case ENUMS.CASE.group_2 :

                    XMLSVG.Helpers.findByID(container.id)
                    .setPaths([
                        new XMLSVG.Views.Path({
                            options: {
                                id: ENUMS.PRINT.unit_circle,
                                hidden: !true,
                                /* herein: dashed := [1.0..10]; to disable, pass either := 0|false */
                                dashed: 0,
                                points: [
                                    ...setRange(0, 1, 360 * 2).map((deg)=>{
                                        return {
                                            x: 1 * Math.cos( Converters.degToRad( deg ) ) - 1 /* <== removes the radius, when the shape is not filled */,
                                            y: 1 * Math.sin( Converters.degToRad( deg ) ) - 0,
                                        }
                                    })
                                ],
                                strokeWidth: 3,
                                fill: ENUMS.COLOR.none,
                                stroke: ENUMS.COLOR.purple,
                            }
                        })
                    ], ({paths}) => SVGList.from(paths).on( UnitCircle.draw({HTMLCanvas, XMLSVG, ENUMS}) ));
                break;
            }
        });
        
    }

}