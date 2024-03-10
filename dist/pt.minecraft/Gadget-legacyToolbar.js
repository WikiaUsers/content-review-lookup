/*  _____________________________________________________________________________
 * |                                                                             |
 * |                    === WARNING: GLOBAL GADGET FILE ===                      |
 * |                  Changes to this page affect many users.                    |
 * | Please discuss changes on the talk page or on [[WT:Gadget]] before editing. |
 * |_____________________________________________________________________________|
 * 
 * Adapted from MediaWiki Core, before it was removed from it on 2018-10-17. 
 * Imported from frwiki at https://fr.wikipedia.org/wiki/MediaWiki:Gadget-mediawiki.toolbar.js, with translations and button additions.
 * 
 * Interface for the classic edit toolbar.
 */
( function () {
	var toolbar, isReady, $toolbar, queue, slice, $currentFocused;

	/**
	 * Internal helper that does the actual insertion of the button into the toolbar.
	 *
	 * For backwards-compatibility, passing `imageFile`, `speedTip`, `tagOpen`, `tagClose`,
	 * `sampleText` and `imageId` as separate arguments (in this order) is also supported.
	 *
	 * @private
	 *
	 * @param {Object} button Object with the following properties.
	 *  You are required to provide *either* the `onClick` parameter, or the three parameters
	 *  `tagOpen`, `tagClose` and `sampleText`, but not both (they're mutually exclusive).
	 * @param {string} [button.imageFile] Image to use for the button.
	 * @param {string} button.speedTip Tooltip displayed when user mouses over the button.
	 * @param {Function} [button.onClick] Function to be executed when the button is clicked.
	 * @param {string} [button.tagOpen]
	 * @param {string} [button.tagClose]
	 * @param {string} [button.sampleText] Alternative to `onClick`. `tagOpen`, `tagClose` and
	 *  `sampleText` together provide the markup that should be inserted into page text at
	 *  current cursor position.
	 * @param {string} [button.imageId] `id` attribute of the button HTML element. Can be
	 *  used to define the image with CSS if it's not provided as `imageFile`.
	 * @param {string} [speedTip]
	 * @param {string} [tagOpen]
	 * @param {string} [tagClose]
	 * @param {string} [sampleText]
	 * @param {string} [imageId]
	 */
	function insertButton( button, speedTip, tagOpen, tagClose, sampleText, imageId ) {
		var $button;

		// Backwards compatibility
		if ( typeof button !== 'object' ) {
			button = {
				imageFile: button,
				speedTip: speedTip,
				tagOpen: tagOpen,
				tagClose: tagClose,
				sampleText: sampleText,
				imageId: imageId
			};
		}

		if ( button.imageFile ) {
			$button = $( '<img>' ).attr( {
				src: button.imageFile,
				alt: button.speedTip,
				title: button.speedTip,
				id: button.imageId || undefined,
				'class': 'mw-toolbar-editbutton'
			} );
		} else {
			$button = $( '<div>' ).attr( {
				title: button.speedTip,
				id: button.imageId || undefined,
				'class': 'mw-toolbar-editbutton'
			} );
		}

		$button.click( function ( e ) {
			if ( button.onClick !== undefined ) {
				button.onClick( e );
			} else {
				toolbar.insertTags( button.tagOpen, button.tagClose, button.sampleText );
			}

			return false;
		} );

		$toolbar.append( $button );
	}

	isReady = false;
	$toolbar = false;

	/**
	 * @private
	 * @property {Array}
	 * Contains button objects (and for backwards compatibility, it can
	 * also contains an arguments array for insertButton).
	 */
	queue = [];
	slice = queue.slice;

	toolbar = {

		/**
		 * Add buttons to the toolbar.
		 *
		 * Takes care of race conditions and time-based dependencies by placing buttons in a queue if
		 * this method is called before the toolbar is created.
		 *
		 * For backwards-compatibility, passing `imageFile`, `speedTip`, `tagOpen`, `tagClose`,
		 * `sampleText` and `imageId` as separate arguments (in this order) is also supported.
		 *
		 * @inheritdoc #insertButton
		 */
		addButton: function () {
			if ( isReady ) {
				insertButton.apply( toolbar, arguments );
			} else {
				// Convert arguments list to array
				queue.push( slice.call( arguments ) );
			}
		},

		/**
		 * Add multiple buttons to the toolbar (see also #addButton).
		 *
		 * Example usage:
		 *
		 *     addButtons( [ { .. }, { .. }, { .. } ] );
		 *     addButtons( { .. }, { .. } );
		 *
		 * @param {...Object|Array} [buttons] An array of button objects or the first
		 *  button object in a list of variadic arguments.
		 */
		addButtons: function ( buttons ) {
			if ( !Array.isArray( buttons ) ) {
				buttons = slice.call( arguments );
			}
			if ( isReady ) {
				buttons.forEach( function ( button ) {
					insertButton( button );
				} );
			} else {
				// Push each button into the queue
				queue.push.apply( queue, buttons );
			}
		},

		/**
		 * Apply tagOpen/tagClose to selection in currently focused textarea.
		 *
		 * Uses `sampleText` if selection is empty.
		 *
		 * @param {string} tagOpen
		 * @param {string} tagClose
		 * @param {string} sampleText
		 */
		insertTags: function ( tagOpen, tagClose, sampleText ) {
			if ( $currentFocused && $currentFocused.length ) {
				$currentFocused.textSelection(
					'encapsulateSelection', {
						pre: tagOpen,
						peri: sampleText,
						post: tagClose
					}
				);
			}
		}
	};

	// For backwards compatibility. Used to be called from EditPage.php, maybe other places as well.
	toolbar.init = $.noop;

	// Expose API publicly
	mw.toolbar = toolbar;

	$( function () {
		var $textBox, i, button;

		// Used to determine where to insert tags
		$currentFocused = $( '#wpTextbox1' );

		// Populate the selector cache for $toolbar
		$toolbar = $( '#toolbar' );

		if ( $toolbar.length === 0 ) {
			$textBox = $( '#wpTextbox1' );
			if ( $textBox.length === 0 ) {
				return;
			}
			$toolbar = $( '<div>' ).attr( { id: 'toolbar' } );
			$toolbar.insertBefore( $textBox );
		}

		for ( i = 0; i < queue.length; i++ ) {
			button = queue[ i ];
			if ( Array.isArray( button ) ) {
				// Forwarded arguments array from mw.toolbar.addButton
				insertButton.apply( toolbar, button );
			} else {
				// Raw object from mw.toolbar.addButtons
				insertButton( button );
			}
		}

		// Clear queue
		queue.length = 0;

		// This causes further calls to addButton to go to insertion directly
		// instead of to the queue.
		// It is important that this is after the one and only loop through
		// the queue
		isReady = true;
		mw.hook("mw.toolbar").fire();

		// Apply to dynamically created textboxes as well as normal ones
		$( document ).on( 'focus', 'textarea, input:text', function () {
			$currentFocused = $( this );
		} );
	} );

}() );
mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/e/e2/Button_bold.png",
    speedTip: "Texto em negrito",
    tagOpen: "'''",
    tagClose: "'''",
    sampleText: "texto em negrito",
    imageId: "mw-editbutton-bold"
} );

mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/1/1d/Button_italic.png",
    speedTip: "Texto em itálico",
    tagOpen: "''",
    tagClose: "''",
    sampleText: "texto em itálico",
    imageId: "mw-editbutton-italic"
} );

mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/c/c0/Button_link.png",
    speedTip: "Link interno",
    tagOpen: "[[",
    tagClose: "]]",
    sampleText: "título da página",
    imageId: "mw-editbutton-link"
} );

mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/e/ec/Button_extlink.png",
    speedTip: "Link externo",
    tagOpen: "[",
    tagClose: "]",
    sampleText: "http://www.exemplo.com título do link",
    imageId: "mw-editbutton-extlink"
} );

mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/7/78/Button_head_A2.png",
    speedTip: "Cabeçalho de nível 2",
    tagOpen: "== ",
    tagClose: " ==",
    sampleText: "nome do cabeçalho",
    imageId: "mw-editbutton-headline"
} );

mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/d/de/Button_image.png",
    speedTip: "Imagem",
    tagOpen: "[[File:",
    tagClose: "|thumb|Descrição da imagem.]]",
    sampleText: "Exemplo.jpg",
    imageId: "mw-editbutton-image"
} );

mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/1/19/Button_media.png",
    speedTip: "Mídia",
    tagOpen: "[[File:",
    tagClose: "|thumb|Descrição da mídia.]]",
    sampleText: "Exemplo.ogg",
    imageId: "mw-editbutton-media"
} );

mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/8/82/Nowiki_icon.png",
    speedTip: "Etiquetas Nowiki",
    tagOpen: "<nowiki"+">",
    tagClose: "</"+"nowiki>",
    sampleText: "",
    imageId: "mw-editbutton-nowiki"
} );

mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/6/6d/Button_sig.png",
    speedTip: "Assinatura e data",
    tagOpen: "-- ~~"+"~~",
    tagClose: "",
    sampleText: "",
    imageId: "mw-editbutton-signature"
} );

mw.toolbar.addButton( {
    imageFile: "//upload.wikimedia.org/wikipedia/commons/0/0d/Button_hr.png",
    speedTip: "Linha horizontal",
    tagOpen: "--"+"--",
    tagClose: "",
    sampleText: "",
    imageId: "mw-editbutton-hr"
} );

if ( mw.user.options.get( 'gadget-extra-toolbar-buttons' ) == 1 ) {
				mw.loader.load('/index.php?title=MediaWiki:Gadget-extra-toolbar-buttons.js&action=raw&ctype=text/javascript');
				console.log('MediaWiki:Common.js — extra-toolbar-buttons enabled');
			}
			else { console.log('MediaWiki:Common.js — extra-toolbar-buttons not enabled'); }