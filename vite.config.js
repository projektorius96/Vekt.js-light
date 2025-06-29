import { defineConfig } from "vite";

export default defineConfig({
    server: {
        watch: {
        usePolling: true, // Enable polling for file changes, this may fix WebSocket culprit, the trade-off - more work for CPU
        }
    }
})
