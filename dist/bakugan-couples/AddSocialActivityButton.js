/**
 * Script: AddSocialActivityButton
 * Author: Marisa1980
 * Description: Add Social Activity button link to the top navigation and sticky navigation
 * Other: This script can not run on mobile site
**/

$(function () {
	// Do not run for anonymous
	if (!mw.config.get('wgUserName')) {
		return;
	}
	
	// Inline SVG
	var socialActivitySvg = `
		<svg viewBox="0 0 27 27">
			<path d="M10.32,26.06c-.38,0-.77-.15-1.06-.44l-4.15-4.14H1.5c-.83-.01-1.5-.68-1.5-1.51V1.5C0,.65,.72,0,1.56,0c.3,0,4.88,0,6.6,0,.83,0,1.5,.67,1.5,1.5h0c0,.83-.67,1.5-1.5,1.5-1.39,0-4.38,0-5.15-.01v15.48h2.73c.4,0,.78,.17,1.06,.45l3.54,3.54,3.65-3.55c.28-.27,.65-.42,1.04-.42h9.86c.83-.01,1.5,.66,1.5,1.49s-.67,1.5-1.5,1.5H15.64s-4.28,4.16-4.28,4.16c-.29,.28-.67,.42-1.04,.42Z"/>
			<path d="M18.79,17.17s-.05,0-.07,0c-.6-.03-1.13-.41-1.33-.98l-3.85-10.35-2.12,4.98c-.24,.55-.78,.91-1.38,.91h-3.1c-.83-.02-1.5-.69-1.49-1.52,0-.83,.67-1.49,1.5-1.49h2.11S12.24,1.22,12.24,1.22c.24-.56,.83-.95,1.42-.91,.61,.01,1.16,.4,1.37,.98l3.94,10.57,2.04-4.22c.23-.54,.76-.91,1.38-.91h2.49c.83,0,1.5,.67,1.5,1.5s-.67,1.5-1.5,1.5h-1.54l-3.19,6.6c-.25,.52-.78,.85-1.35,.85Z"/>
		</svg>
	`;
	
	// Accesskey and Title attribute
	var accessHotkey = 'f';
	var stickyTitle = 'Social Activity [alt-shift-' + accessHotkey + ']';
	var mainTitle = 'Social Activity';
	
	// Create Social Activity button and accesskey
	function createSocialActivityButton(isSticky, saUrl) {
		var $btn = $('<a>', {
			href: saUrl,
			accesskey: accessHotkey,
			class: isSticky
				? 'wds-button wds-is-text social-activity-sticky'
				: 'wds-button wds-is-secondary',
			'data-tracking-label': 'social-activity'
		}).append($(socialActivitySvg).clone().addClass('wds-icon wds-icon-small'));
		
		$btn.attr('title', isSticky ? stickyTitle : mainTitle);
		
		return $btn;
	}
	
	// Create dropdown menu item
	function createSocialActivityDropdownItem(saUrl) {
		return $('<li>', { class: 'wiki-tool-in-dropdown' }).append(
			$('<a>', {
				href: saUrl,
				accesskey: accessHotkey,
				'data-tracking-label': 'social-activity'
			}).append($(socialActivitySvg).clone().addClass('wds-icon wds-icon-tiny')).append(' Social Activity')
		);
	}
	
	// Return the RecentChanges anchor
	function findRecentChangesAnchor($container) {
		if (!$container || !$container.length) return $();
		return $container.find('a[data-tracking="recent-changes"], a[data-tracking-label="recent-changes"], a[accesskey="r"]').first();
	}
	
	// Build SocialActivity URL
	function buildSaUrlFromRc(rcHref) {
		var specialNs = mw.config.get('wgFormattedNamespaces')[-1] || 'Special';
		var base = mw.util.getUrl(specialNs + ':SocialActivity');
		if (!rcHref) return base;
		var url = new URL(rcHref, location.origin);
		return base + url.search + url.hash;
	}
	
	// Insert into main navigation
	var $mainTools = $('.wiki-tools.wds-button-group');
	if ($mainTools.length) {
		var $rcMain = findRecentChangesAnchor($mainTools);
		if ($rcMain.length && !$mainTools.find('[data-tracking-label="social-activity"]').length) {
			var saUrlMain = buildSaUrlFromRc($rcMain.attr('href'));
			$rcMain.closest('a').after(createSocialActivityButton(false, saUrlMain));
			
			var $rcMainDropdownAnchor = $mainTools.find('.wds-dropdown .wds-list').find('a[data-tracking="recent-changes"], a[data-tracking-label="recent-changes"]').first();
			if ($rcMainDropdownAnchor.length) {
				$rcMainDropdownAnchor.closest('li').after(createSocialActivityDropdownItem(saUrlMain));
			} else {
				var $mainDropdownList = $mainTools.find('.wds-dropdown .wds-list');
				if ($mainDropdownList.length) {
					$mainDropdownList.append(createSocialActivityDropdownItem(saUrlMain));
				}
			}
		}
	}
	
	// Insert into sticky navigation
	var $stickyTools = $('.wiki-tools').not('.wds-button-group');
	if ($stickyTools.length) {
		var $rcSticky = findRecentChangesAnchor($stickyTools);
		if ($rcSticky.length && !$stickyTools.find('[data-tracking-label="social-activity"]').length) {
			var saUrlSticky = buildSaUrlFromRc($rcSticky.attr('href'));
			$rcSticky.closest('a').after(createSocialActivityButton(true, saUrlSticky));

			var $rcStickyDropdownAnchor = $stickyTools.find('.wds-dropdown .wds-list').find('a[data-tracking="recent-changes"], a[data-tracking-label="recent-changes"]').first();
			if ($rcStickyDropdownAnchor.length) {
				$rcStickyDropdownAnchor.closest('li').after(createSocialActivityDropdownItem(saUrlSticky));
			} else {
				var $stickyDropdownList = $stickyTools.find('.wds-dropdown .wds-list');
				if ($stickyDropdownList.length) {
					$stickyDropdownList.append(createSocialActivityDropdownItem(saUrlSticky));
				}
			}
		}
	}
	
	// CSS which only targets sticky navigation, avoid display icon in small screen width
	mw.util.addCSS(`
		.social-activity-sticky {
			display: none !important;
		}
		
		@media (min-width: 1023px) {
			.social-activity-sticky {
				display: inline-flex !important;
			}
		}
	`);
});