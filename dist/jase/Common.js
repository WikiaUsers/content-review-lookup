/* Any JavaScript here will be loaded for all users on every page load. */
/* UCP Proto loader (gated) */
(function () {
  function hasParam(name, value) {
    const params = new URLSearchParams(location.search);
    if (!params.has(name)) return false;
    if (value == null) return true;
    return params.get(name) === String(value);
  }

  const KEY = "ucpProtoEnabled";

  // Enable/disable controls
  if (hasParam("proto", "1")) localStorage.setItem(KEY, "1");
  if (hasParam("proto", "0")) localStorage.removeItem(KEY);

  const enabled = localStorage.getItem(KEY) === "1";
  if (!enabled) return;

  document.documentElement.classList.add("ucp-proto");
  document.body && document.body.classList.add("ucp-proto");

  // Load CSS/JS pages as raw resources
  const base = mw.util.wikiScript("index") + "?title=";

  function loadJS(title) {
    mw.loader.load(base + encodeURIComponent(title) + "&action=raw&ctype=text/javascript");
  }
  function loadCSS(title) {
    mw.loader.load(base + encodeURIComponent(title) + "&action=raw&ctype=text/css");
  }

  loadCSS("MediaWiki:UCPProto.css");
  loadJS("MediaWiki:UCPProto.js");
})();