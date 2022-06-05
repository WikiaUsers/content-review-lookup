;(function () {
  var el = $("#moving");

  if (window.MovingLoaded || !el.length) {
    return;
  }
  window.MovingLoaded = true;

  var title = mw.config.get("wgPageName");
  var newel = $('<a class="moved wds-button wds-is-text page-header__action-button" href="/wiki/'+title+'?action=info">'+$("#moving").html()+'</a>');
  newel.appendTo(".page-header__actions");
  el.remove();
})();