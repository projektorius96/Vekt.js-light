import '../../shared/DOMutils.js';

Object.defineProperties(HTMLDivElement.prototype, {
  layers: {
    get() {
      return this.children;
    },
  },
});
