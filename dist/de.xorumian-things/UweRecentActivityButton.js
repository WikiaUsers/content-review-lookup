/* This JavaScript replaces the standard rail-module activity-icon with one that links to "Special:RecentChanges" */
setTimeout(() => {
	document.querySelectorAll('.rail-module.recent-wiki-activity h2').forEach(h2 => {
		h2.innerHTML = h2.innerHTML.replace(`<svg class="wds-icon wds-icon-small wds-activity-icon"><use xlink:href="#wds-icons-activity-small"></use></svg>`, 
			`<a href="${mw.util.getUrl("Special:RecentChanges")}" title="Special:RecentChanges">
				<svg class="wds-icon wds-icon-small wds-activity-icon">
					<use xlink:href="#wds-icons-activity-small"></use>
				</svg>
			</a>`
		);
	});
}, 3000);