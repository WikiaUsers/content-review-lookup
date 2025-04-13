( function () {
	'use strict';
	if ( window.SpriteEditorModules.spriteutils && window.SpriteEditorModules.spriteutils.loaded ) {
		return;
	}
	let createSprite,
		spriteBoxTemplate = document.createElement( 'li' ),
		sectionTemplate = document.createElement( 'div' ),
		highestSpriteId = 0,
		possprite = 0,
		notifiers = [],
		editmode = true,
		myRoot = document,
		isDragging = false,
		sectionDraggingEnabled = false,
		oldSectionOrder,
		width,
		height;

	spriteBoxTemplate.className = 'spritedoc-box';
	spriteBoxTemplate.innerHTML = '<div class="spritedoc-image"><span class="sprite"></span></div>' +
		'<ul class="spritedoc-names"></ul>';

	sectionTemplate.className = 'spritedoc-section';
	sectionTemplate.innerHTML = '<h3></h3>' +
		'<ul class="spritedoc-boxes">' +
		'<div class="section-drag-overlay sprite-drop-area" style="top:0;left:0;z-index:99;display:none"></div>' +
		'</ul>';
	function suNotify( name, data ) {
		notifiers.forEach( function ( a ) {
			a( name, data );
		} );
	}
	function suGetCodeField( name, type ) {
		type = type || 'sprite';
		let boxCode = document.createElement( 'code' );
		boxCode.contentEditable = editmode;
		boxCode.textContent = name;

		boxCode.onpaste = function ( e ) {
			e.preventDefault();
			let paste = ( e.clipboardData || window.clipboardData ).getData( 'text' );
			paste = paste.replace( /\n/g, ' ' ).trim();
			window.document.execCommand( 'insertText', false, paste );
		};
		boxCode.onkeypress = function ( e ) {
			if ( e.keyCode !== 13 ) {
				return;
			}
			e.preventDefault();
			e.target.blur();
		};
		boxCode.addEventListener( 'focus', function () {
			if ( !editmode ) {
				boxCode.blur();
				suNotify( 'spritename-click', {
					element: boxCode
				} );
				return;
			}
			boxCode.setAttribute( 'data-original-text', boxCode.textContent );
		} );
		boxCode.addEventListener( 'blur', function () {
			if ( !editmode ) {
				return;
			}
			boxCode.textContent = boxCode.textContent.trim();
			let orgT = boxCode.getAttribute( 'data-original-text' );
			boxCode.removeAttribute( 'data-placeholder' );
			boxCode.classList.remove( 'spriteedit-new' );
			boxCode.removeAttribute( 'data-original-text' );
			if ( boxCode.textContent.length && ( orgT || '' ) === boxCode.textContent ) {
				return;
			}
			suNotify( 'boxcode-content-changed', {
				element: boxCode,
				oldContent: orgT || '',
				newContent: boxCode.textContent
			} );
		} );
		if ( type === 'sprite' ) {
			boxCode.setAttribute( 'issprite', '' );
		}
		if ( !( name || '' ).length ) {
			boxCode.className = 'spriteedit-new';
			boxCode.setAttribute( 'data-placeholder', 'Placeholder text' );
		}
		return boxCode;
	}
	function getSprite( source ) {
		let ele;
		if ( typeof ( source ) === 'number' ) {
			ele = myRoot.querySelector( '.spritedoc-box[data-pos="' + source + '"]' );
		} else {
			ele = source;
		}
		if ( !ele ) {
			return;
		}
		return {
			addName: function ( name ) {
				let c = suGetCodeField( name, 'sprite' ),
					li = document.createElement( 'li' );
				li.className = 'spritedoc-name';
				ele.querySelector( '.spritedoc-names' ).appendChild( li ).appendChild( c );
				if ( !name.length ) {
					c.focus();
				}
				return c;
			},
			element: ele,
			getImage: function () {
				return ele.querySelector( '.spritedoc-image .sprite' ).children[ 0 ];
			},
			getPosId: function () {
				return Number( ele.dataset.pos );
			},
			getNames: function () {
				return ele.querySelectorAll( 'code[issprite]' );
			},
			setImage: function ( e ) {
				ele.querySelector( '.spritedoc-image .sprite' ).replaceChildren( e );
			}
		};
	}
	function addNotifier( n ) {
		notifiers.push( n );
	}
	function getSection( id ) {
		let ele = myRoot.querySelector( '.spritedoc-section[data-section-id="' + id + '"]' );
		if ( !ele ) {
			return 'Section not found';
		}
		return {
			addSprite: function ( sprite ) {
				ele.querySelector( '.spritedoc-boxes' ).appendChild( sprite );
			},
			element: ele,
			getSprites: function () {
				let result = [];
				ele.querySelectorAll( '.spritedoc-box[data-pos]' ).forEach( function ( e ) {
					result.push( getSprite( Number( e.dataset.pos ) ) );
				} );
				return result;
			},
			id: id,
			removeSprite: function ( id ) {
				if ( !ele.querySelector( '.spritedoc-box[data-pos="' + id + '"]' ) ) {
					return false;
				}
				return deleteSprite( id );
			}
		};
	}
	function setImage( file, sprite ) {
		let reader = new FileReader();
		reader.onloadend = function ( readerEvent ) {
			let imgEle = document.createElement( 'img' );
			imgEle.src = readerEvent.target.result;
			imgEle.addEventListener( 'load', function () {
				let c = document.createElement( 'canvas' ),
					ctx;
				c.width = width;
				c.height = height;
				ctx = c.getContext( '2d' );
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage( imgEle,
					0, 0, imgEle.naturalWidth || imgEle.width, imgEle.naturalHeight || imgEle.height, // Source coords.
					0, 0, width, height // Canvas coords.
				);
				sprite.setImage( c );
			} );
		};
		reader.readAsDataURL( file );
	}
	function addFile( f, sec ) {
		// From original Sprite-Editor
		let fname = f.name.trim().replace( /\.[^\.]+$/, '' ).replace( /_/g, ' ' ),
			sprite;
		if ( !fname.length ) {
			return;
		}
		highestSpriteId++;
		if ( highestSpriteId === possprite ) {
			highestSpriteId++;
		}
		sprite = suCreateSprite( fname, false );
		sec.addSprite( sprite.element );
		setImage( f, sprite );
		return sprite;
	}
	function suCreateSprite( name, isNewButton ) {
		let s = spriteBoxTemplate.cloneNode( true ),
			main = window.SpriteEditorModules.main,
			btn = new main.OO.ui.ButtonInputWidget( {
				classes: [ 'spriteedit-add-name' ],
				framed: false,
				icon: 'add',
				title: main.msg( 'add-name-label' ).plain()
			} );
		if ( !isNewButton ) {
			s.dataset.pos = highestSpriteId;
			s.querySelector( '.spritedoc-image' ).onclick = function ( e ) {
				suNotify( 'image-click', {
					sprite: getSprite( Number( e.target.closest( '.spritedoc-box' ).dataset.pos ) )
				} );
			};
		}
		if ( !isNewButton && editmode ) {
			s.append( btn.$element.get( 0 ) );
			s.setAttribute( 'draggable', 'true' );
			s.dataset.sortKey = name;
			s.ondragstart = function ( event ) {
				event.target.setAttribute( 'ghost', 'true' );
				event.dataTransfer.setData( 'Text', event.target.dataset.pos );
			};
			btn.on( 'click', function () {
				let sprite = getSprite( Number( s.dataset.pos ) );
				suNotify( 'button-add-name', {
					sprite: sprite
				} );
				sprite.addName( '' );
			} );
		} else if ( editmode ) {
			s.querySelector( '.spritedoc-image .sprite' ).replaceChildren( new main.OO.ui.IconWidget( {
				icon: 'imageAdd',
				label: main.msg( 'new-images-hover' ).plain(),
				title: main.msg( 'new-images-label' ).plain(),
				classes: [ 'spriteeditor-newImagesBtn' ]
			} ).$element.get( 0 ) );
			s.onclick = function ( e ) {
				let sprites = [],
					input = document.createElement( 'input' ),
					sec = getSection( e.target.closest( '.spritedoc-section' ).dataset.sectionId ),
					files = [];
				input.type = 'file';
				input.setAttribute( 'multiple', '' );
				input.setAttribute( 'accept', 'image/*' );
				input.onchange = function ( f ) {
					Array.prototype.forEach.call( f.target.files, function ( file ) {
						files.push( file );
						let s = addFile( file, sec );
						if ( s ) {
							sprites.push( s );
						}
					} );
					suNotify( 'files-added', {
						highestID: highestSpriteId,
						section: sec,
						files: files,
						sprites: sprites
					} );
				};
				input.click();
			};
		}
		let sprite = getSprite( s );
		if ( name.length ) {
			sprite.addName( name );
		}
		if ( isNewButton || !editmode ) {
			sprite.getNames()[ 0 ].contentEditable = false;
		}
		return sprite;
	}
	createSprite = function ( firstName, id ) {
		let old = highestSpriteId;
		highestSpriteId = id || highestSpriteId;
		if ( myRoot.querySelector( '.spritedoc-box[data-pos="' + highestSpriteId + '"]' ) ) {
			return;
		}
		let sprite = suCreateSprite( firstName, false );
		highestSpriteId = old;
		highestSpriteId++;
		return sprite;
	};
	function createSection( name, id, options ) {
		if ( myRoot.querySelector( '.spritedoc-section[data-section-id="' + id + '"]' ) ) {
			return;
		}
		options = options || {};
		let c = suGetCodeField( name, 'section' ),
			s = sectionTemplate.cloneNode( true );
		c.className = '.mw-headline';
		s.setAttribute( 'data-section-id', id );
		myRoot.appendChild( s );
		s.children[ 0 ].append( c ); // append code-tag to h3-tag
		if ( !name.length ) {
			c.focus();
		}

		s.addEventListener( 'dragstart', function () {
			if ( !sectionDraggingEnabled ) {
				return;
			}
			oldSectionOrder = [];
			myRoot.querySelectorAll( '.spritedoc-section' ).forEach( function ( s ) {
				oldSectionOrder.push( s.dataset.sectionId );
			} );
			isDragging = true;
			s.classList.add( 'dragging' );
		} );
		s.addEventListener( 'dragend', function () {
			if ( !sectionDraggingEnabled ) {
				return;
			}
			let newSectionOrder = [];
			myRoot.querySelectorAll( '.spritedoc-section' ).forEach( function ( s ) {
				newSectionOrder.push( s.dataset.sectionId );
			} );
			suNotify( 'sections reordered', {
				oldOrder: oldSectionOrder,
				newOrder: newSectionOrder
			} );
			isDragging = false;
			s.classList.remove( 'dragging' );
		} );

		let section = getSection( id );
		if ( options.withSampleSprite ) { section.addSprite( createSprite( 'Sample name' ).element ); }
		if ( editmode ) {
			let newImage = suCreateSprite( 'New Image', true ).element;
			newImage.classList.add( 'spritedoc-newimageBtn' );
			newImage.querySelector( 'code' ).removeAttribute( 'issprite' );
			section.addSprite( newImage );
		}
		// Handles drag'n'drop
		let spriteBoxes = s.querySelector( '.spritedoc-boxes' ),
			dropZone = s.querySelector( '.section-drag-overlay' );
		spriteBoxes.addEventListener( 'dragenter', function ( e ) {
			if ( isDragging ) { return; }
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'move';
			dropZone.style.display = '';
		} );
		let f = function ( e ) {
			if ( isDragging ) { return; }
			e.preventDefault();
		};
		dropZone.addEventListener( 'dragenter', f );
		dropZone.addEventListener( 'dragover', f );
		dropZone.addEventListener( 'dragleave', function ( e ) {
			if ( isDragging ) {
				return;
			}
			e.preventDefault();
			dropZone.style.display = 'none';
		} );
		dropZone.addEventListener( 'drop', function ( e ) {
			if ( isDragging ) {
				return;
			}
			e.preventDefault();
			dropZone.style.display = 'none';
			let ele = e.dataTransfer.getData( 'Text' ),
				files = e.dataTransfer.files,
				newSec = e.target.closest( '.spritedoc-section' ).dataset.sectionId;
			if ( newSec && files.length > 0 ) { // Files
				let sec = getSection( newSec ),
					sprites = [];
				for ( let i = 0; i < files.length; i++ ) {
					let s = addFile( files[ i ], sec );
					if ( s ) {
						sprites.push( s );
					}
				}
				suNotify( 'files-added', {
					section: sec,
					files: files,
					sprites: sprites
				} );
				return;
			}
			if ( !ele ) {
				return;
			}
			let selEle = getSprite( Number( ele ) );
			if ( !selEle ) {
				return;
			}
			let oldSec = selEle.element.closest( '.spritedoc-section' ).dataset.sectionId;
			selEle.element.removeAttribute( 'ghost' );
			if ( !newSec || newSec === oldSec ) {
				return;
			}
			myRoot.querySelector( 'div[data-section-id="' + newSec + '"] .spritedoc-boxes' ).appendChild( selEle.element );
			suNotify( 'sprite-moved', {
				sprite: selEle,
				origin: oldSec,
				destination: newSec
			} );
		} );
		return section;
	}
	function deleteSprite( id ) {
		let ele = myRoot.querySelector( '.spritedoc-box[data-pos="' + id + '"]' );
		if ( !ele ) {
			return false;
		}
		ele.parentElement.removeChild( ele );
		return true;
	}
	function getSections() {
		let result = [];
		myRoot.querySelectorAll( '.spritedoc-section' ).forEach( function ( e ) {
			result[ e.dataset.sectionId ] = getSection( e.dataset.sectionId );
		} );
		return result;
	}
	function isEditMode() {
		return !!editmode;
	}
	function removeNotifier( n ) {
		if ( notifiers.indexOf( n ) < 0 ) {
			return;
		}
		notifiers.splice( n, 1 );
	}
	function setRootElement( e ) {
		myRoot = e;
	}
	function setEditMode( a ) {
		editmode = a;
	}
	function setPosSprite( a ) {
		possprite = a;
	}
	myRoot.addEventListener( 'dragover', function ( e ) {
		if ( !sectionDraggingEnabled ) {
			return; // Inspired by https://www.youtube.com/watch?v=9HUlUnM3UG8
		}
		let list = [],
			nextSibling,
			notDraggedElements = myRoot.querySelectorAll( '.spritedoc-section:not(.dragging)' );
		notDraggedElements.forEach( function ( a ) {
			list.push( a );
		} );
		nextSibling = list.find( function ( f ) {
			return e.pageY <= f.offsetTop + f.offsetHeight * 0.5;
		} );
		myRoot.insertBefore( myRoot.getElementsByClassName( 'dragging' )[ 0 ], nextSibling );
	} );
	function enableSectionDragging( state ) {
		sectionDraggingEnabled = state;
		myRoot.classList.toggle( 'drag-enabled', state );
		getSections().forEach( function ( b ) {
			if ( state ) {
				b.element.setAttribute( 'draggable', 'true' );
			} else {
				b.element.removeAttribute( 'draggable' );
			}
		} );
	}
	function setSpriteDimension( w, h ) {
		width = w;
		height = h;
	}
	function overrideHighestId( i ) {
		highestSpriteId = i;
	}
	window.SpriteEditorModules.spriteutils = {
		addNotifier: addNotifier,
		createSection: createSection,
		createSprite: createSprite,
		deleteSprite: deleteSprite,
		enableSectionDragging: enableSectionDragging,
		getSection: getSection,
		getSections: getSections,
		getSprite: getSprite,
		isEditMode: isEditMode,
		loaded: true,
		overrideHighestId: overrideHighestId,
		removeNotifier: removeNotifier,
		setEditMode: setEditMode,
		setImage: setImage,
		setPosSprite: setPosSprite,
		setRootElement: setRootElement,
		setSpriteDimension: setSpriteDimension
	};
}() );