if ( mw.config.get( 'wgIsMainPage' ) ) {
    importScript( 'MediaWiki:Main page.js' );
}

if (mw.config.get('wgCanonicalNamespace') == 'User') {
	mw.loader.load('https://dev.miraheze.org/w/index.php?title=User:Splatched/mastoblox.js&action=raw&ctype=text/javascript');
}

const wikidbname = "doorswiki";
mw.loader.load('https://dev.miraheze.org/w/index.php?title=User:Splatched/ShowYourV2Avatar.js&action=raw&ctype=text/javascript');

$('p').each(function() {
    const $this = $(this);
    if($this.html().replace(/\s|<br>/g, '').length === 0)
        $this.remove();
});

$(".copy-button").click(function(e) {
  const target = e.currentTarget;
  const copyContent = target.dataset.copycontent;
    navigator.clipboard.writeText(copyContent);
    mw.notify(`Copied ${copyContent} to clipboard!`);
});


window.instantDiffs = window.instantDiffs || {};
instantDiffs.settings = instantDiffs.settings || {};
instantDiffs.settings.enableMobile = false;

mw.loader.load( 'https://www.mediawiki.org/w/index.php?title=User:Serhio_Magpie/instantDiffs.js&action=raw&ctype=text/javascript' );

// snippet from mezoga 
// Allows for 'resize' to resize past 'max-height' if needed,
// while allowing for 'height: fit-content' coexistence
document.querySelectorAll('.max-height-remover').forEach(e => {
    const maxHeight = getComputedStyle(e).maxHeight;
    if (e.scrollHeight > parseFloat(maxHeight)) {
        e.style.height = maxHeight;
        e.style.maxHeight = 'none';
    }
});

/* content warning */
mw.hook('wikipage.content').add(function () {
	var warning = document.querySelector('.content-warning');

	if (!warning) {
		return;
	}

	document.body.appendChild(warning);

	warning.addEventListener('click', function () {
		warning.classList.add('content-warning-hidden');
	});
});

/* Infobox Carousel & Gallery Conversion Logic */
function resizeMediaWikiThumbnail(url, width) {
	if (!url) return url;

	return url.replace(
		/\/\d+px-([^/]+?)(\.(?:webp|png|jpe?g|gif))?$/,
		function (match, filename, extension) {
			if (
				extension &&
				filename.toLowerCase().endsWith('.webp') &&
				extension.toLowerCase() === '.png'
			) {
				extension = '';
			}

			return '/' + width + 'px-' + filename + (extension || '');
		}
	);
}

