import { enableDraggingFor } from './modules/index.js';
import { svg_container } from './svg-container/index.js';
import { svg_path } from './svg-path/index.js';

export class XMLSVG {

    static ViewGroup = {
        Container: customElements.get(svg_container)
    }

    static Views = {
        Path: customElements.get(svg_path),
    }

    static Helpers = {
        findBy(id){
            return (
                document?.getElementById(id)
            )
        }
    }

    static 'enableDraggingFor' = enableDraggingFor;

    static {

        Object.freeze(this.ViewGroup);
        Object.freeze(this.Views);
        Object.freeze(this.Helpers);

    }

}

