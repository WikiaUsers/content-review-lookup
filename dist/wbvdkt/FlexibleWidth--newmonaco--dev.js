$(function () {
	/* ************************* */
	/* *** RADIATION SHELTER *** */
	/* ************************* */
	$('body').append('<div id="nm-shelter" style="display: none;"><div id="nm-shelter-rail"><div id="nm-shelter-search"></div><div id="nm-shelter-activity"></div></div></div>');
	$('#WikiHeader nav > ul').attr('id','nm-nav-menuslist').appendTo('#nm-shelter');
	$('#WikiaArticle').appendTo('#nm-shelter');
	$('#WikiaPageHeader nav.wikia-menu-button').appendTo('#nm-shelter');
	$('#WikiaPageHeader ul li.comments a').attr('id','nm-talklink').appendTo('#nm-shelter');
	$('.ns-talk #WikiaPageHeader [accesskey="c"]').attr('id','nm-contentlink').appendTo('#nm-shelter')
	$('#WikiaHeader').after('<!-- ************************ -->\n<!-- *** BODY BEGINS HERE *** -->\n<!-- ************************ -->\n<!-- body -->\n<div id="nm-body"></div>\n<!-- /body -->\n<!-- ********************** -->\n<!-- *** BODY ENDS HERE *** -->\n<!-- ********************** -->');
	$('[data-id="logout"]').attr('id','nm-personal-logoutlink').removeAttr('data-id').appendTo('#nm-shelter');
	$('form#WikiaSearch').appendTo('#nm-shelter-search');
	$('.WikiaActivityModule ul').attr('id','nm-activity-list').appendTo('#nm-shelter-activity');
	$('#WikiaArticleCategories').appendTo('#nm-shelter').attr('id','nm-categories-oasis');
	$('#WikiaArticle .RelatedPagesModule').remove();
	$('#WikiaArticle div.printfooter').remove();
	$('#nm-shelter').append('<div id="nm-editstuff"></div>');
	$('#EditPageEditor input[type="hidden"]').appendTo('#nm-editstuff');
	$('#wpTextbox1').append($('#csWikitext').html());
	$('.editpage-editarea').appendTo('#nm-editstuff');
	$('#wpMinoredit').appendTo('#nm-editstuff');
	$('#wpSummary').appendTo('#nm-editstuff');
	$('#wpPreview').appendTo('#nm-editstuff');
	$('#wpDiff').appendTo('#nm-editstuff');
	$('#wpSave').appendTo('#nm-editstuff');
	$('div.mw-editTools').appendTo('#nm-editstuff');
	$('div.templatesUsed').appendTo('#nm-editstuff');
 
 	/* ************************************ */
	/* *** NUKE (it's super effective!) *** */
	/* ************************************ */
	$('#WikiaHeader').remove();
	$('#WikiaPage').remove();
 
	/* ****************** */
	/* *** REBUILDING *** */
	/* ****************** */

	/* Get CSS */
	function importCSS(url){
		var tag= document.createElement('link');
		tag.type='text/css';
		tag.href= url;
		tag.rel='stylesheet';
		document.body.appendChild(tag);
	};
	importCSS('http://wbvdkt.wikia.com/wiki/MediaWiki:FlexibleWidth/newmonaco/dev.css?action=raw&ctype=text/css');
 
	/* Creating page containers */
	$('#nm-body').html('<!-- head -->\n<div id="nm-head"></div>\n<!-- /head -->\n<!-- content -->\n<div id="nm-content">\n<!-- sidebar -->\n<div id="nm-sidebar"></div>\n<!-- /sidebar -->\n<!-- main -->\n<div id="nm-main"></div>\n<!-- /main --></div>\n<!-- /content -->');
 
	/* Content of nm-head */
	$('#nm-head').html('<div id="nm-wikiaheader"></div><div id="nm-personal"></div>');
	$('#nm-wikiaheader').html('<a href="http://wikia.com" id="nm-wikialink">Wikia</a>');
	$('#nm-personal').html('<a href="/wiki/User:' + wgUserName + '" id="nm-personal-userlink">' + wgUserName + '</a><a href="/wiki/User_talk:' + wgUserName + '">Talk</a><a href="/wiki/Special:Preferences">Settings</a><a href="/wiki/Special:Contributions/' + wgUserName + '">Contribs</a>');
	$('#nm-personal-logoutlink').appendTo('#nm-personal');
 
	/* Content of nm-sidebar */
	$('#nm-sidebar').html('<div id="nm-avatar"></div><div id="nm-sidebarmodules"><div id="nm-sbm-nav"></div><div id="nm-sbm-activity"></div></div>');
	$('#nm-avatar').html('<a href="/wiki/WBVDKT_Wiki"><img src="https://images.wikia.nocookie.net/__cb20091218201144/wbvdkt/images/8/8f/Wiki-Preview.png"/></a>');
	$('form#WikiaSearch').appendTo('#nm-sbm-nav');
	$('#nm-sbm-nav').append('<div id="nm-nav-menus"></div><div id="nm-nav-links"></div>');
	$('#nm-nav-menuslist').appendTo('#nm-nav-menus');
	$('#nm-nav-menuslist ul.subnav').attr('style','display: none;');
	$('#nm-nav-menuslist li a img').attr('src','https://images.wikia.nocookie.net/wbvdkt/images/0/04/Wiki-23_rotated_chevron.png').attr('height','9').attr('width','6');
	$('#nm-nav-links').html('<table><tbody><tr><td><a href="/wiki/Special:RecentChanges">Recent changes</a><a href="/wiki/Special:WhatLinksHere/HERE">What links here</a><a href="/wiki/WBVDKT_Wiki:FlexibleWidth">Flexible width</a></td><td><a href="/wiki/Special:Random">Random page</a><a href="/wiki/Special:SpecialPages">Special pages</a><a href="/wiki/Special:LongPages">Longest pages</a></td></tr></tbody></table>');
	$('#nm-activity-list').appendTo('#nm-sbm-activity');
	$('#nm-sbm-activity').prepend('<div id="nm-activity-title"><a href="/wiki/Special:RecentChanges">Recent changes</a></div>');
 
	/* Content of nm-main */
	$('#nm-main').append('<div id="nm-interaction"></div><div id="nm-article"><div id="nm-article-head"></div><div id="nm-article-body"></div></div><div id="nm-categories"></div>');
	$('#nm-article-head').html('<h1>' + wgTitle + '</h1>');
	$('#WikiaArticle').appendTo('#nm-article-body');
	$('#WikiaArticle *:first').unwrap();
	$('#nm-categories-oasis').appendTo('#nm-categories');
	/* Interaction */
	$('#nm-interaction').html('<div id="nm-actionbuttons"></div><div id="nm-contenttalk"></div>')
	$('.wikia-menu-button a').appendTo('#nm-actionbuttons');
	$('#nm-actionbuttons a[data-id="edit"]').html('Edit');
	$('#nm-actionbuttons a[data-id="addtopic"]').html('Add topic');
	$('#nm-talklink').appendTo('#nm-contenttalk').html('Talk').before('<a href="/wiki/' + wgPageName +'" id="nm-contentlink-added" class="nm-linkon">Content</a>');
	$('#nm-contentlink').appendTo('#nm-contenttalk').html('Content').after('<a href="/wiki/' + wgPageName +'" id="nm-talklink-added" class="nm-linkon">Talk</a>');

	/* Edit stuff */
	$('.editor #nm-article-body').html('<form id="editform" name="editform" method="post" action="/wiki/' + wgPageName + '?action=submit" enctype="multipart/form-data"><section id="EditPage" class="mode-source"><div id="EditPageMain"><div id="EditPageEditorWrapper" class="noPreloads" data-space-type="editor"></div></div></section></form>')
	$('#nm-editstuff input[type="hidden"]').appendTo('#EditPageEditorWrapper');
	$('#wpMinoredit').appendTo('#EditPageEditorWrapper');
	$('#wpSummary').appendTo('#EditPageEditorWrapper');
	$('#wpPreview').appendTo('#EditPageEditorWrapper').html('Preview');
	$('#wpDiff').appendTo('#EditPageEditorWrapper');
	$('#wpSave').appendTo('#EditPageEditorWrapper');
	$('div.mw-editTools').appendTo('#EditPageEditorWrapper');
	$('div.templatesUsed').appendTo('#EditPageEditorWrapper');
	$('#wpMinoredit').after('<label for="wpMinoredit">Minor edit</label>');
	$('.editpage-editarea').insertBefore('#wpMinoredit');
});
 
/* If the page is not an article, prepend the namespace with a colon to the page head */
if ("" + wgCanonicalNamespace + "" == "") { }
else 
{ 
$(function () {
	$('#nm-article-head h1').prepend('' + wgCanonicalNamespace + ':');
});
}