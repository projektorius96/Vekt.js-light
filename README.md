# Project name: **Vekt.js-light** (_a fork of **Vekt.js**_)

> See current list of [Vekt.js|-light demos on YouTube](https://www.youtube.com/playlist?list=PL7JUsQnnxGCu1aze5meX8gP_K50ZcM9kC)

### Annotations

> The annotations you may have stumbled upon by examining the source code, as follows:..

```diff
    DEV_NOTE # a note left by author developer
    DEV_NOTE (!) # the IMPORTANT note left by author developer
    EXAMPLE # in-code example next to parameter (option) explaining its usage
```

### Table of contents

> _Coming soon..._

### Development environment

#### **PREREQUISITES**:

1) Make sure you got the latest `Node.js`, as well as the dependency of `Vite.js`;

#### **REMARKS**:

Most of the time you will be tinkering the code under the following paths:

- `<root>/implementation/user-config.js`: _at the time of writing this, the "user-config" file holds the HTMLCanvas-based grid settings_;
- `<root>/implementation/svg/entry.js`: _including the paths under the `/svg/` itself, e.g. `/svg/shapes/`_; this file in truns holds two static fields:
- the `setup` static field used to register `svg-container`
- the `render` static field used to mount custom "shape" implemenation onto `svg-path` to be rendered (_once rendered, you will see the shape visible on your browser's viewport_);
- Happy coding!

---

> Made with ♥ by [**projektorius96**](https://github.com/projektorius96) | 2026