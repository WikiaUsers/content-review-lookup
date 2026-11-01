(function () {
  function loadComparatorIfPresent($content) {
    var hasWidget = $content && $content.find
      ? $content.find('.turn-graph-comparator').length > 0
      : !!document.querySelector('.turn-graph-comparator');

    if (hasWidget && !window.turnGraphComparatorScriptRequested) {
      window.turnGraphComparatorScriptRequested = true;
      importScript('MediaWiki:TurnGraphComparator.js');
    }
  }

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(loadComparatorIfPresent);
  }
  if (window.jQuery) {
    jQuery(function () { loadComparatorIfPresent(); });
  }
})();