import { defineConfig } from "vite";

export default defineConfig({
    server: {
        watch: {
        usePolling: true, // Enables polling for file changes, this may fix WebSocket culprit, however the trade-off - more work for CPU !
        }
    }
})
