import UnitSquare from './unit-square/index.js';

export default class {

    static registerContainersForSVG({XMLSVG}){

        return([
            new XMLSVG.ViewGroup.Container({
                options: {
                    id: 'svg-container',
                }
            })
        ])

    }

    static drawPaths({HTMLCanvas, XMLSVG, ENUMS, userConfig, SVGList = Array}) {

        SVGList
        .of(...this.registerContainersForSVG({XMLSVG}))
        .on((container, index)=>{
            switch (index) {
                case 0:

                    const pathsWereSet = 
                        document.querySelector(container.tagName)
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
                        ]);

                    if (pathsWereSet) {
                        
                        SVGList
                        .from(
                            document.querySelector(`${container.tagName} > ${container.tagName.replace("-CONTAINER", "")}`)?.paths
                        )
                        .on(
                            UnitSquare.draw({HTMLCanvas, XMLSVG, ENUMS}) 
                        )

                    }
                    
                break;
            }
        });
        
    }

}