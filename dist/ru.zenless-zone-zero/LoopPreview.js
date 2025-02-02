// original en zzz wiki
// TODO handle promise returned by video.play() (could fail if autoplay is not allowed)

/* Notes about Fandom's lazy image loading:
	Some/most images will be marked for lazy loading--in this case, the <img> element
		will have a `lazyload` class.
	When the image gets loaded, this class will get changed to `lazyloaded`.
	Images that are not lazily loaded will not have either class.
*/

(function(window) {
	'use strict';
	
	/**
	 * @returns an object containing the data about the video
	 *  (or null if the video has not been uploaded):
	 *  - url (string): the url of the file to be used in a <video>
	 *  - filename (string): the wiki filename for the video's file page
	 *  - width (number | null)
	 *  - height (number | null)
	 */
	function extractVideoData(item) {
		var videoData = item.getElementsByClassName('video')[0];
		var videoLink = videoData.getElementsByTagName('a')[0];
		
		// Stop if video file does not exist.
		if (videoLink.classList.contains('new')) {
			return null;
		}
		
		var videoUrl = videoLink.href;
		var videoFileName = videoLink.innerText;
		
		var rawSize = videoData.dataset.size.toLowerCase();
		// Size Logic https://www.mediawiki.org/wiki/Help:Images#Syntax
		var parseArray = /(\d*x)?(\d+)px/.exec(rawSize);
		var first = parseArray[0];
		var second = parseArray[1];
		var secondIsWidth = !first.includes('x');
		var width = secondIsWidth ? second : (first.replace(/\D/g,'') || null);
		var height = secondIsWidth ? null : second;
			
		return {
			url: videoUrl,
			filename: videoFileName,
			width: width,
			height: height,
		};
	}
	
	/**
	 * Clones the master video element and sets up the new video's source for lazy loading.
	 * @returns an array of [new video element, the video's source element]
	 */
	function cloneVideo(videoData, vid_master, source_master) {
		// Video Body
		var vid_body = vid_master.cloneNode();
		vid_body.muted = true; // cloning the element doesn't preserve muting, even when setting defaultMuted=true
		if (videoData.width)
			vid_body.width = videoData.width;
		if (videoData.height)
			vid_body.height = videoData.height;

		// Source Body (for Video)
		var source = source_master.cloneNode();
		source.dataset.src = videoData.url; // store source in data to load lazily later
		vid_body.appendChild(source);
		
		return [vid_body, source];
	}
	
	/**
	 * Immediately load a video and replace its gif.
	 * (Used for autoplay mode.)
	 */
	function loadVideo(image, video) {
		var sources = video.getElementsByTagName('source');
		var i;
		
		// skip if loaded already
		var loaded = true;
		for (i=0; i<sources.length; i++) {
			if (!sources[i].src)
				loaded = false;
		}
		if (loaded)
			return;
		
		// load video, then add listeners
		for (i=0; i<sources.length; i++) {
			var source = sources[i];
			if (source.dataset.src)
				source.src = source.dataset.src;
		}
		
		image.style.display = 'none';
		video.style.display = 'block';
		video.preload = 'auto';
		video.load();
	}
	
	// main script
	
	// Load Protection
	if (window.LoopPreviewLoaded) {
		return;
	}
	window.LoopPreviewLoaded = true;

	// Initialize options
	if (typeof window.LoopPreviewOpts !== 'object')
		window.LoopPreviewOpts = {};
	var opts = {
		mode: 'hover',
	};
	Object.assign(opts, window.LoopPreviewOpts);

	function init() {
		var vid_master = document.createElement('video');

		// Test if this code should run
		var cantPlayMp4 = vid_master.canPlayType('video/mp4') === '';
		if (cantPlayMp4 || opts.mode === 'off') return;

		// Prep master components for cloneNode (more optimal than createElement)
		vid_master.loop = true;
		vid_master.preload = 'none';
		vid_master.disablePictureInPicture = true;
		vid_master.disableRemotePlayback = true;
		vid_master.playsInline = true;
		vid_master.style.display = 'none';
		var source_master = document.createElement('source');
		source_master.type = 'video/mp4';
		
		// Set up lazy loading for autoplay mode
		var loadManager, loadManagerConfig, playManager;

		// Add videos
		var searchClass = 'looppreview';
		var all = document.getElementsByClassName(searchClass);
		$('.'+searchClass).each(function(_, focus){
			// Ingest values
			focus.classList.remove(searchClass);
			
			// Create the video element
			var videoData = extractVideoData(focus);
			if (videoData === null) {
				return;
			}
			var container = focus.querySelector('a.image');
			var out = cloneVideo(videoData, vid_master, source_master);
			var vid_body = out[0];
			var source = out[1];
			container.appendChild(vid_body);
			
			// Update links to point to video file/page
			container.href = videoData.url;
			var icon = focus.querySelector('figure figcaption a.info-icon');
			if (icon)
				icon.href = '/wiki/' + videoData.filename;
			
			var image = container.getElementsByTagName('img')[0];
			
			// Add logic to load videos based on loading mode in options
			//  - Autoplay: replace gifs with videos as the gifs load
			//  - Hover: add event listener that loads video and shows it
			
			// Hover mode
			
			// Wait for first mouseover before loading the video
			$(container).one("mouseover.LoopPreview", function() {
				source.src = source.dataset.src;
				
				// Wait until video loads before showing/playing it
				$(vid_body).one('canplay.LoopPreview', function() {
					function showVideo() {
						image.style.display = 'none';
						vid_body.style.display = 'block';
						vid_body.play();
					}
					$(container).on("mouseover.LoopPreview", showVideo);
					
					// Immediately show/play if still hovering
					if (container.matches(':hover')) {
						showVideo();
					}
				});
				vid_body.preload = 'auto';
				vid_body.load();
				
				$(container).on("mouseout.LoopPreview", function () {
					image.style.display = 'block';
					vid_body.style.display = 'none';
					vid_body.pause();
				});
			});
			
			// Autoplay mode
			mw.hook('LoopPreview.autoplay').add(function(){
				$(container).off("mouseover.LoopPreview");
				if (!loadManager || !loadManagerConfig || !playManager) {
					loadManager = new MutationObserver(function loadVideos(mutationList) {
						// Load video when its image gets loaded
						for (var i=0; i<mutationList.length; i++) {
							var image = mutationList[i].target;
							// Skip if not loaded yet
							if (image.classList.contains('lazyload'))
								continue;
							
							var container = image.parentElement;
							var video = container.getElementsByTagName('video')[0];
							loadVideo(image, video);
						}
					});
					loadManagerConfig = { attributes: true, attributeFilter: ['class'] };
					
					playManager = new IntersectionObserver(function playVideos(changes) {
						// Play video when it scrolls into view; pause when it exits
						for (var i=0; i<changes.length; i++) {
							var curr = changes[i];
							var video = curr.target;
							if (curr.isIntersecting)
								video.play();
							else
								video.pause();
						}
					});
				}
				
				// If image is marked for lazy loading, set loadManager to wait
				// for the image to load before loading the video.
				// Otherwise, load the video immediately.
				if (image.classList.contains('lazyload')) {
					// Prevent the image from loading normally
					delete image.dataset.src;
					loadManager.observe(image, loadManagerConfig);
				} else {
					loadVideo(image, vid_body);
				}
				playManager.observe(vid_body);
			});
		});
	}
	mw.hook('wikipage.content').add(init);
})(window);