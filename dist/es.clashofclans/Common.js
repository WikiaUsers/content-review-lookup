if (wgPageName === 'Wiki_Clash_of_Clans_en_Español') {
  importScriptPage('MediaWiki:Portada.js');
};
QuickCommentsreason = 'Añadir comentarios basura';
QuickCommentsdeletereason = 'spam';
QuickCommentsduration = '3 days';


importArticles({
	type: 'script',
	articles: [
		'u:dev:ExtendedNavigation/code.js',
		'u:dev:QuickComments/code.js',
		'w:c:clashofclans:MediaWiki:Common.js/ModeToggle.js'
		]
});