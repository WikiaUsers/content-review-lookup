/* Any JavaScript here will be loaded for all users on every page load. */

/*
* LazyLoadVideo - Displays a button over youtube videos that use {{youtube}} to activate them, when the vide itself is hidden by CSS.
* That improves load times, while still allowing users to view the vide inside the same page
* Copyright (C) 2012 Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version
*/
(function() {
	var _title = (window.lazyloadvideotitle || 'Click to activate video'),
	_thumbUrl = 'http://i1.ytimg.com/vi/{0}/hqdefault.jpg';
	_init = function() {
		var ytContents = $(document.body).find('div.video').children('div.thumbinner').children('div.youtube');
		if(ytContents.length > 0)
			ytContents.children('object').each(_muestraThumb);
	},
	_muestraThumb = function() {
		var oVideo = $(this), dataUrl = oVideo.attr('data'), vid = null, idx = dataUrl.indexOf('&'), w, h;
		if(idx != -1) {
			dataUrl = dataUrl.substr(0, idx);
			idx = dataUrl.lastIndexOf('/');
			if(idx != -1)
				vid = dataUrl.substr(idx + 1);
		}
		if(vid !== null && oVideo.css('display') == 'none') {
			w = oVideo.attr('width'), h = oVideo.attr('height');
			oVideo.parent().append($(document.createElement('img')).attr('src', _thumbUrl.replace('{0}', vid)).attr({width: w, height: h}).addClass('videothumb')).append($('<div class="videodiscoveryoverlay"></div>').css({width: w.concat('px'), height: h.concat('px')}).attr('title', _title).bind('click', _discoverVideo));
		}
	},
	_discoverVideo = function(e) {
		var p = $(this).parent();
		p.children('object').css('display', 'inline');
		p.children('img.videothumb').add(this).unbind().remove();
	};
	$(function() {
		window.setTimeout(_init, 2000);
	});
})();
/* END LazyLoadVideo */