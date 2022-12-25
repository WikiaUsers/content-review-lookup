/**
 * Add an interactive viewer for spherical panorama images to commons file pages
 * and (in the future) as a popup on gallery/article pages.
 * @author [[User:Dschwen]], 2015
 */
/*jshint laxcomma: true, smarttabs: true, quotmark:single, curly:false, es3:true */
/* global mw,$ */

$(function() {
	var fileName,
		uiLang = mw.config.get('wgUserLanguage');
	
	// dummy for translations
	function i18n(text) { return text; }
	
	// load the viewer with the image in a given size
	function loadPanoViewer(size) {
		// get image preview size
		var iw = image.width(),
			ih = image.height();
		
		// construct full file
		if (size) 
			arg = 'panorama=' + encodeURIComponent('https://panoviewer.toolforge.org/cache.php?' + 't=' + size + '&f=' + mw.config.get('wgTitle'));
		else
			arg = 'config=' + encodeURIComponent('https://panoviewer.toolforge.org/multires.php?f=' + mw.config.get('wgTitle'));

		// insert viewer
		var pannellumURL = 'https://panoviewer.toolforge.org/src/standalone/pannellum.htm?autoLoad=true&' + arg;
		var content = $('#bodyContent, #mw-content-text').eq(0);
		image.replaceWith($('<iframe webkitAllowFullScreen mozallowfullscreen allowFullScreen style="border-style:none;"></iframe>')
			.attr({'src': pannellumURL, 'width': iw+'px', 'height': ih+'px'})
		);
	}
	
	// Show ui on image page
	if (mw.config.get('wgNamespaceNumber') === 6 && 
	    mw.config.get('wgAction') === 'view') {
		
		// get filename and ignore non-JPEG
		fileName = mw.config.get('wgPageName').match(/File:(.+\.jpe?g)/i);
		if (!fileName) { return; }
		
		// find image preview
		var image = $('div#file').css('position', 'relative');

		// add panorama buttonset
		var	menu = $('<ul>'),
			advanced = $('<button>').css('height', '2em')
				.attr('title', i18n('Sizes'))
				.button({
					text: false,
					icons: { primary: 'ui-icon-triangle-1-s' }
				})
				.on('click', function(e) {
					menu.toggle();
					e.stopPropagation();
				}),
			buttonset = $('<div>')
				.attr('lang', uiLang)
				.append(
					$('<button>').css('height', '2em')
						.attr('title', i18n('Panorama'))
						.text(i18n('Panorama'))
						.button({'icons': {'primary': 'ui-icon-image'}})
						.on('click', function(e) {
							loadPanoViewer(4096);
							e.stopPropagation();
						}),
						advanced
				)
				.buttonset()
				.css({'position': 'absolute', 'top': '1em', 'left': '1em'})
				.append(menu)
				.appendTo(image);
				
		// get full image width
		var width = $('.fullImageLink [data-file-width]').data('fileWidth');
		
		// TODO: only offer sizes that make sense
		
		// populate size menu
		menu.append(
			$('<li>').append($('<a href="#">')
				.append($('<span>').text(i18n('Small')))
				.on('click', function(e) { loadPanoViewer(2048); e.stopPropagation(); })
			),
			$('<li>').append($('<a href="#">')
				.append($('<span style="text-weight: bold">').text(i18n('Large')))
				.on('click', function(e) { loadPanoViewer(4096); e.stopPropagation(); })
			),
			$('<li>').append($('<a href="#">')
				.append($('<span>').text(i18n('Full')))
				.on('click', function(e) { loadPanoViewer(); e.stopPropagation(); })
			)
		)
		.menu()
		.position({
			my: 'top',
			at: 'bottom',
			of: advanced,
			within: buttonset,
			collide: 'none'
		})
		.hide();
	}
});