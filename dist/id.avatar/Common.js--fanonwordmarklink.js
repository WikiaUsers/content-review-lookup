/* Any JavaScript here will be loaded for all users on every page load. */
/* Fanon portal wordmark link
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */
 
$(document).ready(function () {
  if ( wgCanonicalNamespace == "Fanon" ) {
    $(".wordmark.large.graphic a:first-child").attr("href","/wiki/Avatar_Indonesia_Wiki:Avatar_fanon");
  }
});