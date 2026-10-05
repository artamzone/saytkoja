import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { siteConfig } from './src/data/site.js'

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]))
export default defineConfig({
  plugins: [vue(), tailwindcss(), {
    name: 'site-seo',
    transformIndexHtml(html) {
      const values = {
        title: `${siteConfig.seo.title} — ${siteConfig.brandName}`,
        description: siteConfig.seo.description,
        image: siteConfig.siteUrl + siteConfig.seo.image,
      }
      return html.replace(/%SITE_(title|description|image)%/g, (_, key) => escapeHtml(values[key]))
    },
  }],
})
