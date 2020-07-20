/*
 * Adds a button next to the regular edit button which acts as a google "translate" button
 * Originally written by Grunny (http://www.wikia.com/wiki/User:Grunny)
 * Forked from dev:EditIntroButton/code.js by Qoushik
 *
 */
if ( wgNamespaceNumber != -1 && !window.TranslateButtonLoaded ) {
	$( addTranslateButton );
}

var TranslateButtonLoaded = true;

function addTranslateButton () {
	var theText = 'Translate';

	switch( skin ) {
		case 'answers':
		case 'awesome':
		case 'monaco_old':
		case 'monaco':
			$('#page_controls > #control_edit').after('<li><img src="/skins/common/blank.gif" class="sprite edit" /><a id="ca-edit-0" href="http://translate.google.com/translate?hl='+ mw.config.get("wgUserLanguage")+'&sl='+mw.config.get("wgPageContentLanguage")+'&u='+location.href+'" rel="nofollow" title="'+theText+'">'+ theText + '</a></li>');
			break;


		case 'uncyclopedia':
		case 'wowwiki':
		case 'lostbook':
		case 'monobook':
			$('#p-cactions > .pBody > ul > #ca-edit').after('<li id="ca-edit-0"><a href="http://translate.google.com/translate?hl='+ mw.config.get("wgUserLanguage")+'&sl='+mw.config.get("wgPageContentLanguage")+'&u='+location.href+'" rel="nofollow" title="'+theText+'">'+ theText + '</a></li>');
			break;

		case 'oasis':
		case 'wikia':
			$(( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) && $( '.UserProfileActionButton' ).length ? '.UserProfileActionButton  > .wikia-menu-button > ul' : '.page-header__contribution-buttons .wds-list').append('<li><a href="http://translate.google.com/translate?hl='+ mw.config.get("wgUserLanguage")+'&sl='+mw.config.get("wgPageContentLanguage")+'&u='+location.href+'" rel="nofollow" title="'+theText+'">'+ theText + '</a></li>');
			break;

	}
}