const hljs = require('highlight.js')

function markdown(content) {
  const md = require("markdown-it")({
    html: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }

      return "";
    }
  });
  return md.render(content);
}

module.exports = { markdown };
