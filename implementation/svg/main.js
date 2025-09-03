import './style.css';
import { SVG } from '@svgdotjs/svg.js'

export default class {

    // The '@svgdotjs/svg.js' generated paths
    static drawSVGPaths() {
        
        const svgAPI = SVG().addTo(`#${stage.id}`).size(1, 1);
            svgAPI.rect(1, 1).attr({id: 'rect1', fill: 'rgba(255, 215, 0, 1)' });

        Object.assign(
            chrome.app, {
                svgAPI,
            }
        )

        return;
    }

    static resizeSVGPaths({stage}) {

            const { svgAPI } = chrome.app;

            svgAPI.size(stage.layers.grid.width, stage.layers.grid.height);
            svgAPI.findOne('#rect1').size(stage.grid.GRIDCELL_DIM * 3, stage.grid.GRIDCELL_DIM * 3);
            svgAPI.findOne('#rect1').move(
                stage.grid.SVG.X_IN_MIDDLE - (svgAPI.findOne('#rect1').bbox().width/2)
                ,
                stage.grid.SVG.Y_IN_MIDDLE - (svgAPI.findOne('#rect1').bbox().height/2) 
            );

    }

}