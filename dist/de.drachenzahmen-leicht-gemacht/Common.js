// Imports in MediaWiki:ImportJS

//===================//
//== Discord-Modul ==//
//===================//
if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord-Server",
            id: "244882517134409729",
            'logged-in': false
        }
    };
}

//==============//
//== USERNAME ==//
//==============//
var wgUserName = mw.config.get('wgUserName');
if (wgUserName !== null) {
	$('.insertusername').html(wgUserName);
}

//=================================//
// Indikator neben dem Edit-Button //
//=================================//
function indicatorBesideEdit() {
    if ( $( '#article-indicator' ).length && $( '.page-header__actions' ).length ) {
      $( '.page-header__actions' ).first().prepend( $( '#article-indicator' ).show() );
    }
}
indicatorBesideEdit();

//=========================================//
// https://dev.fandom.com/wiki/LinkPreview //
//=========================================//
function setLinkPreview() {
	window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
	window.pPreview.dock = '#mw-content-text';
	window.pPreview.RegExp.noinclude = ['.nolinkpreview', '#toc', '.mw-headline', '.reference', '.mw-references-wrap', 'table.InfoVorlage', '.InfoVorlage', '.Folgenkasten', 'li', 'pre'];
	window.pPreview.defimage = 'https://static.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/c/c7/Suchbalken.png/revision/latest?cb=20150621074655&format=original&path-prefix=de';
	window.pPreview.noimage = 'https://static.wikia.nocookie.net/midnachans/images/c/c8/Kein_Bild.png/revision/latest?cb=20240207193715&format=original&path-prefix=de';
}
setLinkPreview();