/**
 * @name            ThemeDeviser
 * @author          Headquarter8302
 * @description     Utility for wiki admins to add CSS variable styling outside
 *					of ThemeDesigner
 */
// index.ts
(function(window, mw) {
  const mwConfig = mw.config.get(["wgPageName", "wgNamespaceNumber"]);
  //! don't run if not article namespace
  if (mwConfig.wgNamespaceNumber !== 0)
    return;
  console.log("[ThemeDeviser] Bootstrapping");
  window.dev = window.dev || {};
  if (window.dev.themeDeviser !== undefined) {
    return;
  }
  window.dev.themeDeviser = window.dev.themeDeviser || { hasRan: true };
  if (!window.themeDeviserAllowlist) {
    console.error("[ThemeDeviser] No allowlist found! Create an array with the desired page names in 'window.themeDeviserAllowlist'");
    return;
  }
  if (!window.themeDeviserAllowlist.includes(mwConfig.wgPageName)) {
    return;
  }
  //! https://stackoverflow.com/a/8831937
  function hash(str) {
    let hash2 = 0;
    for (let i = 0, len = str.length;i < len; i++) {
      let chr = str.charCodeAt(i);
      hash2 = (hash2 << 5) - hash2 + chr;
      hash2 |= 0;
    }
    return Math.abs(hash2).toString();
  }
  //! TODO: add deduplication/prevent duplication
  function apply(input) {
    if (input === null) {
      console.error(`[ThemeDeviser] Empty injection input!`);
      return;
    }
    console.log("[ThemeDeviser] Injecting styles");
    const injectStylesheet = document.createElement("style");
    const cssResult = input.theme.map(function([cssVar, cssVarVal]) {
      //! "security hardening"
      //! TODO: Should probably allow B64-encoded stuff
      if (!cssVar.startsWith("--") || cssVarVal.includes("url("))
        return;
      return `${cssVar}: ${cssVarVal};`;
    }).join(" ");
    injectStylesheet.setAttribute("type", "text/css");
    injectStylesheet.classList.add("themedeviser");
    injectStylesheet.dataset["hash"] = hash(cssResult);
    injectStylesheet.textContent = `:root { ${cssResult} }`;
    document.head.appendChild(injectStylesheet);
    console.log("[ThemeDeviser] Styles injected");
  }
  mw.hook("dev.fetch").add(function(fetch) {
    let interfacePage = "Custom-ThemeDeviser.json";
    if (window.themeDeviserPage) {
      interfacePage = window.themeDeviserPage;
    } else {
      console.warn(`[ThemeDeviser] Configuration variable 'window.themeDeviserPage' not found, defaulting to MediaWiki:Custom-ThemeDeviser.json`);
    }
    fetch(interfacePage).then(function(payload) {
      let payloadJSON;
      try {
        payloadJSON = JSON.parse(payload);
      } catch (error) {
        console.error(`[ThemeDeviser] Invalid JSON from URL: ${interfacePage}`);
        throw error;
      }
      apply(payloadJSON);
    });
  });
  //! hard dependency
  importArticle({
    type: "script",
    article: "u:dev:MediaWiki:Fetch.js"
  });
})(this, mediaWiki);