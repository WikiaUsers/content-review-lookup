/* Any JavaScript here will be loaded for all users on every page load. */
if ($('#jewelTable').length) {
  mw.loader.load('/wiki/MediaWiki:JewelsFilter.js?action=raw&ctype=text/javascript');
}