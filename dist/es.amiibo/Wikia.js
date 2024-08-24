/**
 * Selección de región de idioma
 * Muestra solo el texto de una región ocultando las otras según la
 * preferencia de idioma del navegador.
 * 
 * Copyright (C) 2019 Jesús Martínez Novo ([[User:Ciencia Al Poder]])
 * @license: MIT
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/
( function( $, mw, document, navigator ) {
	'use strict';
	
	var _variant,
	_$styleTag,
	_init = function() {
		_variant = _getVariant();
		_setStyle();
	},
	_getVariant = function() {
		var lang = null, sp;
		if ( navigator.languages ) {
			if ( navigator.languages.length > 0 ) {
				lang = navigator.languages[0];
			}
		}
		if ( !lang ) {
			lang = navigator.language;
		}
		if ( !lang ) {
			return;
		}
		lang = lang.toLowerCase();
		// "es" a secas... debería ser España?
		if ( lang == 'es' ) {
			return 'es-ES';
		}
		if ( lang == 'ca' || lang == 'eu' || lang == 'gl' ) {
			return 'es-ES';
		}
		sp = lang.split( '-' );
		// es-ES, pero también ca-ES, etc
		if ( sp.length >= 2 && sp[1] == 'es' ) {
			return 'es-ES';
		}
		return 'es-419';
	},
	_setStyle = function() {
		var styleText = '', excludeLang;
		if ( !_$styleTag ) {
			if ( !_variant ) {
				return;
			}
			_$styleTag = $('<style>').appendTo( document.head );
		}
		if ( _variant ) {
			if ( _variant == 'es-ES' ) {
				excludeLang = 'es-419';
			} else {
				excludeLang = 'es-ES';
			}
			styleText = '.regional-lang-switch > .divmarker, .regional-lang-switch > span[lang="' + excludeLang + '"] { display: none; }';
		}
		_$styleTag.text( styleText );
	};
	$( _init );
} )( jQuery, mw, document, navigator );