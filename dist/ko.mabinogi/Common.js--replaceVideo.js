// <nowiki>
/**
 * This script makes Videos looks like a plain GIFs, which is with autoplay,
 * loop and muted.
 * The name 'replaceVideo' is just historical. The replication does not always
 * occurs.
 */

mw.hook('wikipage.content').add(function () {
	'use strict';

	function configureVideo(containerSelector, videoSelector, controlSelector) {
		document.querySelectorAll(containerSelector).forEach(function ($container) {
			var $video;
			if (videoSelector) {
				$video = $container.querySelector(videoSelector);
				if (!$video) {
					return;
				}
			} else {
				$video = $container;
				$video.classList.add('replacedVideo--original-video');
			}
			$video.classList.add('replacedVideo--original-video');
			if ($video != $container) {
				$container.classList.add('replacedVideo--container');
			}

			if (!/\.mp4/.test($video.getAttribute('src'))) {
				return;
			}

			if ($video.tagName != 'VIDEO') {
				var $newVideo = document.createElement('video');
				$newVideo.classList.add('replacedVideo--replaced-video');
				$newVideo.setAttribute('src', $video.getAttribute('src'));
				$newVideo.style.maxWidth = '100%';
				var width = $video.getAttribute('width');
				if(width && width > 0) {
					$newVideo.setAttribute('width', width);
				}
				$newVideo.setAttribute('height', $video.getAttribute('height'));
				$video.replaceWith($newVideo);
				$video = $newVideo;
			}

			$video['autoplay'] = true;
			$video['muted'] = true;
			$video['loop'] = true;
			$video['playsinline'] = true;
			$video['controls'] = true;

			if (controlSelector) {
				$container.querySelectorAll(controlSelector).forEach(function ($ctr) {
					$ctr.parentElement.removeChild($ctr);
				});
			}

			$video.play();
			$video.onloadeddata = function (e) {
				e.target.play();
			};
		});
	}

	// Image on portable infobox
	configureVideo(
		'.portable-infobox .video-thumbnail',
		'img.pi-image-thumbnail',
		'.thumbnail-play-icon-container'
	);

	// Unloaded inline video
	configureVideo('.center .floatnone > video', null, 'a');

	// Loaded inline video
	configureVideo('.mw-tmh-player', 'video', '.mw-tmh-play');

	// Category page
	configureVideo(
		'.category-page__trending-pages .category-page__trending-page-thumbnail',
		null,
		null
	);
	configureVideo('.category-page__member-left img', null, null);
});