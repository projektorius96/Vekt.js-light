export default class {

    static init(id, {dependencies, overrides}) {

        /**
         * @deps
         */
        const {
            HTMLCanvas, 
            XMLSVG, 
            ENUMS,
            QUADRANT,
            transformPath,
            defaultVendorFontSize,
            AnimationCounter, 
            userConfig, 
        } = dependencies;

        /**
         * @alias
         */
        const [
            OrderedPair
        ] = [Array];
            
        XMLSVG.Helpers.findByID(id)
        .appendPaths([
            new XMLSVG.Views.Path({
                options: {
                    id: overrides.path.id || ENUMS.ID.unit_square,
                    hidden: !true,
                    
                    /* EXAMPLE # dashed := [1.0..10]; to disable, pass either := 0|false */
                    dashed: 0,

                    strokeWidth: 1,
                    /* fill: ENUMS.COLOR.magenta,
                    stroke: ENUMS.COLOR.magenta, */
                    fillStroke: overrides.path.fillStroke || ENUMS.COLOR.magenta,
                    opacity: 0.25,
                    scaling: stage.grid.GRIDCELL_DIM * (overrides.path.SCALE_XY ?? 1),
                    angle: -3 * QUADRANT,
                    points: [

                    /* === ZERO VECTOR (opens the path) === */
                        ...OrderedPair.from([{x: 0, y: 0}]),
                    /* === ZERO VECTOR (opens the path) === */

                    /* === BASIS === */
                        ...OrderedPair.from([{x: 1, y: 0}]),
                        ...OrderedPair.from([{x: 1, y: 1}]),
                        ...OrderedPair.from([{x: 0, y: 1}]),
                    /* === BASIS === */

                    /* === ZERO VECTOR (closes the path) === */
                        ...OrderedPair.from([{x: 0, y: 0}]),
                    /* === ZERO VECTOR (closes the path) === */
                    
                    ].map((basis)=>{
                        return({
                            x: basis.x * (overrides.path.transformations.SCALE_X ?? 1),
                            y: basis.y * (overrides.path.transformations.SCALE_Y ?? 1),
                        })
                    })
                    ,
                    ...overrides.path
                }
            })
        ]
        , 
        ({paths}) => Array.from(paths).on((path)=>{
            
            transformPath(path, { 
                Helpers: HTMLCanvas.Helpers
                , 
                transformations: {
                    ...overrides.path.transformations
                } 
            });

        })
        );
            
    }

}
