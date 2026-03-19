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

- `<root>/implementation/user-config.js`: _at the time of writing this, the "user-config" file holds the HTMLCanvas-based grid settings_;
- `<root>/implementation/app/entry.js` (_including the paths under the `/app/shapes/` itself): _the entry file holds two static fields worth paying attention to_:
  - the `setup` static field meant to register `svg-container`; (see - [SVGSVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement))
  - the `render` static field meant to "mount" custom "shape" implementation (_each implementation in turn is defined under `/appp/shapes/`_) onto each of `svg-path`, the `<path>` that is internally appended to each of `<svg>`; (see - [SVGPathElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement))
- Happy coding!

---

> Made with ♥ by [**projektorius96**](https://github.com/projektorius96) | 2026