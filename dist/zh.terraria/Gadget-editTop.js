var l10n = (function(){
	var $text = {
		'edit': {
			'en': 'edit',
			'de': 'Intro bearbeiten',
			'fr': 'modifier',
			'pt': 'editar',
			'ru': 'править',
			'zh': '编辑',
			'zh-cn': '编辑'
		},
		'edit_source': {
			'en': 'edit source',
			'de': 'Intro-Quelltext bearbeiten',
			'fr': 'modifier le wikicode',
			'pt': 'editar fonte',
			'ru': 'править код',
			'zh': '编辑源代码',
			'zh-cn': '编辑源代码'
		},
		'title': {
			'en': 'Edit \"intro\" section',
			'de': 'Bearbeite den einführenden „Intro“-Abschnitt dieser Seite',
			'fr': 'Modifier la section d\'« introduction »',
			'pt': 'editar a \"introdução\" desta página',
			'ru': 'Править «введение» этой страницы',
			'zh': '编辑“导言”章节',
			'zh-cn': '编辑“导言”章节'
		}
	}
	var $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
	return function(key){
		return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
	}
})();

var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );
var wgPageName = mw.config.get( 'wgPageName' );
var edittopHTML;

if (wgNamespaceNumber > -1) {
	
	// Visual Editor version (two edit links)
	if (document.getElementById('ca-ve-edit')) { // only if the preference to use it is set (an "edit source" nav tab exists)
		edittopHTML = '<span class="mw-editsection">' +
    	'<span class="mw-editsection-bracket">[ </span>' +
    	'<a href="?veaction=edit&amp;section=0" title="' + l10n('title') + '">' + l10n('edit') + '</a>' +
    	'<span class="mw-editsection-bracket"> | </span>' +
    	'<a href="?action=edit&amp;section=0" title="' + l10n('title') + '">' + l10n('edit_source') + '</a>' +
    	'<span class="mw-editsection-bracket"> ]</span>' +
		'</span>';
	}
	
    // regular version (one edit link)
    else {
    	edittopHTML = '<span class="mw-editsection">' +
    	'<span class="mw-editsection-bracket">[ </span>' +
		'<a href="?action=edit&amp;section=0" title="' + l10n('title') + '">' + l10n('edit') + '</a>' +
    	'<span class="mw-editsection-bracket"> ]</span>' +
		'</span>';
    }
	
	$('#firstHeading').append(edittopHTML);
	
}