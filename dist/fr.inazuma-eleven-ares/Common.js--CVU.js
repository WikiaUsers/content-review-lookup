/* Random article link appended to the "On the Wiki" menu
 * By [[User:Emperor Jarjarkine]]
 */

$(function() {
  if (skin == "oasis" || skin == "wikia") {
    $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Project:CVU/main">CVU</a></li>');
  }
});