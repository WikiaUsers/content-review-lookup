/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================================== //
// Change navigation text ("NEXZ Wiki") based on defined root and wiki color mode //
// ============================================================================== //

(function() {
		function getHeaderNames() {
				const style = getComputedStyle(document.documentElement);
				return {
						light: style.getPropertyValue('--theme-wiki-header-light').trim().replace(/^"|"$/g, '') || 'NEXZ Wiki', // Root: [[MediaWiki:Themes.css#L-21]]
						dark: style.getPropertyValue('--theme-wiki-header-dark').trim().replace(/^"|"$/g, '') || 'NEXZ Wiki' // Root: [[MediaWiki:Themes.css#L-22]]
				};
		}

	function updateHeaderName() {
			const headerElement = document.querySelector('.fandom-community-header__community-name');
			if (!headerElement) return;
			const headerNames = getHeaderNames();
			const isDarkMode = document.body.classList.contains('theme-fandomdesktop-dark');
			headerElement.textContent = isDarkMode ? headerNames.dark : headerNames.light;
	}

	function observeThemeChanges() {
			const observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
							if (mutation.attributeName === 'class') {
									updateHeaderName();
							}
					});
			});
			observer.observe(document.body, { attributes: true });
	}

		if (document.readyState === 'loading') {
				document.addEventListener('DOMContentLoaded', function() {
						updateHeaderName();
						observeThemeChanges();
				});
		} else {
				updateHeaderName();
				observeThemeChanges();
		}
})();