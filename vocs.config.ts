import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'Kevin Minutti',
  description: 'AI/ML Software Engineer',
  logoUrl: '/favicon.ico',
  iconUrl: '/favicon.ico',
  blogDir: './pages/blog',
  topNav: [
    { text: 'Blog', link: '/blog' },
  ],
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/K-minutti',
    },
  ],
  sidebar: [],
  theme: {
    colorScheme: 'dark',
    accentColor: {
      light: '#1a1a2e',
      dark: '#e0e0e0',
    },
    variables: {
      color: {
        background: {
          dark: '#0a0a0a',
        },
      },
    },
  },
  font: {
    google: 'Inter',
  },
})
