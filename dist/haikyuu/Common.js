/* Any JavaScript here will be loaded for all users on every page load. */

if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  var script  = document.createElement( 'script' );
  script.src  = '/w/index.php?title=User:KidProdigy/CollapsibleTables.js&action=raw&ctype=text/javascript&smaxage=18000&action=raw&maxage=18000';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
  
  addOnloadHook(function () { new CollapsibleTables(); });
}
 
/* Inactive users get an "inactive" tag on their profile headers */
InactiveUsers = {
    months: 2
};
 
/* Auto Refresh */
AjaxRCRefreshText      = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages              = [
    'Special:RecentChanges',
    'Special:WikiActivity'
];