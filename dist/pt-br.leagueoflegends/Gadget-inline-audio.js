/**
 * Inline audio player.
 * Works similarly to https://github.com/NilsEnevoldsen/AudioButton, but without an extension dependency.
 * 
 * How to use:
 * ==========
 * Use <span class="inline-audio" data-vol="0.70">[[File:Filename.mp3]]</span>
 * 
 * @author [[User:Jayden]]
 * @see [[Template:Sm2]]
 */
 
$(function () {
	var containers = $('.inline-audio');
	if (!containers.length) {
		// If there are no inline-audio containers, don't bother with the rest.
		return;
	}
	
	// Create a custom context menu element for the inline audio.
	var $menu = $('<div>').attr('id', 'inline-audio-menu')
		.append(
			$('<a>')
				.attr('id', 'inline-audio-download')
				.text('Download audio')
				.attr('download', '')
		)
		.hide();
	$('body').append($menu);
	
	const buttonOnClick = (btn) => {
		const $audio = $(btn).prev();
		if ($audio[0].paused || $audio[0].ended) {
			$audio[0].play();
		} else {
			$audio[0].pause();
		}
	};
	
	const setupContainer = (c) => {
		const $btn = $('<button>').prop('title', 'Play').text('▶️');
		const $mwAudio = $(c).find('audio');
		const srcUrl = $mwAudio.children('source').eq(0).attr('src');
		
		$btn.on('click', function () {
			/*
				Only start manipulating the audio element when the user
				interacts for the first time, to prevent browser freezes.
			*/
			if (!c.classList.contains('inline-audio-ready')) {
				const $audio = $mwAudio.clone();
				$audio.css('display', 'none');
				
				// Configure the audio element if parameters are passed in
				const volume = $(c).data('vol');
				if (volume) {
					$audio[0].volume = parseFloat(volume) || 1.0;
				}
				
				// Add event handlers
				$audio.on('play pause ended', function () {
					const $c = $(this).parent();
					const $btn = $(this).next();
					if (this.paused || this.ended) {
						$c.data('state', 'paused');
						$btn.prop('title', 'Play').text('▶️');
					} else {
						$c.data('state', 'playing');
						$btn.prop('title', 'Pause').text('⏸️');
					}
				});
				
				$btn.on('dblclick', function () {
					// Stop the audio, and reload playback from 0
					$(this).prev()[0].load();
				});
				
				$(c).addClass('inline-audio-ready').prepend($audio);
			}
			
			buttonOnClick(this);
		});
		
		$btn.on('contextmenu', function (e) {
			e.preventDefault();
			$('#inline-audio-download').attr('href', srcUrl);
			
			$menu.css({
				'left': e.pageX + 'px',
				'top': (e.pageY - 30) + 'px',
			}).show();
		});
		
		$(c).empty().append($btn);
	};
	
	// For each inline-audio container, set them up.
	containers.each((ix, c) => {
		setupContainer(c);
	});
	
	$(document).on('click', function () {
		// Close the custom menu if it is open
		$menu.hide();
	});
});