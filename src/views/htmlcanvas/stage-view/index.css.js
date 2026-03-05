import { initGlobalLayoutStyles, getViewportFillStyle } from '../../layout.css.js';

export default function () {
  initGlobalLayoutStyles();
  this.style.cssText = getViewportFillStyle({ position: 'relative' });
  return true;
}