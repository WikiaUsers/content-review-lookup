mw.loader.using( ['jquery.client', 'mediawiki.base', 'mediawiki.api', 'mediawiki.template.mustache'] ).then( function() {
	// Export global configuration
	window.interwikiInternational = ( window.interwikiInternational || {} );
	window.interwikiInternational.namespace = ( window.interwikiInternational.namespace || 'Interwiki' );
	window.interwikiInternational.namespaceId = ( window.interwikiInternational.namespaceId || 0 );
	window.interwikiInternational.mainPage = ( window.interwikiInternational.mainPage || 'Interlanguage_requests' );
	window.interwikiInternational.interwikiSchema = ( window.interwikiInternational.interwikiSchema || '{{bStart}}Interwiki request|{{from}}|{{to}}{{bEnd}}' );
	window.interwikiInternational.pageSchema = ( window.interwikiInternational.pageSchema ||
		'{{bStart}}Interwiki request header{{bEnd}}\n\n' +
		'{{interwikis}}\n\n' +
		'~~' + '~~'
	);

	const conf = window.interwikiInternational;

	const userName = mw.config.get( 'wgUserName' );
	if (
		mw.config.get( 'wgPageName' ) !== conf.mainPage ||
		window.interwikiInternationalLoaded ||
		!userName
	) {
		return;
	}
	window.interwikiInternationalLoaded = true;

	var preloads = 3;
	function preload() {
		if ( --preloads === 0 ) {
			window.dev.i18n.loadMessages( 'Interwikis_International' ).then( init );
		}
	}

	function init( i18n ) {
		const modal = new window.dev.modal.Modal( {
			title: i18n.msg( 'title' ).plain(),
			id: 'requestWindow',
			size: 'large',
			buttons: [
				{
					id: 'submitButton',
					text: i18n.msg( 'submitLabel' ).plain(),
					primary: true,
					event: 'submitForm'
				}
			],
			closeTitle: i18n.msg( 'closeLabel' ).plain(),
			content: {
				type: 'div',
				classes: ['formWrapper'],
				children: [
					{
						type: 'div',
						classes: ['formDescription'],
						html: i18n.msg( 'description' ).plain()
					},
					{
						type: 'form',
						classes: ['interwikiForm', 'fandomCCForm'],
						attr: {
							method: '',
							name: '',
							id: 'interwikiForm'
						},
						children: [
							{
								type: 'div',
								classes: ['formSection'],
								children: [
									{
										type: 'div',
										classes: ['sectionHeaderWrapper'],
										children: [
											{
												type: 'h3',
												classes: ['sectionHeader'],
												text: i18n.msg( 'nameLabel' ).plain()
											}
										]
									},
									{
										type: 'div',
										classes: ['sectionContent'],
										children: [
											{
												type: 'input',
												classes: ['formInput'],
												attr: {
													id: 'wikiname',
													required: '',
													type: 'text',
													placeholder: i18n.msg( 'namePlaceholder' ).plain()
												}
											}
										]
									}
								]
							},
							{
								type: 'div',
								classes: ['formSection'],
								children: [
									{
										type: 'div',
										classes: ['sectionHeaderWrapper'],
										children: [
											{
												type: 'h3',
												classes: ['sectionHeader'],
												text: i18n.msg( 'interwikisLabel' ).plain()
											}
										]
									},
									{
										type: 'div',
										classes: ['sectionContent'],
										children: [
											{
												type: 'textarea',
												classes: ['formInput'],
												attr: {
													id: 'interwikisLines',
													required: '',
													type: 'text',
													placeholder: i18n.msg( 'interwikisPlaceholder' ).plain()
												}
											}
										]
									}
								]
							},
							
						]
					}
				]
			},
			events: {
				submitForm: function () {
					function getVal( id ) {
						return $( '#interwikiForm' ).find( '#' + id ).val().trim();
					}

					const formValues = {
						wikiName: getVal( 'wikiname' ),
						lines: getVal( 'interwikisLines' )
					};
					
					if ( formValues.wikiName === '' ) {
						return mw.notify( i18n.msg( 'noNameError' ).plain(), {
							tag: 'interwiki',
							type: 'warn'
						} );
					}

					if ( formValues.lines === '' ) {
						return mw.notify( i18n.msg( 'noLinesError' ).plain(), {
							tag: 'interwiki',
							type: 'warn'
						} );
					}

					const splitLines = formValues.lines.split( '\n' );
					const interwikis = [];

					function shortUrl( url ) {
						if ( !url ) {
							return;
						}
						var sUrl = '';
				
						// Delete protocol and not main community url
						url = url.replace( /https?:\/{2}/g, '' ).replace( /\/wiki\/(.*)/g, '' );
				
						// Find parts: community name + language code
						var linkParts = /([\w.-]*)\.(?:wikia|fandom)?(?:\.(?:com|org)\/?)([\w-]{0,})/g.exec( url );
				
						// No parts found, maybe already short form, e.g. "fr.community"
						if ( !linkParts ) {
							linkParts = /([\w.-]*)/.exec(url);
						}
						if ( linkParts[2] ) {
							sUrl = linkParts[2] + '.';
						}
				
						sUrl += linkParts[1];
				
						return sUrl;
					}

					for ( var i = 0; i < splitLines.length; i++ ) {
						const line = splitLines[i];
						const items = line.trim().split( ' ' );
						const first = shortUrl( items.shift() );
						const last = shortUrl( items.pop() );

						if ( !first || !last ) {
							continue;
						}

						interwikis.push( [first, last] );
					}

					const linesCount = formValues.lines.split( '\n' ).length;
					const interwikisCount = interwikis.length;

					if ( linesCount !== interwikisCount ) {
						return mw.notify( i18n.msg( 'interwikisCountError', linesCount, interwikisCount ).plain(), {
							tag: 'interwiki',
							type: 'warn'
						} );
					}

					const interwikiLines = [];
					for ( var i = 0; i < interwikis.length; i++ ) {
						const interwiki = interwikis[i];
						const line = Mustache.render( conf.interwikiSchema, {
							bStart: '{{',
							bEnd: '}}',
							from: interwiki[0],
							to: interwiki[1]
						} );

						interwikiLines.push( line );
					}

					const wikitext = Mustache.render( conf.pageSchema, {
						bStart: '{{',
						bEnd: '}}',
						interwikis: interwikiLines.join( '\n' )
					} );
					const api = new mw.Api();

					modal.hide();

					api.get( {
						action: 'query',
						list: 'allpages',
						apnamespace: conf.namespaceId,
						apprefix: formValues.wikiName,
						aplimit: 'max'
					} ).done( function( data ) {
						const suffixRE = /.*\((\d+)\)/;

						var suffix = '';
						var highestIWRequest = 0;

						if ( data.query ) {
							if ( data.query.allpages.length > 0 ) {
								highestIWRequest = 1;
							}

							for ( var p in data.query.allpages ) {
								if ( data.query.allpages[p].title === undefined ) {
									continue;
								}

								const match = data.query.allpages[p].title.match( suffixRE );

								if ( !match ) {
									continue;
								}

								if ( parseInt( match[1] ) > highestIWRequest ) {
									highestIWRequest = parseInt( match[1] );
								}
							}

							if ( highestIWRequest > 0 ) {
								suffix = ' (' + ( highestIWRequest + 1 ) + ')';
							}
						}

						const pageName =  conf.namespace + ':' + formValues.wikiName + suffix;

						api.postWithEditToken( {
							action: 'edit',
							title: pageName,
							text: wikitext,
							createonly: true
						} ).done( function( data ) {
							if ( data.edit && data.edit.warnings ) {
								return mw.notify( data.edit.warnings.main['*'], {
									tag: 'interwiki',
									type: 'error'
								} );
							}

							location.href = mw.util.getUrl( pageName );
						} ).fail( function () {
							mw.notify( i18n.msg( 'error' ).plain(), {
								tag: 'interwiki',
								type: 'error'
							} );
						} );
					}).fail( function () {
						mw.notify( i18n.msg( 'error' ).plain(), {
							tag: 'interwiki',
							type: 'error'
						} );
					} );
				}
			}
		} );

		modal.create();
		
		$( '#interwiki-form' )
			.attr( 'class', 'wds-button btn-large' )
			.text( i18n.msg( 'buttonLabel' ).plain() )
			.wrap( $( '<div>' ).css( 'text-align', 'center' ) )
			.css( 'cursor', 'pointer' )
			.on( 'click', function() {
				modal.show();
			} );
	}

	importArticles(
		{
			type: 'script',
			articles: [
				'u:dev:MediaWiki:Modal.js',
				'u:dev:MediaWiki:UI-js/code.js',
				'u:dev:MediaWiki:I18n-js/code.js'
			]
		},
		{
			type: 'styles',
			articles: [
				'u:dev:MediaWiki:International_Requests.css'
			]
		}
	);

	mw.hook( 'dev.i18n' ).add( preload );
	mw.hook( 'dev.modal' ).add( preload );
	mw.hook( 'dev.ui' ).add( preload );
} );