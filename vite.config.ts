import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/renderer"),
    }
  },
  plugins: [
    tailwindcss(),
    react(),
    electron([
      {
        entry: 'src/main/index.ts',
        vite: {
          build: {
            rollupOptions: {
              external: ['better-sqlite3']
            }
          }
        }
      },
      {
        entry: 'src/preload/index.ts',
        vite: {
          build: {
            outDir: 'dist-electron',
            rollupOptions: {
              output: {entryFileNames: 'preload.js'}
            }
          }
        },
        onstart(options) {
          options.reload()
          // Entry for the bridge - preload
          // onstart reload - basicaly reloads Electron to restart when the file changes 
        }
      }
    ]),
    
    renderer(),
    // Patches renderer for Electrons chromium
  ],
})
