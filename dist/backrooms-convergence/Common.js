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

// interwiki template 
// Credits to https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Common.js
	$('.page-header__languages .wds-dropdown__toggle ').append('<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>');

// Left Global Naigation Bar adjustments
$(function() {
	window.sisterwikiLinks = [
        {
            "url": "http://backrooms-pantheon.wikidot.com/", //sister site
            "text": "Backrooms Pantheon" 
        }
    ];
    
    window.sisterwikiLinks = window.sisterwikiLinks || [];
    var navContainer = document.querySelector(".global-navigation__links .wds-is-linked");
    sisterwikiLinks.forEach(function(link) {
        var li = document.createElement('li'),
            a = document.createElement('a');
        a.href = link.url;
        a.className = 'customwikilink';
        a.textContent = link.text;
        a.title = 'sister wiki';
        li.appendChild(a);
        navContainer.appendChild(li);
    });
});
// Security