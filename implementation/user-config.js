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
                        strokeStyle: ENUMS.COLOR.magenta,
                        hidden: !true,
                        dotted: true,
                        lineWidth: 1,
                        opacity: 1
                    }
                }
            }
            ,
            svg: {
                paths: {
                    unit_square: {
                        options: {
                            id: ENUMS.PRINT.unit_square,
                            hidden: !true,
                            /* herein: dashed := [1.0..10]; to disable, pass either := 0|false */
                            dashed: 0,
                            points: [
                                ...[{x: 0, y: 0}],
                                ...[{x: 1, y: 0}],
                                ...[{x: 1, y: 1}],
                                ...[{x: 0, y: 1}],
                                ...[{x: 0, y: 0}],
                            ],
                            strokeWidth: 3,
                            fill: ENUMS.COLOR.none,
                            stroke: ENUMS.COLOR.green,
                        }
                    }
                    ,
                    right_triangle: {
                        options: {
                            id: ENUMS.PRINT.right_triangle,
                            hidden: !true,
                            /* herein: dashed := [1.0..10]; to disable, pass either := 0|false */
                            dashed: 0,
                            points: [
                                ...[{x: 0, y: 0}],
                                ...[{x: 1, y: 0}],
                                /* ...[{x: 1, y: 1}], */
                                ...[{x: 0, y: 1}],
                                ...[{x: 0, y: 0}],
                            ],
                            strokeWidth: 3,
                            fill: ENUMS.COLOR.none,
                            stroke: ENUMS.COLOR.red,
                        }
                    }
                    ,
                }
            }
        }
        ;