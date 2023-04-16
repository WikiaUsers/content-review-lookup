mw.loader.using( 'mediawiki.api', function () {
	
	// Uruchamianie skryptu tylko na stronie Specjalna:Moja strona/patrol
	const patrolPagename='patrol';
		if ( !(mw.config.get('wgNamespaceNumber')==2 && mw.config.get('wgTitle') == mw.config.get('wgUserName') + '/' + patrolPagename) ) {
			return;
	}
	
	// Usuwamy noarticletext, żeby było czytelnie
	const noarticletext=document.getElementsByClassName('noarticletext');
		Array.from( noarticletext ).forEach( function ( i ) {
			i.remove();
	});

	const autopatrolField=document.getElementById('mw-content-text');

	const mainField=document.createElement('textarea');
	mainField.setAttribute('id', 'main-field');
	mainField.setAttribute('style', 'width:100%');
	autopatrolField.appendChild(mainField);

	const fieldButton=document.createElement('button');
	fieldButton.setAttribute('id', 'field-button');
	fieldButton.setAttribute('class', 'wds-button');
	fieldButton.textContent="Patroluj";
	autopatrolField.appendChild(fieldButton);

	/* Zmienna weryfikująca zakończenie */
	var end=false;
	/* Funkcja sprawdzania */
	const api=new mw.Api();
	
	function autoPatrol () {
		var pages=mainField.value.split('\n');
		
		pages.forEach( function (page) {
			var currentPage=page;
			api.get({
				action: "query",
				format: "json",
				prop: "revisions",
				titles: page,
				formatversion: "2",
				rvlimit: "5000"
			}).done( function ( allrevisionsresult ) {
				allrevisionsresult.query.pages[0].revisions.forEach( function (rev) {
					api.get({
						"action": "query",
						"format": "json",
						"meta": "tokens",
						"formatversion": "2",
						"type": "patrol"
					}).done( function (tokens) {
						api.post({
							action: "patrol",
							format: "json",
							revid: rev.revid,
							token: tokens.query.tokens.patroltoken,
							formatversion: "2"
						}).done( function () {
							var index = pages.indexOf(currentPage);
							var x = pages.splice(index, 1);
							if (pages.length==0 && !end) {
								end=true
								alert("Gotowe! Wszystkie strony zostały spatrolowane.")
								
								
								console.log('Gotowe!');
							}
						});
					});
				});
			});
		});
	}

	/* Event Listener */
	fieldButton.addEventListener('click', autoPatrol);
});