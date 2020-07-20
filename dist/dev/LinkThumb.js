/* linkThumb
 *   shows a brief thumbnail of files when you hover over File: links
 *   ver 0.2
 *   by mfaizsyahmi, 2015
 */
var linkThumb = {
	// the container element
	$container: $('<div>').css({
		position:"fixed",
		bottom:"30px",
		left:"10px",
		"z-index":999999}
	).appendTo('body'),
	// the variable that holds the timeout ID
	timeoutvar: null,
	// set image width here
	imgwidth: 200,
	// sets event for File: links
	main: function() {
		$('#mw-content-text').find(':link[href^="/wiki/File:"][href$=".jpg"], :link[href^="/wiki/File:"][href$=".jpeg"], :link[href^="/wiki/File:"][href$=".gif"], :link[href^="/wiki/File:"][href$=".png"]')
		.off('mouseenter.linkThumb mouseleave.linkThumb')
		.on('mouseenter.linkThumb', function(e) { 
			clearTimeout(linkThumb.timeoutvar);
			linkThumb.timeoutvar = setTimeout( linkThumb.get( $(this).attr('href'), 500));
		}).on('mouseleave.linkThumb', function(e) {
			clearTimeout(linkThumb.timeoutvar);
			linkThumb.$container.empty();
		});
	},
	// queries the API for thumbnail url
	get: function(href) {
		var title = decodeURIComponent(href.replace(/^\/wiki\//,''));
		mw.log(title);
		$.get('/api.php', {
			action:'query',
			titles: title,
			prop: 'imageinfo',
			iiprop: 'url',
			iiurlwidth: linkThumb.imgwidth,
			format:'json',
			redirects: true
		}).done(function(d) {
			// when done, retrieve url and display
			for(var wat in d.query.pages) { // should be only one
				if ( d.query.pages[wat].hasOwnProperty('imageinfo') ) {
					var url = d.query.pages[wat].imageinfo["0"].thumburl;
					linkThumb.$container.empty();
					var $img = $('<img>').attr('src',url).css('border','2px solid').appendTo(linkThumb.$container);
					linkThumb.$container.show().delay(3000).fadeOut(1000);//.append('<br>'+d.query.pages[wat].title)
				} else {
					linkThumb.$container.text('Failed to get thumbnail for ' + d.query.pages[wat].title).delay(2000).empty();
				}
			}
		}).fail(function(title) {
			linkThumb.$container.text('Failed to get info for ' + title).delay(2000).empty();
		}(title));
	}
};
if (mw.config.get('wgCanonicalSpecialPageName') !== 'Images') {
    linkThumb.main();
}