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