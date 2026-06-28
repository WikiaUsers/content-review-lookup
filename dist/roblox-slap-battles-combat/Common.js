/* Any JavaScript here will be loaded for all users on every page load. */
window.AddRailModule = [{prepend: true}];

mw.loader.using("mediawiki.util").then(function() {
  var username = mw.config.get("wgUserName");

  document.querySelectorAll(".username").forEach(function(el) {
    var fallback = el.dataset.fallback || "User";
    el.textContent = username || fallback;
  });
});