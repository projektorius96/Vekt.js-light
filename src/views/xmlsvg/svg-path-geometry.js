/**
 * Path geometry helpers: parse dataset.points, apply scaling, and refresh path from current points.
 */

/**
 * Parse path.dataset.points and apply path.dataset.scaling; returns array of { x, y }.
 * @param {SVGPathElement & { dataset: { points?: string, scaling?: string } }} path
 * @returns {{ x: number, y: number }[]}
 */
export function getScaledPointsFromDataset(path) {
  const pointsStr = path.dataset.points ?? '';
  if (!pointsStr.trim()) return [];
  const raw = pointsStr.split(',').map(Number);
  const points = [];
  for (let i = 0; i < raw.length; i += 2) {
    if (raw[i] != null && raw[i + 1] != null) {
      points.push({ x: raw[i], y: raw[i + 1] });
    }
  }
  const scaling = Number(path.dataset.scaling) || 1;
  return points.map((p) => ({ x: scaling * p.x, y: scaling * p.y }));
}

/**
 * Refresh path geometry by setting d from current getPoints(); encapsulates path.setPoints(path.getPoints()).
 * @param {*} path Element with getPoints() and setPoints(points, scalingFactor?)
 * @returns {boolean}
 */
export function refreshPathFromCurrentPoints(path) {
  return path.setPoints(path.getPoints());
}
