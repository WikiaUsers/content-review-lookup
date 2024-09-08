/* Cualquier /* Any JavaScript here will be loaded for sysops only */
// Para no incluir doble este script, por #CulpaDeWikia
mw.config.set( 'wgGroupSysopScriptsLoaded', true );
 
/* Solo MW 1.19.*, corregido en versiones posteriores */
/*
 * JavaScript for Special:Block to hide options that do not apply to
 *  some block types (user, IP or IP range)
 */
( function ( $ ) {
 
var _RE_EMPTY = /^\s*$/,
	_RE_IP = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|:(:[0-9A-Fa-f]{1,4}){1,7}|[0-9A-Fa-f]{1,4}(:{1,2}[0-9A-Fa-f]{1,4}|::$){1,7})(\/\d+)?$/,
	_RE_PLUSRANGE = /\/\d+$/,
	_init = function () {
		var $target = $( '#mw-bi-target' );
		if ( $target.length === 0 ) {
			return;
		}
		$target.bind( 'change' , _updateBlockOptions );
		_updateBlockOptions();
	},
	_updateBlockOptions = function () {
		var $target = $( '#mw-bi-target' ), addy, isEmpty, isIp, isIpRange, rowsHidden, $row;
		if ( $target.length === 0 ) {
			return;
		}
 
		addy = $target.val();
		isEmpty = _RE_EMPTY.test( addy );
		isIp = !isEmpty && _RE_IP.test( addy );
		isIpRange = isIp && _RE_PLUSRANGE.test( addy );
		rowsHidden = [
			[ '#mw-input-wpHardBlock', !isIp && !isEmpty ],
			[ '#mw-input-wpAutoBlock', isIp && !isEmpty ],
			[ '#mw-input-wpHideUser', isIp && !isEmpty ],
			[ '#mw-input-wpWatch', isIpRange && !isEmpty ]
		];
 
		for (var i = 0; i < rowsHidden.length; i++) {
			$row = $( rowsHidden[i][0] ).parents( 'tr' ).eq(0);
			if ( $row.length !== 0 ) {
				$row.css('display', rowsHidden[i][1] ? 'none' : '' );
			}
		}
	};
 
	if (mw.config.get( 'wgNamespaceNumber' ) == -1 && mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Block' && mw.config.get( 'wgVersion' ).indexOf('1.19.') == 0) {
		(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(_init);
	}
 
} )( jQuery );
 
// <pre>
// Botones para borrar el motivo al borrar una página
(function() {
	var _$reason = null,
		_actionDeleteButtons = function() {
			if (mw.config.exists('wikidex.actiondeletebuttons')) return;
			mw.config.set('wikidex.actiondeletebuttons', true);
			_$reason = $('#wpReason');
			if (_$reason.length === 0) return;
			$('<input type="button" value="Dejar sólo autor">').insertAfter(_$reason).click(function() {
				var re = new RegExp('(\\[\\[E?special:(Contributions|Contribuciones)\\/.+\\|.+\\]\\])', 'i'),
					ma = re.exec(_$reason.val());
				if (ma !== null) {
					_$reason.val('Único autor: '+ma[0]);
				}
				_$reason.get(0).focus();
			});
			$('<input type="button" value="Borrar comentario">').insertAfter(_$reason).click(function() {
				_$reason.val('').get(0).focus();
			});
		};
 
		if (mw.config.get('wgAction', '') == 'delete') {
			(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(_actionDeleteButtons);
		}
})();
 
/*
* FileUsage: Muestra una lista de artículos donde se usa (como imagen o como enlace) un archivo al acceder a la página para borrar o renombrar el archivo.
* Copyright (C) 2010 - 2012 Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*/
(function() {
	var _pagename = null,
	_iucontinue = null,
	_blcontinue = null,
	_loading = false,
	_init = function() {
		if (mw.config.exists('wikidex.fileusage') || document.getElementById('wpReason') === null) return;
		mw.config.set('wikidex.fileusage', true);
		if (mw.config.get('wgNamespaceNumber', 0) == -1 && mw.config.get('wgCanonicalSpecialPageName', '') == 'Movepage') {
			var name = mw.config.get('wgRelevantPageName', '');
			if (name && name.indexOf(mw.config.get('wgFormattedNamespaces')['6']+':') == 0) {
				_pagename = name;
			}
		} else if (mw.config.get('wgAction', '') == 'delete' && mw.config.get('wgNamespaceNumber', 0) == 6 && $('#mw-content-text').find('.permissions-errors').length == 0 && window.location.href.indexOf('oldimage=') == -1){
			_pagename = wgPageName;
		}
		if (_pagename !== null) {
			$('#mw-content-text').append('<h2 id="fileusage-heading"><span class="mw-headline"> Uso de la imagen </span><span class="progress">cargando...<span class="mw-small-spinner"></span><a href="#" id="fileusage_stop">detener</a></span></h2><ul id="fileusage-list"></ul>');
			$('#fileusage_stop').bind('click', function() {
				_stop();
				return false;
			});
			_loading = true;
			mw.loader.using(['mediawiki.api'], _reqUsage);
		}
	},
	_reqUsage = function() {
		var api = new mw.Api(), params = {
			action: 'query',
			list: 'backlinks|imageusage',
			bltitle: _pagename,
			iutitle: _pagename
		};
		if (_iucontinue) {
			params['iucontinue'] = _iucontinue;
		}
		if (_blcontinue) {
			params['blcontinue'] = _blcontinue;
		}
		api.get(params, {ok: _dataRecv});
	},
	_dataRecv = function(data) {
		if (!_loading) {
			return;
		}
		$.each(data.query.backlinks, function() {
			$('<li class="backlink"></li>').append($('<a></a>').attr('href', mw.util.wikiGetlink(this.title)).text(this.title)).append('<span> (enlace)</span>').appendTo('#fileusage-list');
		});
		$.each(data.query.imageusage, function() {
			$('<li class="backlink"></li>').append($('<a></a>').attr('href', mw.util.wikiGetlink(this.title)).text(this.title)).append('<span> (enlace)</span>').appendTo('#fileusage-list');
		});
		_iucontinue = _blcontinue = null;
		var qc = data['query-continue'];
		if (qc) {
			if (qc.imageusage) {
				_iucontinue = qc.imageusage.iucontinue || null;
			}
			if (qc.backlinks) {
				_blcontinue = qc.backlinks.blcontinue || null;
			}
		}
		if (_iucontinue || _blcontinue) {
			setTimeout(_reqUsage, 1000);
		} else {
			_stop();
			if ($('#fileusage-list').children().length == 0) {
				$('#fileusage-list').append('<li>No hay enlaces al archivo</li>');
			}
		}
	},
	_stop = function() {
		_loading = false;
		$('#fileusage-heading').find('span.progress').remove();
	};
 
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(_init);
 
})();
 
// </pre>JavaScript escrito aquí será cargado solamente para los administradores */