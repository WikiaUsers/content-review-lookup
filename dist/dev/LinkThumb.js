/* linkThumb
 *   shows a brief thumbnail of files when you hover over File: links
 *   ver 0.3
 *   by mfaizsyahmi, 2015
 *   ucp adaptation by Kofirs2634, 2021
 */
mw.loader.using('mediawiki.api', function() {
	if (window.linkThumb || mw.config.get('wgCanonicalSpecialPageName') == 'Newimages') return
	window.linkThumb = true
	
	if (!window.linkThumbConfig) window.linkThumbConfig = {}
	
	const c = mw.config.get(['wgScriptPath', 'wgFormattedNamespaces', 'wgArticlePath']),
		api = new mw.Api()
	var requestTimer, closeTimer
	var i18n
	
	function init() {
		// append preview block and its styles
		$('body').append($('<div>', { id: 'linkThumb-prev' }))
		$('head').append($('<style>', { id: 'linkThumb-styles', text:
			'#linkThumb-prev{position:fixed;bottom:20px;left:80px;z-index:9999;color:var(--theme-body-text-color)}' +
			'#linkThumb-prev.error{background:var(--theme-page-background-color);border:1px solid #F00;padding:0 4px;color:var(--theme-page-text-color)}'
		}))
		
		// search all links leading to files' pages
		var selector = '#mw-content-text a[href^="' + c.wgArticlePath.replace('$1', encodeURI(c.wgFormattedNamespaces[6])) + '"]'
		$(selector)
		.mouseenter(function(e) {
			if ($(e.target).prop('tagName') != 'A') return
			
			// cut out start of link and keep only namespaced file title
			var title = $(e.target).attr('href').substr(c.wgArticlePath.replace('$1', '').length)
			
			// some mess with timers
			clearTimeout(closeTimer)
			clearTimeout(requestTimer)
			
			// send request with small delay
			requestTimer = setTimeout(
				function() { getImg(title) },
				window.linkThumbConfig.requestTimeout >= 500 ? window.linkThumbConfig.requestTimeout : 1000
			)
		})
		.mouseleave(function(e) {
			clearTimeout(requestTimer)
			// close preview
			closeTimer = setTimeout(
				function() { $('#linkThumb-prev').empty().removeClass('error') },
				window.linkThumbConfig.closeTimeout || 2000
			)
		})
	}

	function getImg(title) {
		// while request is pending, show the loading text
		$('#linkThumb-prev').removeClass('error').text(i18n.msg('loading').plain())
		api.get({
			action: 'query',
			titles: decodeURI(title),
			prop: 'imageinfo',
			iiprop: 'url',
			iiurlwidth: window.linkThumbConfig.width > 0 ? window.linkThumbConfig.width : 200,
			redirects: true
		}).done(function(r) {
			var path = r.query.pages[Object.keys(r.query.pages)[0]]
			if (path.missing !== undefined) { // file doesn't exist, show error
				$('#linkThumb-prev').addClass('error').html(i18n.msg('error-unexist', c.wgArticlePath.replace('$1', title), decodeURI(title)).plain())
			} else if (typeof path.imageinfo == 'undefined') { // that rare case when file doesn't have a thumbnail
				$('#linkThumb-prev').addClass('error').html(i18n.msg('error-no-thumb', c.wgArticlePath.replace('$1', title), decodeURI(title)).plain())
			} else { // file exists, show it
				$('#linkThumb-prev').empty().append($('<img>', {
					src: r.query.pages[Object.keys(r.query.pages)[0]].imageinfo[0].thumburl
				}))
			}
		}).fail(function(e) { // catching uncaught errors
			console.error('linkThumb got an error:', e)
			$('#linkThumb-prev').addClass('error').html(i18n.msg('error-failed', c.wgArticlePath.replace('$1', title), decodeURI(title)).plain())
		})
	}

	mw.hook('dev.i18n').add(function(i) {
		i.loadMessages('LinkThumb').then(function(i) {
			i18n = i; i18n.useUserLang(); init()
		})
	})

	importArticle({ type: 'script', article: 'u:dev:MediaWiki:i18n-js/code.js' })
});