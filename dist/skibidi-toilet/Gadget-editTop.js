var l10n = (function(){
	var $text = {
		'edit': {
			'en': 'edit',
                        'ar': 'يحرر',
			'de': 'Intro bearbeiten',
			'es': 'editar',
			'fr': 'modifier',
			'ja': '編集',
			'pt': 'editar',
			'pt-br': 'editar',
			'ru': 'править',
			'zh': '编辑',
			'zh-cn': '编辑'
		},
		'edit_source': {
			'en': 'edit source',
                        'ar': 'تحرير المصدر',
			'de': 'Intro-Quelltext bearbeiten',
			'es': 'ediar con \"Source Editing\"',
			'fr': 'modifier le wikicode',
			'ja': 'ソースを編集',
			'pt': 'editar fonte',
			'pt-br': 'editar fonte',
			'ru': 'править код',
			'zh': '编辑源代码',
			'zh-cn': '编辑源代码'
		},
		'title': {
			'en': 'Edit \"intro\" section',
                        'ar': 'تحرير قسم "\المقدمة\"',
			'de': 'Bearbeite den einführenden „Intro“-Abschnitt dieser Seite',
			'es': 'Editar \"Intro\" Sección',
			'fr': 'Modifier la section d\'« introduction »',
			'ja': 'イントロセクションを編集',
			'pt': 'editar a \"introdução\" desta página',
			'pt-br': 'Editar seção \"introdução\"',
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
		'<a href="/index.php?title=' + wgPageName + '&amp;action=edit&amp;section=0" title="' + l10n('title') + '">' + l10n('edit') + '</a>' +
    	'<span class="mw-editsection-bracket"> ]</span>' +
		'</span>';
    }
	
	$('#firstHeading').append(edittopHTML);
	
}