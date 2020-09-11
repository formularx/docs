import { defineConfig } from 'dumi';

const PUBLIC_PATH = '/formular/';
const FONT_FAMILY = `'Fira Code',Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace`;

export default defineConfig({
  mode: 'site',
  hash: true,
  title: 'Formular',
  logo: PUBLIC_PATH + 'images/formular_logo.svg',
  links: [
    {
      href: PUBLIC_PATH + 'fonts/fira-code/fira_code.css',
      rel: 'stylesheet',
      type: 'text/css',
    },
  ],
  styles: [
    `code[class*=language-][class*=language-], pre[class*=language-][class*=language-], code {
  font-family: ${FONT_FAMILY};
  font-size: 14px;
}`,
    `pre, code, kbd, samp {
  font-size: 1em;
  font-family: ${FONT_FAMILY} !important;
}`,
  ],
  base: PUBLIC_PATH,
  publicPath: PUBLIC_PATH,
  outputPath: process.env.OUTPUT_PATH ?? './dist',
  theme: {
    '@c-primary': '#747474',
  },
  navs: {
    'en-US': [
      { title: 'Guide', path: '/guide' },
      { title: 'Examples', path: '/examples' },
      { title: 'API', path: '/api' },
      {
        title: 'GitHub',
        path: 'https://github.com/formularx/formular',
      },
    ],
    'zh-CN': [
      { title: '教程', path: '/zh-CN/guide' },
      { title: '示例', path: '/zh-CN/examples' },
      { title: 'API', path: '/zh-CN/api' },
      {
        title: 'GitHub 仓库',
        path: 'https://github.com/formularx/formular',
      },
    ],
  },
});
