import UnitSquare from './unit-square/index.js';
import UnitCircle from './unit-circle/index.js';

export default class {

    static registerContainersForSVG({XMLSVG}) {

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

        const { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry;

        SVGList
        .of(...this.registerContainersForSVG({XMLSVG}))
        .on((container)=>{

            switch (container.id) {

                case !ENUMS.CASE.group_1 :

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

                    // Data polling:
                    setInterval(()=>{

                        const records = stage?.data;
                        if ( Array.isArray(records) ){
                            
                            const 
                                toPercentage = 360/100 // 1% is equal to 3.6 out of 360 (TAU, 1 period for circular shape such as circle itself)

                            XMLSVG.Helpers.findByID(container.id)
                            .setPaths([
                                new XMLSVG.Views.Path({
                                    options: {
                                        id: ENUMS.PRINT.unit_circle,
                                        hidden: !true,
                                        /* herein: dashed := [1.0..10]; to disable, pass either := 0|false */
                                        dashed: 0,
                                        points: [
                                            ...setRange(0, 1, records.at(-1)?.humidity * toPercentage*2/* 360 * 1 */).map((deg)=>{
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

                        }

                    }, 1000)

                break;
            }

        });
        
    }

}