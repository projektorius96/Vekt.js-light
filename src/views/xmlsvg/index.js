import './DOMutils.js';
import { ENUM, enableDraggingFor } from './modules/index.js';
import { svg_container } from './svg-container/index.js';
import { svg_path } from './svg-path/index.js';

/**
 * @alias
 */
const 
    PRINT = ENUM
    ;

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

    // DEV_NOTE (!) # to avoid possible Vite.js mangled refs behaviour, it's recommended NOT to use `.name` read-only prop of `Function`
    static [PRINT.enableDraggingFor/* .name */] = enableDraggingFor;

    static {

        Object.freeze(this.ViewGroup);
        Object.freeze(this.Views);
        Object.freeze(this.Helpers);

    }

}

