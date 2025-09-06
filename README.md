# Project name: **Vekt.js-light** (_a lightweight version of **Vekt.js**_)

> See current list of [Vekt.js demos on YouTube](https://www.youtube.com/playlist?list=PL7JUsQnnxGCu1aze5meX8gP_K50ZcM9kC)

### Annotations

> The annotations you may have stumbled upon by examining the source code itself:..

```diff
DEV_NOTE # ... : a note left by developer
DEV_NOTE (!) # ... : the IMPORTANT note left by developer
```

### Table of contents

> _Coming soon..._

### Development environment

> **PREREQUISITES**:

1) Make sure you got the latest `Node.js` and `npm` on your machine, as well as latest stable version of `Vite.js` installed upon;

> **TROUBLESHOOTING**:

- Windows with WSL2 installed, even if no distro is currently running on the machine, may experience WebSocket-based Hot Module Reload (HMR) disconnection error you will see in your browser's console, hence minimum required `vite.config` that is configured to fall back to HTTP Polling:

```js

    server: {
        watch: {
            usePolling: true,
        }
    }

```

> **DEV REMARKS**:

Most of the time you will be coding under the following paths (_notice, the paths are given in diomatic, Unix-like format_):

- `<root>/implementation/user-config.js`;
- `<root>/implementation/svg/index.js` and relative paths under `/svg/` or below it.

---

> Made with ♥ by [**projektorius96**](https://github.com/projektorius96).