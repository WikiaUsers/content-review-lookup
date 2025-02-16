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
		const videoData = item.getElementsByClassName('video')[0];
		const videoLink = videoData.getElementsByTagName('a')[0];
		
		// Stop if video file does not exist.
		if (videoLink.classList.contains('new')) {
			return null;
		}
		
		const videoUrl = videoLink.href;
		const videoFileName = videoLink.innerText;
		
		const rawSize = videoData.dataset.size.toLowerCase();
		// Size Logic https://www.mediawiki.org/wiki/Help:Images#Syntax
		const parseArray = /(\d*x)?(\d+)px/.exec(rawSize);
		const first = parseArray[0];
		const second = parseArray[1];
		const secondIsWidth = !first.includes('x');
		const width = secondIsWidth
			? second
			: first.replace(/\D/g,'') || null;
		const height = secondIsWidth
			? null
			: second;
			
		return {
			url: videoUrl,
			filename: videoFileName,
			width: width,
			height: height,
		}
	}
	
	/**
	 * Clones the master video element and sets up the new video's source for lazy loading.
	 * @returns an array of [new video element, the video's source element]
	 */
	function cloneVideo(videoData, vid_master, source_master) {
		// Video Body
		const vid_body = vid_master.cloneNode();
		vid_body.muted = true; // cloning the element doesn't preserve muting, even when setting defaultMuted=true
		if (videoData.width)
			vid_body.width = videoData.width;
		if (videoData.height)
			vid_body.height = videoData.height;

		// Source Body (for Video)
		const source = source_master.cloneNode();
		source.dataset.src = videoData.url; // store source in data to load lazily later
		vid_body.appendChild(source);
		
		return [vid_body, source];
	}
	
	/**
	 * Immediately load a video and replace its gif.
	 * (Used for autoplay mode.)
	 */
	function loadVideo(image, video) {
		const sources = video.getElementsByTagName('source');
		
		// skip if loaded already
		var loaded = true;
		for (var i=0; i<sources.length; i++) {
			if (!sources[i].src)
				loaded = false;
		}
		if (loaded)
			return;
		
		// load video, then add listeners
		for (var i=0; i<sources.length; i++) {
			const source = sources[i];
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
	const opts = {
		mode: 'hover',
	};
	Object.assign(opts, window.LoopPreviewOpts);
	
	const autoplay = opts.mode === 'autoplay';

	function init() {
		const vid_master = document.createElement('video');

		// Test if this code should run
		const cantPlayMp4 = vid_master.canPlayType('video/mp4') === '';
		if (cantPlayMp4 || opts.mode === 'off') return;

		// Prep master components for cloneNode (more optimal than createElement)
		vid_master.loop = true;
		vid_master.preload = 'none';
		vid_master.disablePictureInPicture = true;
		vid_master.disableRemotePlayback = true;
		vid_master.playsInline = true;
		vid_master.style.display = 'none';
		const source_master = document.createElement('source');
		source_master.type = 'video/mp4';
		
		// Set up lazy loading for autoplay mode
		var loadManager, loadManagerConfig;
		var playManager;
		if (autoplay) {
			loadManager = new MutationObserver(function loadVideos(mutationList) {
				// Load video when its image gets loaded
				for (var i=0; i<mutationList.length; i++) {
					const image = mutationList[i].target;
					// Skip if not loaded yet
					if (image.classList.contains('lazyload'))
						continue;
					
					const container = image.parentElement;
					const video = container.getElementsByTagName('video')[0];
					loadVideo(image, video);
				}
			});
			loadManagerConfig = { attributes: true, attributeFilter: ['class'] };
			
			playManager = new IntersectionObserver(function playVideos(changes) {
				// Play video when it scrolls into view; pause when it exits
				for (var i=0; i<changes.length; i++) {
					const curr = changes[i];
					const video = curr.target;
					if (curr.isIntersecting)
						video.play();
					else
						video.pause();
				}
			});
		}

		// Add videos
		const searchClass = 'looppreview';
		const all = document.getElementsByClassName(searchClass);
		while (0 < all.length) {
			// Ingest values
			const focus = all.item(0);
			focus.classList.remove(searchClass);
			
			// Create the video element
			const videoData = extractVideoData(focus);
			if (videoData === null) {
				continue;
			}
			const container = focus.querySelector('a.image');
			const out = cloneVideo(videoData, vid_master, source_master);
			const vid_body = out[0];
			const source = out[1];
			container.appendChild(vid_body);
			
			// Update links to point to video file/page
			container.href = videoData.url;
			const icon = focus.querySelector('figure figcaption a.info-icon');
			if (icon)
				icon.href = '/wiki/' + videoData.filename;
			
			const image = container.getElementsByTagName('img')[0];
			
			// Add logic to load videos based on loading mode in options
			//  - Autoplay: replace gifs with videos as the gifs load
			//  - Hover: add event listener that loads video and shows it
			if (autoplay) {
				// Autoplay mode
				
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
			} else {
				// Hover mode
				
				// Wait for first mouseover before loading the video
				container.addEventListener("mouseover", function() {
					source.src = source.dataset.src;
					
					// Wait until video loads before showing/playing it
					vid_body.addEventListener('canplay', function() {
						function showVideo() {
							image.style.display = 'none';
							vid_body.style.display = 'block';
							vid_body.play();
						}
						container.addEventListener("mouseover", showVideo);
						
						// Immediately show/play if still hovering
						if (container.matches(':hover')) {
							showVideo();
						}
					}, { 'once':true });
					vid_body.preload = 'auto';
					vid_body.load();
					
					container.addEventListener("mouseout", function () {
						image.style.display = 'block';
						vid_body.style.display = 'none';
						vid_body.pause();
					});
				}, { once: true });
			}

		}
	}
	mw.hook('wikipage.content').add(init);
})(window);