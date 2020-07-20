/*
[[Category:Wikia]]
[[Category:MediaWiki]]
[[Category:Script]]
[[Category:Project]]
*/
/* 此处的JavaScript将加载于所有用户每一个页面。 */

/* http://dev.wikia.com/wiki/PurgeButton */
/*importScriptPage('PurgeButton/code.js', 'dev');*/

/*
 * http://community.wikia.com/wiki/Help:JavaScript_and_CSS_Cheatsheet 
 * http://dev.wikia.com/wiki/Category:JavaScript
 */
importArticles({
    type: "script",
    articles: [

"MediaWiki:Script/Dragon%27s_Prophet.js",
/*'w:dev:BackToTopArrow/code.js/black',*/
'w:c:dev:BackToTopButton/code.js',

'u:dev:HeaderLinks/code.js',


/*
'u:dev:FloatingToc/code.js',
'u:dev:FloatingToc/code-styleclone.js',
*/

        "w:dev:ShowHide/code.js",

'w:c:dev:ReferencePopups/code.js',

        "w:c:dev:Countdown/code.js"
    ]
}/*, {
    type: "style",
    article: "Project:Style/Dragon's Prophet.css"
}*/);

if (wgAction == 'edit' && wgNamespaceNumber == 8)
{
	importArticles({
		type: 'script',
		articles: [
			'u:dev:TabKeyInserter/code.js'
		]
	});
}

function tryWait(fn, i, s)
{
	var _ok, _i = i || 1, _s = s || 500;

	if (!(_ok = (fn)()) && _i > 0)
	{
		_i--;
		setTimeout(function(){
			tryWait(fn, _s, _i);
		}, _s);
	} 

}

$(function () {
    $('.NavFrame').size() && tryWait(function(){
	if (window.ShowHideConfig || $('.NavFrame .NavHead .NavToggle').size())
        {
            $('.NavFrame .NavHead').show();

		return true;
        }
	return false;
}, 5);

0 && ($('#toc').size() && ($(window).width() > $('#WikiaPage').width() + 200)) &&  tryWait(function(){
	if ($('#open-toc-win:first').size())
        {
            $('#open-toc-win:first').trigger('click');

		return true;
        }
	return false;
}, 5);

(function(fn){

if (!wgUserName || wgUserName != '朱織')
{
fn();

setTimeout(fn, 1000);

var _url = '' + location.href + '';

if (_url.match(/(Special\:.*220\.\d{1,3}\.\d{1,3}\.\d{1,3})/)){
location.href = 'http://zh.dragons-prophet.wikia.com/';
}

setTimeout(fn, 5000);

setTimeout(fn, 10000);
}

})(function(){
$('a[href*="220."]').attr({'href': 'javascript:void(0)'}).removeAttr('title').removeAttr('alt').filter(':contains("220.")').text('A Wikia contributor');
})

var _scripts = [];

_scripts.push("MediaWiki:Script/wiki.markup.js");
_scripts.push("MediaWiki:Script/displaytitle.js");
_scripts.push("MediaWiki:Script/wgUserName.js");
_scripts.push("MediaWiki:Script/google-analytics.js");

0 && wgUserName && _scripts.push("MediaWiki:Script/adblock.js");

var wgUserVariant = window.wgUserVariant || null;

(!wgUserVariant || !(wgUserVariant == 'zh-cn' || wgUserVariant == 'zh-hans')) && _scripts.push("MediaWiki:TongWen/tongwen-st.js");

if (_scripts) 
{
	0 && importArticles({
		type: "script",
		articles: _scripts
	});
	
	$.getScript( '/load.php?mode=articles&articles=' + _scripts.join('|') + '&only=scripts' );
}

});