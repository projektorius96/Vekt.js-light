export default class {

    static draw({XMLSVG, id, scalingFactor = 1}) {

            Array(2)
            .fill( XMLSVG.Helpers.findByID( id ) )
            .forEach((path, operationCycle)=>{                
                switch (operationCycle) {
                    case 0:
                        path?.setPoints(
                            /* points: */
                            path.parsePoints()
                            ,
                            /* scalingFactor: */
                            scalingFactor
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