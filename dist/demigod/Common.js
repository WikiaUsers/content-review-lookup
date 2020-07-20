/* Any JavaScript here will be loaded for all users on every page load. */

if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  var script  = document.createElement( 'script' );
  script.src  = '/index.php?title=User:Poke/CollapsibleTables.js&action=raw&ctype=text/javascript';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
  
  hookEvent( 'load', function()
  { new CollapsibleTables(); } );
}