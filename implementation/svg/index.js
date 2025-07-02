import UnitSquare from './unit-square/index.js';

export default class {

    /**
     * > This `default.registerPaths` method initalizes `XMLSVG.Views.Path`
     */
    static registerPaths({XMLSVG, ENUMS, userConfig}) {

        return([
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

    }

    /**
     * > This `default.drawPaths` method tweaks each of recently initialized `XMLSVG.Views.Path`
     */
    static drawPaths({HTMLCanvas, XMLSVG, ENUMS}) {
        
        return([
            UnitSquare.draw({HTMLCanvas, XMLSVG, ENUMS, id: ENUMS.PRINT.unit_square, scalingFactor: stage?.grid.GRIDCELL_DIM * 3}),
            UnitSquare.draw({HTMLCanvas, XMLSVG, ENUMS, id: ENUMS.PRINT.right_triangle, scalingFactor: stage?.grid.GRIDCELL_DIM * 2}),
        ])

    }

}