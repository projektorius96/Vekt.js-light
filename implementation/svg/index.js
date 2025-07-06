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
 
        if (
            document.querySelector(
                this.registerContainersForSVG({XMLSVG}).at(0).tagName
            )
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
            ])
        ){
            SVGList
            .from(
                document.querySelector("svg-container > svg").paths
            )
            .on(
                UnitSquare.draw({HTMLCanvas, XMLSVG, ENUMS}) 
            )
        }

    }

}