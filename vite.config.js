import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any necessary aliases
    },
    dedupe: ['react', 'react-dom'], // Ensures Vite resolves these correctly
  },
  server: {
    hmr: {
      overlay: false, // Disable overlay on error
    },
  },
});