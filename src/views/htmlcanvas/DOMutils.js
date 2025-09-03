EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.rm = EventTarget.prototype.removeEventListener;
EventTarget.prototype.dispatch = EventTarget.prototype.dispatchEvent;

Object.defineProperties(HTMLDivElement.prototype, {
    'layers' : {
        get(){
            return this.children
        }
    }
});

// DEV_NOTE # DO NOT use the following block with @svgdotjs/svg.js dependency, the SVG dependency will fail giving an error as follows: "Cannot assign to read only property 'on' of object '[object Object]'"
// Object.defineProperties(Array.prototype, {
//     'on' : {
//         value: Array.prototype.forEach
//     }
//     ,
// });
