/*
[[Category:Wikia]]
[[Category:MediaWiki]]
[[Category:Script]]
[[Category:Project]]
*/
(function(){

var _scripts    = [];
var __styles    = [];

var _script2    = [];
 
_scripts.push("MediaWiki:Script/wiki.markup.js");
_scripts.push("MediaWiki:Script/displaytitle.js");
_scripts.push("MediaWiki:Script/wgUserName.js");
_scripts.push("MediaWiki:Script/google-analytics.js");
_scripts.push("MediaWiki:Script/Video.js");

/* [[w:c:dev:Tooltips]] */
_scripts.push("w:c:dev:Tooltips/code.js");
__styles.push("w:c:dev:Tooltips/code.css");

_scripts.push("w:c:dev:ReferencePopups/code.js");
_scripts.push("w:c:dev:ReferencePopups/custom.js");

_scripts.push("MediaWiki:Script/jquery-handler-toolkit.js");
_scripts.push("MediaWiki:Script/wikia.adEngine.slot.exitstitial.hack.js");

0 && wgUserName && _scripts.push("MediaWiki:Script/adblock.js");

_scripts.push("MediaWiki:Script/WikiNav.js");
_scripts.push("MediaWiki:Script/jquery.makeCollapsible.js");
_scripts.push("MediaWiki:Script/wikia.Lightbox.hack.js");
_scripts.push("MediaWiki:Script/wikia.globalnavigation.js");
_scripts.push("MediaWiki:Script/FloatingToc.js");

_scripts.push('u:dev:TabKeyInserter/code.js');

/*
_scripts.push("MediaWiki:Script/staminaSlider.js");
*/

var wgUserVariant = window.wgUserVariant || null;
 
0 && (!wgUserVariant || !(wgUserVariant == 'zh-cn' || wgUserVariant == 'zh-hans')) && _scripts.push("MediaWiki:TongWen/tongwen-st.js");
 
if (_scripts) 
{
    switch (2)
    {
        case 1:
            importArticles({
        		type: "script",
        		articles: _scripts
        	});
        	
        	break;
        case 2:
        	for (var i in _scripts)
        	{
        	    importArticle({
        		    type: "script",
            		article: _scripts[i]
            	});
        	}
            
            break;
        default:
            $.getScript( '/load.php?mode=articles&articles=' + _scripts.join('|') + '&only=scripts' );
        
            break;
    }
}

if (__styles) 
{
	importArticles({
		type: "style",
		articles: __styles
	});
}

if (_script2) 
{
    $.each(_script2, function(i, v){
        $.getScript(v);
    });
}

})();