/* Fanon portal wordmark link
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */
 
$(function () {
  if ( mw.config.get('wgCanonicalNamespace') == "Fanon" ) {
    $(".wordmark.large.graphic a:first-child").attr("href","/wiki/Avatar_Wiki:Avatar_fanon");
  }
});