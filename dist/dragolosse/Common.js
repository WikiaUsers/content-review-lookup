/* Code that makes twitter work with the siderail */
mw.loader.load('ext.fandom.TwitterTag.js');

mw.loader.using('mw.Api', function() {
    //Requesting the Required Information
    var params = {
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:Spoiler Images',
            cmprop: 'title',
            cmtype: 'file',
            cmlimit: 'max',
            format: 'json'
        },
        api = new mw.Api();

    api.get(params).done(function(data) {
        //Creating Spoiler Images Array
        var listPages = data.query.categorymembers,
            listPage,
            spoilerImages = [];
        for (listPage in listPages) {
            spoilerImages.push(listPages[listPage].title);
        }

        //Blurring the Spoiler Images
        var images = document.querySelectorAll('#mw-content-text img'),
            imageFullName,
            i;
        for (i = 0; i < images.length; i++) {
            imageFullName = 'File:' + images[i].dataset.imageName;
            if (spoilerImages.includes(imageFullName)) {
                images[i].classList.add('spoilerImage');
                images[i].closest('figure.thumb,.wikia-gallery-item .thumb,.wikia-slideshow-image, figure.pi-image')
                    .classList.add('spoilerImageText');
                images[i].addEventListener('click', function(e) {
                    e.target.classList.remove('spoilerImage');
                    e.target.closest('.spoilerImageText').classList.remove('spoilerImageText');
                });
            }
        }

        /*
        Adjustment for Special:NewFiles:
        1). Making Auto-Refresh Option Unchecked by Default to Prevent Spoiler Images from Showing Up
        2). Adding Warning How Checking the Option will Show Up the Spoilers
        */
        document.querySelector('.rootpage-Special_NewFiles #ajaxRefresh #ajaxToggle')
            .removeAttribute('checked');
        document.querySelector('.rootpage-Special_NewFiles #ajaxRefresh #ajaxToggleText')
            .title += '. Warning: Having this option checked will cause spoiler images to show up.';
    });
});

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

// UserTags thingamajigs
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

// fade-in
var fadeinclass = document.getElementsByClassName("fadeintext");
    for(var i = 0; i < fadeinclass.length; i++) {
        var sec = (i/4).toString();
        fadeinclass[i].style.animation = "fadeInAnimation ease 1.5s";
        fadeinclass[i].style.animationDelay = sec.concat("s");
        fadeinclass[i].style.animationIterationCount = "1";
        fadeinclass[i].style.animationFillMode = "forwards";
}