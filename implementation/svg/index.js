import UnitSquare from './unit-square/index.js';

export default class {

    static initSVG({XMLSVG, ENUMS}) {
        
        return([
            UnitSquare.draw({XMLSVG, id: ENUMS.PRINT.unit_square}),
            UnitSquare.draw({XMLSVG, id: ENUMS.PRINT.right_triangle}),
        ])

    }

}