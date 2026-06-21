( function ( $, mw ) {
	'use strict';
	
	var TEMPLATE_TITLE = 'Template:Crop Mutations';

	var uploading   = false;
	var pendingFile = null;
	var lastTrigger = null;
	var SUPPORTED_EXT = { 'image/png': 'png', 'image/gif': 'gif' };

	function readFileAsDataURL( file ) {
		return new Promise( function ( resolve, reject ) {
			var reader = new FileReader();
			reader.onload  = function ( e ) { resolve( e.target.result ); };
			reader.onerror = function ()    { reject( new Error( 'File read failed' ) ); };
			reader.readAsDataURL( file );
		} );
	}

	function readFileAsBuffer( file ) {
		return new Promise( function ( resolve, reject ) {
			var reader = new FileReader();
			reader.onload  = function ( e ) { resolve( e.target.result ); };
			reader.onerror = function ()    { reject( new Error( 'Buffer read failed' ) ); };
			reader.readAsArrayBuffer( file );
		} );
	}

	function bufferToSha1( buffer ) {
		if ( typeof crypto === 'undefined' || !crypto.subtle ) {
			return Promise.resolve( null );
		}
		return crypto.subtle.digest( 'SHA-1', buffer ).then( function ( hash ) {
			return Array.from( new Uint8Array( hash ) )
				.map( function ( b ) { return ( '00' + b.toString( 16 ) ).slice( -2 ); } )
				.join( '' );
		} ).catch( function () { return null; } );
	}

	function extFromFile( file ) {
		if ( file && file.type && SUPPORTED_EXT[ file.type ] ) {
			return SUPPORTED_EXT[ file.type ];
		}
		var fromName = ( ( file && file.name ) || '' ).split( '.' ).pop().toLowerCase();
		return ( fromName === 'png' || fromName === 'gif' ) ? fromName : null;
	}

	function parseManagedMutations( content ) {
		var map = {};
		var visible = content.replace( /<!--[\s\S]*?-->/g, '' );
		var re = /\{\{#ifexist:([\s\S]*?)\}\}\{\{!\}\}([^\n|]+)/g;
		var m;
		while ( ( m = re.exec( visible ) ) !== null ) {
			var label    = m[ 2 ].trim();
			var extMatch = m[ 1 ].match( /\.([a-z0-9]+)/i );
			if ( label && extMatch ) {
				map[ label.toLowerCase() ] = {
					ext   : extMatch[ 1 ].toLowerCase(),
					label : label
				};
			}
		}
		return map;
	}

	function buildModal() {
		var html = [
			'<div id="mgu-overlay" class="mgu-overlay" aria-hidden="true">',
			'  <div class="mgu-dialog" role="dialog" aria-modal="true" aria-labelledby="mgu-title">',
			'    <button class="mgu-close" id="mgu-close" type="button" aria-label="Close">&times;</button>',
			'    <h2 id="mgu-title" class="mgu-title">Upload Mutation Image</h2>',
			'    <p class="mgu-notice">Make sure this mutation image hasn\'t already been uploaded!</p>',

			'    <div class="mgu-field">',
			'      <label class="mgu-label" for="mgu-file">Image file <span class="mgu-req">*</span></label>',
			'      <div class="mgu-dropzone" id="mgu-dropzone">',
			'        <span class="mgu-drop-hint" id="mgu-drop-hint">Drop image here or click to choose</span>',
			'        <input type="file" id="mgu-file" class="mgu-file-input" accept="image/png,image/gif" aria-required="true">',
			'      </div>',
			'    </div>',

			'    <div class="mgu-preview-wrap" id="mgu-preview-wrap" hidden>',
			'      <img id="mgu-preview" class="mgu-preview" src="" alt="Preview">',
			'      <button class="mgu-clear-file" id="mgu-clear-file" type="button" aria-label="Remove file">&#10006;</button>',
			'    </div>',

			'    <div class="mgu-field">',
			'      <label class="mgu-label" for="mgu-mutation">Mutation name <span class="mgu-req">*</span></label>',
			'      <input type="text" id="mgu-mutation" class="mgu-input" maxlength="120"',
			'             placeholder="e.g. Bloodlit" aria-required="true" autocomplete="off">',
			'      <div class="mgu-charcount"><span id="mgu-count">0</span>&thinsp;/&thinsp;120</div>',
			'    </div>',

			'    <div class="mgu-progress-wrap" id="mgu-progress-wrap" hidden>',
			'      <div class="mgu-progress-bar" id="mgu-progress-bar"></div>',
			'    </div>',

			'    <div id="mgu-status" class="mgu-status" role="status" aria-live="polite" hidden></div>',

			'    <div class="mgu-actions">',
			'      <span class="mgu-hint">Ctrl+Enter to upload</span>',
			'      <button class="mgu-submit" id="mgu-submit" type="button">Upload</button>',
			'    </div>',
			'  </div>',
			'</div>'
		].join( '\n' );

		$( 'body' ).append( html );
	}

	function setStatus( msg, type ) {
		$( '#mgu-status' )
			.removeAttr( 'hidden' )
			.attr( 'class', 'mgu-status mgu-status--' + ( type || 'info' ) )
			.text( msg );
	}

	function clearStatus() {
		$( '#mgu-status' ).attr( 'hidden', '' ).text( '' ).attr( 'class', 'mgu-status' );
	}

	function setProgress( pct ) {
		var $w = $( '#mgu-progress-wrap' );
		var $b = $( '#mgu-progress-bar' );
		if ( pct === null ) {
			$w.attr( 'hidden', '' );
			$b.css( 'width', '0%' );
		} else {
			$w.removeAttr( 'hidden' );
			$b.css( 'width', pct + '%' );
		}
	}

	function clearFile() {
		pendingFile = null;
		$( '#mgu-file' ).val( '' );
		$( '#mgu-preview' ).attr( 'src', '' );
		$( '#mgu-preview-wrap' ).attr( 'hidden', '' );
		$( '#mgu-drop-hint' ).text( 'Drop image here or click to choose' );
	}

	function stageFile( file ) {
		if ( !file || !extFromFile( file ) ) {
			clearFile();
			setStatus( 'Please select a valid PNG or GIF image.', 'error' );
			return;
		}
		pendingFile = file;
		readFileAsDataURL( file ).then( function ( dataUrl ) {
			$( '#mgu-preview' ).attr( 'src', dataUrl );
			$( '#mgu-preview-wrap' ).removeAttr( 'hidden' );
			$( '#mgu-drop-hint' ).text( file.name || 'Pasted image' );
			clearStatus();
		} ).catch( function () {
			clearFile();
			setStatus( 'Could not read that image.', 'error' );
		} );
	}

	function openModal() {
		clearFile();
		clearStatus();
		setProgress( null );
		$( '#mgu-mutation' ).val( '' );
		$( '#mgu-count' ).text( '0' ).removeClass( 'mgu-count--warn mgu-count--limit' );
		$( 'body' ).addClass( 'mgu-no-scroll' );
		$( '#mgu-overlay' ).removeAttr( 'aria-hidden' ).addClass( 'mgu-overlay--open' );
		$( '#mgu-mutation' ).trigger( 'focus' );
	}

	function closeModal() {
		if ( uploading ) { return; }
		$( '#mgu-overlay' ).attr( 'aria-hidden', 'true' ).removeClass( 'mgu-overlay--open' );
		$( 'body' ).removeClass( 'mgu-no-scroll' );
		if ( lastTrigger ) { $( lastTrigger ).trigger( 'focus' ); }
	}

	var api = new mw.Api();

	function checkDuplicate( sha1 ) {
		if ( !sha1 ) { return Promise.resolve( null ); }
		return api.get( {
			action  : 'query',
			list    : 'allimages',
			aisha1  : sha1,
			ailimit : 1
		} ).then( function ( data ) {
			var imgs = data.query && data.query.allimages;
			return ( imgs && imgs.length ) ? imgs[ 0 ].name : null;
		} ).catch( function () { return null; } );
	}

	function fileExistsOnWiki( title ) {
		return api.get( {
			action : 'query',
			titles : 'File:' + title,
			prop   : 'info'
		} ).then( function ( data ) {
			var pages = data.query && data.query.pages;
			return !!( pages && !pages[ '-1' ] );
		} ).catch( function () { return false; } );
	}

	function getTemplateMutations() {
		return api.get( {
			action       : 'query',
			prop         : 'revisions',
			titles       : TEMPLATE_TITLE,
			rvprop       : 'content',
			rvslots      : 'main',
			formatversion: '2'
		} ).then( function ( data ) {
			var page = data.query && data.query.pages && data.query.pages[ 0 ];
			var rev  = page && page.revisions && page.revisions[ 0 ];
			var main = rev && rev.slots && rev.slots.main;
			if ( !main || typeof main.content !== 'string' ) {
				throw new Error( 'Could not read ' + TEMPLATE_TITLE + '.' );
			}
			return parseManagedMutations( main.content );
		} );
	}

	function uploadFile( file, fileName, token ) {
		return new Promise( function ( resolve, reject ) {
			var fd = new FormData();
			fd.append( 'action',   'upload' );
			fd.append( 'format',   'json' );
			fd.append( 'token',    token );
			fd.append( 'filename', fileName );
			fd.append( 'file',     file );
			fd.append( 'comment',  'Uploaded via Mutation Gallery Upload tool' );

			var xhr = new XMLHttpRequest();
			xhr.open( 'POST', mw.util.wikiScript( 'api' ), true );

			xhr.upload.addEventListener( 'progress', function ( e ) {
				if ( e.lengthComputable ) {
					setProgress( Math.round( ( e.loaded / e.total ) * 90 ) );
				}
			} );

			xhr.addEventListener( 'load', function () {
				var resp;
				try {
					resp = JSON.parse( xhr.responseText );
				} catch ( e ) {
					reject( new Error( 'Could not parse upload response.' ) );
					return;
				}

				if ( resp.upload && resp.upload.result === 'Success' ) {
					resolve( resp.upload.filename || fileName );
					return;
				}

				if ( resp.upload && resp.upload.result === 'Warning' ) {
					var w = resp.upload.warnings || {};
					var parts = [];
					if ( w.exists ) {
						parts.push( 'a file named "' + w.exists + '" already exists' );
					}
					if ( w.duplicate ) {
						parts.push( 'it is identical to an existing file (' + [].concat( w.duplicate ).join( ', ' ) + ')' );
					}
					if ( w[ 'duplicate-archive' ] ) {
						parts.push( 'it matches a previously deleted file' );
					}
					if ( w.badfilename ) {
						parts.push( 'the file name is not allowed' );
					}
					if ( !parts.length ) {
						parts.push( JSON.stringify( w ) );
					}
					reject( new Error( 'Upload not saved – ' + parts.join( '; ' ) + '. Nothing was overwritten.' ) );
					return;
				}

				if ( resp.error ) {
					reject( new Error( resp.error.code + ': ' + resp.error.info ) );
				} else {
					reject( new Error( 'Upload failed.' ) );
				}
			} );

			xhr.addEventListener( 'error', function () { reject( new Error( 'Network error during upload.' ) ); } );
			xhr.addEventListener( 'abort', function () { reject( new Error( 'Upload aborted.' ) ); } );
			xhr.send( fd );
		} );
	}

	function handleUpload() {
		if ( uploading ) { return; }

		var file     = pendingFile;
		var mutation = ( $( '#mgu-mutation' ).val() || '' ).trim();

		if ( !file ) {
			setStatus( 'Please choose an image file first.', 'error' );
			return;
		}
		if ( !mutation ) {
			setStatus( 'Please enter a mutation name.', 'error' );
			return;
		}
		if ( /[,/&]/.test( mutation ) ) {
			setStatus( 'Only one mutation per image. Please enter a single mutation name.', 'error' );
			return;
		}
		if ( /[#<>\[\]{}|:]/.test( mutation ) ) {
			setStatus( 'Mutation name contains characters that aren\'t allowed (avoid # < > [ ] { } | :).', 'error' );
			return;
		}
		if ( mutation.length > 120 ) {
			setStatus( 'Mutation name is too long (max 120 characters).', 'error' );
			return;
		}

		var ext = extFromFile( file );
		if ( !ext ) {
			setStatus( 'Unsupported image type. Please upload a PNG or GIF.', 'error' );
			return;
		}

		uploading = true;
		$( '#mgu-submit' ).prop( 'disabled', true );
		setProgress( 5 );
		setStatus( 'Checking the mutation list…', 'info' );

		var pageName = mw.config.get( 'wgTitle' );

		function release() {
			uploading = false;
			$( '#mgu-submit' ).prop( 'disabled', false );
			setProgress( null );
		}

		function finish() {
			setProgress( 100 );
			setStatus( 'Done! Reloading page…', 'success' );
			setTimeout( function () { location.reload(); }, 1200 );
		}

		getTemplateMutations()
			.then( function ( managed ) {
				var entry = managed[ mutation.toLowerCase() ];

				if ( !entry ) {
					var known = Object.keys( managed )
						.map( function ( k ) { return managed[ k ].label; } )
						.sort()
						.join( ', ' );
					setStatus( '"' + mutation + '" isn\'t a recognized mutation for this template. Known mutations: ' + ( known || '(none found)' ) + '.', 'error' );
					release();
					return;
				}

				if ( ext !== entry.ext ) {
					setStatus( '"' + entry.label + '" images must be uploaded as a .' + entry.ext + ' file (you selected a .' + ext + ').', 'error' );
					release();
					return;
				}

				var canonicalName = pageName + ' ' + entry.label + '.' + entry.ext;

				setStatus( 'Checking for duplicates…', 'info' );
				return readFileAsBuffer( file )
					.then( function ( buf ) { return bufferToSha1( buf ); } )
					.then( function ( sha1 ) { return checkDuplicate( sha1 ); } )
					.then( function ( dupName ) {
						if ( dupName && dupName.replace( /_/g, ' ' ) !== canonicalName ) {
							setStatus( 'This exact image is already on the wiki as "' + dupName + '". Nothing was uploaded.', 'warning' );
							release();
							return;
						}

						setStatus( 'Checking whether "' + entry.label + '" already exists…', 'info' );
						return fileExistsOnWiki( canonicalName ).then( function ( exists ) {
							if ( exists ) {
								setStatus( 'An image for "' + entry.label + '" is already on the wiki (' + canonicalName + '). Nothing was overwritten.', 'warning' );
								release();
								return;
							}

							setStatus( 'Uploading ' + canonicalName + '…', 'info' );
							return api.getToken( 'csrf' )
								.then( function ( token ) { return uploadFile( file, canonicalName, token ); } )
								.then( function () { finish(); } );
						} );
					} );
			} )
			.catch( function ( err ) {
				setStatus( 'Error: ' + ( err.message || err ), 'error' );
				release();
			} );
	}

	function wireEvents() {
		$( document ).on( 'click', '.mgu-open-btn', function () {
			lastTrigger = this;
			openModal();
		} );

		$( '#mgu-overlay' ).on( 'click', function ( e ) {
			if ( e.target === this ) { closeModal(); }
		} );

		$( '#mgu-close' ).on( 'click', closeModal );

		$( document ).on( 'keydown', function ( e ) {
			if ( !$( '#mgu-overlay' ).hasClass( 'mgu-overlay--open' ) ) { return; }
			if ( e.key === 'Escape' || e.key === 'Esc' ) {
				closeModal();
			} else if ( e.ctrlKey && e.key === 'Enter' ) {
				e.preventDefault();
				handleUpload();
			}
		} );

		$( '#mgu-file' ).on( 'change', function () {
			stageFile( this.files[ 0 ] );
		} );

		$( '#mgu-clear-file' ).on( 'click', clearFile );

		$( '#mgu-dropzone' ).on( 'click', function ( e ) {
			if ( !$( e.target ).is( '#mgu-file' ) ) {
				$( '#mgu-file' ).trigger( 'click' );
			}
		} );

		$( '#mgu-dropzone' )
			.on( 'dragover', function ( e ) { e.preventDefault(); $( this ).addClass( 'mgu-dropzone--hover' ); } )
			.on( 'dragleave drop', function ( e ) { e.preventDefault(); $( this ).removeClass( 'mgu-dropzone--hover' ); } )
			.on( 'drop', function ( e ) {
				var dt = e.originalEvent.dataTransfer;
				var file = dt && dt.files && dt.files[ 0 ];
				if ( file ) { stageFile( file ); }
			} );

		$( '#mgu-overlay' ).on( 'paste', function ( e ) {
			var items = ( e.clipboardData || e.originalEvent.clipboardData || {} ).items;
			if ( !items ) { return; }
			for ( var i = 0; i < items.length; i++ ) {
				if ( items[ i ].type.indexOf( 'image' ) !== -1 ) {
					var blob = items[ i ].getAsFile();
					if ( blob ) { stageFile( blob ); break; }
				}
			}
		} );

		$( '#mgu-mutation' )
			.on( 'input', function () {
				var len = this.value.length;
				$( '#mgu-count' ).text( len )
					.toggleClass( 'mgu-count--warn', len > 100 )
					.toggleClass( 'mgu-count--limit', len >= 120 );
			} )
			.on( 'keydown', function ( e ) {
				if ( e.key === 'Enter' && !e.ctrlKey ) {
					e.preventDefault();
					handleUpload();
				}
			} );

		$( '#mgu-submit' ).on( 'click', handleUpload );
	}

	function ensureModal() {
		if ( $( '#mgu-overlay' ).length ) { return; }
		buildModal();
		wireEvents();
	}

	function injectButtons( $content ) {
		var $scope = ( $content && $content.length ) ? $content : $( document );
		$scope.find( '.cmt-mut-list' ).each( function () {
			var $list = $( this );
			if ( $list.next( '.mgu-open-btn' ).length || $list.parent().find( '.mgu-open-btn' ).length ) {
				return;
			}
			$( '<button>' )
				.addClass( 'mgu-open-btn' )
				.attr( 'type', 'button' )
				.text( 'Upload Mutation Image' )
				.insertAfter( $list );
		} );
	}

	mw.hook( 'wikipage.content' ).add( function ( $content ) {
		if ( !$content.find( '.cmt-mut-list' ).length ) { return; }
		ensureModal();
		injectButtons( $content );
	} );

}( jQuery, mediaWiki ) );