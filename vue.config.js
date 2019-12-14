const marked = require('marked')
const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')
loadLanguages(['bash'])

module.exports = {
  pages: {
    index: './demo/main.js',
  },
  publicPath: '.',
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .options({
        renderer: new marked.Renderer(),
        highlight: function(code, lang) {
          return Prism.highlight(code, Prism.languages[lang], lang)
        },
        gfm: true,
      })
  },
  configureWebpack: {
    devtool: 'source-map',
    output: {
      libraryExport: 'default',
    },
  },
  css: { extract: false },
}
