// [[Category:Internal]]

// Template dependencies
mw.hook('wikipage.content').add(function() {
	
	// [[Module:CSS]]; [[T:CSS]]
	$('span.import-css').each(function() {
		const css = mw.util.addCSS($(this).attr('data-css'));
		$(css.ownerNode).addClass('import-css')
			.attr('data-css-hash', $(this).attr('data-css-hash'))
			.attr('data-from', $(this).attr('data-from'))
			.attr('data-wait', $(this).attr('data-wait'))
			.attr('data-portal', $(this).attr('data-portal'));
		
		const wait = $(this).attr('data-wait');
		const portal = $(this).attr('data-portal');
		
		if (wait != 'none') {
			css.disabled = true;
			var timer = setTimeout(() => css.disabled = false, wait);
		}
		
		if (portal != 'none') {
			css.disabled = true;
			$('.t-css-portal-' + portal).click(() => css.disabled = !css.disabled);
		}
	});
	
	// [[Template:Audio]] toggle
	$('.t-audio').each(function() {
		const toggle = $(this).attr('data-toggle');
		const toggleFunction = $(this).attr('data-toggle-function');
		const fadeSteps = Math.round(250 * toggleFunction.replace(/fade-(in|out)-/, ''));
		
		if (toggle != 'none') {
			$('.t-audio-toggle-' + toggle).click(function() {
				const audio = $(`.t-audio-toggle-${toggle} audio`)[0];
				switch (true) {
					case toggleFunction.includes('time'):
						audio.currentTime = toggleFunction.replace('time-', '');
						audio.play();
						break;
					case toggleFunction.includes('fade-in'):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								audio.volume = ((-i + fadeSteps) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					case toggleFunction.includes('fade-out'):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								audio.volume = ((i) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					default:
						audio.paused ? audio.play() : audio.pause();
						break;
				}
			});
		}
	});
});



// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 },
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;