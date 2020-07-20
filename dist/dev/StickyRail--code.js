/**
 * StickyRail
 * Make WikiaRail stick to the top and scroll along with the screen
 * Make the height of WikiaRail suitable for screen
 **/
function ResizeRail() {
  importArticle({
    type: 'style',
    article: 'u:dev:MediaWiki:StickyRail.css'
  });
  if ($(window).width() < 1024) {
    $('#WikiaRail').attr('style', '');
  } else {
    var RailHeight, ContentHeight = $('#WikiaMainContent').height(),
    WindowHeight = $(window).height() - $('#WikiaBarWrapper').height() - $('#globalNavigation').height()-28;
    if (ContentHeight < WindowHeight) {
      RailHeight = ContentHeight;
    } else {
      RailHeight = WindowHeight;
    }
    $('#WikiaRail').css({
      'height': RailHeight,
      'top': $('#globalNavigation').height()+14,
    });
  }
}
$(window).load(ResizeRail).resize(ResizeRail);