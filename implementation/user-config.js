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
                        strokeStyle: ENUMS.COLOR.black,
                        hidden: !true,
                        dotted: /* ! */true,
                        lineWidth: 2,
                        opacity: 0.5
                    }
                }
            }
        }
        ;