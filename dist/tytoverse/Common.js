/* Any JavaScript here will be loaded for all users on every page load. */
// [[Category:Internal]]

mw.hook('wikipage.content').add(function() {
	
	// Automatically preview CSS pages; uses T:CSS class to also be affected by ThemeToggler
	if (mw.config.get('wgPageName').includes('.css')) { 
		fetch(`/wiki/${mw.config.get('wgPageName')}?action=raw`)
			.then(data => data.text())
			.then(css => $(mw.util.addCSS(css).ownerNode).addClass('t-css'));
	}
	
	// [[Template:Audio]] toggle
	$('.t-audio').each(function() {
		const toggle = this.dataset.toggle;
		const toggleFunction = this.dataset.toggleFunction;
		const fadeTime = toggleFunction.replace(/fade-(in|out)-/, '');
		
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
						const fadeIn = setInterval(() => {
							audio.volume += 0.004 / fadeTime;
							if (audio.volume == 1) clearInterval(fadeIn);
						}, 4);
						break;
					case toggleFunction.includes('fade-out'):
						audio.play();
						const fadeOut = setInterval(() => {
							audio.volume -= 0.004 / fadeTime;
							if (audio.volume == 0) clearInterval(fadeOut);
						}, 4);
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
		bot: { link: 'Help:Bots', order: -1 },
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