import '../../shared/DOMutils.js';

Object.defineProperties(SVGElement.prototype, {
  paths: {
    get() {
      return this.children;
    },
  },
  container: {
    get() {
      return this.parentElement;
    },
  },
});

