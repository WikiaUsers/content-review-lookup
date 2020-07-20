/* Random article link appended to the "On the Wiki" menu
 * By [[User:KettleMeetPot]]
 */
 
$(function() {
  if (skin == "oasis" || skin == "wikia") {
    $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:Random/main">Random article</a></li>');