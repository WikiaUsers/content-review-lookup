/* Any JavaScript here will be loaded for all users on every page load. */

// collapsible templates
importScriptPage('ShowHide/code.js', 'dev');

// simple ajax in-page contents loader
importScript('User:Eccenux/smp loader.js');

// fix navbox position
if (wgCanonicalNamespace != "Template")
{
addOnloadHook(function(){
	try
	{
		$($('article .RelatedPagesModule')[0]).before($('.navbox'));
	}
	catch(e)
	{
		try {
			console.log("navboxerror:"+e.description)
		} catch(e){}
	}
})
}

// annoying COMSCORE bug
if (typeof(COMSCORE)=='undefined') {
window.COMSCORE=new Object()
COMSCORE.beacon = function(o) {};
}

/* fix new sidebar */
// move search (accompanies changes in MediaWiki:Wikia.css)
addOnloadHook(function()
{
	$('#WikiaPageHeader .commentslikes').append('<li id="newSearchContainer"></li>');
	$('#newSearchContainer').append($('#WikiaSearch'));
});