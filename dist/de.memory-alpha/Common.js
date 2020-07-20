(function ($) {
  $(function() {
    var sidebarjs = $('<script type="text/javascript" />');
    sidebarjs.attr('src', 'http://de.memory-alpha.org/wiki/MediaWiki:Fusion/scripts/Sidebar.js?action=raw&ctype=text/javascript');
    $('head').append(sidebarjs);
  });
})(jQuery);