/* Use this line in your wiki's Common.js to import the shared js:
importScriptURI('http://pt-br.naruto-project.wikia.com/index.php?title=MediaWiki:Shared.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');
*/

function importShared() {
  for ( var i=0; i < arguments.length; i++ )
    importScriptPage(arguments[i] + '/code.js', 'dev');
}

importShared('ShowHide', 'CollapsibleEdittools');