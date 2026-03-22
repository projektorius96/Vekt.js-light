/**
 * Shared SVG transform logic for shape modules: refresh path points, then apply
 * rotation/translation/skew from stage center (stage.grid.SVG) plus optional offsets.
 *
 * @returns {boolean} true if transform was applied on the `path`
 */
export function transformPath(path, { Helpers, transformations }) {

  const
    { Trigonometry } = Helpers
    ,
    { angle = 0, offsetX = 0, offsetY = 0, skew = null } = transformations
  ;

  if (!path.setPoints(path.getPoints())) return false;
  const center = typeof stage !== 'undefined' && stage?.grid?.SVG;
  if (!center) return false;

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
