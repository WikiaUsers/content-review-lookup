/*
 * @title           SoundcloudPlayer.js
 * @version         1.1.2
 * @description     Add support for soundcloud players
 * @author          Himmalerin
 * @license         CC-BY-SA-3.0
 */
(function () {
	// Build the iframe
	const scPlayer = function (data) {
		const widget = document.createElement('iframe');

		widget.classList.add('soundcloud-player');

		widget.src =
			'https://w.soundcloud.com/player/?show_artwork=false&url=' +
			encodeURI(data.src);

		// If data-color is set add the value to the iframe
		if (data.color) widget.src += '&color=' + encodeURIComponent(data.color);
		// If data-width/height are set add that value to the iframe
		if (data.width) widget.width = data.width;
		if (data.height) widget.height = data.height;

		return widget;
	};

	const scParseTags = function ($content) {
		// Get all instances of the soundcloud class
		const scTags = $content.find('.soundcloud');

		// For each instance of the soundcloud class run scPlayer
		for (var i = 0; i < scTags.length; i++) {
			scTags[i].replaceWith(scPlayer(scTags[i].dataset));
		}
	};

	mw.hook('wikipage.content').add(function ($content) {
		scParseTags($content);
	});
})();