import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
            VitePWA({ registerType: 'autoUpdate',
              devOptions: {
                enabled: true
              },
              includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
                manifest: {
                  "theme_color": "#387aff",
                  "background_color": "#2EC6FE",
                  "icons": [
                    {
                      "purpose": "maskable",
                      "sizes": "512x512",
                      "src": "icon512_maskable.png",
                      "type": "image/png"
                    },
                    {
                      "purpose": "any",
                      "sizes": "512x512",
                      "src": "icon512_rounded.png",
                      "type": "image/png"
                    }
                  ],
                  "orientation": "any",
                  "display": "standalone",                 
                  "lang": "pt-BR",
                  "name": "Berp Dashboard",
                  "short_name": "BerpDash",
                  "start_url": "./",
                  "scope": ".",
                  "description":"teste sei la", 
                  "display_override": ["fullscreen", "minimal-ui"],              
                  "screenshots": [
                    {
                     "src": "screenshorts/image1.jpg",
                      "sizes": "322x644",
                      "type": "image/jpg",
                      "form_factor": "wide",
                      "label": "Wonder Widgets"
                    }
                ]
                }}
                
             )
  ],
})
