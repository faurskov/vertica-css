import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'

// Collect all HTML entry points recursively
function collectHtmlInputs(dir, baseDir = dir) {
  const inputs = {}
  for (const entry of readdirSync(dir)) {
    const full = `${dir}/${entry}`
    if (statSync(full).isDirectory()) {
      Object.assign(inputs, collectHtmlInputs(full, baseDir))
    } else if (entry.endsWith('.html')) {
      const key = full.replace(baseDir + '/', '').replace(/\.html$/, '')
      inputs[key] = resolve(full)
    }
  }
  return inputs
}

const root = resolve(__dirname)
const input = collectHtmlInputs(root)

export default defineConfig({
  base: './',
  build: {
    rollupOptions: { input },
  },
})
