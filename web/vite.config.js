import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { exec } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function sourceSiteWatcherPlugin() {
  let isBuilding = false
  return {
    name: 'watch-source-site',
    configureServer(server) {
      server.watcher.add(path.resolve(__dirname, 'source-site'))
      server.watcher.on('change', (file) => {
        if (file.includes('source-site') && !isBuilding) {
          isBuilding = true
          exec('node scripts/bundle-spa-pages.mjs', { cwd: __dirname }, (err, stdout, stderr) => {
            isBuilding = false
            if (err) {
              console.error('[source-site-watcher] Error:', err)
            } else {
              if (stdout) console.log(stdout.trim())
              if (stderr) console.log(stderr.trim())
            }
          })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sourceSiteWatcherPlugin()],
})
