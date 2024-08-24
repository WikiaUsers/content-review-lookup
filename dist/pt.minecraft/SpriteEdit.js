( function() {
'use strict';

/** "Global" vars (preserved between editing sessions) **/
var i18n = {
	blockedNotice: 'Você não pode editar esse sprite como você está bloqueado.',
	blockedReason: 'Razão:',
	browserActionNotSupported: 'Não é suportado pelo seu navegador.',
	changesSavedNotice: 'Suas alterações foram salvas.',
	controlNewName: 'Novo nome',
	ctxDeleteImage: 'Excluir imagem',
	ctxReplaceImage: 'Substituir imagem',
	diffError: 'Falha ao recuperar diff',
	diffErrorMissingPage: 'Falha ao recuperar a página',
	dupeName: 'Este nome já existe.',
	dupeNamesNotice: 'Há nomes duplicados que devem ser resolvidos antes de salvar.',
	genericError: 'Algo deu errado',
	namePlaceholder: 'Digite um nome',
	noPermissionNotice: 'Você não tem permissão para editar esse sprite.',
	panelChangesIdTitle: 'Mudanças de ID',
	panelChangesNoDiffFromCur: 'Nenhuma alteração a partir da revisão atual.',
	panelChangesSheetTitle: 'Mudanças de Spritesheet',
	panelChangesTitle: 'Rever as suas alterações',
	panelCloseTip: 'Fechar',
	panelConflictCurText: 'Texto atual',
	panelConflictReview: 'Revisar alterações',
	panelConflictSave: 'Salvar',
	panelConflictText: 'Um conflito de edição ocorreu, e não foi capaz de ser resolvido automaticamente.',
	panelConflictTitle: 'Conflito de edição',
	panelConflictYourText: 'Seu texto',
	panelDiscardContinue: 'Manter edição',
	panelDiscardDiscard: 'Descartar alterações',
	panelDiscardText: 'Tem certeza de que deseja descartar suas alterações?',
	panelDiscardTitle: 'Alterações não salvas',
	panelEcchangesReturn: 'Voltar para editar o conflito do formulário',
	panelEcchangesTitle: 'Reveja as suas alterações manuais',
	panelErrorApi: 'Erro API:',
	panelErrorConnection: 'Erro de conexão',
	panelErrorHttp: 'Erro de HTTP:',
	panelErrorTitle: 'Erro',
	sectionPlaceholder: 'Digite um nome de seção',
	sectionUncategorized: 'Sem categoria',
	toolbarNewImage: 'Nova imagem',
	toolbarNewSection: 'Nova seção',
	toolbarRedo: 'Refazer',
	toolbarReviewChanges: 'Revisar alterações',
	toolbarSave: 'Salvar',
	toolbarSummaryPlaceholder: 'Resuma as alterações feitas',
	toolbarToolDeprecate: 'Desaprovar',
	toolbarToolDeprecateTip: 'Alternar nomes como desaprovados',
	toolbarTools: 'Ferramentas',
	toolbarUndo: 'Desfazer'
};
var $root = $( document.documentElement );
var $win = $( window );
var $doc = $( '#spritedoc' );
var inlineStyle;
var URL = window.URL || window.webkitURL;
var imageEditingSupported = ( function() {
	if (
		window.FileList &&
		window.ArrayBuffer &&
		window.Blob &&
		window.FormData &&
		window.ProgressEvent &&
		URL && URL.revokeObjectURL && URL.createObjectURL &&
		document.createElement( 'canvas' ).getContext
	) {
		return true;
	}
	
	return false;
}() );
var dropSupported = 'draggable' in $root[0];
var historySupported = window.history && history.pushState;
// HTML pointer-events is dumb and can't be tested for
// Just check that we're not IE < 11, old Opera has too little usage to bother checking for
var pointerEventsSupported = $.client.profile().name !== 'msie' || $.client.profile().versionBase > 10;
var idsPageId = $doc.data( 'idspage' );


// Handle recreating the editor
$( '#ca-spriteedit' ).find( 'a' ).click( function( e ) {
	// Editor is already loaded, reload the page
	if ( $root.hasClass( 'spriteedit-loaded' ) ) {
		return;
	}
	create();
	e.preventDefault();
} );
if ( historySupported ) {
	$win.on( 'popstate', function() {
		if (
			location.search.match( 'spriteaction=edit' ) &&
			!$root.hasClass( 'spriteedit-loaded' )
		) {
			create( 'history' );
		}
	} );
}


/** Functions **/
/**
 * Entry point for the editor
 *
 * Updates the page if it has been edited since being viewed
 * and creates the editor once ready
 * Is called right at the end of the script, once all other functions
 * are defined.
 *
 * "state" is what triggered the creation (e.g. from history navigation)
 */
var create = function( state ) {
	var modified = {};
	var settings = {};
	var mouse = {
		moved: false,
		x: 0, y: 0
	};
	var sorting = false;
	var oldHtml;
	var spritesheet;
	var changes = [];
	var undoneChanges = [];
	var names = {};
	var loadingImages = [];
	var idsTable, idChanges, sheetData;
	var panels = {};
	var revisionsApi = new mw.Api( { parameters: {
		action: 'query',
		prop: 'revisions',
		rvprop: 'content',
		utf8: true
	} } );
	var parseApi = new mw.Api( { parameters: {
		action: 'parse',
		prop: 'text',
		disablepp: true,
		disabletoc: true,
		utf8: true
	} } );
	var $headingTemplate = $( '<h3>' ).html(
		$( '<span>' )
			.addClass( 'mw-headline spriteedit-new' )
			.attr( 'data-placeholder', i18n.sectionPlaceholder )
	);
	var $boxTemplate = $( '<li>' ).addClass( 'spritedoc-box spriteedit-new' ).append(
		$( '<div>' ).addClass( 'spritedoc-image' ),
		$( '<ul>' ).addClass( 'spritedoc-names' ).append(
			$( '<li>' ).addClass( 'spritedoc-name' ).html( '<code>' )
		)
	);
	addControls( $headingTemplate, 'heading' );
	addControls( $boxTemplate, 'box' );
	
	// Pre-load modules which will be needed later
	// TODO: Change to "mediawiki.ui.input" on MW1.25 update
	mw.loader.load( [ 'jquery.byteLimit', 'mediawiki.action.history.diff', 'mediawiki.ui' ] );
	
	$root.addClass( 'spriteedit-loaded' );
	
	if ( !state && historySupported ) {
		history.pushState( {}, '', mw.util.getUrl( null, { spriteaction: 'edit' } ) );
	}
	if ( state !== 'initial' ) {
		$( '#ca-view' ).add( '#ca-spriteedit' ).toggleClass( 'selected' );
	}
	
	if ( imageEditingSupported ) {
		var $sprite = $doc.find( '.sprite' ).first();
		settings.imageWidth = $sprite.width();
		settings.imageHeight = $sprite.height();
		settings.sheet = $doc.data( 'original-url' );
		if ( !settings.sheet ) {
			settings.sheet = $sprite.css( 'background-image' )
				.replace( /^url\(["']?/, '' ).replace( /["']?\)$/, '' );
			$doc.data( 'original-url', settings.sheet );
		}
		settings.sheet += ( settings.sheet.match( /\?/ ) ? '&' : '?' ) + new Date().getTime();
		
		var spritesheetReady = $.Deferred();
		
		// Replace the spritesheet with a fresh uncached one to ensure
		// we don't save over it with an old version.
		// XHR is used instead of a CORS Image so a blob URL can
		// be used for the background image, rather than the real URL.
		// This works around the image being downloaded twice, probably
		// caused by the background image not reusing the CORS request.
		var xhr = new XMLHttpRequest();
		xhr.open( 'GET', settings.sheet, true );
		xhr.responseType = 'blob';
		spritesheetReady.fail( function() {
			xhr.abort();
		} );
		xhr.onload = function() {
			if ( this.status !== 200 ) {
				spritesheetReady.reject();
				return;
			}
			
			spritesheet = new Image();
			spritesheet.onload = function() {
				settings.sheetWidth = this.width;
				settings.sheetHeight = this.height;
				
				if ( inlineStyle ) {
					inlineStyle.disabled = true;
					URL.revokeObjectURL( inlineStyle.url );
				}
				inlineStyle = mw.util.addCSS(
					'#spritedoc .sprite { background-image: url(' + this.src + ') !important }'
				);
				inlineStyle.url = this.src;
				
				spritesheetReady.resolve();
			};
			spritesheet.src = URL.createObjectURL( this.response );
		};
		xhr.send();
	}
	
	// Check if the IDs page has been edited since opening
	// the page and download the latest version if so
	var newContentReady = $.Deferred();
	var timestampRequest = revisionsApi.get( {
		rvprop: 'timestamp',
		pageids: idsPageId
	} ).done( function( data ) {
		var currentTimestamp = fixTimestamp( data.query.pages[idsPageId].revisions[0].timestamp );
		if ( currentTimestamp > $doc.data( 'idstimestamp' ) ) {
			$doc.data( 'idstimestamp', currentTimestamp );
			
			var newContentRequest = parseApi.get( {
				title: mw.config.get( 'wgPageName' ),
				text: $( '<i>' ).html(
					$.parseHTML( $doc.attr( 'data-refreshtext' ) )
				).html()
			} ).done( function( data ) {
				oldHtml = data.parse.text['*'];
				$doc.html( oldHtml );
				newContentReady.resolve();
			} ).fail( function( code, data ) {
				console.error( code, data );
				newContentReady.reject();
			} );
			newContentReady.fail( function() {
				newContentRequest.abort();
			} );
		} else {
			oldHtml = $doc.html();
			newContentReady.resolve();
		}
	} ).fail( function( code, data ) {
		console.error( code, data );
		newContentReady.reject();
	} );
	newContentReady.fail( function() {
		timestampRequest.abort();
	} );
	
	// Check if we have permission to edit the IDs page and
	// spritesheet file and that the user isn't blocked
	var permissionsRequest = new mw.Api().get( {
		action: 'query',
		meta: 'userinfo',
		uiprop: 'rights|blockinfo'
	} ).done( function( data ) {
		var info = data.query.userinfo;
		
		var canEdit = true;
		if ( info.blockid ) {
			canEdit = false;
			var $blockNotice = $( '<p>' ).text( i18n.blockedNotice );
			var reasonParsed;
			if ( info.blockreason ) {
				reasonParsed = parseApi.get( {
					summary: info.blockreason
				} ).done( function( data ) {
					$blockNotice.append( '<br>', i18n.blockedReason, ' ',
						$( '<span>' ).addClass( 'comment' ).html( data.parse.parsedsummary['*'] )
					);
				} );
			}
			$.when( reasonParsed ).always( function() {
				mw.notify( $blockNotice, { autoHide: false } );
			} );
		}
		
		if ( canEdit ) {
			var rights = info.rights;
			$.each( [ 'ids', 'sprite' ], function() {
				var requiredRights = $doc.data( this + 'protection' ).split( ',' );
				$.each( requiredRights, function() {
					if ( rights.indexOf( this ) === -1 ) {
						canEdit = false;
						return false;
					}
				} );
				
				return canEdit;
			} );
			
			if ( !canEdit ) {
				mw.notify( i18n.noPermissionNotice, { autoHide: false } );
			}
		}
		
		if ( !canEdit ) {
			newContentReady.reject();
			spritesheetReady && spritesheetReady.reject();
			destroy();
		}
	} );
	
	$.when( newContentReady, permissionsRequest ).done( function() {
		// Make sure the editor wasn't destroyed while we were waiting
		if ( $root.hasClass( 'spriteedit-loaded' ) ) {
			enable();
		}
	} );
	
	// Handle closing the editor on navigation
	if ( historySupported ) {
		$win.on( 'popstate.spriteEdit', function() {
			if (
				!location.search.match( 'spriteaction=edit' ) &&
				$root.hasClass( 'spriteedit-loaded' )
			) {
				close( 'history' );
			}
		} );
	}
	
	
	/**
	 * Create the editor interface
	 *
	 * Makes the necessary HTML changes to the documentation,
	 * creates the extra interface elements, and binds the events.
	 */
	var enable = function() {
		var $content = $doc.closest( '.documentation' );
		var $toolbar;
		
		if ( !$content.length ) {
			$content = $( '#content' );
		}
		
		$root.addClass( 'spriteedit-enabled' );
		if ( imageEditingSupported ) {
			$root.addClass( 'spriteedit-imageeditingenabled' );
		}
		
		$( '.mw-editsection' ).add( '.mw-editsection-like' ).css( 'display', 'none' );
		
		// Store previous element and parent
		// to re-attach to once done.
		var $docPrev = $doc.prev();
		var $docParent = $doc.parent();
		$doc.detach();
		
		$doc.find( '#toc' ).remove();
		
		
		$doc.append(
			$( '<div>' ).addClass( 'spriteedit-autoscroll spriteedit-autoscroll-up' ),
			$( '<div>' ).addClass( 'spriteedit-autoscroll spriteedit-autoscroll-down' )
		);
		var autoScroll = function( now ) {
			autoScroll.delta = ( now - autoScroll.timeLast ) / ( 1000 / 60 );
			autoScroll.timeLast = now;
			
			if ( mouse.y !== autoScroll.lastMouseY ) {
				var areaRect = autoScroll.area.getBoundingClientRect();
				if ( autoScroll.dir === -1 ) {
					autoScroll.speed = areaRect.bottom - mouse.y;
				} else {
					autoScroll.speed = mouse.y - areaRect.top + 1;
				}
				
				autoScroll.lastMouseY = mouse.y;
			}
			
			// Prevent overscroll
			var scrollTop = $win.scrollTop();
			if (
				autoScroll.dir === -1 && scrollTop > autoScroll.topLimit ||
				autoScroll.dir === 1 && scrollTop + $win.height() < autoScroll.bottomLimit
			) {
				scrollBy( 0, autoScroll.dir * Math.round( autoScroll.speed / 2 ) * Math.round( autoScroll.delta ) );
			}
			
			autoScroll.id = requestAnimationFrame( autoScroll );
		};
		autoScroll.start = function( area ) {
			if ( autoScroll.id ) {
				autoScroll.stop();
			}
			
			var scrollTop = $win.scrollTop();
			autoScroll.area = area;
			autoScroll.dir = $( area ).hasClass( 'spriteedit-autoscroll-up' ) ? -1 : 1;
			autoScroll.speed = 1;
			autoScroll.timeLast = window.performance ? performance.now() : Date.now();
			autoScroll.topLimit = scrollTop + $doc[0].getBoundingClientRect().top;
			autoScroll.bottomLimit = scrollTop + $doc.find( '.spritedoc-section' ).last()[0].getBoundingClientRect().bottom + 50;
			autoScroll.id = requestAnimationFrame( autoScroll );
		};
		autoScroll.stop = function() {
			cancelAnimationFrame( autoScroll.id );
			autoScroll.id = 0;
		};
		
		$doc.find( '.spriteedit-autoscroll' )
			.on( 'mouseenter.spriteEdit dragenter.spriteEdit', function() {
				autoScroll.start( this );
			} )
			.on( 'mouseleave.spriteEdit dragleave.spriteEdit', autoScroll.stop );
		
		
		addControls( $doc.find( 'h3' ), 'heading' );
		
		var $boxes = $doc.find( '.spritedoc-box' );
		$boxes.each( function() {
			var $this = $( this );
			
			var $names = $this.find( '.spritedoc-name' );
			$this.attr( 'data-sort-key', $names.first().text() );
			
			$names.find( 'code' ).each( function() {
				var $code = $( this );
				names[$code.text()] = [ $code ];
			} );
		} );
		addControls( $boxes, 'box' );
		
		// Collapses and expands boxes in each section when sorting
		// sections or boxes, so it's easier to get to the right section
		var collapseBoxes = function( placeholder ) {
			var $this = $( this );
			var isBox = $this.hasClass( 'spritedoc-box' );
			var section = isBox ? $this.closest( '.spritedoc-section' )[0] : placeholder;
			var origPos = this.getBoundingClientRect();
			var origSectionPos = section.getBoundingClientRect();
			var heights = [];
			
			$doc.find( '.spritedoc-boxes' ).each( function() {
				var child = this.firstElementChild;
				if ( child ) {
					if ( $( child ).hasClass( 'spriteedit-ghost' ) ) {
						child = child.nextElementSibling || child;
					}
					heights.push( child.getBoundingClientRect().height );
				} else {
					heights.push( 0 );
				}
			} ).each( function( i ) {
				// Set styling after get loop to avoid layout thrashing
				var height = heights[i];
				if ( !height ) {
					return;
				}
				
				$( this ).css( {
					height: height,
					overflow: 'hidden'
				} );
			} );
			
			// First make sure the section is in the same place relative to the window
			scroll( 0, $win.scrollTop() + section.getBoundingClientRect().top - origSectionPos.top );
			
			// Now if we're sorting boxes, make sure the box remains inside the section
			if ( isBox ) {
				var sectionPos = section.getBoundingClientRect();
				if ( origPos.bottom > sectionPos.bottom ) {
					scroll( 0, $win.scrollTop() + sectionPos.bottom - origPos.bottom );
				}
			}
		};
		var expandBoxes = function() {
			var origPos = this.getBoundingClientRect();
			
			$doc.find( '.spritedoc-boxes' ).css( {
				height: 'auto',
				overflow: 'visible'
			} );
			
			// If we're sorting boxes, scroll so the box is near the cursor
			var $this = $( this );
			if ( $this.hasClass( 'spritedoc-box' ) ) {
				var boxPos = this.getBoundingClientRect();
				scroll( 0, $win.scrollTop() + boxPos.top + boxPos.height / 2 - mouse.y );
				
				// Flash the box so it is obvious where it was sorted to
				$this.css( 'background-color', 'yellow' );
				setTimeout( function() {
					$this.css( 'background-color', '' );
				}, 1000 );
			} else {
				// Otherwise make sure the section is in the same place relative to the window
				scroll( 0, $win.scrollTop() + this.getBoundingClientRect().top - origPos.top );
			}
		};
		makeSortable( {
			selectors: '.spritedoc-section',
			handle: 'h3',
			vertical: true,
			sortStart: collapseBoxes,
			sortEnd: expandBoxes
		} );
		makeSortable( {
			selectors: {
				container: '.spritedoc-section',
				parent: '.spritedoc-boxes',
				elem: '.spritedoc-box'
			},
			autoSort: true,
			sortStart: collapseBoxes,
			sortEnd: expandBoxes
		} );
		makeSortable( {
			selectors: {
				container: '.spritedoc-box',
				parent: '.spritedoc-names',
				elem: '.spritedoc-name'
			},
			autoSort: true
		} );
		
		// Create toolbar
		var contentPadding = {
			left: $content.css( 'padding-left' ),
			right: $content.css( 'padding-right' )
		};
		$toolbar = $( '<div>' ).addClass( 'spriteedit-toolbar' ).css( {
			paddingLeft: contentPadding.left,
			paddingRight: contentPadding.right,
			marginLeft: '-' + contentPadding.left,
			marginRight: '-' + contentPadding.right
		} );
		$toolbar.append(
			$( '<span>' ).addClass( 'mw-ui-button-group' ).append(
				makeButton( i18n.toolbarUndo, {
					id: 'spriteedit-undo',
					props: { disabled: true },
					action: function() {
						$( this ).blur();
						
						var hist = changes.pop();
						revert( hist );
						undoneChanges.push( hist );
						$( '#spriteedit-redo' ).prop( 'disabled', false );
					}
				} ),
				makeButton( i18n.toolbarRedo, {
					id: 'spriteedit-redo',
					props: { disabled: true },
					action: function() {
						$( this ).blur();
						
						var hist = undoneChanges.pop();
						$.each( hist, function() {
							change( this.action, this.content, false, true );
						} );
						changes.push( hist );
						
						if ( !undoneChanges.length ) {
							$( this ).prop( 'disabled', true );
						}
						
						$.each( [
							'#spriteedit-undo',
							'#spriteedit-save',
							'#spriteedit-summary',
							'#spriteedit-review-button'
						], function() {
							$( this ).prop( 'disabled', false );
						} );
					}
				} )
			),
			$( '<span>' ).addClass( 'mw-ui-button-group' ).append(
				makeButton( i18n.toolbarNewSection, { id: 'spriteedit-add-section' } ),
				makeButton( i18n.toolbarNewImage, { id: 'spriteedit-add-image' } )
			),
			$( '<select>' ).prop( 'id', 'spriteedit-toolbox' ).addClass( 'mw-ui-button' ).append(
				$( '<option>' ).prop( {
					disabled: true,
					selected: true,
					value: ''
				} ).css( 'display', 'none' ).text( i18n.toolbarTools )
			),
			makeButton( i18n.toolbarSave, {
				id: 'spriteedit-save',
				type: 'progressive',
				props: { disabled: true },
				css: { right: contentPadding.right }
			} )
		);
		if ( !imageEditingSupported ) {
			$toolbar.find( '#spriteedit-add-image' ).prop( {
				disabled: true,
				title: i18n.browserActionNotSupported
			} ).css( 'cursor', 'help' );
		}
		
		// Create tools
		var $toolbox = $toolbar.find( '#spriteedit-toolbox' );
		$toolbox.append(
			$( '<option>' ).prop( {
				value: 'deprecate',
				title: i18n.toolabrToolDeprecateTip
			} ).text( i18n.toolbarToolDeprecate )
		);
		
		var $barContainer = $( '<div>' ).addClass( 'spriteedit-toolbar-container' )
			.append( $toolbar ).prependTo( $doc );
		
		if ( $docPrev.length ) {
			$doc.insertAfter( $docPrev );
		} else {
			$doc.prependTo( $docParent );
		}
		
		// Set height now that everything is re-attached
		var toolbarHeight = $toolbar[0].getBoundingClientRect().height;
		$barContainer.height( toolbarHeight );
		
		// Wait until everything else is done so the animation is smooth
		requestAnimationFrame( function() {
			var barTop = $barContainer[0].getBoundingClientRect().top;
			if ( barTop > 0 ) {
				$root.addClass( 'spriteedit-smoothscroll' );
				scroll( 0, barTop + $win.scrollTop() + 1 );
			}
		} );
		
		
		/** Bind events **/
		/* Outside interface events */
		$( '#ca-view' ).find( 'a' ).on( 'click.spriteEdit', function( e ) {
			close();
			e.preventDefault();
		} );
		
		
		/* Toolbar events */
		// Manually make the toolbar sticky if position:sticky isn't supported
		if ( !supports( 'position', 'sticky' ) ) {
			var fixedClass = 'spriteedit-toolbar-fixed';
			var contentOffset = $content.offset().left + 1;
			$win.on( 'scroll.spriteEdit', $.throttle( 50, function() {
				var fixed = $toolbar.hasClass( fixedClass ),
					scrollTop = $win.scrollTop(),
					offset = $barContainer.offset().top;
				if ( !fixed && scrollTop >= offset ) {
					$toolbar.addClass( fixedClass ).css( 'left', contentOffset );
				} else if ( fixed && scrollTop < offset ) {
					$toolbar.removeClass( fixedClass ).css( 'left', '' );
				}
			} ) );
		}
		
		$( '#spriteedit-add-section' ).on( 'click.spriteEdit', function() {
			$( this ).blur();
			
			var $newHeading = $headingTemplate.clone();
			change( 'insert', {
				$elem: $( '<div>' ).addClass( 'spritedoc-section' ).prepend(
					$newHeading,
					$( '<ul>' ).addClass( 'spritedoc-boxes' )
				),
				index: $( nearestSection() ).index() - 1,
				$parent: $doc
			}, true );
			
			$newHeading.find( '.mw-headline' ).focus();
		} );
		
		$( '#spriteedit-add-image' ).on( 'click.spriteEdit', function() {
			$( '<input type="file">' )
				.attr( {
					accept: 'image/*',
					multiple: true
				} )
				.one( 'change.spriteEdit', function() {
					insertSprites( this.files );
				} ).click();
			
			$( this ).blur();
		} );
		
		// Toolbox functions
		var toolNamespace = '.spriteEdit.spriteEditTool.spriteEditTool';
		var tool;
		// Bind events for each tool's function
		$toolbox.on( 'change.spriteEdit', function() {
			tool = $toolbox.val();
			$root.addClass( 'spriteedit-hidecontrols spriteedit-tool-' + tool );
			$doc.find( '.spritedoc-name' ).find( 'code' ).attr( 'contenteditable', false );
			
			switch ( tool ) {
				case 'deprecate':
					$doc.on( 'click' + toolNamespace + 'Deprecate', '.spritedoc-name > code', function( e ) {
						change( 'toggle deprecation', { $elem: $( this ) } );
						e.preventDefault();
					} );
				break;
			}
		} );
		// Clear tool when clicking a toolbar button, the toolbox itself, or pressing escape
		var clearTool = function( e ) {
			if ( !$toolbox.val() ) {
				return;
			}
			
			$toolbox.val( '' );
			$doc.off( '.spriteEditTool' );
			$doc.find( '.spritedoc-name' ).find( 'code' ).attr( 'contenteditable', true );
			$root.removeClass( 'spriteedit-hidecontrols spriteedit-tool-' + tool );
			tool = null;
			
			// If clicking on the toolbox itself
			if ( e ) {
				e.preventDefault();
				$toolbox.blur();
				$win.focus();
			}
		};
		$toolbar.on( 'mouseup.spriteEdit', 'button', function() {
			clearTool();
		} );
		$toolbox.on( 'mousedown.spriteEdit', function( e ) {
			if ( e.which == 1 && $toolbox.is( e.target ) ) {
				clearTool( e );
			}
		} );
		$( document ).on( 'keydown.spriteEdit', function( e ) {
			// Esc
			if ( e.keyCode === 27 ) {
				clearTool( e );
			}
		} );
		
		// Drag and drop functionality
		if ( dropSupported && imageEditingSupported ) {
			var dragTimeout, dragEnded;
			var endDrag = function() {
				$root.removeClass( 'spriteedit-dragging' );
				
				clearTimeout( dragTimeout );
				clearTimeout( dropTimeout );
				dragEnded = false;
				dropEnded = false;
			};
			var isFile = function( e ) {
				var types = e.originalEvent.dataTransfer.types;
				return types.indexOf ?
					types.indexOf( 'Files' ) > -1 || types.indexOf( 'application/x-moz-file' ) > -1 :
					types.contains( 'Files' );
			};
			$win.on( 'dragenter.spriteEdit', function( e ) {
				if ( !isFile( e ) ) {
					return;
				}
				
				$root.addClass( 'spriteedit-dragging' );
			} ).on( 'dragover.spriteEdit', function() {
				clearTimeout( dragTimeout );
				dragEnded = false;
			} ).on( 'dragleave.spriteEdit', function( e ) {
				if ( !isFile( e ) ) {
					return;
				}
				
				clearTimeout( dragTimeout );
				dragEnded = true;
				dragTimeout = setTimeout( function() {
					if ( dragEnded ) {
						endDrag();
					}
				}, 100 );
			} );
			
			var dropTimeout, dropEnded;
			$doc.on( 'dragenter.spriteEdit', '.spritedoc-section', function( e ) {
				if ( !isFile( e ) ) {
					return;
				}
				
				$doc.find( '.spriteedit-droptarget' ).not( this ).removeClass( 'spriteedit-droptarget' );
				$( this ).addClass( 'spriteedit-droptarget' );
			} ).on( 'dragover.spriteEdit', '.spritedoc-section', function( e ) {
				clearTimeout( dropTimeout );
				dropEnded = false;
				
				e.originalEvent.dataTransfer.dropEffect = 'copy';
				
				e.preventDefault();
			} ).on( 'dragleave.spriteEdit', '.spritedoc-section', function( e ) {
				if ( !isFile( e ) ) {
					return;
				}
				
				clearTimeout( dropTimeout );
				dropEnded = true;
				dropTimeout = setTimeout( function() {
					if ( dropEnded ) {
						$doc.find( '.spriteedit-droptarget' ).removeClass( 'spriteedit-droptarget' );
						dropEnded = false;
					}
				}, 100 );
			} ).on( 'drop.spriteEdit', '.spritedoc-section', function( e ) {
				if ( !isFile( e ) ) {
					return;
				}
				
				$doc.find( '.spriteedit-droptarget' ).removeClass( 'spriteedit-droptarget' );
				
				insertSprites( e.originalEvent.dataTransfer.files, this );
				endDrag();
				e.preventDefault();
			} );
		}
		
		$( '#spriteedit-save' ).on( 'click.spriteEdit', function() {
			var $button = $( this );
			$button.blur();
			
			// Prevent saving and notify if there are duplicate names
			if ( $doc.find( '.spriteedit-dupe' ).length ) {
				mw.notify( i18n.dupeNamesNotice, { autoHide: false } );
				
				return;
			}
			
			// Prevent saving if button already pressed and still processing
			if ( $button.hasClass( 'spriteedit-processing' ) ) {
				return;
			}
			
			$button.addClass( 'spriteedit-processing' );
			
			if ( $toolbar.hasClass( 'spriteedit-saveform-open' ) ) {
				if ( !idsTable ) {
					parseNameChanges();
				}
				if ( modified.sheet && !sheetData ) {
					parseSheetChanges();
				}
				
				// If the diff is ready, we'll see if there are changes to be saved,
				// otherwise it's likely faster to just save and assume changes
				// were made, than wait for the diff to be ready
				if ( modified.names === false && !modified.sheet ) {
					destroy( true );
					
					return;
				}
				
				saveChanges( $( '#spriteedit-summary' ).val(), idsTable );
				
				return;
			}
			
			mw.loader.using( [ 'jquery.byteLimit', 'mediawiki.ui' ], function() {
				$toolbar.addClass( 'spriteedit-saveform-open' );
				$button
					.addClass( 'mw-ui-constructive' )
					.removeClass( 'mw-ui-progressive spriteedit-processing' )
					// Prevent accidental double-click saving
					.css( 'pointer-events', 'none' );
				
				if ( !$toolbar.find( '#spriteedit-saveform' ).length ) {
					$( '<div>' )
						.attr( 'id', 'spriteedit-saveform' )
						.css( 'margin-right', $( '#spriteedit-save' )[0].getBoundingClientRect().width )
						.append(
							$( '<input type="text">' ).addClass( 'mw-ui-input' ).attr( {
								id: 'spriteedit-summary',
								name: 'wpSummary', // For autocomplete
								placeholder: i18n.toolbarSummaryPlaceholder,
								spellcheck: true
							} ).byteLimit( 255 ),
							makeButton( i18n.toolbarReviewChanges, { id: 'spriteedit-review-button' } )
					).appendTo( $toolbar );
				}
				
				var openedToolbarHeight = $toolbar[0].getBoundingClientRect().height;
				$toolbar
					.outerHeight( toolbarHeight )
					.redraw()
					.outerHeight( openedToolbarHeight )
					.transitionEnd( function() {
						$button.css( 'pointer-events', '' );
						$barContainer.height( openedToolbarHeight );
						$( '#spriteedit-summary' ).focus();
						
						// Do this after the transition so there is no stutter
						if ( !idsTable ) {
							parseNameChanges( true );
						}
					} );
			} );
		} );
		
		$doc.on( 'keydown.spriteEdit', '#spriteedit-summary', function( e ) {
			// Anything but Enter
			if ( e.which !== 13 ) {
				return;
			}
			
			$( this ).blur();
			$( '#spriteedit-save' ).click();
			e.preventDefault();
		} );
		
		$doc.on( 'click.spriteEdit', '#spriteedit-review-button', function() {
			var $button = $( this );
			if ( $button.hasClass( 'spriteedit-processing' ) ) {
				return;
			}
			$button.blur().addClass( 'spriteedit-processing' );
			
			var changesPanel = panels.changes || panel(
				'changes',
				i18n.panelChangesTitle,
				[
					$( '<div>' ).addClass( 'spriteedit-sheet-changes' ),
					$( '<div>' ).addClass( 'spriteedit-id-changes' )
				]
			);
			var $changesText = changesPanel.$text;
			
			// Just re-display old content
			if ( $changesText.text() ) {
				$button.removeClass( 'spriteedit-processing' );
				changesPanel.show();
				return;
			}
			
			if ( !idsTable ) {
				parseNameChanges( true );
			}
			
			if ( modified.sheet ) {
				var sheetChanges = $.Deferred();
				var newSpritesheet = new Image();
				newSpritesheet.onload = function() {
					sheetChanges.resolve( newSpritesheet );
				};
				if ( !sheetData ) {
					parseSheetChanges();
				}
				sheetData.done( function( data ) {
					newSpritesheet.src = data;
				} );
			}
			
			$.when(
				sheetChanges,
				idChanges,
				mw.loader.using( 'mediawiki.action.history.diff' )
			).done( function( newSpritesheet, diff ) {
				if ( !newSpritesheet && !diff ) {
					$changesText.text( i18n.panelChangesNoDiffFromCur );
				} else {
					if ( newSpritesheet ) {
						$changesText.find( '.spriteedit-sheet-changes' ).append(
							$( '<div>' ).text( i18n.panelChangesSheetTitle ),
							$( '<div>' ).addClass( 'spriteedit-sheet-diff' ).append(
								$( '<span>' ).addClass( 'spriteedit-old-sheet' ).append( spritesheet ),
								$( '<span>' ).addClass( 'spriteedit-new-sheet' ).append( newSpritesheet )
							)
						);
					}
					if ( diff ) {
						$changesText.find( '.spriteedit-id-changes' ).append(
							$( '<div>' ).text( i18n.panelChangesIdTitle ),
							$( '<div>' ).append( diff )
						);
					}
				}
				
				$button.removeClass( 'spriteedit-processing' );
				changesPanel.show();
			} ).fail( handleError );
		} );
		
		
		/* Edit control events */
		$doc.on( 'click.spriteEdit', '.spriteedit-add-name > button', function() {
			var $names = $( this ).closest( '.spritedoc-box' ).find( '.spritedoc-name' );
			var $item = $( '<li>' ).addClass( 'spritedoc-name' );
			var $name = $( '<code>' ).addClass( 'spriteedit-new' )
				.attr( 'data-placeholder', i18n.namePlaceholder );
			addControls( $item.append( $name ), 'name' );
			
			change( 'insert', {
				$elem: $item,
				index: $names.length - 1,
				$parent: $names.first().parent()
			}, true );
			
			$name.focus();
		} );
		
		$doc.on( 'focus.spriteEdit', '[contenteditable]', function() {
			var $this = $( this );
			var text = $this.text();
			$this.attr( 'data-original-text', text );
			
			if ( !changes.length ) {
				$this.one( 'keypress.spriteEdit', function() {
					$.each( [
						'#spriteedit-save',
						'#spriteedit-summary',
						'#spriteedit-review-button'
					], function() {
						$( this ).prop( 'disabled', false );
					} );
				} );
			}
		} );
		$doc.on( 'blur.spriteEdit', '[contenteditable]', function() {
			var $this = $( this );
			var text = $this.text();
			var trimmedText = $.trim( text ).replace( /  +/g, ' ' );
			var origText = $this.attr( 'data-original-text' );
			$this.removeAttr( 'data-original-text' ).off( 'keypress.spriteEdit' );
			
			if ( text !== trimmedText ) {
				text = trimmedText;
				$this.text( text );
			}
			
			if ( text === '' ) {
				var $remove, $parent;
				if ( $this.hasClass( 'mw-headline' ) ) {
					if ( $doc.find( '.spritedoc-section' ).length === 1 ) {
						change( 'text', {
							$elem: $this,
							oldText: origText,
							text: i18n.sectionUncategorized
						} );
						return;
					} else {
						$remove = $this.closest( '.spritedoc-section' );
						$parent = $doc;
					}
				} else {
					var $names = $this.closest( '.spritedoc-names' );
					if ( $names.find( '.spritedoc-name' ).length > 1 ) {
						$remove = $this.parent();
						$parent = $names;
					} else {
						$remove = $names.parent();
						$parent = $remove.parent();
					}
				}
				
				if ( $this.hasClass( 'spriteedit-new' ) ) {
					// Just pretend it never happened
					$remove.remove();
					change.discard();
					return;
				}
				
				// Restore original text before deleting so undo works
				$this.text( origText );
				
				change( 'delete', {
					$elem: $remove,
					index: $remove.index() - 1,
					$parent: $parent
				} );
				return;
			}
			
			if ( text === origText ) {
				if ( !changes.length ) {
					$.each( [
						'#spriteedit-save',
						'#spriteedit-summary',
						'#spriteedit-review-button'
					], function() {
						$( this ).prop( 'disabled', true );
					} );
				}
				
				return;
			}
			
			if ( names[text] ) {
				// Wait until after edit change, as it may move the element
				// which the tooltip should be anchored to
				requestAnimationFrame( function() {
					tooltip( $this, i18n.dupeName );
				} );
			}
			
			change( 'edit', {
				$elem: $this,
				oldText: origText,
				text: text
			} );
			
			if ( $this.hasClass( 'spriteedit-new' ) ) {
				$this.removeClass( 'spriteedit-new' ).removeAttr( 'data-placeholder' );
			}
		} );
		$doc.on( 'keypress.spriteEdit', '[contenteditable]', function( e ) {
			// Enter key
			if ( e.which === 13 ) {
				$( this ).blur();
				e.preventDefault();
			}
		} );
		// Make pastes plain text
		$doc.on( 'paste.spriteEdit', '[contenteditable]', function() {
			var $this = $( this );
			var hasFocus = $this.has( ':focus' );
			if ( !hasFocus ) {
				$this.focus();
			}
			setTimeout( function() {
				var text = $this.text().replace( /\n/g, ' ' );
				if ( $this.html() !== $( '<i>' ).text( text ).html() ) {
					$this.text( text );
					
					if ( !hasFocus ) {
						$this.blur();
					}
				}
			}, 0 );
		} );
		var isText = function( e ) {
			var types = e.originalEvent.dataTransfer.types;
			return types.indexOf ? types.indexOf( 'text/plain' ) > -1 : types.contains( 'text/plain' );
		};
		$doc.on( 'dragenter.spriteEdit dragover.spriteEdit', '[contenteditable]', function( e ) {
			if ( !isText( e ) ) {
				return;
			}
			
			e.preventDefault();
		} );
		$doc.on( 'drop.spriteEdit', function( e ) {
			// Prevent default drop on anything but contenteditable
			// This prevents browsers dropping content into a nearby contenteditable, which doesn't
			// trigger any kind of drop event on the contenteditable (because you didn't actually
			// drop anything directly on it), thus making it impossible to handle it properly.
			if ( !$( e.target ).is( '[contenteditable]' ) ) {
				e.preventDefault();
				return;
			}
			
			if ( !isText( e ) ) {
				return;
			}
			
			var $this = $( e.target );
			$this.focus();
			setTimeout( function() {
				var text = $this.text().replace( /\n/g, ' ' );
				if ( $this.html() !== $( '<i>' ).text( text ).html() ) {
					$this.text( text );
				}
				
				$this.blur();
			}, 0 );
		} );
		
		if ( imageEditingSupported ) {
			$doc.on( 'click.spriteEdit', '.spritedoc-image', function() {
				var $parent = $( this );
				
				tooltip( $parent, [
					makeButton( i18n.ctxReplaceImage, {
						type: 'progressive',
						css: {
							display: 'block',
							width: '100%'
						},
						action: function() {
							$( this ).blur();
							
							$( '<input type="file">' )
								.attr( 'accept', 'image/*' )
								.one( 'change', function() {
									tooltip.hide();
									
									scaleImage( this.files[0] ).done( function( $img ) {
										change( 'replace image', {
											$elem: $img,
											$parent: $parent,
											$oldImg: $parent.find( 'img' )
										} );
									} );
								} ).click();
						}
					} ),
					makeButton( i18n.ctxDeleteImage, {
						type: 'destructive',
						css: {
							display: 'block',
							width: '100%'
						},
						action: function() {
							tooltip.hide( function() {
								var $box = $parent.parent();
								change( 'delete', {
									$elem: $box,
									$parent: $box.parent(),
									index: $box.index() - 1
								} );
							} );
						}
					} )
				], true );
			} );
		}
		
		
		/* Window events */
		$win.on( 'resize.spriteEdit', function() {
			var $dialog = $( '.spriteedit-dialog' );
			if ( $dialog.length && $dialog.is( ':visible' ) ) {
				$dialog.css( { width: '', height: '' } );
				$dialog.css( {
					width: $dialog.width(),
					height: $dialog.height()
				} );
			}
		} );
		
		var updateMouse = function( e ) {
			mouse.moved = true;
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
		// Only update mouse while sorting, dragging, or while over a handle
		$doc.on( 'mouseenter.spriteEdit mousemove.spriteEdit', '.spriteedit-handle', function( e ) {
			if ( !sorting ) {
				updateMouse( e );
			}
		} );
		$( document ).on( 'mousemove.spriteEdit', function( e ) {
			if ( sorting ) {
				updateMouse( e );
			}
		} ).on( 'dragover.spriteEdit', function( e ) {
			updateMouse( e.originalEvent );
		} );
		
		// Disable smooth scrolling once scrolling ends so it does not interfere with user scrolling.
		$win.on( 'scroll.spriteEdit', $.debounce( 250, function() {
			$root.removeClass( 'spriteedit-smoothscroll' );
		} ) );
		
		$win.on( 'beforeunload.spriteEdit', function( e ) {
			if ( !$( '#spriteedit-save' ).is( '[disabled]' ) ) {
				e.preventDefault();
			}
		} );
	};
	
	
	/** Editor functions **/
	/**
	 * Closes the editor
	 *
	 * If there are no changes, destroys the editor immediately.
	 * If there are changes, opens a panel asking for confirmation first.
	 *
	 * "state" is what triggered the editor to close (e.g. from history navigation)
	 */
	var close = function( state ) {
		if ( !$root.hasClass( 'spriteedit-enabled' ) || $( '#spriteedit-save' ).is( '[disabled]' ) ) {
			destroy( true, state === 'history' );
		} else {
			var discardPanel = panels.discard || panel(
				'discard',
				i18n.panelDiscardTitle,
				$( '<p>' ).text( i18n.panelDiscardText ),
				{ right: [
					{ text: i18n.panelDiscardContinue, config: {
						action: function() {
							discardPanel.hide();
						}
					} },
					{ text: i18n.panelDiscardDiscard, config: {
						type: 'destructive',
						action: function() {
							discardPanel.hide( function() {
								destroy( true, state === 'history' );
							} );
						}
					} }
				] }
			);
			discardPanel.show();
		}
	};
	
	/**
	 * Construct a wiki diff from an API request
	 *
	 * "data" is the API response.
	 * Returns a jQuery object containing the diff table, an error message
	 * if something went wrong, or nothing if the diff is empty.
	 */
	var makeDiff = function( data ) {
		if ( !data || !data.query || !data.query.pages ) {
			return i18n.genericError;
		}
		
		var pages = data.query.pages;
		var page = pages[idsPageId];
		if ( !page ) {
			return i18n.diffErrorMissingPage;
		}
		var diff = page.revisions[0].diff['*'];
		if ( diff === undefined ) {
			return i18n.diffError;
		}
		
		if ( !diff.length ) {
			return;
		}
		
		return $( '<table>' ).addClass( 'diff' ).append(
			$( '<col>' ).addClass( 'diff-marker' ),
			$( '<col>' ).addClass( 'diff-content' ),
			$( '<col>' ).addClass( 'diff-marker' ),
			$( '<col>' ).addClass( 'diff-content' ),
			$( '<tbody>' ).html( diff )
		);
	};
	
	/**
	 * Constructs a lua table to of the current changes to upload
	 * 
	 * "withDiff" is a boolean determining whether a diff request should
	 * also be performed on the table.
	 */
	var parseNameChanges = function( withDiff ) {
		var $sections = $doc.find( '.spritedoc-section' );
		var sectionIds = [];
		var getSectionId = ( function() {
			var id = 0;
			return function() {
				if ( id < sectionIds.length ) {
					sectionIds.sort( function( a, b ) {
						return a - b;
					} );
					
					$.each( sectionIds, function( _, v ) {
						if ( v - id > 1 ) {
							return false;
						}
						id = v;
					} );
				}
				
				id++;
				
				sectionIds.push( id );
				return id;
			};
		}() );
		
		$sections.each( function() {
			var id = $( this ).data( 'section-id' );
			if ( id !== undefined ) {
				sectionIds.push( id );
			}
		} );
		
		var headingRows = [];
		var ids = [];
		$sections.each( function() {
			var $section = $( this );
			var sectionId = $section.data( 'section-id' ) || getSectionId();
			var sectionName = $section.find( '.mw-headline' ).text().replace( /\s+/g, ' ' );
			headingRows.push(
				'{ ' + luaStringQuote( sectionName ) + ', id = ' + sectionId + ' },'
			);
			
			$section.find( '.spritedoc-box' ).each( function() {
				var $box = $( this );
				var pos = $box.data( 'pos' );
				if ( pos === undefined ) {
					pos = $box.data( 'new-pos' );
				}
				$box.find( '.spritedoc-name' ).find( 'code' ).each( function() {
					var $this = $( this );
					var id = $this.text().replace( /\s+/g, ' ' );
					ids.push( {
						sortKey: id.toLowerCase(),
						id: id,
						pos: pos,
						section: sectionId,
						deprecated: $this.hasClass( 'spritedoc-deprecated' )
					} );
				} );
			} );
		} );
		ids.sort( function( a, b ) {
			return a.sortKey > b.sortKey ? 1 : -1;
		} );
		
		var idsRows = [];
		$.each( ids, function() {
			var idData = [
				'pos = ' + this.pos,
				'section = ' + this.section
			];
			if ( this.deprecated ) {
				idData.push( 'deprecated = true' );
			}
			
			idsRows.push(
				'[' + luaStringQuote( this.id ) + '] = ' +
				'{ ' + idData.join( ', ' ) + ' },'
			);
		} );
		
		idsTable = [
			'return {',
			'	sections = {',
			'		' + headingRows.join( '\n\t\t' ),
			'	},',
			'	ids = {',
			'		' + idsRows.join( '\n\t\t' ),
			'	}',
			'}'
		].join( '\n' );
		
		if ( !withDiff ) {
			return;
		}
		
		idChanges = $.Deferred();
		revisionsApi.post( {
			pageids: idsPageId,
			rvprop: '',
			rvdifftotext: idsTable,
			rvlimit: 1
		} ).done( function( data ) {
			idChanges.resolve( makeDiff( data ) );
		} )
			// Don't handle error directly, so it can fail silently unless attempting
			// to view the diff, as this isn't necessary for saving
			.fail( idChanges.reject );
		
		idChanges.done( function( diff ) {
			modified.names = !!diff;
		} );
	};
	
	/**
	 * Adds the changed/new images to the spritesheet
	 */
	var parseSheetChanges = function() {
		sheetData = $.Deferred();
		spritesheetReady.done( function() {
			var sheetCanvas = getCanvas( 'sheet' );
			var lastPos = $doc.data( 'pos' );
			var usedPos = {};
			usedPos[lastPos] = true;
			
			var newImgs = [];
			$doc.find( '.spritedoc-box' ).each( function() {
				var $box = $( this );
				var pos = $box.data( 'pos' );
				if ( pos === undefined ) {
					newImgs.push( $box );
				} else {
					usedPos[pos] = true;
					if ( pos > lastPos ) {
						lastPos = pos;
					}
				}
			} );
			
			if ( newImgs.length ) {
				var unusedPos = [];
				for ( var i = 1; i <= lastPos; i++ ) {
					if ( !usedPos[i] ) {
						unusedPos.push( i );
					}
				}
				
				var origLastPos = lastPos;
				newImgs.forEach( function( $box ) {
					$box.data( 'new-pos', unusedPos.shift() || ++lastPos );
				} );
				
				if ( lastPos !== origLastPos ) {
					var imagesPerRow = settings.sheetWidth / settings.imageWidth;
					settings.sheetHeight = Math.ceil( lastPos / imagesPerRow ) * settings.imageHeight;
					sheetCanvas.resize();
				}
			}
			
			$.when.apply( null, loadingImages ).done( function() {
				sheetCanvas.clear();
				sheetCanvas.ctx.drawImage( spritesheet, 0, 0 );
				
				$doc.find( '.spriteedit-new' ).each( function() {
					var $box = $( this );
					var img = $box.find( 'img' )[0];
					var pos = $box.data( 'pos' );
					if ( pos === undefined ) {
						pos = $box.data( 'new-pos' );
					}
					
					var posPx = posToPx( pos );
					sheetCanvas.ctx.clearRect(
						posPx.left,
						posPx.top,
						settings.imageWidth,
						settings.imageHeight
					);
					sheetCanvas.ctx.drawImage( img, posPx.left, posPx.top );
				} );
				sheetData.resolve( sheetCanvas.canvas.toDataURL() );
				
				loadingImages = [];
			} );
		} );
	};
	
	/**
	 * Performs a save of the ID changes and/or spritesheet changes
	 *
	 * If there are changes and everything works out, the editor closes, the current
	 * page is purged, the timestamp is updated (for another edit in this session),
	 * and a success message is displayed.
	 * If there aren't changes, the editor will silently close, as if a null edit was performed
	 * (which if the diff wasn't ready in time, there will have been).
	 * In the event of an edit conflict, a manual resolution panel will be displayed.
	 * Otherwise, whatever error occurred will be displayed.
	 *
	 * "summary" is the text from the summary field.
	 * "idsTable" is the stringified lua table containing the ids and sections
	 * "refresh" is a boolean, which when true will cause the sprite documentation
	 * to be reparsed after saving (e.g. in the event of an edit conflict).
	 */
	var saveChanges = function( summary, idsTable, refresh ) {
		var idsEdit;
		if ( modified.names !== false ) {
			idsEdit = new mw.Api().postWithToken( 'edit', {
				action: 'edit',
				nocreate: true,
				pageid: idsPageId,
				text: idsTable,
				basetimestamp: $doc.data( 'idstimestamp' ),
				summary: summary
			} ).done( function( data ) {
				// Null edit, nothing to do here
				if ( data.edit.nochange === '' ) {
					return;
				}
				
				$doc.data( 'idstimestamp', fixTimestamp( data.edit.newtimestamp ) );
				
				// Purge this page so the changes show up immediately
				new mw.Api().get( {
					action: 'purge',
					pageids: mw.config.get( 'wgArticleId' )
				} );
			} ).fail( handleSaveError );
		}
		$.when( idsEdit ).done( function() {
			var sheetEdit;
			$.when( sheetData ).done( function( data ) {
				if ( !data ) {
					return;
				}
				
				var sheetByteString = atob( data.split( ',' )[1] );
				var sheetByteStringLen = sheetByteString.length;
				var buffer = new ArrayBuffer( sheetByteStringLen );
				var intArray = new Uint8Array( buffer );
				for ( var i = 0; i < sheetByteStringLen; i++) {
					intArray[i] = sheetByteString.charCodeAt( i );
				}
				var sheetBytes = new Blob( [buffer], { type: 'image/png' } );
				
				sheetEdit = new mw.Api( {
					ajax: { contentType: 'multipart/form-data' }
				} ).postWithToken( 'edit', {
					action: 'upload',
					ignorewarnings: true,
					comment: summary,
					filename: $doc.data( 'spritesheet' ),
					file: sheetBytes
				} ).fail( handleError );
			} );
			$.when( sheetData, sheetEdit ).done( function() {
				var newContent;
				if ( refresh ) {
					newContent = parseApi.get( {
						title: mw.config.get( 'wgPageName' ),
						text: $( '<i>' ).html(
							$.parseHTML( $doc.attr( 'data-refreshtext' ) )
						).html()
					} );
				}
				
				$.when( newContent ).done( function( data ) {
					if ( refresh ) {
						$doc.html( data.parse.text['*'] );
					}
					
					destroy();
					
					mw.hook( 'postEdit' ).fire( { message: i18n.changesSavedNotice } );
				} );
			} );
		} );
	};
	
	/**
	 * Handles special case errors that ocurr when saving (AKA, handleError with edit conflicts)
	 *
	 * If there's an edit conflict, this will be display a barely human-usable edit conflict
	 * panel, where the user may manually merge the raw lua table changes. Sprite edit conflict
	 * merging is not supported (because image uploading doesn't implement edit conflicts, for one).
	 * Otherwise, passes it on to handleError.
	 *
	 * "code" and "data" are the standard variables returned by a mw.Api promise rejection.
	 */
	var handleSaveError = function( code, data ) {
		if ( code !== 'editconflict' ) {
			handleError( code, data );
			return;
		}
		
		var conflictPanel = panels.conflict || panel(
			'conflict',
			i18n.panelConflictTitle,
			$( '<p>' ).text( i18n.panelConflictText ),
			{
				left: { text: i18n.panelConflictReview, config: {
					id: 'review-conflict-changes',
					action: function() {
						if ( $( this ).hasClass( 'spriteedit-processing' ) ) {
							return;
						}
						$( this ).blur().addClass( 'spriteedit-processing' );
						
						var changesPanel = panels.ecchanges || panel(
							'ecchanges',
							i18n.panelEcchangesTitle,
							$( '<div>' ).addClass( 'spriteedit-id-changes' ),
							{ right: { text: i18n.panelEcchangesReturn, config: {
								id: 'spriteedit-return-edit',
								type: 'progressive',
								action: function() {
									conflictPanel.show();
								}
							} } }
						);
						
						revisionsApi.post( {
							pageids: idsPageId,
							rvprop: '',
							rvdifftotext: $( this ).closest( '.spriteedit-dialog-panel' )
								.find( 'textarea:first' ).val(),
							rvlimit: 1
						} ).done( function( data ) {
							changesPanel.clean();
							
							var diff = makeDiff( data );
							if ( !diff ) {
								diff = i18n.panelChangesNoDiffFromCur;
							}
							changesPanel.$text.find( '.spriteedit-id-changes' ).append( diff );
							changesPanel.show();
						} ).fail( handleError );
					}
				} },
				right: { text: i18n.panelConflictSave, config: {
					id: 'save-conflict',
					type: 'constructive',
					action: function() {
						if ( $( this ).hasClass( 'spriteedit-processing' ) ) {
							return;
						}
						$( this ).blur().addClass( 'spriteedit-processing' );
						
						var summary = $( '#spriteedit-summary' ).val();
						idsTable = conflictPanel.$text.find( 'textarea:first' ).val();
						saveChanges( summary, idsTable, true );
					}
				} }
			},
			function() {
				this.$actions.find( 'button' ).removeClass( 'spriteedit-processing' );
			}
		);
		
		var idsDiff = revisionsApi.post( {
			pageids: idsPageId,
			rvprop: '',
			rvdifftotext: idsTable,
			rvlimit: 1
		} ).fail( handleError );
		revisionsApi.get( { pageids: idsPageId } ).done( function( data ) {
			var opt = mw.user.options.get( [ 'rows', 'cols' ] );
			var $textbox = $( '<textarea>' ).addClass( 'mw-ui-input' ).prop( {
				rows: opt.rows,
				cols: opt.cols
			} );
			
			var $curText = $( '<div>' ).append(
				$textbox.clone().val( data.query.pages[idsPageId].revisions[0]['*'] )
			);
			var $oldText = $( '<div>' ).append(
				$textbox.clone().prop( 'readonly', true ).val( idsTable )
			);
			
			idsDiff.done( function( data ) {
				var $diff = $( '<div>' ).append( makeDiff( data ) );
				
				conflictPanel.$text
					.append( $( '<p>' ).text( i18n.panelConflictCurText ) )
					.append( $curText )
					.append( $diff )
					.append( $( '<p>' ).text( i18n.panelConflictYourText ) )
					.append( $oldText );
				
				conflictPanel.show();
			} );
		} ).fail( handleError );
	};
	
	/**
	 * Converts a position to pixel co-ordinates on the sheet
	 */
	var posToPx = function( pos ) {
		pos -= 1;
		var imagesPerRow = settings.sheetWidth / settings.imageWidth;
		return {
			left: pos % imagesPerRow * settings.imageWidth,
			top: Math.floor( pos / imagesPerRow ) * settings.imageHeight
		};
	};
	
	/**
	 * Inserts new images into the editor
	 *
	 * A box is created for the new image, with the name set to the file's name (minus extension).
	 * The box is inserted into the nearest section and then sorted to the correct location.
	 * Any file that doesn't match the image/* mime type is ignored.
	 *
	 * "files" is a "FileList" (or an array of "File" objects) from a file input or drop.
	 * "section" is an Element which is the section to place the sprites in. Defaults to
	 * the nearestSection()
	 */
	var insertSprites = function( files, section ) {
		var $parent = $( section || nearestSection() ).find( '.spritedoc-boxes' );
		$.each( files, function() {
			if ( !this.type.match( /^image\// ) ) {
				return;
			}
			
			var $newBox = $boxTemplate.clone();
			$newBox.find( 'code' ).text( $.trim( this.name ).replace( /\.[^\.]+$/, '' ) );
			scaleImage( this ).done( function( $img ) {
				$newBox.find( '.spritedoc-image' ).html( $img );
			} );
			
			var name = $newBox.find( '.spritedoc-name' ).text();
			$newBox.attr( 'data-sort-key', name );
			
			var index = getAlphaIndex( name, undefined, $parent );
			change( 'insert', {
				$elem: $newBox,
				index: index - 1,
				$parent: $parent
			} );
		} );
		
		if ( !modified.sheet && $doc.find( '.spriteedit-new' ).length ) {
			modified.sheet = true;
		}
	};
	
	/**
	 * Constructs (or retrieves) a canvas for a particular purpose
	 *
	 * Either for image scaling, or spritesheet creation.
	 *
	 * Returns an object containing the canvas, its context,
	 * and some convenience functions for clearing the canvas
	 * and for updating its dimensions.
	 *
	 * "type" is the canvas type ("image" or "sheet").
	 */
	var getCanvas = ( function() {
		var canvases = {};
		return function( type ) {
			if ( canvases[type] ) {
				return canvases[type];
			}
			
			var $canvas = $( '<canvas>' ).attr( {
				width: settings[type + 'Width'],
				height: settings[type + 'Height']
			} ).appendTo( $doc );
			var canvas = $canvas[0];
			var ctx = canvas.getContext( '2d' );
			
			var funcs = {
				canvas: canvas,
				ctx: ctx,
				resize: function() {
					$canvas.attr( {
						width: settings[type + 'Width'],
						height: settings[type + 'Height']
					} );
				},
				clear: function() {
					ctx.clearRect( 0, 0, canvas.width, canvas.height );
				}
			};
			canvases[type] = funcs;
			return funcs;
		};
	}() );
	
	/**
	 * Scales an image down to the correct size (if necessary)
	 *
	 * Performs only a basic low quality scaling, ignoring the original image's
	 * aspect ratio.
	 * Also performs a "scale" if the image isn't a png, in essence converting it to one.
	 *
	 * Returns a promise which will contain a jQuery object containing a new image element
	 * the url of which is either a object URL or data URL of the scaled image.
	 */
	var scaleImage = ( function() {
		var scaler;
		return function( file ) {
			var deferred = $.Deferred();
			var img = new Image();
			img.onload = function() {
				if (
					file.type === 'image/png' &&
					img.width === settings.imageWidth && img.height === settings.imageHeight
				) {
					// No scaling necessary
					deferred.resolve( $( img ) );
					return;
				}
				
				if ( !scaler ) {
					scaler = getCanvas( 'image' );
				}
				scaler.clear();
				scaler.ctx.drawImage( img, 0, 0, settings.imageWidth, settings.imageHeight );
				
				URL.revokeObjectURL( img.src );
				
				var scaledImg = new Image();
				scaledImg.onload = function() {
					deferred.resolve( $( scaledImg ) );
				};
				scaledImg.src = scaler.canvas.toDataURL();
			};
			img.src = URL.createObjectURL( file );
			
			loadingImages.push( deferred.promise() );
			return deferred.promise();
		};
	}() );
	
	/**
	 * Creates panels to display in a dialog window
	 *
	 * If this is the first panel, the dialog window is created.
	 * Panels are stored in the "panels" object, which should be checked for
	 * for panel id prior to calling this function to create a new panel,
	 * so duplicates are not made.
	 * E.g: `var myPanel = panels.myPanel || panel( 'myPanel', ... );`
	 *
	 * Returns the panel object for the new panel (or the currently displayed
	 * panel if called with no arguments).
	 * The panel object contains jQuery objects of the panel's parts, and methods
	 * for controlling the panel/dialog window.
	 */
	var panel = function( id, title, content, actions, onShow, cached ) {
		var $overlay, $dialog = $( '.spriteedit-dialog' );
		if ( !id ) {
			return panels[$dialog.data( 'active-panel' )];
		}
		
		var thisPanel = panels[id];
		if ( thisPanel ) {
			return thisPanel;
		}
		
		if ( !$dialog.length ) {
			$overlay = $( '<div>' ).addClass( 'spriteedit-dialog-overlay' ).css( 'display', 'none' );
			$dialog = $( '<div>' ).addClass( 'spriteedit-dialog' ).append(
				makeButton( '×', {
					id: 'spriteedit-dialog-close',
					props: { title: i18n.panelCloseTip },
					action: function() {
						panel().hide();
					}
				} )
			).appendTo( $overlay );
		}
		
		if ( content && !$.isArray( content ) ) {
			content = [ content ];
		}
		
		var $panel = $( '<div>' )
			.prop( 'id', 'spriteedit-dialog-' + id )
			.addClass( 'spriteedit-dialog-panel' );
		
		var $title = $( '<div>' ).addClass( 'spriteedit-dialog-title' ).text( title ).appendTo( $panel );
		
		var $text = $( '<div>' ).addClass( 'spriteedit-dialog-text' ).appendTo( $panel );
		
		if ( content ) {
			$text.append( content );
			
			// Keep content as the inital HTML for resetting
			content = $text.html();
		}
		
		var $actions;
		if ( actions ) {
			$actions = $( '<div>' ).addClass( 'spriteedit-dialog-actions' ).appendTo( $panel );
			var $leftActions = $( '<span>' ).appendTo( $actions );
			var $rightActions = $( '<span>' ).css( 'float', 'right' ).appendTo( $actions );
			var addButtons = function( buttons, right ) {
				if ( !buttons ) {
					return;
				}
				
				var $area = right ? $rightActions : $leftActions;
				if ( !$.isArray( buttons ) ) {
					buttons = [ buttons ];
				}
				$.each( buttons, function() {
					$area.append( makeButton( this.text, this.config ) );
				} );
			};
			
			addButtons( actions.left );
			addButtons( actions.right, true );
		}
		
		$dialog.append( $panel );
		
		if ( $overlay ) {
			$doc.append( $overlay );
		} else {
			$overlay = $dialog.parent();
		}
		
		$overlay.show();
		var titleHeight = $title.innerHeight();
		var actionsHeight;
		if ( actions ) {
			actionsHeight = $actions.innerHeight();
		}
		$panel.css( {
			paddingTop: titleHeight,
			paddingBottom: actionsHeight
		} );
		$title.css( 'margin-top', -titleHeight );
		if ( actions ) {
			$actions.css( 'margin-bottom', -actionsHeight );
		}
		if ( $overlay.css( 'opacity' ) === '0' ) {
			$overlay.hide();
		}
		$panel.hide();
		
		thisPanel = panels[id] = {
			$panel: $panel,
			$title: $title,
			$text: $text,
			$actions: $actions,
			show: function( callback ) {
				$dialog.css( { width: '', height: '', transform: 'none', transition: 'none' } );
				
				var prevPanel;
				if ( $overlay.css( 'opacity' ) === '1' ) {
					prevPanel = panel();
					// Remember to cleanup previous panel when the dialog is closed
					if ( prevPanel && !prevPanel.cached ) {
						prevPanel.cleanup = true;
					}
				}
				
				var oldRect;
				if ( prevPanel ) {
					oldRect = $dialog[0].getBoundingClientRect();
					prevPanel.$panel.hide();
				}
				$overlay.css( 'display', '' );
				$panel.css( 'display', '' );
				var newRect = $dialog[0].getBoundingClientRect();
				$dialog.css( 'transform', '' ).redraw().css( 'transition', '' );
				
				$dialog.transitionEnd( function() {
					if ( onShow ) {
						onShow.call( thisPanel );
					}
					if ( callback ) {
						callback.call( thisPanel );
					}
				} );
				
				if ( prevPanel ) {
					if ( oldRect.width === newRect.width && oldRect.height === newRect.height ) {
						// No transition to be made
						$dialog.css( {
							width: newRect.width,
							height: newRect.height
						} );
						
						$dialog.trigger( 'transitionend' );
					} else {
						$panel.css( 'display', 'none' );
						$dialog.css( {
							width: oldRect.width,
							height: oldRect.height
						} );
						$dialog.redraw();
						$dialog.css( {
							width: newRect.width,
							height: newRect.height
						} );
						
						$dialog.transitionEnd( function() {
							panelShown = true;
							$panel.css( 'display', '' );
						} );
						
						// Make sure the panel gets displayed
						var panelShown;
						setTimeout( function() {
							if ( panelShown ) {
								return;
							}
							
							$dialog.trigger( 'transitionend' );
						}, 1000 );
					}
				} else {
					$overlay.css( 'opacity', 1 );
					$dialog
						.addClass( 'spriteedit-elastic' )
						.css( {
							transform: 'scale(1)',
							width: newRect.width,
							height: newRect.height
						} )
						.transitionEnd( function() {
							$dialog.removeClass( 'spriteedit-elastic' );
						} );
				}
				
				$dialog.data( 'active-panel', id );
				
				return this;
			},
			hide: function( callback ) {
				if ( !$overlay.is( ':visible' ) ) {
					return this;
				}
				
				$dialog.css( 'transform', 'scale(0)' );
				$overlay.css( 'opacity', 0 ).transitionEnd( function() {
					// Reset scrollbar BEFORE hiding
					$text.scrollLeft( 0 );
					$text.scrollTop( 0 );
					
					$overlay.css( 'display', 'none' );
					thisPanel.$panel.css( 'display', 'none' );
					
					if ( !cached ) {
						thisPanel.cleanup = true;
					}
					$.each( panels, function() {
						if ( this.cleanup ) {
							this.clean();
						}
					} );
					
					if ( callback ) {
						callback.call( thisPanel );
					}
				} );
				
				return this;
			},
			clean: function() {
				$text.empty();
				
				if ( content ) {
					$text.append( content );
				}
				
				thisPanel.cleanup = false;
			},
			onShow: onShow,
			cached: cached
		};
		return thisPanel;
	};
	
	/**
	 * Creates a simple tooltip
	 *
	 * Used to create a small tooltip anchored to an element.
	 * Only a single tooltip can exist at a time (opening a new one will close the old)
	 * and clicking anywhere but the tooltip itself will close it.
	 *
	 * In the main function:
	 * "$elem" is a jQuery object which the tooltip should be anchored to.
	 * "content" is the content to go in the tooltip, and can be in whatever format can
	 * go into jQuery().append (jQuery objects, elements, HTML strings, etc.).
	 * "horizontal" is a boolean determining if the tooltip should open horizontally or vertically
	 * relative to its anchor.
	 * "callback" is a function called once the tooltip finishes its opening animation.
	 *
	 * In the tooltip.hide function:
	 * "callback" is a function called once the tooltip finishes its closing animation.
	 */
	var tooltip = ( function() {
		var $tooltip = $(), $anchor = $();
		
		$win.click( function( e ) {
			if (
				e.which === 1 &&
				$tooltip.length && !$tooltip.has( e.target ).length &&
				$tooltip.css( 'opacity' ) === '1'
			) {
				func.hide();
			}
		} );
		
		var func = function( $elem, content, horizontal, callback ) {
			if ( $tooltip.length ) {
				if ( $elem.is( $anchor ) ) {
					func.hide();
					return;
				}
				
				func.hide();
			}
			
			$anchor = $elem;
			$tooltip = $( '<div>' ).addClass( 'spriteedit-tooltip' ).append(
				$( '<div>' ).addClass( 'spriteedit-tooltip-text' ).append( content ),
				$( '<div>' ).addClass( 'spriteedit-tooltip-arrow' )
			).appendTo( $doc );
			
			var anchorPos = $anchor.offset();
			var docPos = $doc.offset();
			if ( horizontal ) {
				$tooltip.addClass( 'spriteedit-tooltip-horizontal' ).css( {
					top: anchorPos.top - docPos.top + $anchor.outerHeight() / 2,
					left: anchorPos.left - docPos.left - $tooltip.outerWidth()
				} );
			} else {
				$tooltip.css( {
					top: anchorPos.top - docPos.top - $tooltip.outerHeight(),
					left: anchorPos.left - docPos.left + $anchor.outerWidth() / 2
				} );
			}
			
			$tooltip.addClass( 'spriteedit-elastic' ).css( {
				opacity: 1,
				transform: 'scale(1)'
			} ).transitionEnd( function() {
				$( this ).removeClass( 'spriteedit-elastic' );
				
				if ( callback ) {
					callback.call( this );
				}
			} );
		};
		func.hide = function( callback ) {
			if ( !$tooltip.length ) {
				return;
			}
			
			$tooltip.off( 'transitionend.spriteEdit' ).css( {
				opacity: 0,
				transform: 'scale(0)'
			} ).transitionEnd( function() {
				$( this ).remove();
				
				if ( callback ) {
					callback.call( this );
				}
			} );
			
			$tooltip = $anchor = $();
		};
		
		return func;
	}() );
	
	/**
	 * Makes a set of elements sortable by dragging them
	 *
	 * The elements can either be dragged around to be sorted within or between
	 * each set manually or can be sorted in each set automatically, with dragging
	 * only being used to move them between sets.
	 *
	 * The "options" object contains:
	 * "selectors" is a string containing the selector of the set of elements to enable sorting,
	 * or an object containing containing additional selections to define the sortable element's parent
	 * and the sortable elements container (which elements can be sorted between).
	 * "handle" is a string containing the selector to find the element which the handle is a child of,
	 * in relation to the sortable element. Set if the handle is not a direct child of the sortable
	 * element.
	 * "vertical" is a boolean determining if the elements should only be able to be moved vertically.
	 * "autoSort" is a boolean determining if the elements should be sorted within their container
	 * automatically, only allowing elements to be manually moved between containers.
	 * "sortStart" is a callback function called after the placeholder and ghost elements are created,
	 * but prior to sorting actually beginning. "this" is set to the ghost element, and the first
	 * argument is set to the placeholder element if there is one.
	 * "sortEnd" is a callback function called after the element has been sorted, but prior to the
	 * placeholder and ghost elements being destroyed. Variables are set the same as "sortStart".
	 */
	var makeSortable = function( options ) {
		var selectors = options.selectors;
		var handle = options.handle || '';
		var vertical = options.vertical;
		var autoSort = options.autoSort;
		var selector = selectors;
		var $ghost = $(), $placeholder = $(), $hover = $(), $hoverParent = $();
		if ( typeof selectors !== 'string' ) {
			selector = selectors.parent + ' > ' + selectors.elem;
		}
		
		if ( pointerEventsSupported ) {
			if ( autoSort ) {
				$doc.on( 'mouseenter.spriteEdit', selectors.container, function() {
					if ( $ghost.length ) {
						$hoverParent = $( this ).css( 'outline', '1px dashed #000' );
					}
				} ).on( 'mouseleave.spriteEdit', selectors.container, function() {
					if ( $ghost.length ) {
						$hoverParent.css( 'outline', '' );
						$hoverParent = $();
					}
				} );
			} else {
				$doc.on( 'mouseenter.spriteEdit', selector, function() {
					if ( $ghost.length && !$( this ).is( $placeholder ) ) {
						$hover = $( this );
					}
				} ).on( 'mouseleave.spriteEdit', selector, function() {
					if ( $ghost.length ) {
						$hover = $();
					}
				} );
			}
		}
		
		$doc.on( 'mousedown.spriteEdit', selector + ' ' + handle + ' > .spriteedit-handle', function( e ) {
			if ( e.which !== 1 ) {
				return;
			}
			
			if ( handle ) {
				$ghost = $( this ).closest( selector );
			} else {
				$ghost = $( this ).parent();
			}
			
			if ( $ghost.find( '.spriteedit-new' ).length && $.trim( $ghost.text() ) === '' ) {
				$ghost = $();
				return;
			}
			
			tooltip.hide();
			
			// Keep the documentation from getting smaller to allow for overscroll
			$doc.css( 'min-height', $doc[0].getBoundingClientRect().height );
			
			var ghostElem = $ghost[0];
			
			if ( !autoSort ) {
				// We don't want to clone all the content, just the parent element
				$placeholder = $( '<' + ghostElem.nodeName + '>' )
					.addClass( ghostElem.className + ' spriteedit-placeholder' )
					.insertAfter( $ghost );
			}
			
			// Calculate cursor offset percentage to apply
			// after the ghost is resized to its correct size
			var ghostRect = ghostElem.getBoundingClientRect();
			var cursorOffset = {
				top: ( ghostRect.top - e.clientY ) / ghostRect.height,
				left: ( ghostRect.left - e.clientX ) / ghostRect.width
			};
			
			$ghost.addClass( 'spriteedit-ghost' ).css( {
				top: e.clientY,
				left: e.clientX
			} );
			
			// Apply offsets
			var newGhostRect = ghostElem.getBoundingClientRect();
			$ghost.css( {
				marginTop: newGhostRect.height * cursorOffset.top,
				marginLeft: newGhostRect.width * cursorOffset.left
			} );
			
			if ( options.sortStart ) {
				options.sortStart.call( ghostElem, $placeholder[0] );
			}
			
			// Must be set after callback for collapsing.
			if ( !autoSort ) {
				$placeholder.css( 'min-height', ghostElem.getBoundingClientRect().height );
			}
			
			$ghost.parent().mouseenter();
			
			// HACK: Fix IE8 selecting things while dragging
			$( document ).on( 'selectstart', function( e ) {
				e.preventDefault();
			} );
			
			sorting = true;
			$root.addClass( 'spriteedit-sorting spriteedit-hidecontrols' );
			
			requestAnimationFrame( mouseMove );
			
			e.preventDefault();
		} );
		
		var mouseMove = function() {
			if ( !$ghost.length ) {
				return;
			}
			requestAnimationFrame( mouseMove );
			
			if ( !mouse.moved ) {
				return;
			}
			mouse.moved = false;
			
			var pos = { top: mouse.y };
			if ( !vertical ) {
				pos.left = mouse.x;
			}
			$ghost.css( pos );
			
			if ( !pointerEventsSupported ) {
				// Emulate pointer-events:none
				$ghost.css( 'visibility', 'hidden' );
				var $nearest = $( document.elementFromPoint( mouse.x, mouse.y ) );
				if ( autoSort ) {
					$hoverParent.css( 'outline', '' );
					$hoverParent = $nearest.closest( selectors.container );
					$hoverParent.css( 'outline', '1px dashed #000' );
				} else {
					$hover = $nearest.closest( selector );
				}
				$ghost.css( 'visibility', '' );
			}
			
			if ( $hover.length ) {
				var side = 'Before';
				if ( $hover.index() > $placeholder.index() ) {
					side = 'After';
				}
				$placeholder['insert' + side]( $hover );
				$hover = $();
			}
		};
		
		$( document ).on( 'mouseup.spriteEdit', function( e ) {
			if ( e.which !== 1 || !$ghost.length ) {
				return;
			}
			
			var index = -1;
			if ( autoSort ) {
				if ( $hoverParent.length && !$ghost.closest( selectors.container ).is( $hoverParent ) ) {
					var text = $ghost.attr( 'data-sort-key' ) || $ghost.text();
					index = getAlphaIndex( text, undefined, $hoverParent.find( selectors.parent ) );
				}
			} else {
				index = $placeholder.index();
			}
			
			if (
				index > -1 && (
					index - 1 !== $ghost.index() ||
					autoSort && $hoverParent.length &&
					!$ghost.closest( selectors.container ).is( $hoverParent )
				)
			) {
				// If the last name is moved, delete its box
				if ( $ghost.hasClass( 'spritedoc-name' ) && !$ghost.siblings().length ) {
					var $box = $ghost.closest( selectors.container );
					change( 'delete', {
						$elem: $box,
						index: $box.index() - 1,
						$parent: $box.parent()
					}, true );
				}
				
				change( 'insert', {
					$elem: $ghost,
					oldIndex: $ghost.index() - 1,
					$oldParent: $ghost.parent(),
					index: index - 1,
					$parent: $hoverParent.length && $hoverParent.find( selectors.parent ) ||
						$placeholder.parent()
				} );
			}
			
			$ghost.removeAttr( 'style' ).removeClass( 'spriteedit-ghost' );
			$hoverParent.css( 'outline', '' );
			$doc.css( 'min-height', '' );
			
			if ( options.sortEnd ) {
				options.sortEnd.call( $ghost[0], $placeholder[0] );
			}
			
			$placeholder.remove();
			$ghost = $placeholder = $hover = $hoverParent = $();
			
			// Remove IE8 hack
			$( document ).off( 'selectstart' );
			
			sorting = false;
			$root.removeClass( 'spriteedit-sorting spriteedit-hidecontrols' );
		} );
	};
	
	/**
	 * Allows repeatable changes to be performed, which can be undone and redone
	 *
	 * The main function performs a change of a particular type.
	 * "action" is the type of change this is:
	 * * "edit" is changes to text (anything contentEditable)
	 * * "insert" is any element being inserted, either fresh from the aether or taken
	 *   from somewhere else in the document.
	 * * "delete" is any element being removed from the document.
	 * * "replace image" is when an image is replaced with a new image.
	 * * "reset image" is when an image is reset to the original image in the sprite sheet.
	 * "content" is an object containing anything necessary to describe the change, including
	 * details to revert the change.
	 * "queueChange" is a boolean determining if the change should be queued rather than committed
	 * to history immediately. This allows multiple changes to be grouped as one history event. Note
	 * that making a change which isn't queued will commit any currently queued changes to history
	 * along with itself.
	 * "oldChange" is a boolean determining if this change shouldn't be queued. Intended mainly for
	 * undoing/redoing.
	 *
	 * The change.commit function allows queued changes to be committed to history.
	 * The change.discard function allows queued changes to be discarded, although the changes
	 * are not reverted.
	 */
	var change = ( function() {
		var queue = [];
		var func = function( action, content, queueChange, oldChange ) {
			switch ( action ) {
				case 'edit':
					if ( oldChange ) {
						content.$elem.text( content.text );
					}
					
					if ( content.$elem.parent().hasClass( 'spritedoc-name' ) ) {
						updateName( content.oldText, content.text, content.$elem );
					}
				break;
				
				case 'insert':
					var moved = content.$elem.parent().length;
					var isBox = content.$elem.hasClass( 'spritedoc-box' );
					var $oldBox = !isBox && content.$elem.closest( '.spritedoc-box' );
					
					if ( content.index === -1 ) {
						content.$parent.prepend( content.$elem );
					} else {
						content.$parent.children().eq( content.index ).after( content.$elem );
					}
					
					if ( !moved && ( isBox || content.$elem.hasClass( 'spritedoc-section' ) ) ) {
						content.$elem.find( '.spritedoc-name' ).find( 'code' ).each( function() {
							updateName( undefined, $( this ).text(), $( this ) );
						} );
					} else if ( content.$elem.hasClass( 'spritedoc-name' ) ) {
						if ( moved ) {
							var $box = content.$elem.closest( '.spritedoc-box' );
							if ( !$box.is( $oldBox ) ) {
								updateBoxSorting( $oldBox );
							}
							updateBoxSorting( $box );
						} else {
							var $code = content.$elem.find( 'code' );
							updateName( undefined, $code.text(), $code );
						}
					}
					
					requestAnimationFrame( function() {
						scrollIntoView( content.$elem );
					} );
				break;
				
				case 'delete':
					var isBox = content.$elem.hasClass( 'spritedoc-box' );
					var $box = !isBox && content.$elem.closest( '.spritedoc-box' );
					
					content.$elem.detach();
					
					if ( isBox || content.$elem.hasClass( 'spritedoc-section' ) ) {
						content.$elem.find( '.spritedoc-name' ).find( 'code' ).each( function() {
							updateName( $( this ).text(), undefined, $( this ) );
						} );
					} else if ( content.$elem.hasClass( 'spritedoc-name' ) ) {
						var $code = content.$elem.find( 'code' );
						updateName( $code.text(), undefined, $code );
						updateBoxSorting( $box );
					}
				break;
				
				case 'replace image':
					var $box = content.$parent.parent();
					if ( content.$oldImg && content.$oldImg.length ) {
						content.$oldImg.detach();
					} else {
						$box.addClass( 'spriteedit-new' );
						content.$parent.children().css( 'display', 'none' );
					}
					content.$parent.append( content.$elem );
					modified.sheet = true;
				break;
				
				case 'reset image':
					content.$elem.detach();
					content.$parent.children().css( 'display', '' );
					content.$parent.parent().removeClass( 'spriteedit-new' );
					
					if ( !$doc.find( '.spriteedit-new' ).length ) {
						modified.sheet = false;
					}
				break;
				
				case 'toggle deprecation':
					content.$elem.toggleClass( 'spritedoc-deprecated' );
				break;
			}
			
			var hist = { action: action, content: content };
			if ( !oldChange ) {
				queue.push( hist );
				if ( !queueChange ) {
					func.commit();
				}
			} else {
				// These parsed changes are no longer up-to-date
				idsTable = idChanges = sheetData = modified.names = null;
			}
		};
		func.commit = function() {
			addHistory( queue );
			// These parsed changes are no longer up-to-date
			idsTable = idChanges = sheetData = modified.names = null;
			
			queue = [];
		};
		func.discard = function() {
			queue = [];
			
			if ( !changes.length ) {
				$.each( [
					'#spriteedit-save',
					'#spriteedit-summary',
					'#spriteedit-review-button'
				], function() {
					$( this ).prop( 'disabled', true );
				} );
			}
		};
		
		return func;
	}() );
	
	/**
	 * Adds a change to history
	 *
	 * Handles enabling the save and undo button, disabling the redo button,
	 * releasing undone object URLs, and deleting the undone changes.
	 */
	var addHistory = function( actions ) {
		changes.push( actions );
		
		if ( undoneChanges.length ) {
			// Release now unusable image URLs
			$.each( undoneChanges, function() {
				if ( this.action === 'replace image' ) {
					URL.revokeObjectURL( this.content.$elem.attr( 'src' ) );
				}
			} );
			
			undoneChanges = [];
			
			$( '#spriteedit-redo' ).prop( 'disabled', true );
		}
		
		$.each( [
				'#spriteedit-undo',
				'#spriteedit-save',
				'#spriteedit-summary',
				'#spriteedit-review-button'
			], function() {
				$( this ).prop( 'disabled', false );
			} );
	};
	
	/**
	 * Reverts a change
	 *
	 * Takes a previously stored history entry and performs the necessary change
	 * to revert it.
	 */
	var revert = function( hist ) {
		// Invert the history entry's changes to revert it
		var i = hist.length, histChange, content;
		while ( i-- ) {
			histChange = hist[i];
			content = histChange.content;
			switch( histChange.action ) {
				case 'edit':
					change( 'edit', {
						$elem: content.$elem,
						text: content.oldText,
						oldText: content.text
					}, false, true );
				break;
				
				case 'insert':
					if ( content.$oldParent ) {
						change( 'insert', {
							$elem: content.$elem,
							index: content.oldIndex,
							$parent: content.$oldParent
						}, false, true );
					} else {
						change( 'delete', {
							$elem: content.$elem,
							$parent: content.$parent
						}, false, true );
					}
				break;
				
				case 'delete':
					change( 'insert', {
						$elem: content.$elem,
						index: content.index,
						$parent: content.$parent
					}, false, true );
				break;
				
				case 'replace image':
					if ( content.$oldImg.length ) {
						change( 'replace image', {
							$elem: content.$oldImg,
							$parent: content.$parent,
							$oldImg: content.$elem
						}, false, true );
					} else {
						change( 'reset image', content, false, true );
					}
				break;
				
				case 'reset image':
					change( 'replace image', content, false, true );
				break;
				
				case 'toggle deprecation':
					change( 'toggle deprecation', content, false, true );
				break;
			}
		}
		
		if ( !changes.length ) {
			$.each( [
				'#spriteedit-undo',
				'#spriteedit-save',
				'#spriteedit-summary',
				'#spriteedit-review-button'
			], function() {
				$( this ).prop( 'disabled', true );
			} );
		}
	};
	
	/**
	 * Updates the list of names for duplicate detection
	 *
	 * Also sorts the names and box if necessary.
	 */
	var updateName = function( oldText, newText, $elem ) {
		if ( oldText ) {
			var oldNames = names[oldText];
			if ( oldNames.length === 1 ) {
				delete names[oldText];
			} else {
				$.each( oldNames, function( i ) {
					if ( $elem.is( this ) ) {
						oldNames.splice( i, 1 );
						return false;
					}
				} );
				if ( oldNames.length === 1 ) {
					oldNames[0].removeClass( 'spriteedit-dupe' );
				}
			}
		}
		
		var $item = $elem.parent();
		var oldIndex = $item.index();
		if ( newText ) {
			var newNames = names[newText];
			if ( !newNames ) {
				newNames = names[newText] = [];
				$elem.removeClass( 'spriteedit-dupe' );
			} else {
				if ( newNames.length === 1 ) {
					newNames[0].addClass( 'spriteedit-dupe' );
				}
				$elem.addClass( 'spriteedit-dupe' );
			}
			newNames.push( $elem );
			
			var $parent = $item.parent();
			var index = getAlphaIndex( newText, $item );
			if ( index !== oldIndex ) {
				change( 'insert', {
					$elem: $item,
					oldIndex: oldIndex - 1,
					$oldParent: $parent,
					index: index - 1,
					$parent: $parent
				}, false, true );
			} else if ( index === 0 ) {
				updateBoxSorting( $item.closest( '.spritedoc-box' ) );
			}
		}
	};
	
	/**
	 * Update's the box's sort key and sorts it.
	 */
	var updateBoxSorting = function( $box ) {
		var name = $box.find( '.spritedoc-name' ).first().text();
		var oldName = $box.attr( 'data-sort-key' );
		if ( name === oldName ) {
			return;
		}
		
		$box.attr( 'data-sort-key', name );
		
		var $parent = $box.parent();
		var oldIndex = $box.index();
		var index = getAlphaIndex( name, $box );
		if ( index !== oldIndex ) {
			change( 'insert', {
				$elem: $box,
				oldIndex: oldIndex - 1,
				$oldParent: $parent,
				index: index - 1,
				$parent: $parent
			}, false, true );
		}
	};
	
	/**
	 * Handles generic API errors
	 *
	 * Just uselessly displays whatever error the API returns.
	 * Hopefully the user can retry whatever they were doing.
	 *
	 * "code" and "data" are the standard variables returned by a mw.Api promise rejection.
	 */
	var handleError = function( code, data ) {
		var errorPanel = panels.error || panel(
			'error',
			i18n.panelErrorTitle
		);
		
		var errorText;
		if ( code === 'http' ) {
			if ( data.textStatus === 'error' ) {
				errorText = i18n.panelErrorConnection;
			} else {
				errorText = i18n.panelErrorHttp + ' ' + data.textStatus;
			}
		} else {
			errorText = i18n.panelErrorApi + ' ' + data.error.info;
		}
		errorPanel.$text.text( errorText );
		
		errorPanel.show();
	};
	
	/**
	 * Destroys the editor
	 *
	 * Removes any controls, and unbinds all events in the spriteEdit namespace, and releases
	 * object URLs.
	 *
	 * "restore" is a boolean determining if the documentation should be restored to how it was
	 * prior to opening the editor.
	 * "leaveUrl" is a boolean determining if a the page URL shouldn't be updated to remove the
	 * spriteedit action. Used for when the editor is destroyed due to history navigation.
	 */
	var destroy = function( restore, leaveUrl ) {
		$win.add( document ).off( '.spriteEdit' );
		
		if ( !leaveUrl ) {
			if ( historySupported ) {
				history.pushState( {}, '', mw.util.getUrl() );
			} else if ( location.search.match( 'spriteaction=edit' ) ) {
				location = mw.util.getUrl();
			}
		}
		
		var enabled = $root.hasClass( 'spriteedit-enabled' );
		
		$root.removeClass( 'spriteedit-loaded spriteedit-enabled spriteedit-imageeditingenabled' );
		
		var $viewTab = $( '#ca-view' );
		$viewTab.add( '#ca-spriteedit' ).toggleClass( 'selected' );
		
		$doc.add( $viewTab.find( 'a' ) ).off( '.spriteEdit' );
		
		// No furthur cleanup necessary
		if ( !enabled ) {
			return;
		}
		
		$( '.mw-editsection' ).add( '.mw-editsection-like' ).css( 'display', '' );
		
		// Release old image URL references
		if ( modified.sheet ) {
			$.each( changes, function() {
				if ( this.action === 'replace image' ) {
					URL.revokeObjectURL( this.content.$oldImg.attr( 'src' ) );
				}
			} );
		}
		
		if ( restore ) {
			// Release current image URL references
			if ( modified.sheet ) {
				$doc.find( '.spritedoc-image' ).find( 'img' ).each( function() {
					URL.revokeObjectURL( this.src );
				} );
			}
			
			$doc.html( oldHtml );
			return;
		}
		
		$doc.find( '.mw-headline' ).add( $doc.find( '.spritedoc-name' ).find( 'code' ) )
			.removeAttr( 'contenteditable' );
		
		$.each( [
			'.spriteedit-toolbar-container',
			'.spriteedit-handle',
			'.spriteedit-add-name',
			'.spriteedit-tooltip',
			'.spriteedit-dialog-overlay'
		], function() {
			$( this ).remove();
		} );
		
		$( '.spriteedit-new' ).removeClass( '.spriteedit-new' ).each( function() {
			var newPos = $( this ).data( 'new-pos' );
			if ( newPos !== undefined ) {
				$( this ).data( 'pos', newPos ).removeData( 'new-pos' );
			}
		} );
	};
};

/** Utility functions **/
/**
 * Allows calling a function when a main transition ends
 *
 * This only listens to transitions that happen on the element this is
 * called on, ignoring transitions bubbling from its children.
 * Additionally, if the browser doesn't support transitions, the callback
 * will be called immediately.
 *
 * The callback is passed along the "this" and "event" object from the event.
 */
$.fn.transitionEnd = function( callback ) {
	if ( supports( 'transition' ) ) {
		this.on( 'transitionend.spriteEdit', function( e ) {
			var $elem = $( this );
			if ( !$elem.is( e.target ) ) {
				return;
			}
			
			callback.call( this, e );
			
			$elem.off( 'transitionend.spriteEdit' );
		} );
	} else {
		callback.call( this );
	}
	
	return this;
};

/**
 * Forces the browser to redraw an element
 */
$.fn.redraw = function() {
	this.each( function() {
		this.offsetWidth;
	} );
	
	return this;
};

/**
 * Returns the index to move an element to to sort it alphabetically, ignoring case
 *
 * "text" is the string to sort by.
 * "$elem" is the jQuery object which is to be sorted
 * "$parent" is the jQuery object which is the parent of the elements which "text" will be sorted by.
 *
 * Use "$elem" when sorting an element by its siblings.
 * Use "$parent" when sorting an element in a different container.
 */
var getAlphaIndex = function( text, $elem, $parent ) {
	var index;
	var $items = $parent && $parent.children() || $elem.siblings();
	$items.each( function() {
		var $this = $( this );
		var compare = $this.attr( 'data-sort-key' ) || $this.text();
		if ( text.toLowerCase() < compare.toLowerCase() ) {
			index = $this.index();
			return false;
		}
	} );
	if ( index === undefined ) {
		if ( $items.length ) {
			index = $items.length;
			if ( !$parent ) {
				index++;
			}
		} else {
			index = 0;
		}
	}
	
	// Account for trying to sort the element after itself
	if ( !$parent && index - 1 === $elem.index() ) {
		index--;
	}
	
	return index;
};

/**
 * Attempts to scroll an element into view
 *
 * Takes into account the portion of window obscured by the toolbar.
 * Flashes the element's background yellow for a moment to bring it to attention.
 *
 * "$elem" is the jQuery object to scroll to.
 * "instant" is a boolean determining if the scrolling should be instant, instead of smooth
 * (if the browser supports smooth scrolling in the first place, that is).
 */
var scrollIntoView = function( $elem, instant ) {
	var elemRect = $elem[0].getBoundingClientRect();
	var toolbarHeight = $( '.spriteedit-toolbar' )[0].getBoundingClientRect().height;
	var scrollPos;
	if ( elemRect.top - toolbarHeight < 10 ) {
		scrollPos = elemRect.top + $win.scrollTop() - toolbarHeight - 10;
	} else {
		var winHeight = $win.height() - 40;
		if ( elemRect.height > winHeight || elemRect.bottom < winHeight ) {
			return;
		}
		scrollPos = elemRect.bottom + $win.scrollTop() - winHeight;
	}
	
	if ( !instant ) {
		$root.addClass( 'spriteedit-smoothscroll' );
	}
	
	scroll( 0, scrollPos );
	$elem.css( 'background-color', 'yellow' );
	setTimeout( function() {
		$elem.css( 'background-color', '' );
	}, 1000 );
};

/**
 * Picks the section which is probably the section the user wants to put things
 *
 * Mainly based on the section closest to the top of the screen,
 * but prefers elements which are not at all going off the screen
 * (accounting for the space taken up by the toolbar).
 *
 * Returns the section element
 */
var nearestSection = function() {
	var offscreen, prox, elem;
	$doc.find( '.spritedoc-section' ).each( function() {
		var curPos = this.getBoundingClientRect().top - 35;
		var curProx = Math.abs( curPos );
		if ( prox && curProx > prox ) {
			// Prefer on-screen section, even if it is further from the top
			if ( offscreen ) {
				elem = this;
			}
			
			return false;
		}
		
		offscreen = curPos < 0;
		prox = curProx;
		elem = this;
	} );
	
	return elem;
};

/**
 * Converts the extended ISO timestamp returned by the API
 * into the basic version used by the rest of MediaWiki
 *
 * YYYY-MM-DDTHH:MM:SSZ -> YYYYMMDDHHMMSS
 */
var fixTimestamp = function( timestamp ) {
	return timestamp.replace( /[\-T:Z]/g, '' );
};

/**
 * Quote a string for lua table
 *
 * Uses either ' or " as the delimiter (depending on which is least used in the string),
 * then escapes \ and the chosen delimiter within the string.
 */
var luaStringQuote = function( str ) {
	var quotes = ( str.match( /"/g ) || [] ).length;
	var apostrophies = ( str.match( /'/g ) || [] ).length;
	var delim = "'";
	var delimRegex = /'/g;
	if ( apostrophies > quotes ) {
		delim = '"';
		delimRegex = /"/g;
	}
	
	return delim + str.replace( /\\/g, '\\\\' ).replace( delimRegex, '\\' + delim ) + delim;
};

/**
 * Add various types of in-page controls to a set of elements
 *
 * "$elems" is a jQuery object containing the elements to add controls to.
 * "type" is the type of controls to add.
 */
var addControls = function( $elems, type ) {
	switch ( type ) {
		case 'heading':
			$elems.prepend( $( '<span>' ).addClass( 'spriteedit-handle' ) )
				.find( '.mw-headline' ).attr( 'contenteditable', true );
		break;
		case 'box':
			$elems.prepend(
				$( '<span>' ).addClass( 'spriteedit-handle' ),
				$( '<span>' ).addClass( 'spriteedit-add-name' ).append(
					makeButton( i18n.controlNewName, { type: 'progressive' } )
				)
			);
			addControls( $elems.find( '.spritedoc-name' ), 'name' );
		break;
		case 'name':
			$elems.prepend( $( '<span>' ).addClass( 'spriteedit-handle' ) )
				.find( 'code' ).attr( 'contenteditable', true );
		break;
	}
};

/**
 * Create a MW UI button element
 *
 * "text" is the string displayed on the button.
 * "config" is an object defining various properties of the button:
 * * "type" is a string or array of strings defining the MW UI types
 *   this button should be (e.g.: progressive, destructive, constructive, quiet).
 * * "id" is the id attribute applied to the button.
 * * "props" is an object of properties applied to the button.
 * * "css" is the inline styling applied to the button.
 * * "action" is a function called when the button is clicked.
 */
var makeButton = function( text, config ) {
	var $button = $( '<button>' ).addClass( 'mw-ui-button' );
	var type = config.type || [];
	
	if ( !$.isArray( type ) ) {
		type = [ type ];
	}
	$.each( type, function() {
		$button.addClass( 'mw-ui-' + this );
	} );
	
	if ( config.id ) {
		$button.prop( 'id', config.id );
	}
	
	$button
		.prop( config.props || {} )
		.css( config.css || {} )
		.text( text )
		.click( config.action );
	
	return $button;
};

/**
 * Check if a CSS property or value is supported by the browser
 */
var supports = function( prop, val ) {
	if ( !val ) {
		return prop in $root[0].style;
	}
	
	if ( window.CSS && CSS.supports ) {
		return CSS.supports( prop, val );
	}
	if ( window.supportsCSS ) {
		return supportsCSS( prop, val );
	}
	
	var camelProp = prop.replace( /-([a-z]|[0-9])/ig, function( _, chr ) {
		return chr.toUpperCase();
	} );
	var elStyle = document.createElement( 'i' ).style;
	elStyle.cssText = prop + ':' + val;
	return elStyle[camelProp] !== '';
};


/** Polyfills **/
// requestAnimationFrame
( function() {
	var vendors = [ 'webkit', 'moz' ];
	for ( var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i ) {
		var vp = vendors[i];
		window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] ||
			window[vp + 'CancelRequestAnimationFrame'];
	}
	if ( !window.requestAnimationFrame || !window.cancelAnimationFrame ) {
		var lastTime = 0;
		window.requestAnimationFrame = function( callback ) {
			var now = +new Date();
			var nextTime = Math.max( lastTime + 16, now );
			return setTimeout(
				function() { callback( lastTime = nextTime ); },
				nextTime - now
			);
		};
		window.cancelAnimationFrame = clearTimeout;
	}
}() );

// Add width and height to Element.getBoundingClientRect() in IE < 8
if ( window.TextRectangle && !TextRectangle.prototype.width ) {
	Object.defineProperty( TextRectangle.prototype, 'width', {
		get: function() { return this.right - this.left; }
	} );
	Object.defineProperty( TextRectangle.prototype, 'height', {
		get: function() { return this.bottom - this.top; }
	} );
}

// Element.firstElementChild and Element.nextElementSibling
if ( !( 'firstElementChild' in $root[0] ) ) {
	Object.defineProperty( Element.prototype, 'firstElementChild', {
		get: function() {
			var el = this.firstChild;
			while ( el ) {
				if ( el.nodeType === 1 ) {
					return el;
				}
				el = el.nextSibling;
			}
			return null;
		}
	} );
	
	Object.defineProperty( Element.prototype, 'nextElementSibling', {
		get: function() {
			var el = this.nextSibling;
			while ( el ) {
				if ( el.nodeType === 1 ) {
					return el;
				}
				el = el.nextSibling;
			}
			return null;
		}
	} );
}


// Finally start the editor
mw.loader.using( [
	'mediawiki.util',
	'mediawiki.api',
	'user.options',
	'jquery.throttle-debounce'
], function() {
	create( 'initial' );
} );


}() );