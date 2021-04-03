/**
 * Install a rotatelink
 * This piece of script is jshint-valid. See [[:commons:MediaWiki:JSValidator.js]].
 * Maintainer: [[User:Rillke]]
 */
/*global $:false, mw:false, importScriptURI:false */
$(document).ready(function() {
	'use strict';
	if (6 !== mw.config.get('wgNamespaceNumber') || mw.user.anonymous()) {
		return;
	}
	var ext = mw.config.get('wgPageName').slice(mw.config.get('wgPageName').lastIndexOf('.') + 1).toLowerCase();
	if (-1 !== $.inArray(ext, ['ogg', 'oga', 'ogv', 'webm', 'mid', 'svg', 'pdf', 'tif', 'djvu'])) {
		return;
	}
	if (mw.config.get('wgRestrictionEdit') && mw.config.get('wgRestrictionEdit').length) {
		if ($.inArray(mw.config.get('wgRestrictionEdit')[0], mw.config.get('wgUserGroups')) === -1) {
			return;
		}
	}
	var loadAndStart = function() {
			if (window.rRot) {
				$(document).triggerHandler('rotaterequest', ['start']);
			} else {
				$(document).bind('scriptLoaded', function(evt, d, e) {
					if (d && 'rotaterequest' === d) {
						$(document).triggerHandler('rotaterequest', ['start']);
					}
				});
				window.importScriptURI(mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode('MediaWiki:RotateRequest.js') + '&action=raw&ctype=text/javascript&dummy=9');
			}
		};
	if ((-1 !== $.inArray('Images requiring rotation', mw.config.get('wgCategories'))) || (-1 !== $.inArray('Images requiring rotation by bot', mw.config.get('wgCategories')))) {
		$('#rotateChangeAngle').show().find('a').click(function(e) {
			e.preventDefault();
			loadAndStart();
		});
		return;
	}
	if ($.isArray(window.rotateFileTypes) && (-1 === $.inArray(ext, window.rotateFileTypes))) {
		return;
	}
	var $fileinfo = $('.fileInfo');
	if ($fileinfo.length < 1) {
		return;
	}
	var i18n = {
		'ca': 'demana girar-la',
		'cs': 'vyžádat otočení',
		'da': 'Anmod om rotation',
		'de': 'Bild drehen',
		'el': 'θέλει περιστροφή;',
		'en': 'request rotation',
		'es': 'solicitar la rotación',
		'fa': 'درخواست چرخش',
		'fr': 'faire pivoter',
		'gl': 'solicitar a rotación',
		'it': 'richiedi rotazione',
		'ja': '画像の回転を依頼',
		'mk': 'побарај свртување',
		'ml': 'തിരിക്കാൻ നിർദ്ദേശിക്കുക',
		'nl': 'Rotatie aanvragen',
		'pl': 'Obróć grafikę',
		'pt': 'Solicitar rotação',
		'ro': 'Cerere de rotaţie',
		'ru': 'запросить поворот',
		'sl': 'zahteva za zasuk',
		'sr': 'захтевање ротације',
		'sv': 'Begär rotation',
		'zh': '请求旋转', // also correct for zh-hans, zh-cn, zh-my, zh-sg
		'zh-hant': '請求旋轉',
		'zh-hk': '請求旋轉',
		'zh-mo': '請求旋轉',
		'zh-tw': '請求旋轉'
	};
	$('.fileInfo').append('; ', $('<a>', {
		href: '#',
		style: 'white-space:nowrap; display:inline-block;',
		title: 'Request a (permanent) correction of the rotation if the thumbnails display in the wrong orientation. Please try to purge the server\'s and client\'s cache before if this file is an upload before middle of October 2011.'
	}).append('(', $('<img>', {
		src: '//upload.wikimedia.org/wikipedia/commons/7/70/Silk_arrow_rotate_clockwise.png'
	}), i18n[mw.config.get('wgUserLanguage')] || i18n[mw.config.get('wgUserLanguage').split('-')[0]] || i18n.en, ')').click(function(e) {
		e.preventDefault();
		loadAndStart();
	}));
});