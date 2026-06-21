// [[Category:Internal]]

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function() {
		const css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css")
			.attr("data-css-hash", $(this).attr("data-css-hash"))
			.attr("data-from", $(this).attr("data-from"))
			.attr("data-wait", $(this).attr("data-wait"))
			.attr("data-portal", $(this).attr("data-portal"));
		
		const wait = $(this).attr("data-wait");
		const portal = $(this).attr("data-portal");
		var portalOpened = false;
		
		if (wait != "none") {
			css.disabled = true;
			var timer = setTimeout(() => css.disabled = false, wait);
		}
		
		if (portal != "none") {
			css.disabled = true;
			$(".t-css-portal-" + portal).click(function() {
				css.disabled = !css.disabled;
				portalOpened = true;
			});
		}
		
		$(".theme-toggler").click(function() {
			switch (true) {
				case wait != "none":
					if (timer || css.disabled == false) {
						clearTimeout(timer);
						timer = false;
						css.disabled = true;
					} else css.disabled = false;
					break;
				case portal != "none":
					if (portalOpened) css.disabled = !css.disabled;
					break;
				default:
					css.disabled = !css.disabled;
					break;
			}
		});
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

//badge leaderboard url fix
const leaderboard = "?safemode=1";
$('.data-details.ranking a').attr("href", "/wiki/Special:Leaderboard" + leaderboard);

// Fix odd browser behavior when clicking the discussion link on the community navigation
if (window.location.pathname === '/wiki/F' && !window.location.search.includes('redirect=no'))
{
	document.querySelector('.page__main').textContent = '';
	window.location.pathname = '/f';
}

$(':is(.editableelement>pre, .editableelement:not(.mw-highlight:has(pre)))').each(function() {$(this).attr('contenteditable', 'true');});

(() => {
	if (mw.config.get('wgPageName') !== 'MediaWiki:Wikia-moderation') return;
	$.get('/api.php?action=parse&page=MediaWiki:Custom-wikia-moderation&format=json', data => {
		$('.noarticletext.mw-content-ltr').text('');
		$('#mw-content-text').append(data.parse.text['*']);
		$('body').append(`
		<style>
		@import "/load.php?mode=articles&articles=u:dev:MediaWiki:Nord.css&only=styles";
		</style>
		`);
	});
})();

// Toggle parameter for [[Template:Audio]]
$(".t-audio").each(function() {
	'use strict';
	const toggleAudio = $(this).attr("data-toggle");
	if (toggleAudio !== "none") {
		$(".t-audio-toggle-" + toggleAudio).click(function () {
			const audio = $(`[data-toggle="${toggleAudio}"]>audio`)[0];
			audio.paused ? audio.play() : audio.pause();
		});
	}
});