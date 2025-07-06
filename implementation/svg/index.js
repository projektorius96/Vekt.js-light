import UnitSquare from './unit-square/index.js';

export default class {

    static drawPaths({HTMLCanvas, XMLSVG, ENUMS, userConfig, SVGList = Array}) {

        if (
            XMLSVG.Helpers
            .findByID("svg-container")
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
        ) {

            SVGList
            .from(
                document.querySelector("svg-container > svg").paths
            )
            .on((path)=>{
                switch (path.id) {

                    case ENUMS.PRINT.unit_square :
                        UnitSquare.draw.call(path, { HTMLCanvas, XMLSVG, ENUMS, id: path.id, scalingFactor: stage?.grid.GRIDCELL_DIM * 3, angle: 45 })
                    break;

                    case ENUMS.PRINT.right_triangle :
                        UnitSquare.draw.call(path, { HTMLCanvas, XMLSVG, ENUMS, id: path.id, scalingFactor: stage?.grid.GRIDCELL_DIM * 3, angle: 0 })
                    break;

                }
            })

        }

    }

}