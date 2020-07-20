/**
 * 18:34, 13th de Maio, 2015 (UTC)
 * http://pt.naruto-project.wikia.com/wiki/MediaWiki:Common.js
 * Está é a central de códigos JavaScript da Wiki. Qualquer código colocado aqui vai:
 * executa em todas as páginas para cada usuário (conectado ou não) em cada skin (Oasis ou 
 * Monobook)
 */
 
(function (window, $, mw) {
	"use strict";
 
	// Scripts de Carregamento
	// scriptList são scripts para carregar em todos os lugares
	// pageScriptList são scripts que precisam de apenas algumas páginas. 
	var scriptList = [],
		pageScriptList = [];
 
					/* Scripts para serem carregados em todos os lugares */
 
		// Quick License é usada para colocar a licença já dentro do ==Arquivo==
	pageScriptList.push('MediaWiki:Common.js/quicklicense.js');
 
 
	// Configuração AjaxRC
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Special:RecentChanges",
		"Special:Watchlist",
		"Special:Log",
		"Special:Contributions",
		"Special:NewFiles",
		"Special:NewPages",
		"Special:ListFiles",
		"Special:WikiActivity"
	);
	window.AjaxRCRefreshText = 'Auto-Refresh';
	window.AjaxRCRefreshHoverText = 'Automatically refresh every 60secs';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
	scriptList.push('u:dev:AjaxRC/code.js');
 
	// ArchiveTool
	window.archiveListTemplate = 'ArchiveList';
	window.archivePageTemplate = 'ArchivePage';
	scriptList.push('u:dev:ArchiveTool/code.js');
 
 
/* Etiqueta personalizada para usuários */
function addMastheadTags() {
  var rights = {};
 
rights["Rafael Mendes"] = ["Fundador", "Burocrata"];
rights["Shodai Tsuchi"] = ["Coder",];
 
 if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
}
 
    $(function() {
     if ($('#UserProfileMasthead')) {
       addMastheadTags();
      }
    });
 
 
	// Reference Popups, like on Wikipedia
	scriptList.push('u:dev:ReferencePopups/code.js');
 
					/* Páginas com scripts especificos */
 
	// Custom Special:[Multiple]Upload UI
	if (({Upload: 1, MultipleUpload: 1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		pageScriptList.push(
			'MediaWiki:Common.js/FairUseUpload.js',
			'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
		);
	}
 
	// Botões de Edição Customizados
	if (mw.toolbar) {
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
			'Redirecionamento',
			'#REDIRECIONAMENTO [[',
			']]',
			'Inserir o texto',
			'mw-editbutton-redirect'
		);
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
			'Adicionar o caractere ō',
			'ō',
			'',
			'',
			'mw-editbutton-macron-o'
		);
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
			'Adicionar o caractere ū',
			'ū',
			'',
			'',
			'mw-editbutton-macron-u'
		);
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
			'Adicionar o capítulo referente',
			'<ref>',
			'</ref>',
			'\'\'Naruto\'\' capítulo 0, página 0',
			'mw-editbutton-ref'
 
		);
 
		mw.toolbar.addButton(
			'http://i.imgur.com/iWxuYqU.png',
			'Adicionar a predefinição de Obras',
			'{{',
			'}}',
			'Em Obras',
			'mw-editbutton-construction'
		);
 
		mw.toolbar.addButton(
			'http://i.imgur.com/JfYFEAH.png',
			'Adicionar a predefinição Wikipedia',
			'{{',
			'}}',
			'Wikipedia',
			'mw-editbutton-wikipedia'
		);
	}
 
	// HOOK: Verbatim imports embedded on particular pages.
	if ($.isArray(window.pageNeededScripts)) {
		pageScriptList.push.apply(pageScriptList, window.pageNeededScripts);
		try {
			delete window.pageNeededScripts;
		} catch (e) {
			window.pageNeededScripts = null;
		} // IE8 sucks.
	}
 
	// Import all scripts in bulk (and minified)
	window.importArticles({
		type: 'script',
		articles: scriptList
	}, {
		type: 'script',
		articles: pageScriptList
	});
}(window, jQuery, mediaWiki));