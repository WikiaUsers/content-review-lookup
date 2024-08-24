/*
 * FANDOOM editor: Simula la estructura del editor de FANDOOM, con las opciones al lado en vez de abajo
 * Copyright (C) 2018 Jesús Martínez Novo ([[User:Ciencia Al Poder]])
 * @license: MIT
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */
;( function( $, mw, OO, document, window ) {
	'use strict';
	var _$editorContainer = null,
	_$editorSidebar = null,
	_wm = null,
	_wikiPreviewDialogClass = function( config ) {
		_wikiPreviewDialogClass.super.call( this, config );
	},
	_wikiCopywarnDialogClass = function( config ) {
		_wikiCopywarnDialogClass.super.call( this, config );
	},
	_wikiCopywarnDialog = null,
	_wikiPreviewDialog = null,
	_init = function() {
		var $wikiEditor, $classicEditor, $fandoomEditor, $editOptions, newSection;
		$wikiEditor = $( '.wikiEditor-ui' , '#editform' );
		$classicEditor = $( '#toolbar,#wpTextbox1' , '#editform' );
		$editOptions = $( '.editOptions' , '#editform' );
		newSection = $( 'input[name=wpSection]' , '#editform' ).val() === 'new';
		if ( ( !$wikiEditor.length || $classicEditor.length != 2 ) && !$editOptions.length ) {
			return;
		}
		_$editorSidebar = $( '<div>' ).attr( 'id', 'fandoom-editor-sidebar' );
		$fandoomEditor = $( '<div>' ).attr( 'id', 'fandoom-editor-editor' );
		_$editorContainer = $( '<div>' )
			.attr( 'id', 'fandoom-editor' )
			.insertBefore( $wikiEditor.add( $classicEditor ).eq( 0 ) )
			.append( $fandoomEditor )
			.append( _$editorSidebar );
		if ( $wikiEditor.length ) {
			$fandoomEditor.append( $wikiEditor );
		} else {
			$fandoomEditor.append( $classicEditor );
		}
		$editOptions.appendTo( _$editorSidebar );
		if ( newSection ) {
			$( '#wpSummaryLabel' ).prependTo( $editOptions );
		}
		_encuadrar();
		_ajustarDimensiones();
		_wm = new OO.ui.WindowManager();
		$( document.body ).append( _wm.$element );
		_adaptarOpciones();
		_ajustarCopywarn();
		_eventosLivePreview();
		$( window ).on( 'resize' , _ajustarDimensiones );
	},
	// Coloca el scroll al inicio del editor
	_encuadrar = function() {
		$(window).scrollTop( _$editorContainer.offset().top );
	},
	// Ajusta las dimensiones del textarea al redimensionar la ventana
	_ajustarDimensiones = function() {
		var wh, eh, th, offsetTop, offsetBottom, size;
		wh = $( window ).height();
		eh = $( '#wpTextbox1' ).height();
		offsetTop = _$editorContainer.offset().top;
		offsetBottom = $( '#wpTextbox1' ).offset().top + eh;
		th = offsetBottom - offsetTop;
		size = eh + wh - th - 5;
		if ( size > 300 ) {
			$( '#wpTextbox1' ).height( size );
			_$editorSidebar.height( th );
		}
	},
	_adaptarOpciones = function() {
		var ooSummary, $oldSummary, $summaryInput, $prevNode, $editTools;
		$oldSummary = $( '#wpSummaryWidget' );
		$summaryInput = $( '#wpSummary' );
		if ( $oldSummary.length ) {
			ooSummary = new OO.ui.MultilineTextInputWidget( {
				autosize: true,
				rows: 1,
				maxRows: 6,
				id: 'wpSummaryWidget',
				maxLength: $oldSummary.data( 'oouiInfused' ).maxLength,
				name: 'wpSummary',
				inputId: 'wpSummary',
				tabIndex: $oldSummary.data( 'oouiInfused' ).tabIndex,
				title: $oldSummary.data( 'oouiInfused' ).title,
				accessKey: $oldSummary.data( 'oouiInfused' ).accessKey,
				value: $summaryInput.val()
			} );
			// Tiene que insertarse y no reemplazar, en caso contrario algunas propiedades no se inicializan
			//$oldSummary.replaceWith( ooSummary.$element );
			$prevNode = $( '<div>' ).insertBefore( $oldSummary );
			$oldSummary.remove();
			ooSummary.$element.insertAfter( $prevNode );
			$prevNode.remove();
			// bug: https://phabricator.wikimedia.org/T200291 (se generan 2 textareas iguales)
			ooSummary.$element.find( 'textarea' ).eq( 1 ).removeAttr( 'id name' );
			mw.widgets.visibleByteLimit( ooSummary, 255 );
			// Necesario aparentemente para que no casque el infuse que se hace en LivePreview
			ooSummary.$element.data( 'ooui-infused', ooSummary );
			ooSummary.$element.attr( 'data-ooui', '' );
			// Prevent insert new lines
			$( '#wpSummary' ).on( {
				keypress: function( e ) {
					if ( e.which == 13 ) {
						return false;
					}
				},
				change: function( e ) {
					var oldT, newT;
					oldT = $( this ).val();
					newT = oldT.replace( /[\r\n]+/g, ' ' );
					if ( oldT != newT ) {
						$( this ).val( newT );
					}
				}
			} );
		}
	},
	_ajustarCopywarn = function() {
		$( '.mw-editTools' ).appendTo( _$editorSidebar );
		_$editorSidebar.on( 'click', '.mw-editTools', function( e ) {
			if ( !_wikiCopywarnDialog ) {
				_initCopywarnDialog();
			}
			_wm.openWindow( _wikiCopywarnDialog );
			e.preventDefault();
		} );
	},
	_initCopywarnDialog = function() {
		OO.inheritClass( _wikiCopywarnDialogClass, OO.ui.ProcessDialog );
		_wikiCopywarnDialogClass.static.name = 'FandoomCopywarnDialog';
		_wikiCopywarnDialogClass.static.title = 'Aviso sobre copyrights';
		_wikiCopywarnDialogClass.static.actions = [
			{ label: 'Cerrar', flags: 'safe' }
		];
		_wikiCopywarnDialogClass.prototype.initialize = function() {
			_wikiCopywarnDialogClass.super.prototype.initialize.apply( this, arguments );
			this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
			this.content.$element.append( $( '.mw-editTools' ).clone() );
			this.$body.append( this.content.$element );    
		};
		// Specify the dialog height
		_wikiCopywarnDialogClass.prototype.getBodyHeight = function () {
			return this.content.$element.outerHeight( true );
		};
		// Use the getActionProcess() method to specify a process to handle the actions
		_wikiCopywarnDialogClass.prototype.getActionProcess = function ( action ) {
			var dialog = this;
			if ( action ) {
				return new OO.ui.Process( function () {
					dialog.close();
				} );
			}
			// Fallback to parent handler.
			return _wikiCopywarnDialogClass.super.prototype.getActionProcess.call( this, action );
		};
		_wikiCopywarnDialog = new _wikiCopywarnDialogClass( {
			size: 'medium'
		} );
		_wm.addWindows( [ _wikiCopywarnDialog ] );
	},
	_eventosLivePreview = function() {
		var $elems;
		$elems = $( '#wikiPreview,#wikiDiff' );
		if ( $elems.length == 2 ) {
			OO.inheritClass( _wikiPreviewDialogClass, OO.ui.ProcessDialog );
			_wikiPreviewDialogClass.static.name = 'FandoomLivePreviewDialog';
			_wikiPreviewDialogClass.static.title = 'Previsualizar';
			_wikiPreviewDialogClass.static.actions = [
				{ action: 'save', label: 'Guardar cambios', flags: [ 'primary', 'constructive' ]  },
				{ label: 'Cerrar', flags: 'safe' }
			];
			_wikiPreviewDialogClass.prototype.initialize = function() {
				_wikiPreviewDialogClass.super.prototype.initialize.apply( this, arguments );
				this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
				this.content.$element.append( $elems ).prepend( _$editorContainer.find( '.mw-summary-preview' ).clone() );
				this.$body.append( this.content.$element );    
			};
			// Specify the dialog height
			_wikiPreviewDialogClass.prototype.getBodyHeight = function () {
				return $( window ).height() - 50;
			};
			// Use the getActionProcess() method to specify a process to handle the 
			// actions (for the 'save' action, in this example).
			_wikiPreviewDialogClass.prototype.getActionProcess = function ( action ) {
				var dialog = this;
				if ( action ) {
					return new OO.ui.Process( function () {
						dialog.close();
						if ( action === 'save' ) {
							$( '#wpSave' ).trigger( 'click' );
						}
					} );
				}
				// Fallback to parent handler.
				return _wikiPreviewDialogClass.super.prototype.getActionProcess.call( this, action );
			};
			_wikiPreviewDialog = new _wikiPreviewDialogClass( {
				size: 'larger'
			} );
			_wm.addWindows( [ _wikiPreviewDialog ] );
			$( '#wpPreview,#wpDiff' ).on( 'click', _doLivePreview );
			mw.hook( 'wikipage.editform' ).add( function ( $content ) {
				_wikiPreviewDialog.content.$element.find( '.mw-summary-preview' ).empty().append( $content.find( '.mw-summary-preview' ).contents() );
			} );
		}
	},
	_doLivePreview = function() {
		_wm.openWindow( _wikiPreviewDialog );
	};
	
	$( _init );
} )( jQuery, mw, OO, document, window );