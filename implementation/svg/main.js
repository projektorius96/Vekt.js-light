/* import './style.css'; */
import { SVG } from '@svgdotjs/svg.js'

let svgAPI = null;
export default class {

    // The '@svgdotjs/svg.js' generated paths
    static drawSVGPaths({stage}) {
        
            svgAPI = SVG().addTo(`#${stage.id}`).size(1, 1);
            svgAPI.css('position', 'absolute');
            
            const { width, height } = svgAPI.node.getBoundingClientRect();
            svgAPI.rect(width, height).attr({id: 'rect1', fill: 'rgba(255, 215, 0, 1)' });
        

    }

    static resizeSVGPaths({stage}) {
        
        /* === THIS WILL BE WRAPPED INTO DEDICATE FUNCTION CALL === */
            svgAPI.size(stage.layers.grid.width, stage.layers.grid.height);
            svgAPI.findOne('#rect1').size(stage.grid.GRIDCELL_DIM * 3, stage.grid.GRIDCELL_DIM * 3);
            svgAPI.findOne('#rect1').move(
                stage.grid.SVG.X_IN_MIDDLE - (svgAPI.findOne('#rect1').bbox().width/2)
                ,
                stage.grid.SVG.Y_IN_MIDDLE - (svgAPI.findOne('#rect1').bbox().height/2) 
            );
        /* === THIS WILL BE WRAPPED INTO DEDICATE FUNCTION CALL === */

    }

}