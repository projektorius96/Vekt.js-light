import { getLayerOverlayStyle } from '../../layout.css.js';

export default function ({ opacity, hidden }) {
  this.style.cssText = getLayerOverlayStyle({ opacity, hidden });
  return true;
}