import UnitSquare from './unit-square/index.js';

export default class {

    static registerContainersForSVG({XMLSVG}){

        return([
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: 'group_1',
                }
            })
            /* ,
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: 'group_Nth',
                }
            }) */
        ])

    }

    static drawPaths({HTMLCanvas, XMLSVG, ENUMS, userConfig, SVGList = Array}) {

        SVGList
        .of(...this.registerContainersForSVG({XMLSVG}))
        .on((container)=>{

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

                // case ENUMS.CASE.group_Nth :
                //     /* XMLSVG.Helpers.findByID(container.id)
                //     .setPaths([], ({paths}) => SVGList.from(paths).on( DefaultExportOfYourImplementation.draw({HTMLCanvas, XMLSVG, ENUMS}) )); */
                // break;
            }
        });
        
    }

}