mw.hook('wikipage.content').add(function ($content) {
	// 1. Convert native MediaWiki HTML galleries inside infoboxes to Obby Wiki Carousels.
	$content.find('.infobox__image .gallery, .infobox .gallery').each(function () {
		const $gallery = $(this);
		const $boxes = $gallery.find('.gallerybox');

		if ($boxes.length === 0) return;

		// If only 1 item exists in the gallery, display it as a single image container.
		if ($boxes.length === 1) {
			const $box = $boxes.first();
			const $link = $box.find(
				'a.mw-file-description, a.image, .thumb a'
			).first();
			const $img = $box.find('img').first();
			const caption = $box.find('.gallerytext').text().trim();

			const $singleWrapper = $('<div class="infobox__image"></div>');
			const $file = $('<span typeof="mw:File"></span>');

			if ($link.length > 0) {
				$file.append($link.clone());
			} else if ($img.length > 0) {
				$file.append($img.clone());
			}

			if (caption) {
				$file.append(
					$('<div class="infobox__item--alt-content"></div>')
						.text(caption)
				);
			}

			if ($file.children().length > 0) {
				$singleWrapper.append($file);
			}

			$gallery.replaceWith($singleWrapper);
			return;
		}

		// Build Obby Wiki Carousel structure for multi-item galleries.
		const $carousel = $('<div class="infobox__carousel"></div>');
		const $wrapper = $('<div class="infobox__carousel-wrapper"></div>');
		const $track = $('<div class="infobox__carousel-track"></div>');

		$boxes.each(function (index) {
			const $box = $(this);
			const $link = $box.find(
				'a.mw-file-description, a.image, .thumb a'
			).first();
		
			const $img = $box.find('img').first();
			const caption = $box.find('.gallerytext').text().trim();
		
			const $item = $(
				'<div class="infobox__carousel-item" data-index="' +
					index +
					'"></div>'
			);
		
			const $file = $('<span typeof="mw:File"></span>');
		
			if ($link.length > 0 && $img.length > 0) {
				const $newLink = $link.clone();
				const $newImg = $img.clone();
		
				const src = $newImg.attr('src');
				
				if (src) {
					$newImg.attr(
						'src',
						resizeMediaWikiThumbnail(src, 400)
					);
				}
		
				const srcset = $newImg.attr('srcset');
		
				if (srcset) {
					$newImg.attr(
						'srcset',
						srcset.replace(
							/\/\d+px-([^/\s]+)(?=\s|$)/g,
							'/400px-$1'
						)
					);
				}
		
				$newImg.attr('width', '400');
				$newImg.removeAttr('height');
		
				$newLink.find('img').first().replaceWith($newImg);
		
				$file.append($newLink);
			} else if ($img.length > 0) {
				const $newImg = $img.clone();
		
				const src = $newImg.attr('src');
		
				if (src) {
					$newImg.attr(
						'src',
						resizeMediaWikiThumbnail(src, 400)
					);
				}
		
				const srcset = $newImg.attr('srcset');
		
				if (srcset) {
					$newImg.attr(
						'srcset',
						srcset.replace(
							/\/\d+px-([^/\s]+)(?=\s|$)/g,
							'/400px-$1'
						)
					);
				}
		
				$newImg.attr('width', '400');
				$newImg.removeAttr('height');
		
				$file.append($newImg);
			}
		
			if (caption) {
				$file.append(
					$('<div class="infobox__item--alt-content"></div>')
						.text(caption)
				);
			}
		
			$item.append($file);
			$track.append($item);
		});

		$wrapper.append($track);
		$carousel.append($wrapper);

		$gallery.replaceWith($carousel);
	});

	// 2. Initialize all carousels (.infobox__carousel) including Module:InfoboxNeue carousels
	const carousels = $content
		.find('.infobox__carousel')
		.not('.is-initialized');

	carousels.each(function () {
		const $carousel = $(this);

		$carousel.addClass('is-initialized');

		const $track = $carousel.find('.infobox__carousel-track');
		const $items = $carousel.find('.infobox__carousel-item');
		const itemCount = $items.length;

		if (itemCount <= 1) return;

		let currentIndex = 0;
		let lastTransitionTime = 0;
		let autoplayTimer = null;
		const INTERVAL_MS = 4000;
		const MIN_COOLDOWN_MS = 650;

		function stopAutoplay() {
			if (autoplayTimer !== null) {
				clearTimeout(autoplayTimer);
				autoplayTimer = null;
			}
		}

		function startAutoplay() {
			stopAutoplay();

			if (itemCount <= 1) return;

			autoplayTimer = setTimeout(function () {
				nextSlide();
			}, INTERVAL_MS);
		}

		// Previous button
		const $prevBtn = $(
			'<button class="infobox__carousel-btn infobox__carousel-prev" type="button" aria-label="Previous slide">' +
				'\u276E' +
				'</button>'
		);

		// Next button
		const $nextBtn = $(
			'<button class="infobox__carousel-btn infobox__carousel-next" type="button" aria-label="Next slide">' +
				'\u276F' +
				'</button>'
		);

		// Indicators
		const $indicators = $(
			'<div class="infobox__carousel-indicators"></div>'
		);

		for (let i = 0; i < itemCount; i++) {
			const $dot = $(
				'<div class="infobox__carousel-dot" role="button" tabindex="0" aria-label="Slide ' + (i + 1) + '"></div>'
			);

			if (i === 0) {
				$dot.addClass('active');
			}

			$dot.on('click', function (e) {
				e.preventDefault();
				stopAutoplay();
				goToSlide(i);
			});

			$indicators.append($dot);
		}

		$carousel.append(
			$prevBtn,
			$nextBtn,
			$indicators
		);

		function goToSlide(index) {
			const now = Date.now();

			// Guard against rapid-fire switching (cooldown lock)
			if (now - lastTransitionTime < MIN_COOLDOWN_MS) {
				return;
			}
			lastTransitionTime = now;

			currentIndex = index;
			updateCarousel();
			startAutoplay();
		}

		function updateCarousel() {
			const translateX = -(currentIndex * 100);

			$track.css(
				'transform',
				`translateX(${translateX}%)`
			);

			$indicators
				.children()
				.removeClass('active');

			const $activeDot = $indicators.children().eq(currentIndex);
			if ($activeDot.length) {
				void $activeDot[0].offsetWidth; // Reflow to reset animation
				$activeDot.addClass('active');
			}
		}

		function nextSlide() {
			const nextIndex = (currentIndex + 1) % itemCount;
			goToSlide(nextIndex);
		}

		function prevSlide() {
			const prevIndex = (currentIndex - 1 + itemCount) % itemCount;
			goToSlide(prevIndex);
		}

		// Next button
		$nextBtn.on('click', function (e) {
			e.preventDefault();
			stopAutoplay();
			nextSlide();
		});

		// Previous button
		$prevBtn.on('click', function (e) {
			e.preventDefault();
			stopAutoplay();
			prevSlide();
		});

		// Hover pause
		if (window.matchMedia('(hover: hover)').matches) {
			$carousel.on('mouseenter', function () {
				stopAutoplay();
				$indicators.find('.active').css('animation-play-state', 'paused');
			});

			$carousel.on('mouseleave', function () {
				$indicators.find('.active').css('animation-play-state', 'running');
				startAutoplay();
			});
		}

		// Drag/swipe support
		let isDragging = false;
		let startX = 0;

		$track.on('mousedown touchstart', dragStart);
		$track.on('mouseup touchend', dragEnd);
		$track.on('mousemove touchmove', dragAction);
		$track.on('mouseleave', dragEnd);

		function getPositionX(event) {
			if (event.type.includes('mouse')) {
				return event.pageX;
			}

			if (
				event.originalEvent &&
				event.originalEvent.touches &&
				event.originalEvent.touches[0]
			) {
				return event.originalEvent.touches[0].clientX;
			}

			return 0;
		}

		function dragStart(event) {
			isDragging = true;
			startX = getPositionX(event);

			stopAutoplay();

			$carousel.addClass('is-dragging');
			$track.css('transition', 'none');

			$indicators.find('.active').css('animation-play-state', 'paused');
		}

		function dragAction(event) {
			if (!isDragging) return;

			const currentX = getPositionX(event);
			const diff = currentX - startX;

			const trackWidth = $carousel.width();

			if (trackWidth === 0) return;

			const translateOffset = (diff / trackWidth) * 100;
			const currentPercentage = -(currentIndex * 100) + translateOffset;

			$track.css(
				'transform',
				`translateX(${currentPercentage}%)`
			);
		}

		function dragEnd(event) {
			if (!isDragging) return;

			isDragging = false;

			$carousel.removeClass('is-dragging');

			$track.css(
				'transition',
				'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
			);

			let endX = startX;

			if (event.type.includes('mouse')) {
				endX = event.pageX;
			} else if (
				event.originalEvent &&
				event.originalEvent.changedTouches &&
				event.originalEvent.changedTouches[0]
			) {
				endX = event.originalEvent.changedTouches[0].clientX;
			}

			const diff = endX - startX;
			const threshold = 50;

			if (Math.abs(diff) > threshold) {
				if (diff > 0) {
					prevSlide();
				} else {
					nextSlide();
				}
			} else {
				updateCarousel();
				startAutoplay();
			}
		}

		// Initial display & start autoplay
		updateCarousel();
		startAutoplay();
	});
});