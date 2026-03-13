import { ENUMS } from "./utils.js";

export
    const
        userConfig = {
            canvas: {
                stage: {
                    scale: 30
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
                    labelScaling: 1, 
                    labelColor: ENUMS.COLOR.black, 
                    labelOpacity: 1,
                    
                    lineScaling: 2, 
                    lineColor: ENUMS.COLOR.red, 
                    lineOpacity: 1  
                }
            }
        }
        ;