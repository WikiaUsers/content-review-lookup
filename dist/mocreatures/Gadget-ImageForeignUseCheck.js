// Please use https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript for development.
( () => {
	'use strict';

	const i18n = {
			listForeignUses: 'List foreign uses',
			msgForeignUses: 'Foreign uses',
			msgFileLink: 'file page',
			msgNoUses: 'No foreign uses of this file were detected.'
		},
		config = mw.config.get( [
			'wgScriptPath',
			'wgPageName',
			'wgTitle'
		] ),
		langs = [
			[ 'Deutsch', 'de' ],
			[ 'Español', 'es' ]
			[ 'Polski', 'pl' ]
			[ 'Русский', 'ru' ]
		],
		filelinks = document.querySelector( '#filelinks' ),
		ul = document.createElement( 'ul' ),
		li = ul.appendChild( document.createElement( 'li' ) ),
		a = li.appendChild( document.createElement( 'a' ) ),
		interUses = document.createElement( 'ul' ),
		interUsesH2 = document.createElement( 'h2' ),
		interUsesH3 = document.createElement( 'h3' );
	a.classList.add( 'foreignLink' );
	a.setAttribute( 'href', '#ddd' );
	a.textContent = i18n.listForeignUses;
	interUsesH2.textContent = i18n.msgForeignUses;
	interUsesH2.style.marginLeft = '-22px';
	interUsesH3.textContent = i18n.msgNoUses;

	filelinks.parentNode.insertBefore( ul, filelinks.nextSibling );

	function getUsage( lang ) {
		const currentLangName = lang[ 0 ],
			currentLangCode = lang[ 1 ];
		return fetch( `${ config.wgScriptPath }/${ lang[ 1 ] }/api.php?${ new URLSearchParams( {
			action: 'query',
			format: 'json',
			origin: '*',
			list: 'imageusage',
			formatversion: 2,
			iutitle: config.wgPageName
		} ) }`, {
			method: 'GET',
			credentials: 'omit'
		} ).then( ( response ) => response.json() ).then( ( data ) => {
			if ( data.query.imageusage.length > 0 ) {
				interUsesH3.remove();

				const urlImage = `${ config.wgScriptPath }${ currentLangCode }/wiki/${ config.wgPageName }`,
					resultH3 = interUses.appendChild( document.createElement( 'h3' ) ),
					resultSpan = document.createElement( 'span' ),
					resultLink = resultSpan.appendChild( document.createElement( 'a' ) );

				resultLink.href = urlImage;
				resultLink.textContent = i18n.msgFileLink;

				resultSpan.style.fontSize = '85%';
				resultSpan.prepend( document.createTextNode( ' (' ) );
				resultSpan.append( document.createTextNode( ')' ) );

				resultH3.style.marginLeft = '-20px';
				resultH3.textContent = currentLangName;
				resultH3.append( resultSpan );

				data.query.imageusage.forEach( ( value ) => {
					const urlUse = `${ config.wgScriptPath }${ lang }/wiki/${ value.title }`,
						resultLi = interUses.appendChild( document.createElement( 'li' ) ),
						resultA = resultLi.appendChild( document.createElement( 'a' ) );

					resultA.href = urlUse;
					resultA.textContent = value.title;
				} );
			}
		} );
	}

	function getImages( lang ) {
		return fetch( `${ config.wgScriptPath }/${ lang[ 1 ] }/api.php?${ new URLSearchParams( {
			action: 'query',
			format: 'json',
			origin: '*',
			list: 'allimages',
			formatversion: 2,
			aifrom: config.wgTitle,
			aiprop: '',
			ailimit: '1'
		} ) }`, {
			method: 'GET',
			credentials: 'omit'
		} ).then( ( response ) => response.json() ).then( ( data ) => {
			const image = data.query.allimages[ 0 ];
			if ( image.name !== config.wgTitle.replace( / /g, '_' ) ) {
				return getUsage( lang );
			}
		} );
	}

	a.addEventListener( 'click', ( e ) => {
		e.preventDefault();

		const linksToImage = document.querySelector( 'div[id$="linkstoimage"]' ),
			promises = [];

		if ( linksToImage ) {
			interUses.innerHTML = '';
			interUses.append( interUsesH2, interUsesH3 );
			linksToImage.append( interUses );

			langs.forEach( ( lang ) => promises.push( getImages( lang ) ) );

			Promise.all( promises ).then( () => interUses.scrollIntoView( true ) );
		}
	} );

} )();