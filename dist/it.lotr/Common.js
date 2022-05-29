/* Il codice JavaScript inserito qui viene caricato da tutti gli utenti ad ogni visualizzazione di pagina. */

/* Configuration for LinkPreview (from Dev Wiki) */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

//default/missing images -> wiki logo
window.pPreview.noimage = 'https://static.wikia.nocookie.net/tolkien/images/e/e6/Site-logo.png/revision/latest?cb=20210603212958&format=original&path-prefix=it';
window.pPreview.defimage = 'https://static.wikia.nocookie.net/tolkien/images/e/e6/Site-logo.png/revision/latest?cb=20210603212958&format=original&path-prefix=it';
//ignore templates in preview
window.pPreview.RegExp.noinclude = ['.quote', ".notice", ".notice_message", ".notice_alert", ".notice_warning", ".toc", ".navbox_content", ".mw-headline", ".mw-editsection", ".caption"];
//ignore link to non-artice namespaces
window.pPreview.RegExp.ilinks = [ new RegExp('Template\:.*'), new RegExp('File\:.*'), new RegExp('Categoria\:.*'), new RegExp('Map\:.*'), new RegExp('Utente\:.*'), new RegExp('MediaWiki\:.*') ];
//fix for chronology pages
window.pPreview.wholepage = true;
//text length
window.pPreview.tlen = 500;

/* Automated Profile Template 
Script from dev wiki to automatically create new user pages
Needed to replace the welcome tool currently missing in UCP 
see: https://community.fandom.com/f/p/4400000000002024105  */
window.AutoCreateUserPagesConfig = {
    content: {
        2:'{{sub'+'st:MediaWiki:Welcome-user-page}}',
        3:false,
        1202:false
    },
    summary:'Creata pagina utente di benvenuto'
};

/* import the script only AFTER setting the configuration:
   avoid putting this import line in ImportJS!!  */
importArticles({ 
	type: 'script', 
	articles: [ 
		'u:dev:MediaWiki:AutoCreateUserPages.js', 
	]
});