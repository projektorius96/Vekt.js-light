export default class {

    static draw({XMLSVG, id}) {
        
        const { userConfig } = stage.implementation; // DEV_NOTE # The reference `stage` is reserved ID, thus accessibe globally with ease

            Array(2)
            .fill( XMLSVG.Helpers.findByID( id ) )
            .forEach((path, operationCycle)=>{                
                switch (operationCycle) {
                    case 0:
                        path?.setPoints(
                            /* points: */
                            userConfig.svg.paths[id].options.points
                            ,
                            /* scalingFactor: */
                            stage.grid.GRIDCELL_DIM * 4
                        )
                    break;
                    case 1:
                        const { width, height } = path?.getBoundingClientRect();
                        path?.setTranslate({
                            translateX: stage.grid.SVG.X_IN_MIDDLE - (width / 2),
                            translateY: stage.grid.SVG.Y_IN_MIDDLE - (height / 2),
                        })
                    break;
                }
            });

            return XMLSVG.Helpers.findByID( id );

    }

}