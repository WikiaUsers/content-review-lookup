/**
 * Script installer script which helps find and search for scripts to install on
 * local wikis.
 */

$( function() {
	// register the hook before the import to avoid race conditions
	mw.hook( 'dev.i18n' ).add( function( i18n ) {
		i18n.loadMessages( 'ScriptInstaller' ).done( function( i18n ) {
			mw.loader.using([ 'mediawiki.api', 'mediawiki.ForeignApi', 'mediawiki.jqueryMsg' ], function() {
				if ( mw.config.get('wgNamespaceNumber') < 0 ) {
					if ( ( mw.config.get("wgCanonicalSpecialPageName") ).toLowerCase() == 'blankpage' && mw.config.get("wgPageName").split('/')[1].toLowerCase() == 'scriptinstaller' ) {
						if ( window.scriptInstallerLoaded ) { // double load protection
							return;
						} else {
							window.scriptInstallerLoaded = true;
						}
						let url = new URL( window.location );
						const ON_DEV_WIKI = url.host == 'dev.fandom.com';
						// full form
						// we can remove or disable fields later
						const form = `
	<form id="scriptInstaller">
	<fieldset class="cdx-field">
	<legend class="cdx-label">
	<span class="cdx-label__label">
	<span class="cdx-label__label__text">${i18n.msg('wiki-info').escape()}</span>
	</span>
	</legend>
	<div class="cdx-label">
	<label class="cdx-label__label" for="scriptInstaller-wiki">
	<span class="cdx-label__label__text">${i18n.msg('wiki-name').escape()}</span>
	</label>
	</div>
	<div class="cdx-field__control">
	<div class="cdx-text-input">
	<input type="text" class="cdx-text-input__input" style="width:100%;" id="scriptInstaller-wiki" placeholder="${i18n.msg('wiki-prefix').escape()}">
	</div>
	</div>
	<div class="cdx-label">
	<label class="cdx-label__label" for="scriptInstaller-wiki-lang">
	<span class="cdx-label__label__text">${i18n.msg('wiki-lang').escape()}</span>
	</label>
	</div>
	<div class="cdx-field__control">
	<div class="cdx-text-input">
	<input type="text" class="cdx-text-input__input" style="width:100%;" id="scriptInstaller-wiki-lang" placeholder="${i18n.msg('wiki-lang-code').escape()}">
	</div>
	</div>
	<button class="cdx-button cdx-button--action-default" id="scriptInstaller-setWiki">${i18n.msg('set-wiki').escape()}</button>
	</fieldset>
	<fieldset class="cdx-field" id="scriptInstaller-installedScripts">
	<legend class="cdx-label">
	<span class="cdx-label__label">
	<span class="cdx-label__label__text">${i18n.msg('installed-scripts').escape()}</span>
	</span>
	</legend>
	<table class="wikitable" id="scriptInstaller-table">
	<tr>
	<th>${i18n.msg('script-table-header').escape()}</th>
	<th>${i18n.msg('script-table-actions').escape()}</th>
	</tr>
	</table>
	</fieldset>
	<fieldset class="cdx-field">
	<div class="cdx-label">
	<label class="cdx-label__label" for="scriptInstaller-script">
	<span class="cdx-label__label__text">${i18n.msg('script').escape()}</span>
	</label>
	</div>
	<div class="cdx-text-input">
	<input type="text" list="scriptInstaller-scripts" class="cdx-text-input__input" style="width:100%;" id="scriptInstaller-script" placeholder="${i18n.msg('script-name').escape()}">
	<datalist id="scriptInstaller-scripts">
	</datalist>
	</div>
	<button id="scriptInstaller-viewScript" class="cdx-button cdx-button--action-default">${i18n.msg('view-script').escape()}</button>
	<button id="scriptInstaller-addScript" class="cdx-button cdx-button--action-default">${i18n.msg('add-script').escape()}</button>
	</fieldset>
	<input id="scriptInstaller-submit" class="cdx-button cdx-button--action-progressive" type="submit" value="${i18n.msg('submit').escape()}">
	</form>
	`; // TODO: Use Vue + Codex
	
						const DEV_WIKI_SEARCH_ENDPOINT = 'https://dev.fandom.com/api.php';
						const APIOptions = {
							ajax: {
								headers: {
									'Api-User-Agent': 'u:dev:MediaWiki:ScriptInstaller.js'
								}
							}
						};
						const api = new mw.Api( APIOptions );
						const devApi = new mw.ForeignApi( DEV_WIKI_SEARCH_ENDPOINT, Object.assign( { anonymous: true }, APIOptions ) );
						let scripts = [];
						let scriptsMap = {};
						function redirectToWiki( script = '', wiki = '', lang = '', dev = false ) {
							let newloc = new URL(`https://${wiki}.fandom.com/${lang ? lang + '/' : ''}wiki/Special:BlankPage/ScriptInstaller`);
							newloc.searchParams.set( 'wiki', wiki );
							newloc.searchParams.set( 'lang', lang );
							newloc.searchParams.set( 'script', dev ? (script ? 'dev:' + script : '') : '' );
							alert( i18n.msg( 'if-invalid-click-browser-back-button' ).plain() );
							location.href = newloc.toString();
						}
	
						// Searches for the particular script on Fandom
						function search( query ) {
							if ( query.toLowerCase().startsWith('dev:') && !ON_DEV_WIKI ) {
								return devApi.get({
									action: 'query',
									format: 'json',
									formatversion: '2',
									list: 'search',
									srnamespace: '8',
									srsearch: `MediaWiki:${ query.substring( 4 ).replace(' ', '_') }.js`
								});
							} else {
								return api.get({
									action: 'query',
									format: 'json',
									formatversion: '2',
									list: 'search',
									srnamespace: '8',
									srsearch: `MediaWiki:${ query.replace(' ', '_') }.js`
								});
							}
						}
	
						// Gets information about the script to be added
						function getInfo( query ) {
							if ( query.toLowerCase().startsWith('dev:') && !ON_DEV_WIKI ) {
								return devApi.get({
									action: 'parse',
									format: 'json',
									formatversion: '2',
									page: `MediaWiki:${ query.substring( 4 ).replace(' ', '_') }.js`
								});
							} else {
								return api.get({
									action: 'parse',
									format: 'json',
									formatversion: '2',
									page: `MediaWiki:${ query.substring( 4 ).replace(' ', '_') }.js`
								});
							}
						}
						function setWikiHandler( e ) {
							e.preventDefault();
							let wiki = $( "#scriptInstaller-wiki" ).val();
							let lang = $( "#scriptInstaller-wiki-lang" ).val();
							let script = $( "#scriptInstaller-script" ).val();
							redirectToWiki( script, wiki, lang );
						}
						function setWikiHandlerFromDev( e ) {
							e.preventDefault();
							let wiki = $( "#scriptInstaller-wiki" ).val();
							let lang = $( "#scriptInstaller-wiki-lang" ).val();
							let script = $( "#scriptInstaller-script" ).val();
							redirectToWiki( script, wiki, lang, true );
						}
						function viewScriptHandler( e ) {
							e.preventDefault();
							let script = $( "#scriptInstaller-script" ).val();
							if ( script.toLowerCase().startsWith('dev:') && url.host != 'dev.fandom.com' ) {
								window.open( `https://dev.fandom.com/wiki/MediaWiki:${encodeURI(script.substring( 4 ).replace(' ', '_'))}.js` );
							} else {
								window.open( `${mw.config.get( 'wgArticlePath' ).replace( '$1', 'MediaWiki:' + encodeURI(script.replace(' ', '_')))}.js?action=raw&ctype=text/javascript` );
							}
						}
						function searchInputHandler( e ) {
							switch ( e.which || e.keyCode ) {
								case 35: e.preventDefault();
									return;
								case 60: e.preventDefault();
									return;
								case 62: e.preventDefault();
									return;
								case 91: e.preventDefault();
									return;
								case 93: e.preventDefault();
									return;
								case 123: e.preventDefault();
									return;
								case 125: e.preventDefault();
									return;
								case 124: e.preventDefault();
									return;
							}
							let query = $( this ).val() + e.key;
							if ( query.length == 0 ) {
								$( '#scriptInstaller-viewScript' ).prop( 'disabled', true );
								$( '#scriptInstaller-addScript' ).prop( 'disabled', true );
								return;
							} else {
								$( '#scriptInstaller-viewScript' ).prop( 'disabled', false );
								$( '#scriptInstaller-addScript' ).prop( 'disabled', false );
							}
							search( query ).then( function( result ) {
								$( "#scriptInstaller-scripts" ).html('');
								if ( !result.error ) {
									let options = [];
									if ( !ON_DEV_WIKI && query.toLowerCase().startsWith( 'dev:' ) ) {
										for ( let searchResult of result.query.search ) {
											if ( searchResult.title.endsWith('.js') ) {
												options.push( 'dev:' + searchResult.title.substring( 10, searchResult.title.length - 3 ) );
											}
										}
									} else {
										for ( let searchResult of result.query.search ) {
											if ( searchResult.title.endsWith('.js') ) {
												options.push( searchResult.title.substring( 10, searchResult.title.length - 3 ) );
											}
										}
									}
									for ( let option of options ) {
										$( "#scriptInstaller-scripts" ).append( $( '<option/>' ).prop( 'value', option ) );
									}
								}
							} );
						}
						function getScriptData( script ) {
							if ( !script.endsWith('.js') ) {
								// not a plausible script, continue
								return { "data": script };
							}
							let testScript = '';
							let disabled = '';
							let dev = false;
							if ( script.startsWith( '#' ) ) {
								testScript = script.substring( 1 ).trim();
								disabled = '#';
							} else if ( script.startsWith( '//' ) ) {
								testScript = script.substring( 2 ).trim();
								disabled = '//';
							} else {
								testScript = script.trim();
							}
							// check if script is valid
							// first identify for dev: prefix
							if ( testScript.toLowerCase().startsWith('dev:') ) {
								testScript = testScript.substring( 4 );
								dev = true;
							}
							// now check the remainder of the title to see if it is a valid title
							try {
								new mw.Title( 'MediaWiki:' + testScript );
							} catch ( _ ) {
								return { "data": script };
							}
							testScript = testScript.substring( 0, testScript.length - 3 ); // gobble up the .js part for presentation
							return { "name": testScript, "dev": dev, "disabled": disabled, "data": script };
						}
						function createTableRow( script ) {
							return `
	<tr class="scriptInstaller-tablerow"><td><a href="${script.dev ? `//dev.fandom.com` : ''}/wiki/MediaWiki:${encodeURI( script.name )}.js">${ script.dev ? 'dev:' : ''}${ script.name }</a></td>
	<td>
	<div class="scriptInstaller-rearrange-buttons">
	<a href="#" class="scriptInstaller-up-button">↑</a>
	<a href="#" class="scriptInstaller-down-button">↓</a>
	</div>
	<div class="scriptInstaller-toggle-buttons">
	<a href="#" class="scriptInstaller-enable-button">${i18n.msg('enable').escape()}</a>
	<a href="#" class="scriptInstaller-disable-button">${i18n.msg('disable').escape()}</a>
	</div>
	<div class="scriptInstaller-remove-buttons">
	<a href="#" class="scriptInstaller-remove-button">${i18n.msg('remove').escape()}</a>
	<a href="#" class="scriptInstaller-undoremove-button">${i18n.msg('undo-remove').escape()}</a>
	</div>
	</td></tr>`;
						}
						function enableButtonHandler( e ) {
							e.preventDefault();
							let $par = $( this ).parent().parent().parent();
							let script = $par.data( 'script-data' );
	
							if ( script.olddata ) {
								script = Object.assign( {}, script.olddata );
								delete script.olddata;
							} else {
								script.olddata = Object.assign({}, script); // store old data to allow reversions before committing
	
								script.data = script.data.substring( script.disabled.length );
								script.disabled = '';
							}
	
							$par.data( 'script-data', script );
							$(this).hide();
							$('.scriptInstaller-remove-buttons').toggle();
							$par.find('.scriptInstaller-disable-button').show();
						}
						function disableButtonHandler( e ) {
							e.preventDefault();
							let $par = $( this ).parent().parent().parent();
							let script = $par.data( 'script-data' );
	
							if ( script.olddata ) {
								script = Object.assign( {}, script.olddata );
								delete script.olddata;
							} else {
								script.olddata = Object.assign({}, script); // store old data to allow reversions before committing
	
								script.data = '#' + script.data;
								script.disabled = '#';
							}
	
							$par.data( 'script-data', script );
							$(this).hide();
							$('.scriptInstaller-remove-buttons').toggle();
							$par.find('.scriptInstaller-enable-button').show();
						}
						function removeButtonHandler( e ) {
							e.preventDefault();
							let $par = $( this ).parent().parent().parent();
							let script = $par.data( 'script-data' );
	
							if ( script.new == undefined ) {
								script.olddata = Object.assign({}, script); // store old data to allow reversions before committing
	
								script.data = null;
								script.disabled = '';
	
								$par.data( 'script-data', script );
								$(this).hide();
								$par.find('.scriptInstaller-toggle-buttons').hide();
								$par.find('.scriptInstaller-rearrange-buttons').hide();
								$par.find('.scriptInstaller-undoremove-button').show();
							} else {
								delete scriptsMap[ getScriptMapKey( script.data ) ];
								$par.remove();
								$( '#scriptInstaller-table tr' ).last().find( '.scriptInstaller-down-button' ).hide();
								$( '#scriptInstaller-table tr' ).first().next().find( '.scriptInstaller-up-button' ).hide();
								fixArrows();
							}
						}
						function undoRemoveButtonHandler( e ) {
							e.preventDefault();
							let $par = $( this ).parent().parent().parent();
							let script = $par.data( 'script-data' );
	
							script = Object.assign( {}, script.olddata );
							delete script.olddata;
	
							$par.data( 'script-data', script );
							$(this).hide();
							$par.find('.scriptInstaller-toggle-buttons').show();
							$par.find('.scriptInstaller-rearrange-buttons').show();
							$par.find('.scriptInstaller-remove-button').show();
						}
						function fixArrows() {
							$( '#scriptInstaller-table' ).find( '.scriptInstaller-up-button, .scriptInstaller-down-button' ).show();
							$( "#scriptInstaller-table .scriptInstaller-tablerow" ).first().find( '.scriptInstaller-up-button' ).hide();
							$( "#scriptInstaller-table .scriptInstaller-tablerow" ).last().find( '.scriptInstaller-down-button' ).hide();
						}
						function upButtonHandler( e ) {
							e.preventDefault();
							let $par = $( this ).parent().parent().parent();
							$par.insertBefore( $par.prev() );
							fixArrows();
						}
						function downButtonHandler( e ) {
							e.preventDefault();
							let $par = $( this ).parent().parent().parent();
							$par.insertAfter( $par.next() );
							fixArrows();
						}
						function getScriptMapKey( script ) {
							return ( script.toLowerCase().startsWith( 'dev:' )
							? 'dev:' + script.substring( 4, 5 ).toUpperCase() + script.substring( 5 )
							: script.substring( 0, 1 ).toUpperCase() + script.substring( 1 ) ).replace('_', ' ');
						}
						function addScriptHandler( e ) {
							e.preventDefault();
							if ( $( this ).prop( 'disabled' ) ) { return; }
							// first see if the script is already loaded in the list of scripts
							let script = $( '#scriptInstaller-script' ).val();
							let smKey = getScriptMapKey( script );
							if ( !scriptsMap[ smKey ] ) {
								scriptsMap[ smKey ] = true;
								$( this ).prop( 'disabled', true );
								let scriptData = getScriptData( script + '.js' );
								scriptData.new = true;
								var that = this;
								// check the script exists
								getInfo( script ).then( function( result ) {
									let $row = $( createTableRow( scriptData ) );
									$( that ).prop( 'disabled', false );
									$( '#scriptInstaller-table tr' ).last().find( '.scriptInstaller-down-button' ).show();
									$( '#scriptInstaller-table' ).append( $row );
									$row.find( '.scriptInstaller-undoremove-button, .scriptInstaller-toggle-buttons' ).hide();
									$row.find( '.scriptInstaller-up-button' ).click( upButtonHandler );
									$row.find( '.scriptInstaller-down-button' ).click( downButtonHandler );
									$row.find( '.scriptInstaller-remove-button' ).click( removeButtonHandler );
									$row.data( 'script-data', scriptData );
									fixArrows();
								}).catch( function( code, result ) {
									alert( result.error.info );
									$( that ).prop( 'disabled', false );
								});
							} else { 
								alert( i18n.msg( 'script-already-installed' ).plain() );
								return;
							}
						}
						function submitHandler( e ) {
							e.preventDefault();
							let summary = prompt( i18n.msg( 'optional-summary' ).plain() );
							if (summary == null) {
								// user probably clicked cancel
								return;
							}
							$( "#scriptInstaller-submit" ).prop( 'disabled', true );
							let wikitext = '';
							$( "#scriptInstaller-table .scriptInstaller-tablerow" ).each( function() {
								let script = $( this ).data( 'script-data' );
								if ( script.data != null ) {
									wikitext += script.data + '\n';
								}
							});
							api.postWithEditToken( {
								'action': 'edit',
								'format': 'json',
								'text': wikitext,
								'title': 'MediaWiki:ImportJS',
								'summary': i18n.inContentLang().msg( 'script-installer-update', summary ).plain()
							} ).then( function( result ) {
								mw.notify( i18n.msg( 'edit-saved' ).parse() );
								window.setTimeout( () => location = mw.config.get( 'wgArticlePath' ).replace( '$1', 'MediaWiki:ImportJS' ) + '?diff=prev', 5000 );
							} ).catch( function ( code, result ) {
								alert( result.error.info );
								window.setTimeout( () => location = mw.config.get( 'wgArticlePath' ).replace( '$1', 'MediaWiki:ImportJS' ), 5000 );
							} );
						}
						$( document ).ready( function() {
							$('#firstHeading').text( i18n.msg('script-installer').plain() );
							$('#mw-content-text').text( i18n.msg('script-installer-loading').plain() );
							let wiki = url.searchParams.get( 'wiki' );
							let lang = url.searchParams.get( 'lang' );
							let script = url.searchParams.get( 'script' );
							if ( ON_DEV_WIKI && wiki != dev ) {
								// for dev wiki, display form and we'll check permissions on save
								// the use case here is to permit a user to click a button and install a script onto their wiki
								$( "#mw-content-text" ).html( form );
								$( "#scriptInstaller-wiki" ).val( wiki ? wiki : '' );
								$( "#scriptInstaller-wiki-lang" ).val( lang ? lang : '' );
								$( "#scriptInstaller-script" ).val( script ? script : '' );
								$( "#scriptInstaller-installedScripts" ).hide();
								$( '#scriptInstaller-script' ).keypress( searchInputHandler );
								$( "#scriptInstaller-setWiki" ).click( setWikiHandlerFromDev );
								$( "#scriptInstaller-viewScript" ).click( viewScriptHandler );
								$( "#scriptInstaller-addScript" ).prop( 'disabled', true );
								$( "#scriptInstaller-submit" ).prop( 'disabled', true );
							} else {
								if ( ( ON_DEV_WIKI && wiki == 'dev' ) || ( !ON_DEV_WIKI ) ) {
									api.get( {
										'action': 'query',
										'format': 'json',
										'prop': 'info',
										'intestactions': 'edit',
										'intestactionsdetail': 'quick',
										'titles': 'MediaWiki:ImportJS',
										'formatversion': 2
									} ).done( function( result ) {
										let noAccess = result.query.pages[0].actions['edit'].length > 0;
										// user probably can use script installer to install scripts to their wiki
										// if not, we can still error out later when trying to save
	
										// fetch existing ImportJS
										let importjs;
										api.get( {
											'action': 'parse',
											'format': 'json',
											'page': 'MediaWiki:ImportJS',
											'prop': 'wikitext',
											'formatversion': 2
										} ).then( ( result ) => importjs = result.parse.wikitext ).catch( ( _ ) => importjs = null ).then( function( _ ) {
											for ( let script of importjs ? importjs.split('\n') : [] ) {
												scripts.push( getScriptData( script ) );
												scriptsMap[ getScriptMapKey( script ) ] = true;
											}
											// now populate the table with scripts
											$( '#mw-content-text' ).html( form );
											$( "#scriptInstaller-wiki" ).val( wiki ? wiki : '' );
											$( "#scriptInstaller-wiki-lang" ).val( lang ? lang : '' );
											$( "#scriptInstaller-script" ).val( script ? script : '' );
											$( "#scriptInstaller-setWiki" ).click( setWikiHandler );
											$( "#scriptInstaller-viewScript" ).click( viewScriptHandler );
											for ( const i in scripts ) { 
												const script = scripts[i];
												if ( !script.name ) {
													$( '#scriptInstaller-table' ).append( $( '<tr class="scriptInstaller-tablerow" style="display:none;"></tr>' ).data( 'script-data', script ) );
												} else {
													let $row = $( createTableRow( script ) );
	
													$( '#scriptInstaller-table' ).append( $row );
													if ( script.disabled ) {
														$row.find( '.scriptInstaller-enable-button' ).show();
														$row.find( '.scriptInstaller-disable-button' ).hide();
													} else {
														$row.find( '.scriptInstaller-disable-button' ).show();
														$row.find( '.scriptInstaller-enable-button' ).hide();
													}
													if ( i == 0 ) {
														$row.find( '.scriptInstaller-up-button' ).hide();
													}
													if ( i == scripts.length - 1 ) {
														$row.find( '.scriptInstaller-down-button' ).hide();
													}
													$( '.scriptInstaller-undoremove-button' ).hide();
													$row.data( 'script-data', script );
												}
											}
											if ( !noAccess ) {
												$( '#scriptInstaller-script' ).keypress( searchInputHandler );
												$( '#scriptInstaller-table' ).find( '.scriptInstaller-enable-button' ).click( enableButtonHandler );
												$( '#scriptInstaller-table' ).find( '.scriptInstaller-disable-button' ).click( disableButtonHandler );
												$( '#scriptInstaller-table' ).find( '.scriptInstaller-remove-button' ).click( removeButtonHandler );
												$( '#scriptInstaller-table' ).find( '.scriptInstaller-undoremove-button' ).click( undoRemoveButtonHandler );
												$( '#scriptInstaller-table' ).find( '.scriptInstaller-up-button' ).click( upButtonHandler );
												$( '#scriptInstaller-table' ).find( '.scriptInstaller-down-button' ).click( downButtonHandler );
												$( '#scriptInstaller-addScript' ).click( addScriptHandler );
												$( '#scriptInstaller-submit' ).click( submitHandler );
											} else {
												$( "#mw-content-text" ).prepend( `<p>${i18n.msg( 'no-access' ).parse()}</p>` );
												$( '.scriptInstaller-rearrange-buttons' ).hide();
												$( '.scriptInstaller-toggle-buttons' ).hide();
												$( '.scriptInstaller-remove-buttons' ).hide();
												$( '.scriptInstaller-toggle-buttons' ).hide();
												$( '#scriptInstaller-script' ).prop( 'disabled', true );
												$( '#scriptInstaller-openDevWiki' ).prop( 'disabled', true );
												$( '#scriptInstaller-addScript' ).prop( 'disabled', true );
												$( '#scriptInstaller-submit' ).prop( 'disabled', true );
											}
										} );
									} ).fail( console.error );
								}
							}
						} );
					} 
				} else if ( mw.config.get('wgPageName') == 'MediaWiki:ImportJS' ) {
					mw.util.addPortletLink(
						'p-cactions',
						mw.config.get( 'wgArticlePath' ).replace( '$1', 'Special:BlankPage/ScriptInstaller' ),
						i18n.msg( 'open-script-installer' ).plain()
					);
				} else if ( mw.config.get('wgNamespaceNumber') == 8 ) {
					if ( mw.config.get( 'wgPageName' ).endsWith( '.js' ) ) {
						mw.util.addPortletLink(
							'p-cactions',
							mw.config.get( 'wgArticlePath' ).replace( '$1', 'Special:BlankPage/ScriptInstaller' ) + '?script=' + encodeURI( mw.config.get( 'wgPageName' ).substring( 10, mw.config.get( 'wgPageName' ).length - 3 ).replace( ' ', '_' ) ),
							i18n.msg( 'install-script' ).plain()
						);
					}
				}
			} );
		} );
	} );
	importArticle( { type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' } );
} );