/**
 * Shared DOM/Event helper prototypes used by both htmlcanvas and xmlsvg views.
 * Import this module to apply EventTarget and Array extensions globally.
 */
EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.rm = EventTarget.prototype.removeEventListener;
EventTarget.prototype.dispatch = EventTarget.prototype.dispatchEvent;

Object.defineProperties(Array.prototype, {
  on: {
    value: Array.prototype.forEach,
  },
});
