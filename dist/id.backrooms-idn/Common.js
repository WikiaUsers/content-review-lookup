// [[Kategori:Intern]]

mw.hook('wikipage.content').add(function() {
	
	// [[Templat:CSS]]
	$('div.t-css').each(function() {
		const css = mw.util.addCSS(this.dataset.css);
		$(css.ownerNode).addClass('t-css');
		Object.assign(css.ownerNode.dataset, this.dataset);
		delete css.ownerNode.dataset.css;
		
		const wait = this.dataset.wait;
		const portal = this.dataset.portal;
		
		if (wait != 'none') {
			css.disabled = true;
			var timer = setTimeout(() => css.disabled = false, wait);
		}
		
		if (portal != 'none') {
			css.disabled = true;
			$('.t-css-portal-' + portal).click(() => css.disabled = !css.disabled);
		}
	});
	
	// Automatically preview CSS pages; uses T:CSS class to also be affected by ThemeToggler
	if (mw.config.get('wgPageName').includes('.css')) { 
		fetch(`/wiki/${mw.config.get('wgPageName')}?action=raw`)
			.then(data => data.text())
			.then(css => $(mw.util.addCSS(css).ownerNode).addClass('t-css'));
	}
	
	// [[Templat:Audio]] toggle
	$('.t-audio').each(function() {
		const toggle = this.dataset.toggle;
		const toggleFunction = this.dataset['toggle-function'];
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