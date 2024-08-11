/* Any JavaScript here will be loaded for all users on every page load. */

/* Script to show play button for OGG files in [[Special:NewFiles]] etc.*/
mw.hook('wikipage.content').add(function(){
	if (['Unusedimages', 'Newimages'].includes(mw.config.values.wgCanonicalSpecialPageName)) {
		// Import just in case current wiki does not
		importArticles({type: 'script', articles: ['u:dev:MediaWiki:OggPlayer.js']});
		var methods = {
			init: function() {
				this.removeDeleted();
				mw.hook('dev.OggPlayer').add(this.fixAudio);
				this.fixVideo();
				this.addCaptions();
			},
			fixAudio: function (OggPlayer) {
				mw.util.addCSS('.wikia-gallery-item .audio-button {height: 6em; width: 6em; background-color: var(--theme-accent-color);} .wikia-gallery-item .audio-button[data-state="pause"], .wikia-gallery-item .audio-button:hover {background-color: var(--theme-accent-color--hover);} .wikia-gallery-item .audio-button[data-state="error"] {background-color: var(--theme-alert-color);}');
				var handler = function(element){
					var url = element.getAttribute('src');
					var name = element.getAttribute('data-image-name');
					var img = element.closest('a.image');
					if (img && img.getAttribute('href')) {
						img.setAttribute('data-href', img.getAttribute('href'));
						img.removeAttribute('href');
					}
					var newel = $(
						'<div class="audio-button custom-theme focusable hidden" data-image-name="' + name + '">'+
							'<a href="' + url + '" class="internal" title="' + name + '">Media:' + name + '</a>'+
						'</div>'
					);
					$(element).replaceWith(newel);
					newel.each(OggPlayer.eachInstance);
				};
				methods.whenInView('.gallery-image-wrapper > a[href$=".ogg"] > img[src*=".ogg/revision/latest"]', handler, true);
			},
			fixVideo: function () {
				mw.util.addCSS('.wikia-gallery-item .thumb a.image video {height: auto !important;}');
				var handler = function(element){
					var attrs = {};
					$.each(element.attributes, function ( index, attribute ) {
						attrs[attribute.name] = attribute.value;
					});
					attrs.controls='';
					$(element).replaceWith($('<video>', attrs));
				};
				methods.whenInView('.gallery-image-wrapper > a[href$=".mp4"] > img', handler, true);
			},
			addCaptions: function () {
				var handler = function(wrapper) {
					if (!wrapper || !wrapper.querySelector('.image')) {return;}
					var $wrap = $(wrapper);
					$wrap.addClass('sfr-captioned'); // avoid double load
					var url = wrapper.querySelector('.image').getAttribute('href') || wrapper.querySelector('.image').getAttribute('data-href');
					var name = wrapper.querySelector('[data-image-name*="."]').getAttribute('data-image-name');
					var link = '<a href="'+url+'">'+name+'</a>';
					if ($wrap.children('.lightbox-caption').length===0){$wrap.append('<div class="lightbox-caption"></div>');}
					else {$wrap.children('.lightbox-caption').prepend('<br />', 'by ');}
					$wrap.children('.lightbox-caption').prepend('<a href="'+url+'">'+name+'</a>');
				};
				methods.whenInView('.wikia-gallery-item:not(.sfr-captioned)', handler, true);
			},
			removeDeleted: function() {
				var handler = function(wrapper) {
					console.log(wrapper);
					wrapper.remove();
				};
				methods.whenInView('.wikia-gallery-item:has(a[href*="/wiki/Special:Upload"])', handler, true);
			},
			whenInView: function(els, callback, init) {
				var handler = function() {
					// `els` can be a query string, a DOM element or even its own JQuery object
					$(els).each(function(_, element){
						var rect = element.getBoundingClientRect();
						if (
							rect.top >= 0 &&
							rect.left >= 0 &&
							rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
							rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
						) {
							callback(element);
						}
					});
				};
				if (init) { handler(); }
				$(window).on('DOMContentLoaded.mikeLib load.mikeLib resize.mikeLib scroll.mikeLib', handler);
			},
		};
		methods.init();
	}
});