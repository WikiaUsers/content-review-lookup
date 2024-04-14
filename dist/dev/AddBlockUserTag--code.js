/**
 * @name         AddBlockUserTag
 * @version      v1.5
 * @author       TheGoldenPatrik1
 * @description  Adds a button to the user profile masthead to block that user.
 */
(function () {
	if (
		!/sysop|staff|global-discussions-moderator|wiki-specialist|soap/.test(mw.config.get('wgUserGroups').join()) ||
		!mw.config.get('profileUserName') ||
		window.AddBlockUserTagLoaded
	) {
		return;
	}
	window.AddBlockUserTagLoaded = true;
	/**
	 * @method findContainer
	 * @description Finds the tag container to append the button to
	 * @returns {$.Deferred} Promise to be resolved when the container is found
	 */
	function findContainer() {
		var promise = $.Deferred(),
			interval = setInterval(function() {
				var $element = $('#userProfileApp .user-identity-header__actions');
				if ($element.length) {
					clearInterval(interval);
					promise.resolve($element);
				}
			}, 300);
		return promise;
	}
	/**
	 * @method button
	 * @description Creates the button
	 * @param {String} text - The button text
	 * @returns {void}
	 */
	function button (text, $container) {
		var username = mw.config.get('profileUserName');
		$container.append(
			$('<a>', {
				'class': 'wds-button user-identity-header__button',
				'href':
					mw.util.getUrl(
						'Special:Block/' + username
					),
				'text': text
			})
		);
	}
	/**
	 * @method init
	 * @description Loads Fetch
	 * @param {Function} fetch - Variable for Fetch
	 * @returns {void}
	 */
	function init (fetch) {
		$.when(fetch('block'), findContainer())
			.then(button);
	}
	mw.hook('dev.fetch').add(init);
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:Fetch.js'
	});
})();