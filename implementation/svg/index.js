import UnitSquare from './unit-square/index.js';

export default class {

    static initSVG({XMLSVG, ENUMS}) {
        
        return([
            UnitSquare.draw({XMLSVG, id: ENUMS.PRINT.unit_square, scalingFactor: stage?.grid.GRIDCELL_DIM * 4}),
            UnitSquare.draw({XMLSVG, id: ENUMS.PRINT.right_triangle, scalingFactor: stage?.grid.GRIDCELL_DIM * 3}),
        ])

    }

}