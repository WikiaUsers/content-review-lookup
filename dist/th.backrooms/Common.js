// [[Category:Internal]]

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true }; // no edits for 90 days and/or no edits at all = inactive
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

// Fade-in
var fadeinclass = document.getElementsByClassName("fadeintext");
    for(var i = 0; i < fadeinclass.length; i++) {
        var sec = (i/4).toString();
        fadeinclass[i].style.animation = "fadeInAnimation ease 1.5s";
        fadeinclass[i].style.animationDelay = sec.concat("s");
        fadeinclass[i].style.animationIterationCount = "1";
        fadeinclass[i].style.animationFillMode = "forwards";
}

// Credits to https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Common.js

$('.fandom-community-header__community-name-wrapper').append(
	$('<a/>').attr('href', '//community.fandom.com/wiki/Fandom_Compass').append(
		$('<img/>').addClass('hover-community-header-wrapper').css('height', '60px').css('position', 'relative').css('top', '10px')
		.attr('src', 'https://static.wikia.nocookie.net/speedstorm/images/a/a2/FandomCompass-Banner-Light.png/revision/latest/scale-to-width-down/100?cb=20230404145009').attr('title', 'This wiki is part of Fandom Compass')
));