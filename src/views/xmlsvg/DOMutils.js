EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.rm = EventTarget.prototype.removeEventListener;
EventTarget.prototype.dispatch = EventTarget.prototype.dispatchEvent;

Object.defineProperties(SVGElement.prototype, {
    'paths' : {
        get(){
            return this.children
        }
    }
    ,
    'container' : {
        get(){
            return this.parentElement
        }
    }
});

