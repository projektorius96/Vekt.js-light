import './DOMutils.js';
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
        findByID(id){
            return (
                document?.getElementById(id)
            )
        },
        findByName(svg_name, self = 0){
            return (
                document?.getElementsByName(svg_name)?.item(self)
            )
        }
    }

    static {

        Object.freeze(this.ViewGroup);
        Object.freeze(this.Views);
        Object.freeze(this.Helpers);

    }

}

