function hideRail() {
	var rail = document.querySelector('.page__right-rail')
	rail.style.transition = 'none' // Remove Show/Hide animation
	rail.classList.add('is-rail-hidden') // Hide by default for anonymous users
	setTimeout(function() {
		// Enable Show/Hide animation
		rail.style.transition = null
	}, 300)
}

function init() {
	// if (!mw.user.isAnon()) return
	
	var rightrailvisible = mw.user.options.values.rightrailvisible
	if (!rightrailvisible || rightrailvisible === 'hidden') {
		hideRail()
	}

	
	if (!mw.user.isAnon()) return
	
	// Patch visual bug when hiding the side rail as an anonymous user
	document.querySelectorAll('.render-new-wiki-recommendations').forEach(function(e) {
		e.style.width = 'unset'
	})
	
	// Make side rail Show/Hide toggle button for anonymous users
	var button = $('<button class="right-rail-toggle" data-wds-tooltip="Hide" data-wds-tooltip-position="bottom" aria-label="Expand" data-tooltip-attached="1"><svg class="wds-icon wds-icon-tiny"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg></button>')
	$('.page__right-rail').prepend(button)
	mw.loader.moduleRegistry['skin.fandomdesktop.rail.toggle.js'].script($, jQuery, undefined, {})
}

$(init)