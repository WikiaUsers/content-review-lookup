// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint smarttabs:true laxbreak:true jquery:true browser:true */
/*global mediaWiki */

(function($, mw, doc) {
	// Only run on user pages
	if (({2:1, 3:1, 500:1, 501:1, 502:1, 503:1, 1200:1, 1201:1, 1202:1})[mw.config.get('wgNamespaceNumber')] !== 1) {
		return;
	}

	$(function($) {
		// Look for [[Template:UserImageHotLink]]
		$('.WikiaArticle .user-image-hotlink, #mw-content-text .user-image-hotlink').each(function() {
			var $this = $(this),
			    w = $this.data('width'),
			    h = $this.data('height'),
			    alt = $this.data('alt'),
			    href = $this.text();

			if (!href) { return; }

			var img = doc.createElement('img');
			img.src = href;
			if (alt) { img.alt = alt; }
			if (w) { img.width = +w; }
			if (h) { img.height = +h; }
			$this.replaceWith(img);
		});
	});
})(jQuery, mediaWiki, document);

// </syntaxhighlight>