import { cpSync } from 'fs'
import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN', class: 'govuk-template' },
      bodyAttrs: { class: 'govuk-template__body js-enabled govuk-frontend-supported' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#0b0c0c' },
        { name: 'description', content: '为中国大陆用户提供稳定、快速的 Minecraft Mod 信息镜像服务。支持 Modrinth 和 CurseForge API，完全兼容官方接口。' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/avatar.png' },
      ],
    },
  },

  css: [
    'govuk-frontend/dist/govuk/govuk-frontend.min.css',
    '~/assets/overrides.css',
  ],

  vite: {
    optimizeDeps: {
      include: ['govuk-frontend'],
    },
  },

  hooks: {
    'build:before': () => {
      // Keep govuk-frontend fonts & images available as static assets
      cpSync(
        resolve('./node_modules/govuk-frontend/dist/govuk/assets'),
        resolve('./public/assets'),
        { recursive: true },
      )
    },
  },

  nitro: {
    preset: 'vercel',
  },
})
