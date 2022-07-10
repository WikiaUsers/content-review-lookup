;(function($, mw) {
	'use strict';
	const config = mw.config.get([
		'wgPageName',
		'wgScriptPath',
		'wgArticlePath'
	]);
	const btnData = document.getElementsByClassName('enable-extra-edit-button')[0];
	var value = 0;
	var editPage = '';
	var sections;
	
	function updateLinks() {
		// Ziellink der Bearbeitenschaltfläche ändern
		document.getElementById('ca-edit').href = config.wgScriptPath + '/index.php?title=' + editPage + '&action=edit&section=' + sections[value].index;
		
		// Abschnitts-ID und Artikelname ersetzen
		if ( $( '.mw-editsection a' ).length ) {
			$( '.mw-editsection a' ).each( function(s) {
				const url = new URL(this.href);
				
				// Abschnitt verändern
				const sec = Number(url.searchParams.get('section').replace('T-',''));
				url.searchParams.set('section', sections[value + sec].index);

				// URL verändern
				url.pathname = config.wgArticlePath.replace('$1', sections[value + sec].fromtitle);

				// Linkdaten ersetzen
				this.href = url.href;
				this.title = this.title + sections[value + sec].line;
			});
		}
	}
		
	if ( btnData ) {
		
		// Pfad zur eingebundenen Seite
		editPage = btnData.innerHTML;
		
		// Quelltext bearbeiten Schaltfläche
		const edittopHTML = document.createElement('a');
		edittopHTML.classList = 'wds-button wds-is-text page-header__action-button has-label';
		edittopHTML.href = config.wgScriptPath + '/index.php?title=' + config.wgPageName + '&action=edit';
		edittopHTML.title = 'Diese Seite bearbeiten';
		edittopHTML.innerHTML = 'Quelltext bearbeiten';
		document.getElementById('p-views').prepend( edittopHTML );
		
		// Abschnittsdaten abfragen
		$.getJSON( config.wgScriptPath + '/api.php', {
			action: 'parse',
			page: editPage,
			prop: 'sections',
			format: 'json'
		} ).done( function( data ) {
			if ( data.parse.sections ) {
				sections = data.parse.sections;
				for ( var i = 0; i < sections.length; i++ ) {
					if ( sections[i].anchor.localeCompare( config.wgPageName ) === 0 ) {
						value = i;
						updateLinks();
						break;
					}
				}
			}
		} );
	}
})(window.jQuery, window.mediaWiki);