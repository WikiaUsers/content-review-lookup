// Lade das Toggle-Skript direkt
mw.loader.load('/index.php?title=MediaWiki:Details.js&action=raw&ctype=text/javascript');
mw.loader.using('jquery.makeCollapsible', function () {
  $('.mw-collapsible').makeCollapsible();
});