/**
 * Shared SVG transform logic for shape modules: refresh path points, then apply
 * rotation/translation/skew from stage center (stage.grid.SVG) plus optional offsets.
 *
 * @param {SVGPathElement} path
 * @param {{ Trigonometry: { setTransform: Function } }} Helpers
 * @param {{ angle?: number, offsetX?: number, offsetY?: number, skew?: object }} options
 * @returns {boolean} true if transform was applied
 */
export function transformPath(path, Helpers, { angle, offsetX = 0, offsetY = 0, skew } = {}) {
  if (!path.setPoints(path.getPoints())) return false;
  const center = typeof stage !== 'undefined' && stage?.grid?.SVG;
  if (!center) return false;

  const { Trigonometry } = Helpers;
  const transformOpts = {
    angle: angle ?? Number(path.dataset.angle) ?? 0,
    translateX: center.X_IN_MIDDLE + offsetX,
    translateY: center.Y_IN_MIDDLE + offsetY,
    ...(skew != null && { skew }),
  };

  path.setAttribute(
    'transform',
    new DOMMatrix(Trigonometry.setTransform(transformOpts)).toString()
  );
  return true;
}

/**
 * @arbitrary
 * NOTE: de-facto font-size for majority of modern browser vendors.
 */
export const defaultVendorFontSize = Number(
    window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('font-size')
        .replace(CSS.px.name, '')
    );
