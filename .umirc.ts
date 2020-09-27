import { defineConfig } from 'dumi';

const PUBLIC_PATH = '/formular/';

export default defineConfig({
  mode: 'site',
  hash: true,
  title: 'Formular',
  logo: PUBLIC_PATH + 'images/formular_logo.svg',
  favicon: PUBLIC_PATH + 'favicon.ico',
  links: [
    {
      href: PUBLIC_PATH + 'fonts/fira-code/fira_code.css',
      rel: 'stylesheet',
      type: 'text/css',
    },
  ],
  base: PUBLIC_PATH,
  publicPath: PUBLIC_PATH,
  outputPath: process.env.OUTPUT_PATH ?? './dist',
  theme: {
    '@c-primary': '#747474',
  },
  dynamicImport: {},
  navs: {
    'en-US': [
      { title: 'Documents', path: '/documents' },
      {
        title: 'GitHub',
        path: 'https://github.com/formularx/formular',
      },
    ],
    'zh-CN': [
      { title: '文档', path: '/zh-CN/documents' },
      {
        title: 'GitHub 仓库',
        path: 'https://github.com/formularx/formular',
      },
    ],
  },
  ssr: {},
  exportStatic: {},
});
