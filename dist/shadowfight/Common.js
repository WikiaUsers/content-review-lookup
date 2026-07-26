/* Any JavaScript here will be loaded for all users on every page load. */
window.rwaOptions = 100;
window.rwaOptions.namespaces = [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ];
window.rwaOptions.autoInit = true;

document.addEventListener('click', function (event) {
	var link = event.target.closest('.audio-button.custom-theme a');

	if (!link) {
		return;
	}

	event.preventDefault();
	event.stopPropagation();

	var button = link.closest('.audio-button.custom-theme');
	var audioUrl = link.href;

	if (!audioUrl || !button) {
		return;
	}

	/* Stop currently playing audio if this same button is clicked again */
	if (button.audioPlayer) {
		button.audioPlayer.pause();
		button.audioPlayer.currentTime = 0;
		button.audioPlayer = null;
		button.classList.remove('now-playing');
		return;
	}

	/* Stop other audio buttons first */
	document.querySelectorAll('.audio-button.custom-theme').forEach(function (otherButton) {
		if (otherButton.audioPlayer) {
			otherButton.audioPlayer.pause();
			otherButton.audioPlayer.currentTime = 0;
			otherButton.audioPlayer = null;
			otherButton.classList.remove('now-playing');
		}
	});

	var audio = new Audio(audioUrl);
	button.audioPlayer = audio;
	button.classList.add('now-playing');

	audio.play().catch(function () {
		button.classList.remove('now-playing');
		button.audioPlayer = null;
	});

	audio.addEventListener('ended', function () {
		button.classList.remove('now-playing');
		button.audioPlayer = null;
	});

	audio.addEventListener('pause', function () {
		button.classList.remove('now-playing');
	});
}, true);

$(function () {
  function openTabFromHash() {
    var hash = decodeURIComponent(window.location.hash);
    if (!hash.startsWith('#tab-')) return;

    var target = hash.replace('#tab-', '').replace(/_/g, ' ').toLowerCase();

    $('.wds-tabs__tab-label').each(function () {
      var label = $(this).text().trim().toLowerCase();

      if (label === target) {
        $(this).closest('.wds-tabs__tab').trigger('click');
      }
    });
  }

  openTabFromHash();
  $(window).on('hashchange', openTabFromHash);
});

/* Shadow Fight social-media dropdowns */
(function ($, mw) {
	'use strict';

	function closeSocialDropdowns(exceptDropdown) {
		$('.sf-social-dropdown.is-open').each(function () {
			var $dropdown = $(this);

			if (
				exceptDropdown &&
				$dropdown.is(exceptDropdown)
			) {
				return;
			}

			$dropdown
				.removeClass('is-open')
				.find('.sf-social-trigger')
				.attr('aria-expanded', 'false');
		});
	}

	function initializeSocialDropdowns() {
		/*
		 * Delegated events continue working even when Fandom or MediaWiki
		 * reloads part of the page.
		 */
		$(document)
			.off('click.sfSocialDropdown')
			.on(
				'click.sfSocialDropdown',
				'.sf-social-trigger',
				function (event) {
					event.preventDefault();
					event.stopPropagation();

					var $trigger = $(this);
					var $dropdown = $trigger.closest(
						'.sf-social-dropdown'
					);
					var shouldOpen = !$dropdown.hasClass(
						'is-open'
					);

					closeSocialDropdowns($dropdown);

					$dropdown.toggleClass(
						'is-open',
						shouldOpen
					);

					$trigger.attr(
						'aria-expanded',
						shouldOpen ? 'true' : 'false'
					);
				}
			);

		$(document)
			.off('click.sfSocialDropdownOutside')
			.on(
				'click.sfSocialDropdownOutside',
				function (event) {
					if (
						!$(event.target).closest(
							'.sf-social-dropdown'
						).length
					) {
						closeSocialDropdowns();
					}
				}
			);

		$(document)
			.off('keydown.sfSocialDropdown')
			.on(
				'keydown.sfSocialDropdown',
				'.sf-social-trigger',
				function (event) {
					if (
						event.key !== 'Enter' &&
						event.key !== ' '
					) {
						return;
					}

					event.preventDefault();
					$(this).trigger('click');
				}
			);

		$(document)
			.off('keydown.sfSocialDropdownEscape')
			.on(
				'keydown.sfSocialDropdownEscape',
				function (event) {
					if (event.key !== 'Escape') {
						return;
					}

					var $openTrigger = $(
						'.sf-social-dropdown.is-open ' +
						'.sf-social-trigger'
					).first();

					closeSocialDropdowns();

					if ($openTrigger.length) {
						$openTrigger.trigger('focus');
					}
				}
			);
	}

	$(initializeSocialDropdowns);

	if (mw && mw.hook) {
		mw.hook('wikipage.content').add(
			initializeSocialDropdowns
		);
	}
}(jQuery, mediaWiki));