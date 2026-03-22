# Project name: **Vekt.js-light** (_a fork of **Vekt.js**_)

> See current list of [Vekt.js|-light demos on YouTube](https://www.youtube.com/playlist?list=PL7JUsQnnxGCu1aze5meX8gP_K50ZcM9kC)

### Annotations

> The annotations you may have stumbled upon by examining the source code, as follows:..

```diff
    DEV_NOTE # a note left by author developer
    DEV_NOTE (!) # the IMPORTANT note left by author developer
    EXAMPLE # in-code example next to parameter (option) explaining its consumption
```

### Table of contents

> _Coming soon..._

### Development environment

#### **PREREQUISITES**:

1) Make sure you got the latest stable [`Node.js`](https://nodejs.org/en/download), as well as the dev dependency of [`Vite.js`](https://vite.dev/guide/); actually, if you install Node.js, clone this repo and run `npm ci` command on your active terminal - you're basically good to go!

#### **REMARKS**:

Most of the time you will be tinkering with the code under the following paths:

- `<root>/implementation/user-config.js` that holds application-level configurations;
- `<root>/implementation/app/index.js` that holds to static calls:
  - the `setup` static field meant to register `svg-container` (see - [SVGSVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement))
  - the `renderer` that holds `svg-path` (_see `drawPaths` in `/app/shapes/renderer.js`_) implementation (_each shape implementation is defined under `/app/shapes/`_) internally as `<path>` (see - [SVGPathElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement))
- Happy coding!

---

> Made with ♥ by [**projektorius96**](https://github.com/projektorius96) | 2026