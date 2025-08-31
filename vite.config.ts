import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",    // Changed from "::" - allows external access
    port: 8080,         // Changed from 8080 to match Docker port
    strictPort: true,   // Exit if port is in use
    watch: {
      usePolling: true, // Enable file watching in Docker
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
