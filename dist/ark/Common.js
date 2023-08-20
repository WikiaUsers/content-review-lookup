/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function($content) {
	// Load our other scripts conditionally
	var articles = [];
	[
		// RegionMapStyles
		[ '#regionMapStyles', 'u:ark:MediaWiki:RegionMapStyles.js' ],
		// Colorblind
		[ '#colorblind', 'u:ark:MediaWiki:Colorblind.js' ],
		// KillXP
		[ '#creatureKillXP', 'u:ark:MediaWiki:Killxp.js' ],
		// CloningCost
		[ '#creature-select', 'u:ark:MediaWiki:CloningCost.js' ],
		// ARKCode
		[ '#ARKCode', 'u:ark:MediaWiki:ARKCode.js' ],
		// Cooking calculator
		[ '#cookingCalc', 'u:ark:MediaWiki:Cooking calculator.js' ],
		// Wild creature stats calculator
		[ '.wildstatscalc, #wildStatCalc', 'u:ark:MediaWiki:WildCreatureStats.js' ],
		// Kill XP calculator
		[ '.killxpcalc', 'u:ark:MediaWiki:Killxp.js' ],
		// Experimental cloning calculator
		[ '.cloningcalc', 'u:ark:MediaWiki:CloningCalculator.js' ],
		// Common Data page fetch function if a spawn map or an interactive region map are present.
		// Separate request for cache efficiency (load once, not every time for a combination).
		[ '.data-map-container[data-spawn-data-page-name], .interactive-regionmap', 'u:ark:MediaWiki:DataFetch.js' ],
		// Interactive region map
		[ '.interactive-regionmap', 'u:ark:MediaWiki:RegionMaps.js' ],
		// Data map scripts
		[ '.data-map-container', 'u:ark:MediaWiki:ResourceMaps.js' ],
		[ '.data-map-container', 'u:ark:MediaWiki:SpawnMaps.js' ],
		// Grid filtering
		[ '#creature-grid', 'u:ark:MediaWiki:GridFiltering.js' ]
	].forEach(function (req) {
		if ($content.find(req[0]).length > 0) articles.push(req[1]);
	});
	// Official server rates module in the right desktop rail
	articles.push('u:dev:MediaWiki:AddRailModule/code.js');
	importArticles({ type: 'script', articles: articles });

	// Redirect to language version if url contains querystring iwredirect (for Dododex)
	var match = location.search.match(/iwredirect=([^;&]*)/);
	if (match && match[1]) {
		var $langlink = $content.find('.interlanguage-link-target[hreflang="' + encodeURIComponent(match[1]) + '"]');
		if ($langlink && $langlink[0] && $langlink[0].href) {
			window.location.replace($langlink[0].href);
		}
	}

	// Helper function for copy to clipboard - selects text
	function selectElementText(element) {
		var range, selection;    
		if (document.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
		} else if (window.getSelection) {
			selection = window.getSelection();        
			range = document.createRange();
			range.selectNodeContents(element);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}

	window.CopyClipboardI18n = window.CopyClipboardI18n || {
		title: 'Copy to Clipboard',
		success: 'Successfully copied to Clipboard.',
		error: 'Copy to Clipboard failed. Please do it yourself.'
	};

	// Copy to clipboard
	$content.find('.copy-clipboard').each(function (index, ele) {
		var i18n = window.CopyClipboardI18n;
		var $this = $(ele);
		var $button = $('<button title="' + i18n.title + '">&#xf0ea;</button>');
		$this.append($button);
		$button.click(function () {
			var $content = $this.find('.copy-content');
			$content.children().remove();
			selectElementText($content[0]);
		
			try {
				if (!document.execCommand('copy'))
					throw 42;
				mw.notify(i18n.success);
			} catch (err) {
				mw.notify(i18n.error, {type:'error'});
			}
		});
	});

	/**
	 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
	 *
	 * This is so people have a chance to look at the image and click on pages they want to view.
	 */
	$content.on('mouseenter mouseleave', '.animated-container, .mcui', function (e) {
		$(e.target).find('.animated').toggleClass('animated-paused', e.type === 'mouseenter');
	});

	/* [[Template:Interactive Regionmap]] */
	(function() {
		var ele = $content.find('#interactiveMap')[0];
		if (!ele) return;
		if (!ele.dataset.svg) return;
		ele.style.position = 'relative';
		ele.style.width = '600px';
		ele.style.height = '600px';
		ele.style.textAlign = 'left';
	
		var img = ele.getElementsByTagName('img')[0];
		img.style.position = 'absolute';
		img.style.width = '600px';
		img.style.height = '600px';
	
		fetch('https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/' + ele.dataset.svg + '/revision/latest').then(function(a) {
			return a.text();
		}).then(function(b) {
			var ele2 = document.createElement('svg');
			ele.append(ele2);
			ele2.outerHTML = b;
		});
	})();
});