/* Ajax Auto-Refresh (courtesy pcj) */
 
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
 
$(function() {
  $('<li><a href="/wiki/Special:MyPage/MyCritics?&action=edit&prefix=&preload=Template%3AMyCritics">MyCritics Page</a></li>').insertBefore('.AccountNavigation .subnav li:first'); 
});