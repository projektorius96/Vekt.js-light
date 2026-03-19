import { ENUMS } from "./utils.js";

export
    const
        userConfig = {
            canvas: {
                stage: {
                    scale: 20
                },
                layers: {
                    grid: {
                        id: ENUMS.CASE.grid,
                        strokeStyle: ENUMS.COLOR.grey,
                        hidden: !true,
                        dotted: !true,
                        lineWidth: 1,
                        opacity: 1/4
                    }
                }
            }
            ,
            ruler: {
                overrides: {
                    labelScaling: 1, /* NOTE (!) # this may be overriden in `implementation/svg/entry.js` */
                    labelColor: ENUMS.COLOR.black, 
                    labelOpacity: 1,
                    
                    lineScaling: 2, 
                    lineColor: ENUMS.COLOR.grey, 
                    lineOpacity: 1 /* passing false | 0 - hides the abscissa (X) and ordinate (Y) */  
                }
            }
        }
        ;