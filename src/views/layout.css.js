/**
 * Centralized viewport and layer layout CSS. Global body/:root styles are applied once.
 * Export viewport-filling and full-size overlay style helpers for stage, layers, and SVG container.
 */

let globalLayoutStylesApplied = false;

/**
 * Applies global :root and body layout styles once. Idempotent.
 */
export function initGlobalLayoutStyles() {
  if (globalLayoutStylesApplied) return;
  const sheet = new CSSStyleSheet();
  sheet.insertRule(/* css */ `
    :root {
      --vertical-scrollbar-width: calc(100vw - 100%);
    }
  `);
  sheet.insertRule(/* css */ `
    body,
    body * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      overflow: hidden;
    }
  `);
  document.adoptedStyleSheets.push(sheet);
  globalLayoutStylesApplied = true;
}

/**
 * Viewport-filling container style for stage view and SVG container.
 * @param {{ position?: 'relative' | 'absolute', background?: string }} opts
 */
export function getViewportFillStyle(opts = {}) {
  const { position = 'relative', background } = opts;
  const base = `
    display: block;
    width: calc(100vw - var(--vertical-scrollbar-width));
    height: 100vh;
    position: ${position};
    top: 0px;
    left: 0px;
  `;
  const bg = background != null ? `background: ${background};` : '';
  return base + bg;
}

/**
 * Full-size overlay layer style (used by canvas layers).
 * @param {{ opacity?: number, hidden?: boolean }} opts
 */
export function getLayerOverlayStyle(opts = {}) {
  const { opacity = 1, hidden = false } = opts;
  return `
    display: inherit;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: transparent;
    opacity: ${opacity ?? 1};
    visibility: ${hidden ? 'hidden' : 'visible'};
  `;
}
