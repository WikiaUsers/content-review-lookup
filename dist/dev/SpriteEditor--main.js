// Please use https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript for development.
mw.loader.using( [
	'@wikimedia/codex',
	'mediawiki.api',
	'mediawiki.diff.styles'
] ).then( () => new mw.Api().loadMessagesIfMissing( [
	'about',
	'cancel',
	'download',
	'editundo',
	'filehist-dimensions',
	'interwiki_addbutton',
	'mainpage-description',
	'mypreferences',
	'newarticle',
	'newpage',
	'pageinfo-header-basic',
	'postedit-confirmation-created',
	'postedit-confirmation-saved',
	'savechanges',
	'showdiff',
	'show-big-image-size',
	'skin-action-addsection',
	'skin-action-delete',
	'summary',
	'upload-dialog-button-save'
] ) ).then( () => {
	'use strict';
	const api = new mw.Api(),
		backgroundSprites = [],
		blacklist = [
			'animatesprite',
			'sprite'
		],
		blankJSON = {
			settings: {},
			sections: [],
			ids: {}
		},
		config = mw.config.get( [
			'wgArticleId',
			'wgArticlePath',
			'wgFormattedNamespaces',
			'wgPageName',
			'wgSiteName',
			'wgUserName'
		] ),
		diffViewEle = document.createElement( 'div' ),
		editHistory = [],
		kioskMode = !!document.getElementById( 'sprite-root' ),
		loadModuleBase = {
			action: 'scribunto-console',
			title: 'Module:SpriteEditorDummy', // Dummy name (Doesn't need to exist)
			question: '=p',
			clear: true
		},
		loadModulesBase = {
			action: 'query',
			apfilterredir: 'nonredirects',
			aplimit: 'max',
			apnamespace: '828',
			format: 'json',
			formatversion: '2',
			list: 'allpages'
		},
		mainViewEle = document.createElement( 'div' ),
		moduleList = [],
		openViewEle = document.createElement( 'div' ),
		options = {
			cleanupSectionIDs: false,
			createSampleSection: true,
			defaultSpriteSize: 16,
			removeUnusedSprites: false,
			removeDeprecatedNames: false,
			removeWhitespace: false,
			spritesPerRow: 10,
			isNew: false,
			spacing: 0
		},
		rootElement = document.getElementById( 'sprite-root' ) || document.getElementById( 'mw-content-text' ),
		sections = [],
		sprites = [],
		tags = [
			'deprecated',
			'black',
			'dark',
			'nolink'
		],
		tagsDisplay = [
			'Deprecated',
			'Black',
			'Dark',
			'No link'
		];

	let editMode = true,
		hasNewTagPermission = true,
		hasTagPermission = true,
		highestSectionID = 0,
		historyPos = 0,
		historyPosSaved = 0,
		imgSpacingOrg = 0,
		imgWidth = 16,
		imgHeight = 16,
		inLoadingProcess = false,
		lastSpriteId = 0,
		loadedSpriteName = {},
		output = {},
		oldImageAsCanvas,
		posSprite = 1,
		spriteImage,
		tagsMode = false;

	// eslint-disable-next-line prefer-const
	let handleFileUpload,
		i18n;

	// CSS
	mw.loader.load( 'https://dev.fandom.com/load.php?modules=MediaWiki:SpriteEditor.css&only=styles', 'text/css' );
	// i18n-JS
	mw.loader.load( 'https://dev.fandom.com/load.php?modules=MediaWiki:I18n-js/code.js&only=scripts' );

	window.addEventListener( 'beforeunload', ( e ) => {
		if ( historyPosSaved !== historyPos ) {
			e.preventDefault();
			e.returnValue = '';
		}
	}, { capture: true } );
	let isPopstate = false;
	window.addEventListener( 'popstate', ( e ) => {
		if ( isPopstate ) {
			isPopstate = false;
			return;
		}
		// eslint-disable-next-line no-alert
		if ( historyPosSaved !== historyPos && !window.confirm( 'Unsaved changes' ) ) {
			e.preventDefault();
			isPopstate = true;
			window.history.forward();
			return;
		}
		if ( document.getElementById( 'sprite-root' ) ) {
			return; // Don't recreate the view if the editor is used as a previewer.
		}
		loadSprite();
	} );

	// JS functions
	function resetEditor() {
		backgroundSprites.length = 0;
		diffViewEle.innerText = '';
		editHistory.length = 0;
		hasNewTagPermission = true;
		hasTagPermission = true;
		highestSectionID = 0;
		historyPosSaved = 0;
		imgSpacingOrg = 0;
		inLoadingProcess = false;
		lastSpriteId = 0;
		mainViewEle.innerText = '';
		options.isNew = false;
		posSprite = 1;
		sections.length = 0;
		sprites.length = 0;
	}
	function updateTitle( changesMade ) {
		if ( kioskMode ) {
			return;
		}
		document.title = String( loadedSpriteName.name.length && ( loadedSpriteName.name + ( changesMade && '*' || '' ) + ' – ' ) || '' ) + 'SpriteEditor – ' + config.wgSiteName;
		document.getElementById( 'firstHeading' ).textContent = 'SpriteEditor' + String( loadedSpriteName.name.length && ( ' – ' + loadedSpriteName.name + ( options.isNew && ' ' + mw.message( 'newarticle' ).plain() || '' ) + ( changesMade && '*' || '' ) ) || '' );
	}

	function seperatePath( path ) {
		const a = path.split( '/' );
		if ( a.length > 0 && a[ 0 ].indexOf( ':' ) ) {
			a[ 0 ] = a[ 0 ].slice( a[ 0 ].indexOf( ':' ) + 1 );
		}
		return {
			full: a.join( '/' ),
			module: a[ 0 ],
			name: a[ a.length - 1 ],
			all: a
		};
	}
	function updateOptions() {
		options.cleanupSectionIDs = document.querySelector( '#sidemenu2CleanupIds' ).checked;
		options.removeUnusedSprites = document.querySelector( '#sidemenu2CleanupUnusedSprites' ).checked;
		options.removeWhitespace = document.querySelector( '#sidemenu2CleanupWhitespace' ).checked;
		options.removeDeprecatedNames = document.querySelector( '#sidemenu2CleanupOldSprites' ).checked;
		options.spritesPerRow = Number( document.querySelector( '#sidemenu1sprites' ).value ) || 0;
		options.spacing = Number( document.querySelector( '#sidemenu1spacing' ).value ) || 0;
	}
	function getPosCoords( pos, useOrg ) {
		const sPR = useOrg ? options.spritesPerRowOrg : options.spritesPerRow,
			s = useOrg ? imgSpacingOrg : options.spacing,
			cordY = Math.ceil( pos / sPR );
		return {
			x: ( pos - ( cordY - 1 ) * sPR - 1 ) * ( imgWidth + s ),
			y: ( cordY - 1 ) * ( imgHeight + s )
		};
	}
	function addDummyPos() {
		const allPos = [],
			allSprites = mainViewEle.querySelectorAll( 'li[class="spritedoc-box"]' );
		for ( let i = 0; i < allSprites.length; i++ ) {
			if (
				( allSprites[ i ].dataset.pos === 'null' ) ||
				( options.removeUnusedSprites && options.removeDeprecatedNames && allSprites[ i ].querySelectorAll( 'code[class="spritedoc-deprecated"]' ).length === allSprites[ i ].querySelectorAll( 'code' ).length )
			) {
				continue;
			}
			allPos.push( Number( allSprites[ i ].dataset.pos ) );
		}
		allPos.sort( ( a, b ) => ( a > b ) - ( a < b ) );
		let extraIncrement = 0;
		allPos.forEach( ( item, index ) => {
			if ( !extraIncrement && ( !output.settings.pos || ( ( index + 1 ) === Number( output.settings.pos ) && !document.querySelector( 'li[data-pos=\'' + ( index + 1 ) + '"]' ) ) ) ) { // If no defaultSprite exists, the pos 1 shouldn't be blocked.
				extraIncrement++;
			}
			document.querySelector( 'li[data-pos=\'' + item + '\']' ).dataset.posTmp = index + 1 + extraIncrement;
		} );
	}
	function generateImage() {
		const c = newCanvas(),
			// eslint-disable-next-line max-len
			keepOldSprites = !options.removeUnusedSprites && !options.isNew && !options.removeWhitespace,
			needDummy = options.removeUnusedSprites && options.removeWhitespace,
			drawn = [],
			ctx = c.getContext( '2d' );
		if ( needDummy ) {
			addDummyPos();
		}
		const defaultSprite = document.querySelector( 'li[data-default]' );
		if ( defaultSprite ) {
			// eslint-disable-next-line max-len
			output.settings.pos = needDummy && defaultSprite.dataset.posTmp || defaultSprite.dataset.pos;
			posSprite = output.settings.pos;
		}
		c.width = ( imgWidth + options.spacing ) * options.spritesPerRow - options.spacing;
		c.height = 0;
		if ( keepOldSprites ) {
			c.height = Math.ceil(
				Math.ceil(
					( spriteImage.naturalHeight + imgSpacingOrg ) / ( imgHeight + imgSpacingOrg )
				) * options.spritesPerRowOrg / options.spritesPerRow
			) * ( imgHeight + options.spacing ) - options.spacing;
		}
		// eslint-disable-next-line max-len
		c.height = Math.max( c.height, Math.ceil( Math.max( ( output.settings.pos || 0 ), lastSpriteId ) / options.spritesPerRow ) * ( imgHeight + options.spacing ) - options.spacing );
		let sID;
		let coords;
		const allSprites = mainViewEle.querySelectorAll( 'li[class="spritedoc-box"][data-pos]' );
		for ( let i = 0; i < allSprites.length; i++ ) {
			if ( options.removeUnusedSprites && options.removeDeprecatedNames && allSprites[ i ].querySelectorAll( 'code[class="spritedoc-deprecated"]' ).length === allSprites[ i ].querySelectorAll( 'code' ).length ) {
				continue;
			}
			// eslint-disable-next-line max-len
			sID = options.removeUnusedSprites && options.removeWhitespace && allSprites[ i ].dataset.posTmp || allSprites[ i ].dataset.pos;
			if ( sID === 'null' ) {
				continue;
			}
			coords = getPosCoords( sID, false );
			drawn[ sID ] = true;
			ctx.drawImage( allSprites[ i ].querySelector( 'canvas' ),
				0, 0, imgWidth, imgHeight, // Source coords.
				coords.x, coords.y, imgWidth, imgHeight // Canvas coords.
			);
		}
		if ( keepOldSprites ) { // Copy old sprites to new canvas
			const list = Object.keys( backgroundSprites );
			for ( let j = 0; j < list.length; j++ ) {
				coords = getPosCoords( list[ j ], false );
				ctx.drawImage( backgroundSprites[ list[ j ] ],
					0, 0, imgWidth, imgHeight, // Source coords.
					coords.x, coords.y, imgWidth, imgHeight // Canvas coords.
				);
			}
		}
		sID = output.settings.pos || 1;
		const coordsOld = getPosCoords( sID, true );
		coords = getPosCoords( sID, false );
		ctx.drawImage( spriteImage,
			coordsOld.x, coordsOld.y, imgWidth, imgHeight, // Source coords.
			coords.x, coords.y, imgWidth, imgHeight // Canvas coords.
		);
		return [ oldImageAsCanvas, c, oldImageAsCanvas.toDataURL() !== c.toDataURL() ];
	}
	function setupOldCanvas( imgData ) {
		oldImageAsCanvas = document.createElement( 'canvas' );
		oldImageAsCanvas.width = imgData.width || imgData.naturalWidth;
		oldImageAsCanvas.height = imgData.height || imgData.naturalHeight;
		if ( options.isNew ) {
			return;
		}
		oldImageAsCanvas.getContext( '2d' ).drawImage( imgData, 0, 0 );
	}
	function needQuotes( a ) {
		if ( typeof a !== 'string' ||
			a.match( /^-?\d+(\.\d+)?$/ ) ||
			!a.match( /^[^a-z_]|\W/i )
		) {
			return false;
		}
		return true;
	}
	function processObject( obj, ident, returnDataOrg, objName ) {
		const returnData = returnDataOrg || [],
			visited = {},
			processObj = function ( name, obj2 ) {
				if ( visited[ name ] ) {
					return;
				}
				visited[ name ] = true;
				const data = obj2[ name ];
				const q = needQuotes( name ) ? '\'$1\'' : '$1';
				const q2 = needQuotes( name ) ? '[\'$1\']' : '$1';
				if ( typeof data === 'object' ) {
					returnData.push( [ ident, typeof name !== 'number' ? q2.replace( '$1', name ) : '', '' ] );
					processObject( data, ident + 1, returnData, name );
				} else if ( typeof data === 'string' && data.slice( 0, 11 ) !== 'require( [[' ) {
					returnData.push( [ ident, q.replace( '$1', name ), '\'' + data + '\'' ] );
				} else {
					returnData.push( [ ident, q.replace( '$1', name ), data ] );
				}
			};
		let names = Object.keys( obj );
		for ( let i = 0; i < obj.length; i++ ) {
			processObj( i, obj );
		}
		let sortFunc;
		if ( ident === 1 || ( objName || '' ) === 'sections' ) {
			sortFunc = function ( a, b ) {
				// eslint-disable-next-line max-len
				return ( a.toLowerCase() < b.toLowerCase() ) - ( a.toLowerCase() > b.toLowerCase() );
			};
			names = Object.keys( obj ).sort( sortFunc );
		} else if ( ident === 2 ) {
			sortFunc = function ( a, b ) {
				// eslint-disable-next-line max-len
				return ( a.toLowerCase() > b.toLowerCase() ) - ( a.toLowerCase() < b.toLowerCase() );
			};
			names = Object.keys( obj ).sort( sortFunc );
		}
		for ( let j = 0; j < names.length; j++ ) {
			processObj( names[ j ], obj );
		}
		return returnData;
	}
	function processData( d ) {
		const data = processObject( d, 1 ),
			toReturn = [];
		for ( let i = 0; i < data.length; i++ ) {
			const oldData = data[ i - 1 ] || [ 0, '' ],
				nextData = data[ i + 1 ] || [ 1, '' ];
			if ( data[ i ][ 0 ] < nextData[ 0 ] ) {
				toReturn.push( ( '\t' ).repeat( data[ i ][ 0 ] ) + ( data[ i ][ 1 ].length ? data[ i ][ 1 ] + ' = ' : '' ) + '{' );
				continue;
			}
			if ( data[ i ][ 0 ] === 3 ) {
				toReturn[ toReturn.length - 1 ] += ( ( oldData[ 0 ] === 2 ? ' ' : '' ) + data[ i ][ 1 ] + ' = ' + data[ i ][ 2 ] );
				if ( nextData[ 0 ] === 3 ) {
					toReturn[ toReturn.length - 1 ] += ', ';
				} else {
					toReturn[ toReturn.length - 1 ] += ' },';
				}
			} else {
				toReturn.push( ( '\t' ).repeat( data[ i ][ 0 ] ) + data[ i ][ 1 ] + ' = ' + data[ i ][ 2 ] );
				if ( data[ i ][ 0 ] === nextData[ 0 ] ) {
					toReturn[ toReturn.length - 1 ] += ',';
				}
			}
			if ( data[ i ][ 0 ] > nextData[ 0 ] && nextData[ 0 ] !== 2 ) {
				toReturn.push( ( '\t' ).repeat( nextData[ 0 ] ) + '},' );
			}
		}
		return 'return {\n' + toReturn.join( '\n' ) + '\n}';
	}
	function generateJSON() {
		const a = JSON.parse( JSON.stringify( blankJSON ) );
		a.settings = output.settings || {};
		if ( a.settings.pos ) {
			a.settings.pos = Number( a.settings.pos );
		}
		delete a.settings.spacing;
		if ( a.settings.version ) {
			a.settings.version = 'version=' + Date.now();
		} else if ( a.settings.url || options.isNew ) {
			a.settings.url = 'require( [[' + config.wgFormattedNamespaces[ 828 ] + ':Sprite]] ).getUrl( \'' + ( a.settings.image || loadedSpriteName.name + '.png' ) + '\', \'version=' + Date.now() + '\', \'' + loadedSpriteName.module.toLowerCase().slice( 0, loadedSpriteName.module.length - 6 ) + '-sprite\' ),';
		}
		// eslint-disable-next-line max-len
		a.settings.sheetsize = options.spritesPerRow * ( imgWidth + options.spacing ) - options.spacing;
		if ( options.spacing > 0 ) {
			a.settings.spacing = options.spacing;
		}

		const secElements = mainViewEle.querySelectorAll( 'div.spritedoc-section' );
		for ( let i = 0; i < secElements.length; i++ ) {
			// eslint-disable-next-line max-len
			const secId = options.cleanupSectionIDs ? String( i ) : secElements[ i ].dataset.sectionId;
			a.sections.push( {
				name: secElements[ i ].querySelector( 'code' ).textContent,
				id: Number( secId )
			} );
			const names = secElements[ i ].querySelectorAll( '.spritedoc-name' );
			for ( let k = 0; k < names.length; k++ ) {
				const dataset = names[ k ].closest( '.spritedoc-box' ).dataset,
					name = names[ k ].children[ 0 ];
				if ( !dataset.pos || ( options.removeDeprecatedNames && name.classList.contains( 'spritedoc-deprecated' ) ) ) {
					continue;
				}
				// eslint-disable-next-line max-len
				const p = options.removeUnusedSprites && options.removeWhitespace && dataset.posTmp || dataset.pos;
				a.ids[ name.textContent ] = {
					pos: Number( p ),
					section: Number( secId )
				};

				for ( let l = 0; l < tags.length; l++ ) {
					if ( name.classList.contains( 'spritedoc-' + tags[ l ] ) ) {
						a.ids[ name.textContent ][ tags[ l ] ] = true;
					}
				}
			}
		}
		return a;
	}

	// Functions for history
	function updateHistoryBtn() {
		if ( kioskMode ) {
			return;
		}
		const redobtn = document.querySelector( '#btn-redo' ),
			undobtn = document.querySelector( '#btn-undo' );
		undobtn.removeAttribute( 'disabled' );
		redobtn.removeAttribute( 'disabled' );
		if ( historyPos === 0 ) {
			undobtn.setAttribute( 'disabled', '' );
		}
		if ( historyPos === editHistory.length ) {
			redobtn.setAttribute( 'disabled', '' );
		}
	}
	const moveHistory = function ( dir ) {
		const offset = Number( dir > 0 );
		historyPos += dir;
		if ( historyPos < 0 || historyPos > editHistory.length ) {
			historyPos -= dir;
			return;
		}
		updateHistoryBtn();
		editHistory[ historyPos - offset ][ offset ]();
		updateTitle( historyPos !== historyPosSaved );
	};

	const addHistory = function ( data, skipExecute ) {
		editHistory.length = historyPos;
		historyPos++;
		editHistory.push( data );
		if ( !skipExecute ) {
			editHistory[ editHistory.length - 1 ][ 1 ]();
		}
		updateHistoryBtn();
	};

	// Functions for sections
	function reorderSections( order ) {
		const sidemenuContainer = document.querySelector( '.sidemenu-sections' );
		for ( let i = 0; i < order.length; i++ ) {
			mainViewEle.append( sections[ order[ i ] ].element );
			sidemenuContainer.append( sections[ order[ i ] ].sidebar );
		}
	}
	const addSection = function ( data ) {
		sections[ data.id ] = data;
		const outerDiv = document.createElement( 'div' );
		outerDiv.className = 'spritedoc-section';
		outerDiv.dataset.sectionId = data.id;
		const h3Ele = document.createElement( 'h3' ),
			codeEle = h3Ele.appendChild( document.createElement( 'code' ) );
		codeEle.className = 'mw-headline';
		codeEle.setAttribute( 'contenteditable', getEditMode() && !kioskMode );
		codeEle.innerText = data.name;
		codeEle.addEventListener( 'focus', ( e ) => {
			e.preventDefault();
			if ( !editMode ) {
				codeEle.blur();
				return;
			}
			codeEle.setAttribute( 'data-original-text', codeEle.textContent );
		} );
		codeEle.addEventListener( 'blur', ( e ) => {
			e.preventDefault();
			const orgT = codeEle.getAttribute( 'data-original-text' );
			codeEle.removeAttribute( 'data-original-text' );
			if ( orgT === codeEle.innerText ) {
				return;
			}
			if ( codeEle.textContent.length ) {
				data.name = codeEle.textContent;
			} else {
				codeEle.textContent = orgT;
				data.delete();
			}
		} );
		const ulEle = document.createElement( 'ul' );
		ulEle.className = 'spritedoc-boxes';
		const dragOverlayEle = ulEle.appendChild( document.createElement( 'div' ) );
		dragOverlayEle.className = 'section-drag-overlay';
		dragOverlayEle.style.display = 'none';
		outerDiv.append( h3Ele, ulEle );
		data.element = outerDiv;
		mainViewEle.append( outerDiv );

		// Handles drag'n'drop
		ulEle.addEventListener( 'dragenter', ( e ) => {
			e.stopPropagation();
			e.preventDefault();
			if ( !e.dataTransfer.getData( 'Text' ) && !e.dataTransfer.items.length ) {
				return;
			}
			e.dataTransfer.dropEffect = 'move';
			dragOverlayEle.style.display = '';
		} );
		const f = function ( e ) {
			e.preventDefault();
		};
		dragOverlayEle.addEventListener( 'dragenter', f );
		dragOverlayEle.addEventListener( 'dragover', f );
		dragOverlayEle.addEventListener( 'dragleave', ( e ) => {
			e.preventDefault();
			dragOverlayEle.style.display = 'none';
		} );
		dragOverlayEle.addEventListener( 'drop', ( e ) => {
			e.preventDefault();
			dragOverlayEle.style.display = 'none';
			const ele = e.dataTransfer.getData( 'Text' ),
				files = e.dataTransfer.files,
				newSecEle = e.target.closest( '.spritedoc-section' );
			if ( newSecEle &&
				sections[ newSecEle.dataset.sectionId ] &&
				files.length > 0
			) { // Files
				handleFileUpload( files, sections[ newSecEle.dataset.sectionId ] );
				return;
			}
			if ( !ele.length ) {
				return;
			}
			const draggedSprite = sprites[ ele ];
			draggedSprite.element.removeAttribute( 'ghost' );
			if ( newSecEle && sprites[ ele ] ) { // Sprite dragging
				const oldSecEle = draggedSprite.element.closest( '.spritedoc-section' );
				if ( !newSecEle || newSecEle === oldSecEle ) {
					return;
				}
				draggedSprite.SectionId = newSecEle.dataset.sectionId;
			}
		} );
		if ( kioskMode ) {
			return;
		}
		const sidemenuSectionsContainer = document.querySelector( '.sidemenu-sections' ),
			sidemenuEntry = document.createElement( 'li' ),
			sidemenuName = document.createElement( 'span' );
		sidemenuEntry.addEventListener( 'dragstart', () => {
			setTimeout( () => sidemenuEntry.classList.add( 'dragging' ), 0 );
		} );
		sidemenuEntry.addEventListener( 'dragend', () => {
			sidemenuEntry.classList.remove( 'dragging' );
			const oldOrder = [],
				newOrder = [],
				allOldEntries = [ ...mainViewEle.querySelectorAll( '.spritedoc-section' ) ],
				allNewEntries = [ ...sidemenuSectionsContainer.querySelectorAll( '.sidemenu-section' ) ];

			for ( const entry of allOldEntries ) {
				oldOrder.push( entry.dataset.sectionId );
			}
			for ( const entry of allNewEntries ) {
				newOrder.push( entry.dataset.sectionId );
			}
			if ( JSON.stringify( oldOrder ) === JSON.stringify( newOrder ) ) {
				return;
			}
			addHistory( [
				function () {
					reorderSections( oldOrder );
				},
				function () {
					reorderSections( newOrder );
				}
			] );
		} );
		sidemenuName.innerText = data.name;
		sidemenuEntry.dataset.sectionId = data.id;
		sidemenuEntry.className = 'sidemenu-section';
		sidemenuEntry.draggable = 'true';
		const deleteButton = document.createElement( 'span' );
		deleteButton.className = 'sidemenu-delete';
		sidemenuEntry.append( sidemenuName, deleteButton );
		deleteButton.addEventListener( 'click', () => {
			data.delete();
		} );
		data.sidebar = sidemenuEntry;
		sidemenuSectionsContainer.append( sidemenuEntry );
	};

	const removeSection = function ( sectionData ) {
		delete sections[ sectionData.id ];
		sectionData.sidebar.remove();
		sectionData.element.remove();
	};

	const renameSection = function ( section, name ) {
		section.sectionName = name;
		section.element.querySelector( 'h3 > code' ).innerText = name;
		section.sidebar.children[ 0 ].innerText = name;
	};

	const sortSection = function ( section ) {
		// https://stackoverflow.com/questions/32199368/sorting-a-list-by-data-attribute
		Array.prototype.slice.call( document.querySelectorAll( 'div[data-section-id="' + section + '"] .spritedoc-box[data-sort-key]' ) ).sort( ( a, b ) => ( a.dataset.sortKey < b.dataset.sortKey ) - ( a.dataset.sortKey > b.dataset.sortKey )
		).forEach( ( node ) => {
			node.parentNode.prepend( node );
		} );
	};

	function createCdxButton( id, lbl, enabled, action, weight, title ) {
		const act = 'cdx-button--action-' + ( action || 'progressive' ),
			wei = 'cdx-button--weight-' + ( weight || 'primary' ),
			a = document.createElement( 'a' );
		// eslint-disable-next-line mediawiki/class-doc
		a.className = 'cdx-button cdx-button--fake-button ' + act + ' ' + wei;
		a.id = id;
		a.innerText = lbl;
		a.style.margin = '16px 0 0';
		a.style.width = '100%';
		if ( title ) {
			a.title = title;
		}
		// eslint-disable-next-line mediawiki/class-doc
		a.classList.add( 'cdx-button--fake-button--' + ( enabled ? 'enabled' : 'disabled' ) );
		return a;
	}

	function openDialog( spriteData ) {
		const oldDialog = document.querySelector( '.spritedoc-dialog-popup' );
		if ( oldDialog ) {
			oldDialog.remove();
		}
		const dialogEle = document.createElement( 'dialog' ),
			popImageEle = document.createElement( 'div' );
		let btnList = [
			[
				i18n.msg( 'replace-sprite-label' ).plain(),
				i18n.msg( 'replace-sprite-hover' ).plain(),
				function () {
					spriteData.replaceImage();
				}
			],
			[
				i18n.msg( 'default-sprite-label' ).plain(),
				i18n.msg( 'default-sprite-hover' ).plain(),
				function () {
					spriteData.toggleDefault();
				}
			],
			[
				mw.message( 'download' ).plain(),
				mw.message( 'download' ).plain(),
				function () {
					spriteData.download();
				}
			],
			[
				i18n.msg( 'rotate-left-label' ).plain(),
				i18n.msg( 'rotate-left-hover' ).plain(),
				function () {
					spriteData.rotateSprite( -1 );
				}
			],
			[
				i18n.msg( 'rotate-right-label' ).plain(),
				i18n.msg( 'rotate-right-hover' ).plain(),
				function () {
					spriteData.rotateSprite( 1 );
				}
			],
			[
				i18n.msg( 'flip-h-label' ).plain(),
				i18n.msg( 'flip-h-hover' ).plain(),
				function () {
					spriteData.mirrorSprite( false );
				}
			],
			[
				i18n.msg( 'flip-v-label' ).plain(),
				i18n.msg( 'flip-v-hover' ).plain(),
				function () {
					spriteData.mirrorSprite( true );
				}
			],
			[
				mw.message( 'skin-action-delete' ).plain(),
				mw.message( 'skin-action-delete' ).plain(),
				function () {
					spriteData.delete();
				}, 'destructive'
			],
			[
				mw.message( 'cancel' ).plain(),
				mw.message( 'cancel' ).plain(),
				function () {
				}, '', 'normal'
			]
		];
		if ( !getEditMode || kioskMode ) {
			btnList = [
				btnList[ 2 ],
				btnList[ 8 ]
			];
		}
		dialogEle.className = 'spritedoc-dialog-popup';
		popImageEle.className = 'spritedoc-dialog-popup-image';
		const imageData = spriteData.image.getContext( '2d' ).getImageData( 0, 0, spriteData.image.width, spriteData.image.height ),
			previewImage = document.createElement( 'canvas' );
		previewImage.width = spriteData.image.width;
		previewImage.height = spriteData.image.height;
		previewImage.getContext( '2d' ).putImageData( imageData, 0, 0 );
		previewImage.style.imageRendering = 'pixelated';
		previewImage.style.width = '100%';
		popImageEle.append( previewImage );
		dialogEle.append( popImageEle );
		for ( const index in btnList ) {
			const btn = createCdxButton(
				'btn-popup-' + index,
				btnList[ index ][ 0 ],
				true,
				( btnList[ index ][ 3 ] || 'neutral' ),
				( btnList[ index ][ 4 ] || 'quiet' ),
				btnList[ index ][ 1 ]
			);
			btn.style.margin = '';
			btn.addEventListener( 'click', btnList[ index ][ 2 ], { once: true } );
			btn.addEventListener( 'click', () => {
				dialogEle.remove();
			} );
			dialogEle.append( btn );
		}
		document.body.append( dialogEle );
		dialogEle.style.overflow = 'visible';
		dialogEle.showModal();
	}

	// Functions for sprites

	function newCanvas() {
		const c = document.createElement( 'canvas' );
		c.width = imgWidth;
		c.height = imgHeight;
		c.getContext( '2d' ).imageSmoothingEnabled = false;
		return c;
	}

	function mirrorSprite( vertical, sprite ) {
		const ctx = newCanvas().getContext( '2d' );
		for ( let i = 0; i < imgHeight; i++ ) {
			for ( let j = 0; j < imgWidth; j++ ) {
				if ( vertical ) {
					ctx.drawImage( sprite,
						imgWidth - j - 1, i, 1, 1, // Source coords.
						j, i, 1, 1 // Canvas coords.
					);
				} else {
					ctx.drawImage( sprite,
						j, imgHeight - i - 1, 1, 1, // Source coords.
						j, i, 1, 1 // Canvas coords.
					);
				}
			}
		}
		return ctx.canvas;
	}

	function rotateSprite( sprite ) {
		const ctx = newCanvas().getContext( '2d' );
		for ( let i = 0; i < imgHeight; i++ ) {
			for ( let j = 0; j < imgHeight; j++ ) {
				ctx.drawImage( sprite,
					j, imgHeight - i - 1, 1, 1, // Source coords.
					i, j, 1, 1 // Canvas coords.
				);
			}
		}
		return ctx.canvas;
	}

	function indexNames( name ) {
		return Array.from( document.querySelectorAll( 'code[isSprite]' ) ).filter( ( ele ) => ele.innerText === name );
	}

	function markDuplicateNames( list ) {
		const names = list,
			processed = {};
		for ( let i = 0; i < names.length; i++ ) {
			if ( processed[ names[ i ] ] ) {
				continue;
			}
			processed[ names[ i ] ] = true;
			const eleList = indexNames( names[ i ] );
			const length = eleList.length;
			for ( let j = 0; j < length; j++ ) {
				eleList[ j ].classList.toggle( 'spriteedit-dupe', length > 1 );
			}
		}
	}

	function getTagsMode() {
		return tagsMode;
	}

	function getCurrentTag() {
		return tags[ document.querySelector( '.spriteedit-tag-select' ).selectedIndex ];
	}

	function getEditMode() {
		return editMode;
	}

	const generateSpriteNameElements = function ( spriteData, names, withBlank ) {
		const namesList = JSON.parse( JSON.stringify( names ) );
		if ( withBlank ) {
			namesList.push( [ '', {} ] );
		}
		const sourceEle = spriteData.element.querySelector( '.spritedoc-names' );
		sourceEle.innerHTML = '';
		for ( let i = 0; i < namesList.length; i++ ) {
			const codeEle = document.createElement( 'code' ),
				index = i,
				nameLiEle = document.createElement( 'li' );
			nameLiEle.className = 'spritedoc-name';
			if ( spriteData.id >= 0 ) {
				codeEle.setAttribute( 'contenteditable', getEditMode() && !kioskMode );
				codeEle.setAttribute( 'issprite', '' );
			}
			codeEle.innerText = namesList[ i ][ 0 ];
			if ( namesList[ i ][ 0 ] ) {
				for ( const tagName in namesList[ i ][ 1 ] ) {
					if ( namesList[ i ][ 1 ][ tagName ] ) {
						// eslint-disable-next-line mediawiki/class-doc
						codeEle.classList.toggle( 'spritedoc-' + tagName, true );
					}
				}
			}
			nameLiEle.append( codeEle );
			if ( withBlank && i + 1 === namesList.length ) {
				codeEle.setAttribute( 'placeholder', 'Placeholder text' );
			}
			codeEle.addEventListener( 'paste', ( e ) => {
				e.preventDefault();
				let paste = ( e.clipboardData || window.clipboardData ).getData( 'text' );
				paste = paste.replace( /\n/g, ' ' ).trim();
				window.document.execCommand( 'insertText', false, paste );
			} );
			codeEle.addEventListener( 'focus', ( e ) => {
				e.preventDefault();
				if ( !getEditMode() ) {
					codeEle.blur();
					return;
				}
				codeEle.closest( '.spritedoc-box' ).removeAttribute( 'draggable' );
				if ( getTagsMode() ) {
					const currentTag = getCurrentTag(),
						tagStats = names[ index ][ 1 ];
					tagStats[ currentTag ] = !tagStats[ currentTag ];
					// eslint-disable-next-line mediawiki/class-doc
					codeEle.classList.toggle( 'spritedoc-' + currentTag, tagStats[ currentTag ] );
					codeEle.blur();
					return;
				}
				codeEle.setAttribute( 'data-original-text', codeEle.textContent );
			} );
			codeEle.addEventListener( 'blur', ( e ) => {
				e.preventDefault();
				if ( getEditMode() && !kioskMode ) {
					codeEle.closest( '.spritedoc-box' ).setAttribute( 'draggable', 'true' );
				}
				const orgT = codeEle.getAttribute( 'data-original-text' );
				codeEle.removeAttribute( 'data-original-text' );
				codeEle.removeAttribute( 'placeholder' );
				codeEle.innerText = codeEle.innerText.trim();
				if ( orgT === '' && !codeEle.innerText.length ) {
					codeEle.closest( '.spritedoc-names' ).removeChild( codeEle.parentElement );
					return;
				}
				if ( !getEditMode() || getTagsMode() || orgT === codeEle.innerText ) {
					return;
				}
				if ( codeEle.innerText.length ) {
					namesList[ index ][ 0 ] = codeEle.innerText;
				} else {
					if ( namesList.length === 1 ) {
						spriteData.delete();
						markDuplicateNames( [ orgT ] );
						return;
					}
					namesList.splice( index, 1 );
				}
				spriteData.Names = namesList;
			} );
			sourceEle.append( nameLiEle );
		}
		if ( withBlank ) {
			sourceEle.lastChild.children[ 0 ].focus();
		}
	};

	const addSprite = function ( sprite, isNewBtn ) {
		const liEle = document.createElement( 'li' );
		liEle.className = 'spritedoc-box';
		sprite.element = liEle;
		if ( !isNewBtn ) {
			sprites[ sprite.id ] = sprite;
			liEle.dataset.pos = sprite.id;
			if ( editMode ) {
				liEle.setAttribute( 'draggable', 'true' );
			}
			liEle.dataset.sortKey = sprite.names[ 0 ][ 0 ];
		}

		const imageEleOuter = document.createElement( 'div' );
		imageEleOuter.className = 'spritedoc-image';

		if ( !isNewBtn ) {
			imageEleOuter.onclick = function ( e ) {
				openDialog( sprites[ e.target.closest( '.spritedoc-box' ).dataset.pos ] );
			};
		}

		const imageEleInner = document.createElement( 'span' );
		if ( isNewBtn ) {
			imageEleInner.className = 'new-sprite-btn';
			imageEleOuter.onclick = function () {
				const input = document.createElement( 'input' );
				input.type = 'file';
				input.setAttribute( 'multiple', '' );
				input.setAttribute( 'accept', 'image/*' );
				input.onchange = function ( f ) {
					handleFileUpload( f.target.files, sprite.myData );
				};
				input.click();
			};
		} else {
			imageEleInner.className = 'sprite';
			imageEleInner.append( sprite.image );
		}
		imageEleOuter.append( imageEleInner );

		const namesUlEle = document.createElement( 'ul' );
		namesUlEle.className = 'spritedoc-names';
		liEle.append( imageEleOuter, namesUlEle );
		generateSpriteNameElements( sprite, sprite.names, false );

		const hoverEle = document.createElement( 'span' );
		if ( !isNewBtn && editMode ) {
			hoverEle.className = 'spriteedit-add-name';
			hoverEle.onclick = function () {
				generateSpriteNameElements( sprite, sprite.names, true );
			};
			liEle.ondragstart = function ( e ) {
				e.target.setAttribute( 'ghost', 'true' );
				e.dataTransfer.setData( 'Text', e.target.dataset.pos );
				const customDragImage = document.createElement( 'canvas' );
				customDragImage.width = 96;
				customDragImage.height = 96;
				const customDragImageCtx = customDragImage.getContext( '2d' );
				customDragImageCtx.drawImage( sprite.image,
					0, 0, imgWidth, imgHeight,
					0, 0, 96, 96
				);
				e.dataTransfer.setDragImage( customDragImage, 0, 0 );
			};
		}

		liEle.append( hoverEle );
		sections[ sprite.sectionId ].element.querySelector( '.spritedoc-boxes' ).append( liEle );
		markDuplicateNames( Array.from( sprite.names, ( a ) => a[ 0 ] ) );
		if ( !inLoadingProcess ) {
			sortSection( sprite.sectionId );
		}
	};

	const changeImage = function ( sprite, canvasElement ) {
		sprite.image = canvasElement;
		const ele = sprite.element.querySelector( '.sprite' );
		ele.innerHTML = '';
		ele.append( canvasElement );
	};

	const moveSpriteToSection = function ( sprite, newSection ) {
		document.querySelector( 'div[data-section-id="' + newSection + '"] > .spritedoc-boxes' ).append( sprite.element );
		sortSection( newSection );
	};

	const removeSprite = function ( sprite ) {
		delete sprites[ sprite.id ];
		sprite.element.remove();
		markDuplicateNames( Array.from( sprite.names, ( a ) => a[ 0 ] ) );
	};

	const renameSprite = function ( sprite, names ) {
		let allNames = Array.from( sprites[ sprite.id ].names, ( a ) => a[ 0 ] );
		allNames = allNames.concat( names );
		sprites[ sprite.id ].names = names.sort(
			( a, b ) => ( a[ 0 ] > b[ 0 ] ) - ( a[ 0 ] < b[ 0 ] )
		);
		sprite.element.dataset.dataSortKey = sprites[ sprite.id ].names[ 0 ];
		generateSpriteNameElements(
			sprite,
			names,
			false
		);
		markDuplicateNames( allNames );
		sortSection( sprite.SectionId );
	};

	function loadImage( file, canvasEle ) {
		const reader = new FileReader();
		reader.onloadend = function ( readerEvent ) {
			const imgEle = document.createElement( 'img' );
			imgEle.src = readerEvent.target.result;
			imgEle.addEventListener( 'load', () => {
				canvasEle.getContext( '2d' ).drawImage( imgEle,
					0, 0, imgEle.naturalWidth || imgEle.width,
					imgEle.naturalHeight || imgEle.height, // Source coords.
					0, 0,
					imgWidth, imgHeight // Canvas coords.
				);
			} );
		};
		reader.readAsDataURL( file );
	}

	// Classes

	class Sprite {
		constructor( name, sectionId, id, image, skipHistory ) {
			if ( !name || !name.length ) {
				throw new Error( 'Please specify a name.' );
			}
			if ( typeof sectionId !== 'number' ) {
				throw new Error( 'The section-id must be a number.' );
			}
			if ( !sections[ sectionId ] ) {
				throw new Error( 'Section "' + sectionId + '" not present. Please create it first.' );
			}
			if ( id ) {
				this.customId = true;
			}
			const lastSpriteIdOrg = lastSpriteId;
			let nextSpriteId = lastSpriteId + 1;
			if ( nextSpriteId === posSprite ) {
				nextSpriteId++;
			}
			this.id = id || nextSpriteId;
			this.image = newCanvas();
			if ( ( image ? image.tagName : '' ) === 'CANVAS' ) {
				this.image = image;
			} else if ( image ) {
				loadImage( image, this.image );
			}
			this.names = [ [ name, {} ] ];
			this.sectionId = sectionId;
			const myData = this;
			if ( !skipHistory ) {
				addHistory( [
					function () {
						removeSprite( myData );
						if ( !this.customId ) {
							lastSpriteId = lastSpriteIdOrg;
						}
					},
					function () {
						addSprite( myData, false );
						if ( !this.customId ) {
							lastSpriteId = nextSpriteId;
						}
					}
				] );
			} else {
				addSprite( myData, false );
				if ( !this.customId ) {
					lastSpriteId = nextSpriteId;
				}
			}
		}

		delete() {
			const myData = this;
			addHistory( [
				function () {
					delete backgroundSprites[ myData.id ];
					addSprite( myData, false );
				},
				function () {
					backgroundSprites[ myData.id ] = myData.image;
					removeSprite( myData );
				}
			] );
		}

		download() {
			const downloadElement = document.createElement( 'a' ),
				myData = this;
			downloadElement.crossOrigin = '*';
			downloadElement.setAttribute( 'href', myData.image.toDataURL( 'image/png' ) );
			downloadElement.setAttribute( 'download', myData.names[ 0 ][ 0 ] + '.png' );
			downloadElement.click();
		}

		mirrorSprite( vertical ) {
			this.Image = mirrorSprite( vertical, this.image );
		}

		get Names() {
			return Array.from( this.names );
		}

		set Names( newNames ) {
			const myData = this,
				oldNames = this.names;
			addHistory( [
				function () {
					renameSprite( myData, oldNames );
				},
				function () {
					renameSprite( myData, newNames );
				}
			] );
		}

		get PosId() {
			return this.id;
		}

		set PosId( position ) {
			const myData = this,
				orgPos = this.id;
			if ( sprites[ position ] ) { // If exists, only switch sprites
				addHistory( [
					function () {
						sprites[ orgPos ].id = position;
						sprites[ position ] = sprites[ orgPos ];
						myData.id = orgPos;
						sprites[ orgPos ] = myData;
						backgroundSprites[ position ] = myData.image;
						delete backgroundSprites[ orgPos ];
					},
					function () {
						sprites[ position ].id = orgPos;
						sprites[ orgPos ] = sprites[ position ];
						myData.id = position;
						sprites[ position ] = myData;
						backgroundSprites[ orgPos ] = myData.image;
						delete backgroundSprites[ position ];
					}
				] );
				return;
			}
			addHistory( [
				function () {
					delete sprites[ myData.id ];
					myData.id = orgPos;
					sprites[ orgPos ] = myData;
					backgroundSprites[ position ] = myData.image;
					delete backgroundSprites[ orgPos ];
				},
				function () {
					delete sprites[ myData.id ];
					myData.id = position;
					sprites[ position ] = myData;
					backgroundSprites[ orgPos ] = myData.image;
					delete backgroundSprites[ position ];
				}
			] );
		}

		rotateSprite( dir ) {
			if ( dir === -1 ) {
				this.Image = rotateSprite( rotateSprite( rotateSprite( this.image ) ) );
			} else if ( dir === 1 ) {
				this.Image = rotateSprite( this.image );
			}
		}

		get SectionId() {
			return this.sectionId;
		}

		set SectionId( newSection ) {
			const myData = this,
				oldSection = this.sectionId;
			addHistory( [
				function () {
					moveSpriteToSection( myData, oldSection );
				},
				function () {
					moveSpriteToSection( myData, newSection );
				}
			] );
		}

		toggleDefault() {
			const myData = this,
				current = this.element.dataset.default,
				previous = rootElement.querySelector( 'li[data-default]' );
			addHistory( [
				function () {
					delete myData.element.dataset.default;
					posSprite = 1;
					if ( previous ) {
						previous.dataset.default = true;
						posSprite = previous.dataset.pos;
					}
				},
				function () {
					if ( previous ) {
						delete previous.dataset.default;
						posSprite = 1;
					}
					if ( !current ) {
						myData.element.dataset.default = true;
						posSprite = myData.element.default.pos;
					}
				}
			] );
		}

		replaceImage() {
			const input = document.createElement( 'input' ),
				myData = this;
			input.type = 'file';
			input.setAttribute( 'accept', 'image/*' );
			input.onchange = function ( f ) {
				const canvasEle = newCanvas(),
					oldCanvas = myData.image;
				loadImage( f.target.files[ 0 ], canvasEle );
				addHistory( [
					function () {
						changeImage( myData, oldCanvas );
					},
					function () {
						changeImage( myData, canvasEle );
					}
				] );
			};
			input.click();
		}
	}

	class Section {
		constructor( name, id ) {
			const canvasEle = newCanvas(),
				myData = this,
				orgLength = sections.length;
			this.sectionName = name;
			this.id = id;
			if ( typeof this.id !== 'number' ) {
				this.id = sections.length;
			}
			addHistory( [
				function () {
					removeSection( myData );
					sections.length = orgLength;
				},
				function () {
					addSection( myData );
					if ( getEditMode() && !kioskMode ) {
						addSprite( {
							id: -1,
							image: canvasEle,
							myData: myData,
							names: [ [ mw.message( 'interwiki_addbutton' ).plain(), {} ] ],
							sectionId: myData.id
						}, true );
					}
				}
			] );
		}

		delete() {
			const myData = this,
				orgEle = myData.element,
				orgPos = Array.from( orgEle.parentElement.children ).indexOf( orgEle ),
				elementAfter = orgEle.parentElement.children[ orgPos + 1 ],
				sidemenuContainer = document.querySelector( '.sidemenu-sections' );
			addHistory( [
				function () {
					if ( elementAfter ) {
						mainViewEle.insertBefore( orgEle, elementAfter );
						sidemenuContainer.insertBefore(
							myData.sidebar,
							sections[ elementAfter.dataset.sectionId ].sidebar
						);
					} else {
						mainViewEle.append( orgEle );
						sidemenuContainer.append( myData.sidebar );
					}
					const attachedSprites = orgEle.querySelectorAll( '.spritedoc-box[data-pos]' );
					for ( const element of attachedSprites ) {
						delete backgroundSprites[ element.dataset.pos ];
					}
				},
				function () {
					const attachedSprites = orgEle.querySelectorAll( '.spritedoc-box[data-pos]' );
					for ( const element of attachedSprites ) {
						backgroundSprites[
							element.dataset.pos
						] = sprites[ element.dataset.pos ].image;
					}
					myData.sidebar.remove();
					orgEle.remove();
				}
			] );
		}

		set name( newName ) {
			const myData = this,
				oldName = this.sectionName;
			addHistory( [
				function () {
					renameSection( myData, oldName );
				},
				function () {
					renameSection( myData, newName );
				}
			] );
		}

		get name() {
			return this.sectionName;
		}

		get SectionId() {
			return this.id;
		}

		set SectionId( position ) {
			const myData = this,
				orgPos = this.id;
			addHistory( [
				function () {
					delete sections[ myData.id ];
					myData.id = orgPos;
					sections[ orgPos ] = myData;
				},
				function () {
					delete sections[ myData.id ];
					myData.id = position;
					sections[ position ] = myData;
				}
			] );
		}
	}

	handleFileUpload = function ( files, sectionData ) {
		const orgSpritesLength = sprites.length,
			spritesAdded = [];
		addHistory( [
			function () {
				for ( let i = 0; i < spritesAdded.length; i++ ) {
					removeSprite( spritesAdded[ i ] );
				}
				sprites.length = orgSpritesLength;
			},
			function () {
				for ( let i = 0; i < spritesAdded.length; i++ ) {
					addSprite( spritesAdded[ i ], false );
				}
			}
		], true );
		Array.prototype.forEach.call( files, ( file ) => {
			spritesAdded.push( new Sprite( file.name, sectionData.id, null, file, true ) );
		} );
	};

	function toggleTagsMode() {
		tagsMode = !tagsMode;
		return tagsMode;
	}

	function selectTag( name ) {
		const index = tags.indexOf( name );
		if ( index < 0 ) {
			return 'Tag not found.';
		}
		document.querySelector( '.spriteedit-tag-select' ).selectedIndex = index;
	}
	function loadModuleEvent( e ) {
		const root = e.target.closest( '.previewBox' ),
			historyUrl = new URL( window.location );
		loadedSpriteName = moduleList[ root.dataset.index ];
		historyUrl.searchParams.set( 'sprite', loadedSpriteName.full );
		window.history.pushState( {}, '', historyUrl );
		resetEditor();
		editMode = true;
		loadJSON();
	}
	function loadModule( m ) {
		const params = window.Object.assign( {}, loadModuleBase );
		params.content = 'local require2=require\nfunction require() return {getUrl=function() return true end} end\nlocal a = require2("Module:' + moduleList[ m ].full + '")\nrequire=require2\n' +
		'return type(a) == "table" and a.settings and mw.text.jsonEncode(a) or "{}"';
		api.postWithEditToken( params ).always( ( a ) => {
			if ( openViewEle.style.display !== 'unset' || !a.return ) {
				return;
			}
			const imgEle = document.createElement( 'a' ),
				nameEle = document.createElement( 'a' ),
				outerEle = openViewEle.appendChild( document.createElement( 'div' ) );
			imgEle.style.backgroundImage = 'url(' + config.wgArticlePath.replace( '$1', 'Special:FilePath/' ) + ( JSON.parse( a.return ).settings.image || moduleList[ m ].name + '.png' ) + ')';
			imgEle.addEventListener( 'click', loadModuleEvent );
			nameEle.innerText = moduleList[ m ].name;
			nameEle.addEventListener( 'click', loadModuleEvent );
			outerEle.className = 'previewBox';
			outerEle.dataset.index = m;
			outerEle.dataset.sprite = 'Module:' + moduleList[ m ].full;
			outerEle.append( imgEle, nameEle );
			if ( openViewEle.style.display !== 'unset' ) {
				return;
			} else if ( moduleList[ m + 1 ] ) {
				loadModule( m + 1 );
			}
		} );
	}
	function loadModules( c ) {
		api.get( window.Object.assign( {}, loadModulesBase, c || {} ) ).done( ( data ) => {
			const pages = data.query.allpages;
			for ( let i = 0; i < pages.length; i++ ) {
				const names = seperatePath( pages[ i ].title );
				if ( names.module.slice( -6 ) === 'Sprite' &&
				!Array.prototype.includes.call( blacklist, names.module.toLowerCase() ) ) {
					moduleList.push( {
						full: names.full,
						module: names.module,
						name: names.name
					} );
				}
			}
			if ( openViewEle.style.display !== 'unset' ) {
				return;
			} else if ( data.continue ) {
				loadModules( data.continue );
				return;
			} else if ( moduleList[ 0 ] ) {
				loadModule( 0 );
			}
		} );
	}

	function updateOpenView() {
		moduleList.length = 0;
		openViewEle.innerText = '';
		loadModules();
	}

	function changeView( view ) {
		if ( view !== 'main' && document.querySelector( '#sidemenu2CleanupIds' ) ) {
			updateOptions();
		}
		diffViewEle.style.display = view === 'diff' ? 'unset' : 'none';
		mainViewEle.style.display = view === 'main' ? 'unset' : 'none';
		openViewEle.style.display = view === 'open' ? 'unset' : 'none';
		createToolbar();
		createSidemenu();
	}

	function createTagSelect() {
		const org = document.querySelector( '.spriteedit-tag-select' ),
			a = document.createElement( 'select' );
		a.className = 'cdx-select spriteedit-tag-select';
		a.disabled = !editMode || mainViewEle.style.display !== 'unset';
		for ( let index = 0; index < tags.length; index++ ) {
			const optEle = document.createElement( 'option' );
			optEle.value = tags[ index ];
			optEle.innerText = tagsDisplay[ index ];
			a.append( optEle );
		}
		if ( org ) {
			a.selectedIndex = org.selectedIndex;
			org.remove();
		}
		return a;
	}

	function createToolbar() {
		if ( kioskMode ) {
			return;
		}
		const oldToolbar = rootElement.querySelector( '.spriteedit-toolbar' ),
			tagSelectEle = createTagSelect(),
			toolbarOuter = document.createElement( 'div' );
		toolbarOuter.className = 'spriteedit-toolbar';
		if ( oldToolbar ) {
			oldToolbar.replaceWith( toolbarOuter );
		} else {
			rootElement.append( toolbarOuter );
		}
		const toolbarSection1 = document.createElement( 'div' ),
			toolbarSection2 = document.createElement( 'div' );
		toolbarSection1.className = 'spriteedit-toolbar-section';
		toolbarSection2.className = 'spriteedit-toolbar-section';

		const openViewBtn = document.createElement( 'button' );
		openViewBtn.className = 'cdx-button cdx-button--icon-only';
		openViewBtn.ariaLabel = i18n.msg( 'open-label' ).plain();
		openViewBtn.title = i18n.msg( 'open-hover' ).plain();
		openViewBtn.disabled = openViewEle.style.display === 'unset';
		openViewBtn.innerHTML = '<span class="cdx-custom-icon cdx-custom-icon-folderplaceholder"></span>';
		openViewBtn.onclick = function () {
			changeView( 'open' );
			updateOpenView();
		};

		const undoBtn = document.createElement( 'button' );
		undoBtn.className = 'cdx-button cdx-button--icon-only';
		undoBtn.id = 'btn-undo';
		undoBtn.ariaLabel = mw.message( 'editundo' ).plain();
		undoBtn.title = mw.message( 'editundo' ).plain();
		undoBtn.disabled = !editMode || historyPos === 0 || mainViewEle.style.display !== 'unset';
		undoBtn.innerHTML = '<span class="cdx-custom-icon cdx-custom-icon-undo"></span>';
		undoBtn.onclick = function () {
			moveHistory( -1 );
		};
		const redoBtn = document.createElement( 'button' );
		redoBtn.className = 'cdx-button cdx-button--icon-only';
		redoBtn.id = 'btn-redo';
		redoBtn.ariaLabel = i18n.msg( 'redo-label' ).plain();
		redoBtn.title = i18n.msg( 'redo-hover' ).plain();
		redoBtn.disabled = !editMode || historyPos === editHistory.length || mainViewEle.style.display !== 'unset';
		redoBtn.innerHTML = '<span class="cdx-custom-icon cdx-custom-icon-redo"></span>';
		redoBtn.onclick = function () {
			moveHistory( 1 );
		};
		toolbarSection2.append( undoBtn, redoBtn );

		const flagBtn = document.createElement( 'button' );
		flagBtn.className = 'cdx-button cdx-button--icon-only';
		flagBtn.ariaLabel = i18n.msg( 'mark-deprecated-label' ).plain();
		flagBtn.title = i18n.msg( 'mark-deprecated-hover' ).plain();
		flagBtn.disabled = !editMode || mainViewEle.style.display !== 'unset';
		flagBtn.innerHTML = '<span class="cdx-custom-icon cdx-custom-icon-unflag"></span>';
		flagBtn.onclick = function () {
			const newClass = toggleTagsMode() ? 'cdx-custom-icon-flag' : 'cdx-custom-icon-unflag';
			// eslint-disable-next-line mediawiki/class-doc
			flagBtn.children[ 0 ].className = 'cdx-custom-icon ' + newClass;
		};

		const newSectionBtn = document.createElement( 'button' );
		newSectionBtn.className = 'cdx-button cdx-button--icon-only';
		newSectionBtn.ariaLabel = mw.message( 'skin-action-addsection' ).plain();
		newSectionBtn.title = mw.message( 'skin-action-addsection' ).plain();
		newSectionBtn.disabled = !editMode || mainViewEle.style.display !== 'unset';
		newSectionBtn.innerHTML = '<span class="cdx-custom-icon cdx-custom-icon-tableaddrowafter"></span>';
		newSectionBtn.onclick = function () {
			// eslint-disable-next-line no-unused-vars
			const newSec = new Section( 'New section' );
		};

		const mainViewBtn = document.createElement( 'button' );
		mainViewBtn.className = 'cdx-button cdx-button--icon-only';
		mainViewBtn.ariaLabel = mw.message( 'mainpage-description' ).plain();
		mainViewBtn.title = mw.message( 'mainpage-description' ).plain();
		mainViewBtn.disabled = !loadedSpriteName.full.length || mainViewEle.style.display === 'unset';
		mainViewBtn.innerHTML = '<span class="cdx-custom-icon cdx-custom-icon-article"></span>';
		mainViewBtn.onclick = function () {
			changeView( 'main' );
		};

		const diffBtn = document.createElement( 'button' );
		diffBtn.className = 'cdx-button cdx-button--icon-only';
		diffBtn.ariaLabel = mw.message( 'showdiff' ).plain();
		diffBtn.title = mw.message( 'showdiff' ).plain();
		diffBtn.disabled = !editMode || !loadedSpriteName.full.length || diffViewEle.style.display === 'unset';
		diffBtn.innerHTML = '<span class="cdx-custom-icon cdx-custom-icon-checkall"></span>';
		diffBtn.onclick = function () {
			changeView( 'diff' );
			const postArgs = {
				action: 'compare',
				format: 'json',
				formatversion: 2,
				prop: 'diff',
				'tocontentformat-main': 'text/plain',
				'tocontentmodel-main': 'Scribunto',
				toslots: 'main'
			};
			diffViewEle.innerHTML =
				`<div class="spriteedit-sheet-diff">
					<span class="spriteedit-old-sheet"></span>
					<span class="spriteedit-new-sheet"></span>
				</div>
				<table class="diff diff-tbl">
					<colgroup>
						<col class="diff-marker" />
						<col class="diff-content" />
						<col class="diff-marker" />
						<col class="diff-content" />
					</colgroup>
					<tbody>
					</tbody>
				</table>`;
			const [ oldImage, newImage, hasChanges ] = generateImage();
			diffViewEle.querySelector( '.spriteedit-sheet-diff' ).style.display = hasChanges ? 'flex' : 'none';
			if ( hasChanges ) {
				diffViewEle.querySelector( '.spriteedit-old-sheet' ).replaceChildren( oldImage );
				diffViewEle.querySelector( '.spriteedit-new-sheet' ).replaceChildren( newImage );
			}
			postArgs[ 'totext-main' ] = processData( generateJSON() );
			if ( options.isNew ) {
				postArgs[ 'fromtext-main' ] = '';
				postArgs.fromslots = 'main';
				postArgs[ 'fromcontentmodel-main' ] = 'Scribunto';
				postArgs[ 'fromcontentformat-main' ] = 'text/plain';
			} else {
				postArgs.fromtitle = 'Module:' + loadedSpriteName.full;
			}
			api.post( postArgs ).done( ( e ) => {
				const ele2 = diffViewEle.querySelector( '.diff-tbl' );
				if ( !ele2 ) {
					return;
				}
				ele2.tBodies[ 0 ].innerHTML = e.compare.body;
			} );
		};
		toolbarSection1.append( openViewBtn, mainViewBtn, diffBtn );
		toolbarSection2.append( newSectionBtn, flagBtn, tagSelectEle );
		toolbarOuter.append( toolbarSection1, toolbarSection2 );
	}

	function createCdxInput( type, id, lbl, placeholder, value ) {
		const div = document.createElement( 'div' );
		div.className = 'cdx-field';
		div.innerHTML =
			`<div class="cdx-label">
				<label class="cdx-label__label">
					<span class="cdx-label__label__text"></span>
				</label>
			</div>
			<div class="cdx-field__control">
				<div class="cdx-text-input">
					<input
					class="cdx-text-input__input"
					aria-describedby="cdx-description"
					/>
				</div>
			</div>`;

		div.querySelector( '.cdx-label__label' ).setAttribute( 'for', id );
		div.querySelector( '.cdx-label__label__text' ).textContent = lbl;
		div.querySelector( '.cdx-text-input__input' ).id = id;
		div.querySelector( '.cdx-text-input__input' ).type = type || 'text';
		div.querySelector( '.cdx-text-input__input' ).placeholder = placeholder;
		div.querySelector( '.cdx-text-input__input' ).value = value || 0;

		return div;
	}

	function createCdxLabel( id, lbl, disabled ) {
		const div = createCdxInput( 'text', id, lbl, '', '' );
		div.querySelector( '.cdx-text-input__input' ).value = '';
		div.querySelector( '.cdx-text-input__input' ).disabled = disabled;

		return div;
	}

	function createCdxToggleSwitch( id, lbl ) {
		const span = document.createElement( 'span' );
		span.className = 'cdx-toggle-switch cdx-toggle-switch--align-switch';
		span.innerHTML =
			`<input class="cdx-toggle-switch__input" id="${ id }" type="checkbox">
			<span class="cdx-toggle-switch__switch">
				<span class="cdx-toggle-switch__switch__grip"></span>
			</span>
			<div class="cdx-toggle-switch__label cdx-label">
				<label class="cdx-label__label" for="${ id }">
					<span class="cdx-label__label__text"></span>
				</label>
			</div>`;
		span.querySelector( '.cdx-toggle-switch__input' ).id = id;
		span.querySelector( '.cdx-label__label' ).setAttribute( 'for', id );
		span.querySelector( '.cdx-label__label__text' ).textContent = lbl;
		return span;
	}

	let oldTimeout,
		requestState = false,
		lastInput = '';
	function completeName( a ) {
		if ( a.module.slice( -6 ) === 'Sprite' ) {
			return a;
		}
		a.all[ 0 ] += 'Sprite';
		a.full = a.all.join( '/' );
		a.module += 'Sprite';
		return a;
	}
	function toggleOkayBtn( state ) {
		const okButton = document.querySelector( '#sidemenu0createbtn' );
		if ( !okButton ) {
			return;
		}
		if ( !requestState || document.querySelectorAll( '[id^="sidemenu0"]:placeholder-shown' ).length ) {
			state = true;
		}
		okButton.classList[ state ? 'remove' : 'add' ]( 'cdx-button--fake-button--enabled' );
		okButton.classList[ state ? 'add' : 'remove' ]( 'cdx-button--fake-button--disabled' );
	}
	function sidemenuNewBtnAction( e ) { // Event for sidemenu0imagename
		const moduleName = config.wgFormattedNamespaces[ 828 ];
		requestState = false;
		if ( oldTimeout ) {
			clearTimeout( oldTimeout );
		}
		toggleOkayBtn( true );
		const names = completeName( seperatePath( e.target.value ) );
		lastInput = names.full;
		if ( e.target.value.length &&
			!Array.prototype.includes.call( blacklist, names.module.toLowerCase() ) ) {
			oldTimeout = setTimeout( () => {
				api.get( {
					action: 'query',
					format: 'json',
					formatversion: '2',
					titles: moduleName + ':' + names.full + '|File:' + names.name + '.png'
				} ).done( ( data ) => {
					if ( data.query.pages[ 1 ].title.toLowerCase() === ( moduleName + ':' + lastInput ).toLowerCase() &&
					data.query.pages[ 0 ].missing &&
					data.query.pages[ 1 ].missing ) {
						requestState = true;
					}
					toggleOkayBtn( false );
				} );
			}, 1000 );
		} else {
			oldTimeout = undefined;
		}
	}
	function sidemenuSaveBtnAction( e ) { // Event for sidemenu4summary
		const name = e.target.value,
			btn = document.querySelector( '#sidemenu4create' );
		btn.classList[ name.length ? 'add' : 'remove' ]( 'cdx-button--fake-button--enabled' );
		btn.classList[ name.length ? 'remove' : 'add' ]( 'cdx-button--fake-button--disabled' );
	}
	function saveJSON( summary, data, generatedJSON ) {
		api.postWithEditToken( {
			action: 'edit',
			contentformat: 'text/plain',
			contentmodel: 'Scribunto',
			formatversion: 2,
			notminor: true,
			recreate: true,
			summary: summary,
			tags: hasTagPermission && 'spriteeditor' || undefined,
			text: data,
			title: 'Module:' + loadedSpriteName.full
		} ).always( ( d ) => {
			if ( typeof d !== 'object' ) {
				mw.notify( d || 'Unknown error', {
					title: 'SpriteEditor',
					autoHide: true
				} );
				return;
			}
			let msgString = '';
			if ( d.edit.oldrevid ) { // Changed
				msgString = 'postedit-confirmation-saved';
			} else { // Created
				msgString = 'postedit-confirmation-created';
			}
			// eslint-disable-next-line mediawiki/msg-doc
			mw.notify( mw.message( msgString, config.wgUserName, d.edit.newrevid ).plain(), {
				title: 'SpriteEditor',
				autoHide: true
			} );
			options.isNew = false;
			output = generatedJSON;
			historyPosSaved = editHistory[ historyPos - 1 ];
			updateTitle( false );
			changeView( 'main' );
		} );
	}
	function addMissingTag( summary, data, generatedJSON ) {
		if ( !hasNewTagPermission ) {
			saveJSON( summary, data, generatedJSON );
			return;
		}
		api.postWithEditToken( {
			action: 'managetags',
			format: 'json',
			formatversion: '2',
			ignorewarnings: true,
			operation: 'create',
			reason: 'Add missing tag for [[w:c:dev:SpriteEditor|SpriteEditor]]',
			tag: 'spriteeditor'
		} ).always( () => {
			saveJSON( summary, data, generatedJSON );
		} );
	}

	function toggleSidemenu() {
		document.querySelector( '.spriteedit-sidemenu' ).classList.toggle( 'open' );
		document.querySelector( '.spriteedit-sidemenu-button' ).classList.toggle( 'open' );
	}
	function selectSidemenuTab( tabName ) {
		Array.prototype.forEach.call( document.querySelectorAll( '.spriteedit-sidemenu .cdx-tabs__list__item' ), ( ( item ) => {
			item.ariaSelected = 'false';
		} ) );
		document.querySelector( '.cdx-tabs__list__item[value="' + tabName + '"]' ).ariaSelected = 'true';

		Array.prototype.forEach.call( document.querySelectorAll( '.spriteedit-sidemenu .cdx-tabs__content section' ), ( ( item ) => {
			item.ariaHidden = 'true';
		} ) );
		document.querySelector( '.spriteedit-sidemenu .cdx-tabs__content [id="' + tabName + '"]' ).ariaHidden = 'false';
	}
	function createSidemenuTab( index, name ) {
		const tabBtnEle = document.createElement( 'button' );
		tabBtnEle.ariaSelected = 'false';
		tabBtnEle.ariaControls = 'sidemenu-tab-' + index;
		tabBtnEle.className = 'cdx-tabs__list__item';
		tabBtnEle.id = 'sidemenu-tab-' + index + '-label';
		tabBtnEle.innerText = name;
		tabBtnEle.value = 'sidemenu-tab-' + index;

		const tabContentEle = document.createElement( 'section' );
		tabContentEle.ariaHidden = 'true';
		tabContentEle.ariaLabelledby = 'sidemenu-tab-' + index + '-label';
		tabContentEle.className = 'cdx-tab';
		tabContentEle.id = 'sidemenu-tab-' + index;
		tabContentEle.role = 'tab';
		tabContentEle.tabindex = '-1';

		return [ tabBtnEle, tabContentEle ];
	}

	function createSidemenu() {
		if ( kioskMode ) {
			return;
		}
		const oldSidemenu = rootElement.querySelector( '.spriteedit-sidemenu' ),
			oldBtn = rootElement.querySelector( '.spriteedit-sidemenu-button' ),
			toggleBtnEle = document.createElement( 'div' ),
			outerEle = document.createElement( 'div' ),
			tabsEle = document.createElement( 'div' ),
			tabListEle = document.createElement( 'div' ),
			contentEle = document.createElement( 'div' );

		toggleBtnEle.className = 'spriteedit-sidemenu-button';
		toggleBtnEle.innerText = '<';
		outerEle.className = 'cdx-tabs spriteedit-sidemenu';
		tabsEle.className = 'cdx-tabs__header';
		tabListEle.className = 'cdx-tabs__list';
		tabListEle.role = 'tablist';
		tabListEle.tabindex = '-1';
		contentEle.className = 'cdx-tabs__content';

		toggleBtnEle.addEventListener( 'click', toggleSidemenu );

		tabsEle.addEventListener( 'click', ( e ) => {
			if ( e.target.value ) {
				selectSidemenuTab( e.target.value );
			}
		} );

		// New Tab
		const [ newTabBtn, newTabContent ] = createSidemenuTab( 0, mw.message( 'newpage' ).plain() ),
			newEle1 = createCdxLabel( 'sidemenu0imagename', i18n.msg( 'new-spritesheet' ).plain(), false ),
			newEle2 = createCdxInput( 'number', 'sidemenu0imagewidth', i18n.msg( 'sprite-width' ).plain(), '', 16 ),
			newEle3 = createCdxInput( 'number', 'sidemenu0imageheight', i18n.msg( 'sprite-height' ).plain(), '', 16 ),
			newEle4 = createCdxInput( 'number', 'sidemenu0imagespacing', i18n.msg( 'sprite-spacing' ).plain(), '', 0 ),
			newEle5 = createCdxButton( 'sidemenu0createbtn', i18n.msg( 'dialog-button-create' ).plain(), false ),
			sidemenu0func = ( e ) => {
				toggleOkayBtn( e.target.value.length === 0 );
			};
		newTabBtn.ariaSelected = 'true';
		newTabContent.ariaHidden = 'false';
		newTabContent.append( newEle1, newEle2, newEle3, newEle4, newEle5 );
		newEle1.querySelector( '.cdx-text-input__input' ).addEventListener( 'keyup', sidemenuNewBtnAction );
		newEle2.querySelector( '.cdx-text-input__input' ).addEventListener( 'change', sidemenu0func );
		newEle3.querySelector( '.cdx-text-input__input' ).addEventListener( 'change', sidemenu0func );
		newEle4.querySelector( '.cdx-text-input__input' ).addEventListener( 'change', sidemenu0func );
		newEle5.addEventListener( 'click', () => {
			if ( newEle5.classList.contains( 'cdx-button--fake-button--disabled' ) ) {
				return;
			}
			loadedSpriteName = completeName( seperatePath( newEle1.querySelector( '.cdx-text-input__input' ).value ) );
			const historyUrl = new URL( window.location );
			historyUrl.searchParams.set( 'sprite', loadedSpriteName.full );
			window.history.pushState( {}, '', historyUrl );
			resetEditor();
			editMode = true;
			imgWidth = Number( newEle2.querySelector( '.cdx-text-input__input' ).value );
			imgHeight = Number( newEle3.querySelector( '.cdx-text-input__input' ).value );
			options.spacing = Number( newEle4.querySelector( '.cdx-text-input__input' ).value );
			options.isNew = true;
			createBlankSprite();
			rootElement.querySelector( '.spriteedit-sidemenu' ).classList.remove( 'open' );
			rootElement.querySelector( '.spriteedit-sidemenu-button' ).classList.remove( 'open' );
		} );

		// Information Tab
		const [ informationTabBtn, informationTabContent ] = createSidemenuTab( 1, mw.message( 'pageinfo-header-basic' ).plain() ),
			ele1 = createCdxLabel( 'sidemenu1imagepath', i18n.msg( 'image-path' ).plain(), true ),
			ele2 = createCdxLabel( 'sidemenu1imagename', i18n.msg( 'spritesheet-name' ).plain(), true ),
			ele3 = createCdxLabel( 'sidemenu1imagewidth', mw.message( 'filehist-dimensions' ).plain(), true ),
			ele4 = createCdxInput( 'number', 'sidemenu1sprites', i18n.msg( 'sprite-per-row' ).plain(), '', Number( options.spritesPerRowOrg ) || 10 ),
			ele5 = createCdxInput( 'number', 'sidemenu1spacing', i18n.msg( 'sprite-spacing' ).plain(), '', Number( options.spacing ) || 0 ),
			ele6 = createCdxLabel( 'sidemenu1linkprefix', i18n.msg( 'link-prefix' ).plain(), true );
		ele1.querySelector( '.cdx-text-input__input' ).value = loadedSpriteName.full;
		ele2.querySelector( '.cdx-text-input__input' ).value = ( output.settings.image || loadedSpriteName.name ) + '.png';
		ele3.querySelector( '.cdx-text-input__input' ).value = mw.message( 'show-big-image-size', imgWidth, imgHeight ).plain();
		ele6.querySelector( '.cdx-text-input__input' ).value = output.settings.linkprefix || 'none';
		informationTabBtn.ariaSelected = 'true';
		informationTabContent.ariaHidden = 'false';
		informationTabContent.append( ele1, ele2, ele3, ele4, ele5, ele6 );

		// Settings Tab
		const [ settingsTabBtn, settingsTabContent ] = createSidemenuTab( 2, mw.message( 'mypreferences' ).plain() );
		settingsTabContent.append(
			createCdxToggleSwitch( 'sidemenu2CleanupIds', i18n.msg( 'cleanup-ids' ).plain() ),
			createCdxToggleSwitch( 'sidemenu2CleanupUnusedSprites', i18n.msg( 'remove-unused' ).plain() ),
			createCdxToggleSwitch( 'sidemenu2CleanupWhitespace', i18n.msg( 'remove-whitespace' ).plain() ),
			createCdxToggleSwitch( 'sidemenu2CleanupOldSprites', i18n.msg( 'remove-deprecated' ).plain() )
		);

		// Sort Sections Tab
		// Dragging https://www.youtube.com/watch?v=9HUlUnM3UG8
		const [ sectionsTabBtn, sectionsTabContent ] = createSidemenuTab( 3, i18n.msg( 'sort-section-label' ).plain() ),
			ulEle = document.createElement( 'ul' ),
			secList = document.querySelectorAll( '.spritedoc-section' );
		ulEle.className = 'sidemenu-sections';
		sectionsTabContent.append( ulEle );
		ulEle.addEventListener( 'dragover', ( e ) => {
			e.preventDefault();
			const nextSibling = [ ...ulEle.querySelectorAll( '.sidemenu-section:not(.dragging)' ) ].find(
				( sibling ) => ( e.clientY - 46 ) <= sibling.offsetTop + sibling.offsetHeight * 0.5
			);
			ulEle.insertBefore( ulEle.querySelector( '.dragging' ), nextSibling );
		} );
		ulEle.addEventListener( 'dragenter', ( e ) => {
			e.preventDefault();
		} );
		secList.forEach( ( sec ) => {
			ulEle.append( sections[ sec.dataset.sectionId ].sidebar );
		} );

		// Save Tab
		const [ saveTabBtn, saveTabContent ] = createSidemenuTab( 4, mw.message( 'upload-dialog-button-save' ).plain() ),
			saveEle1 = createCdxLabel( 'sidemenu4summary', mw.message( 'summary' ).plain(), false ),
			saveEle2 = createCdxButton( 'sidemenu4create', mw.message( 'savechanges' ).plain(), false );
		saveTabBtn.ariaSelected = 'true';
		saveTabContent.ariaHidden = 'false';
		saveTabContent.append( saveEle1, saveEle2 );
		saveEle1.querySelector( '.cdx-text-input__input' ).addEventListener( 'keyup', sidemenuSaveBtnAction );
		saveEle2.addEventListener( 'click', () => {
			if ( saveEle2.classList.contains( 'cdx-button--fake-button--disabled' ) ) {
				return;
			}
			const gIVars = generateImage(),
				generatedJSON = generateJSON();
			const data = processData( generatedJSON );
			if ( !gIVars[ 2 ] ) { // If nothing changed
				addMissingTag( saveEle1.querySelector( '.cdx-text-input__input' ).value, data, generatedJSON );
				return;
			}
			const filename = output.settings.image || loadedSpriteName.name + '.png';
			gIVars[ 1 ].toBlob( ( blob ) => {
				api.upload( blob, {
					checkstatus: true,
					comment: saveEle1.querySelector( '.cdx-text-input__input' ).value,
					filename: filename,
					formatversion: 2,
					ignorewarnings: true
				} ).always(
					( msg ) => {
						if ( msg.toLowerCase() !== filename ) {
							mw.notify( msg || 'Unknown error', {
								title: 'SpriteEditor',
								autoHide: true
							} );
						}
						setupOldCanvas( gIVars[ 0 ] );
						addMissingTag( saveEle1.querySelector( '.cdx-text-input__input' ).value, data, generatedJSON );
					}
				);
			} );
		} );
		// About Tab
		const [ aboutTabBtn, aboutTabContent ] = createSidemenuTab( 5, mw.message( 'about' ).plain() );
		aboutTabContent.innerHTML = '© Magiczocker ' + ( new Date().getFullYear() ) + '<br><br>Tester: Kingcat<br>Helper: MarkusRost<br><br>Inspired by: <a href="https://help.fandom.com/wiki/User:Majr/Sprite_editor">Sprite Editor</a>';

		if ( loadedSpriteName.full.length && mainViewEle.style.display === 'unset' ) {
			tabListEle.append(
				informationTabBtn,
				settingsTabBtn,
				sectionsTabBtn
			);
			contentEle.append(
				informationTabContent,
				settingsTabContent,
				sectionsTabContent
			);
		} else if ( loadedSpriteName.full.length && diffViewEle.style.display === 'unset' ) {
			tabListEle.append( saveTabBtn );
			contentEle.append( saveTabContent );
		} else { // No sprite opened + open view
			tabListEle.append( newTabBtn );
			contentEle.append( newTabContent );
			if ( !loadedSpriteName.full.length ) {
				setTimeout( () => {
					toggleBtnEle.classList.add( 'open' );
					outerEle.classList.add( 'open' );
				}, 0 );
			}
		}
		tabListEle.append( aboutTabBtn );
		contentEle.append( aboutTabContent );
		tabsEle.append( tabListEle );
		outerEle.append( tabsEle, contentEle );
		if ( oldSidemenu ) {
			if ( oldSidemenu.classList.contains( 'open' ) ) {
				toggleBtnEle.classList.add( 'open' );
				outerEle.classList.add( 'open' );
			}
			oldBtn.replaceWith( toggleBtnEle );
			oldSidemenu.replaceWith( outerEle );
		} else {
			rootElement.append( toggleBtnEle, outerEle );
		}
	}

	function createBlankSprite() {
		options.isNew = true;
		output = JSON.parse( JSON.stringify( blankJSON ) );
		spriteImage = document.createElement( 'img' );
		updateTitle( false );
		setupOldCanvas( spriteImage );
		changeView( 'main' );
		if ( !rootElement.querySelector( '.spriteeditor-diffview' ) ) {
			rootElement.append( diffViewEle, mainViewEle, openViewEle );
		}
		if ( options.createSampleSection ) {
			// eslint-disable-next-line no-unused-vars
			const section1 = new Section( i18n.msg( 'first-section' ).plain() );
			// eslint-disable-next-line no-unused-vars
			const sprite1 = new Sprite( 'Example sprite', 0 );
		}
		editHistory.length = 0;
		historyPos = 0;
		updateHistoryBtn();
	}

	function processImage() {
		rootElement.innerText = '';
		updateTitle( false );
		changeView( 'main' );
		rootElement.append( diffViewEle, mainViewEle, openViewEle );
		const imgSize = Number( output.settings.size || options.defaultSpriteSize );
		imgWidth = Number( output.settings.width ) || imgSize;
		imgHeight = Number( output.settings.height ) || imgSize;
		options.spritesPerRow = options.isNew ? 10 : Math.floor(
			(
				( output.settings.sheetsize || spriteImage.naturalWidth ) + options.spacing
			) / ( imgWidth + options.spacing )
		);
		if ( !kioskMode ) {
			document.querySelector( '#sidemenu1spacing' ).value = Number( options.spacing );
			document.querySelector( '#sidemenu1sprites' ).value = options.spritesPerRow;
		}
		inLoadingProcess = true;
		options.spritesPerRowOrg = options.isNew ? 1 : options.spritesPerRow;
		for ( let i = 0; i < output.sections.length; i++ ) {
			highestSectionID = Math.max( highestSectionID, output.sections[ i ].id );
			// eslint-disable-next-line no-new
			new Section( output.sections[ i ].name, output.sections[ i ].id );
		}
		const ids = Object.keys( output.ids );
		ids.forEach( ( name ) => {
			if ( !sprites[ output.ids[ name ].pos ] ) {
				lastSpriteId = Math.max( lastSpriteId, output.ids[ name ].pos );
				const canv = newCanvas(),
					coords = getPosCoords( output.ids[ name ].pos, true );
				canv.getContext( '2d' ).drawImage( spriteImage,
					coords.x, coords.y, imgWidth, imgHeight, // source coords
					0, 0, imgWidth, imgHeight // canvas coords
				);
				// eslint-disable-next-line no-unused-vars
				const sprite = new Sprite(
					name,
					output.ids[ name ].section,
					output.ids[ name ].pos,
					canv,
					true
				);
			} else {
				sprites[ output.ids[ name ].pos ].names.push( [ name, {} ] );
			}
			const names = sprites[ output.ids[ name ].pos ].names,
				spriteData = sprites[ output.ids[ name ].pos ];
			for ( const nameEntry of names ) {
				const tagList = {};
				for ( const tagName of tags ) {
					if ( output.ids[ nameEntry[ 0 ] ][ tagName ] ) {
						tagList[ tagName ] = true;
					}
				}
				nameEntry[ 1 ] = tagList;
			}
			generateSpriteNameElements( spriteData, names, false );
		} );
		for ( let i = 0; i < output.sections.length; i++ ) {
			sortSection( output.sections[ i ].id );
		}
		for ( let k = 0; k < lastSpriteId; k++ ) {
			if ( sprites[ k ] ) {
				continue;
			}
			const c = newCanvas(),
				coords = getPosCoords( k, true );
			c.getContext( '2d' ).drawImage( spriteImage,
				coords.x, coords.y, imgWidth, imgHeight, // source coords
				0, 0, c.width, c.height // canvas coords
			);
			backgroundSprites[ k ] = c;
		}
		editHistory.length = 0;
		historyPos = 0;
		inLoadingProcess = false;
		updateHistoryBtn();
	}
	function loadPermissionsAndImage() {
		// Querys
		// - image url
		// - protection
		// - user rights
		api.get( {
			action: 'query',
			iiprop: 'url|size',
			inprop: 'protection',
			format: 'json',
			formatversion: '2',
			list: 'tags',
			meta: 'userinfo',
			prop: 'info|imageinfo',
			titles: 'Module:' + loadedSpriteName.full + '|File:' + loadedSpriteName.name + '.png',
			tglimit: 'max',
			uiprop: 'rights|blockinfo'
		} ).always( ( data ) => {
			if ( data.error || !data.query ) {
				rootElement.innerText = '';
				createBlankSprite();
				return;
			}
			hasNewTagPermission = data.query.userinfo.rights.indexOf( 'managechangetags' ) > 0;
			hasTagPermission = data.query.userinfo.rights.indexOf( 'applychangetags' ) > 0;
			if ( data.query.userinfo && data.query.userinfo.blockid ) {
				editMode = false;
			}
			for ( let j = 0; j < 2; j++ ) {
				if (
					!editMode ||
					!data.query.pages ||
					!data.query.pages[ j ] ||
					!data.query.pages[ j ].protection
				) {
					editMode = false;
					continue;
				}
				for ( let i = 0; i < data.query.pages[ j ].protection.length; i++ ) {
					if ( editMode && !checkProtection(
						data.query.userinfo.rights || [],
						data.query.pages[ j ].protection[ i ]
					) ) {
						editMode = false; // No edit rights present
					}
				}
			}
			const imgPage = data.query.pages[ 0 ].ns === 6 ? 0 : 1;
			let srcTxt = output.settings.image;
			if ( srcTxt ) {
				srcTxt = '/Special:Filepath/' + srcTxt;
			} else {
				srcTxt = data.query.pages[ imgPage ].imageinfo[ 0 ].url + '&format=original';
			}
			spriteImage = document.createElement( 'img' );
			spriteImage.style.width = '0';
			spriteImage.style.height = '0';
			spriteImage.crossOrigin = '*';
			spriteImage.src = srcTxt;
			spriteImage.addEventListener( 'error', ( e ) => {
				// eslint-disable-next-line no-console
				console.log( e );
				rootElement.innerText = '';
				createBlankSprite();
			} );
			spriteImage.addEventListener( 'load', () => {
				setupOldCanvas( spriteImage );
				processImage();
			} );
			document.body.append( spriteImage );
		} );
	}
	function loadJSON() {
		const params = window.Object.assign( {}, loadModuleBase );
		params.content = 'local require2=require\nfunction require() return {getUrl=function() return true end} end\nlocal a = require2("Module:' + loadedSpriteName.full + '")\nrequire=require2\n' +
		'return type(a) == "table" and a.settings and mw.text.jsonEncode(a) or "{}"';
		api.postWithEditToken( params ).always( ( a ) => {
			if ( !a.return ) {
				rootElement.innerText = '';
				createBlankSprite();
				return;
			}
			output = JSON.parse( a.return );
			output.settings = output.settings || {};
			output.ids = output.ids || {};
			output.sections = output.sections || [];
			posSprite = output.settings.pos || 1;
			options.spacing = output.settings & output.settings.spacing | 0;
			imgSpacingOrg = options.spacing;
			loadPermissionsAndImage();
		} );
	}

	function checkProtection( allperms, name ) {
		const lvl = name ? name.level : '';
		if ( lvl === 'autoconfirmed' ) {
			return allperms.includes( 'editsemiprotected' );
		} else if ( lvl === 'sysop' ) {
			return allperms.includes( 'editprotected' );
		}
		return true;
	}

	function loadSprite() {
		let toOpen = new URL( document.location.href ).searchParams.get( 'sprite' ) || '';
		if ( kioskMode ) {
			toOpen = document.getElementById( 'sprite-root' ).dataset.sprite || config.wgPageName;
		}
		if ( kioskMode && !toOpen ) {
			return;
		}
		// Reset variables to default
		rootElement.innerText = 'Loading editor...';
		diffViewEle.className = 'spriteeditor-diffview';
		mainViewEle.className = 'spriteeditor-mainview';
		openViewEle.className = 'spriteeditor-openview';
		resetEditor();
		editMode = !kioskMode;
		const names = completeName( seperatePath( toOpen || '' ) );
		if ( toOpen && blacklist.includes( names.module.toLowerCase() ) ) {
			const historyUrl = new URL( window.location );
			historyUrl.searchParams.delete( 'sprite' );
			window.history.pushState( {}, '', historyUrl );
			toOpen = '';
		} else if ( toOpen ) {
			const historyUrl = new URL( window.location );
			historyUrl.searchParams.set( 'sprite', names.all.join( '/' ) );
			window.history.pushState( {}, '', historyUrl );
		}
		loadedSpriteName = names;
		if ( !toOpen.length || !loadedSpriteName.full.length ) {
			updateTitle( false );
			editMode = false;
			output = JSON.parse( JSON.stringify( blankJSON ) );
			rootElement.innerText = '';
			changeView( 'open' );
			rootElement.append( diffViewEle, mainViewEle, openViewEle );
			updateOpenView();
			return;
		}
		loadJSON();
	}

	rootElement.innerText = 'Loading i18n...';
	mw.hook( 'dev.i18n' ).add( ( i18no ) => {
		i18no.loadMessages( 'SpriteEditor' ).done( ( msg ) => {
			i18n = msg;
			window.SpriteEditorAPI = {
				generateImage,
				generateJSON,
				loadSprite,
				moveHistory,
				processData,
				Section,
				selectTag,
				Sprite,
				toggleTagsMode,
				i18n
			};

			loadSprite();
		} );
	} );
} );