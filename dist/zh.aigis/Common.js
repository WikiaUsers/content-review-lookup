/* 此处的JavaScript将加载于所有用户每一个页面。 */

/*
[[Category:Wikia]]
[[Category:MediaWiki]]
[[Category:Script]]
[[Category:Project]]
*/
(function(){
 
var _scripts = [];
 
_scripts.push("MediaWiki:Script/Common.js");

if (_scripts) 
{
	0 && importArticles({
		type: "script",
		articles: _scripts
	});
 
	$.getScript( '/load.php?mode=articles&articles=' + _scripts.join('|') + '&only=scripts' );
}
 
})();