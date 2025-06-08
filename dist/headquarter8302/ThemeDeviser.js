(function(window, mw) {
  window.dev = window.dev || {};
  
  if (window.dev.themeDeviser && window.dev.themeDeviser.hasRan) return;
  if (mw.config.get("wgNamespaceNumber") !== 0) return;
  
  window.dev.themeDeviser = window.dev.themeDeviser || {
    hasRan: true,
    apply: function(input) {
      const hash = function(str) {
        let hash2 = 0;
        for (let i = 0, len = str.length;i < len; i++) {
          let chr = str.charCodeAt(i);
          hash2 = (hash2 << 5) - hash2 + chr;
          hash2 |= 0;
        }
        return Math.abs(hash2).toString();
      };
      const stylesheet = document.createElement("style");
      stylesheet.setAttribute("data-hash", hash(input.toString()));
      stylesheet.classList.add("themedeviser-style");
      let concatCSS = "";
      for (let i = 0;i < input.length; i++) {
        const varPair = input[i];
        concatCSS = concatCSS.concat(`${varPair[0]}:${varPair[1]};`);
      }
      stylesheet.innerText = `:root { ${concatCSS} }`;
      window.document.head.appendChild(stylesheet);
    }
  };
})(window, mediaWiki);