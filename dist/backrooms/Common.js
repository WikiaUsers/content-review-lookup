// [[Category:Internal]]

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function() {
	$("span.import-css").each(function() {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css")
			.attr("data-css-hash", $(this).attr("data-css-hash"))
			.attr("data-from", $(this).attr("data-from"))
			.attr("data-wait", $(this).attr("data-wait"))
			.attr("data-portal", $(this).attr("data-portal"));
		
		var wait = $(this).attr("data-wait");
		var portal = $(this).attr("data-portal");
		
		if (wait != "none") {
			css.disabled = true;
			var timer = setTimeout(() => css.disabled = false, wait);
		}
		
		if (portal != "none") {
			css.disabled = true;
			$(".t-css-portal-" + portal).click(function() {
				css.disabled = !css.disabled;
				var portal = "opened";
			});
		}
		
		$(".theme-toggler").click(function() {
			switch (true) {
				case wait != "none":
					timer || css.disabled == false ? (clearTimeout(timer), timer = '', css.disabled = true) : css.disabled = false;
					break;
				case portal != "none":
					if (portal == "opened") css.disabled = !css.disabled;
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

// Credits to https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Common.js
$('.fandom-community-header__community-name-wrapper').append(
	$('<a/>').addClass('compass-wiki-badge').attr('href', '//community.fandom.com/wiki/Fandom_Compass').append(
		$('<img/>').css('height', '60px').css('position', 'relative').css('top', '10px')
		.attr('src', 'https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a2/FandomCompass-Banner-Light.png/revision/latest/scale-to-width-down/100?cb=20230720221916').attr('title', 'This wiki is part of Fandom Compass')
));