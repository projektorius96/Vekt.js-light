import { initGlobalLayoutStyles, getViewportFillStyle } from '../../layout.css.js';

/**
 * @returns `true`, whilst setting the styles bound to `this`, i.e. target element
 */
export default function () {
  initGlobalLayoutStyles();
  this.style.cssText = getViewportFillStyle({ position: 'absolute', background: 'transparent' });
  return true;
}