 * @name        alternateAvatar.js
 * @description Convert the default user avatars to a themed version.
 * @version     1.0.0
 * @author      Himmalerin
 * @license     CC-BY-SA-3.0
 */
$(function () {
	const alternateAvatar = {
		oldAvatar:
			'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg',

		newAvatar:
			'https://vignette.wikia.nocookie.net/wingsoffirefanon-testing/images/b/bc/ForumAvatar-anon.svg',

		ns: mw.config.get('wgNamespaceNumber'),

		/**
		 * Convert the default user avatars
		 */
		convertAvatars: function convertAvatars() {
			const imgAvatars = document.querySelectorAll('img.wds-avatar__image');
			const svgAvatars = document.querySelectorAll('svg.wds-avatar__image');

			// Convert <img> avatars
			for (var i = 0; i < imgAvatars.length; i++) {
				// Source for the current image
				const currentAvatar = imgAvatars[i].getAttribute('src');

				// If the url of the current avatar matches the url of `this.oldAvatar` convert it
				if (currentAvatar === this.oldAvatar) {
					imgAvatars[i].setAttribute('src', this.newAvatar);
					imgAvatars[i].setAttribute(
						'style',
						'background-color: var(--themed-page-background)'
					);
				}
			}

			// Convert <svg> avatars
			for (var i = 0; i < svgAvatars.length; i++) {
				svgAvatars[i].outerHTML =
					'<img src="https://vignette.wikia.nocookie.net/wingsoffirefanon-testing/images/b/bc/ForumAvatar-anon.svg" alt="User avatar" title="User avatar" class="wds-avatar__image" style="background-color: var(--themed-page-background)">';
			}
		},

		/**
		 * Watch the comment section
		 */
		comments: function comments() {
			// Find the comment section
			const commentSection = document.getElementById('articleComments');

			// Create a mutation observer to watch for changes
			const commentObserver = new MutationObserver(this.convertAvatars);
			commentObserver.observe(commentSection, {
				childList: true,
				attributes: true,
				subtree: true,
			});
		},

		/**
		 * Watch the Message Wall
		 */
		messageWalls: function messageWalls() {
			// Find the message wall
			const messageWall = document.getElementById('MessageWall');

			// Create a mutation observer to watch for changes
			const messageWallObserver = new MutationObserver(this.convertAvatars);
			messageWallObserver.observe(messageWall, {
				childList: true,
				attributes: true,
				subtree: true,
			});
		},

		/**
		 * Convert all existing avatars and then watch for new avatars
		 */
		init: function init() {
			this.convertAvatars();

			switch (this.ns) {
				case 0:
					this.comments();
					break;
				case 500:
					this.comments();
					break;
				case 1200:
					this.messageWalls();
					break;
			}
		},
	};

	alternateAvatar.init();
});