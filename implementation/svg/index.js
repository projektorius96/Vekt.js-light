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
     * > This `default.drawPaths` method "draws" each of recently initialized `XMLSVG.Views.Path`
     */
    static drawPaths({HTMLCanvas, XMLSVG, ENUMS, SVGList = Array}) {

        /**
         * @description
         * 
         * An idiomatic way of grouping (batching) path calls efficiently, but
         * also assigning a meaningful alias for `Array`, such as "`SVGList`" within the code itself
         */
        let HOVER_OVER_ME;
            SVGList
                .of(
                    { id: ENUMS.PRINT.unit_square, scalingFactor: stage?.grid.GRIDCELL_DIM * 3 }
                    ,
                    { id: ENUMS.PRINT.right_triangle, scalingFactor: stage?.grid.GRIDCELL_DIM * 2 }
                )
                .on(
                    (object)=>UnitSquare.draw({...object, HTMLCanvas, XMLSVG, ENUMS})
                )
                ;

    }

}