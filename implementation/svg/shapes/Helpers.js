import UnitVector from "./unit-vector";

export default class {

    constructor(){        
        if (new.target) throw (new Error('This default class is not meant to be constructed!'));
    }

    /**
     * 
     * @param {Object} `callee` - callee is `XMLSVG.Views.Path` 
     */
    static drawAxis({setRange, degToRad, arrowHeadOptions = {}, TRANSLATE_X = 0, TRANSLATE_Y = 0}){

        /**
         * @alias
         */
        const OrderedPair = Array

        const
            HAVER_CIRCLE = [0, 1, 180]
            ,
            LIMIT_TO_0 = (1 / Number.MAX_SAFE_INTEGER)
            ;

        return ([
            ...OrderedPair.from([
                ...setRange(...HAVER_CIRCLE).map((deg) => {
                    return ({
                        x: (1 * Math.cos(degToRad(deg)) + TRANSLATE_X) - 1 /* <== removes the radius, when the shape is not filled */,
                        y: (LIMIT_TO_0 * Math.sin(degToRad(deg)) + TRANSLATE_Y) - 0,
                    });
                })
                ,
                ...UnitVector.addArrowHead({
                    TRANSLATE_X,
                    TRANSLATE_Y,
                    sharpness: arrowHeadOptions.sharpness,
                    length: arrowHeadOptions.length,
                })
            ])
        ]);

    }

}