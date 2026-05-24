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