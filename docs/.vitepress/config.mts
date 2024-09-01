import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'JSON Schema to TypeScript',
  description: 'A tool to transform JSON Schemas into TypeScript definitions',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Options', link: '/options' },
          { text: 'CLI', link: '/cli' },
          { text: 'API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/fuma-nama/json-schema-to-typescript' }]
  }
})
