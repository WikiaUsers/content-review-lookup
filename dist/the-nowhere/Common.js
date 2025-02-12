/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Discord.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Google Forms.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js',
    ]
});

/*** Discussion Templates Config (From https://overlook-rp.fandom.com/wiki/MediaWiki:Common.js) ***/
window.DiscussionTemplates = {
    templates: {
        'block-message': {
            name: 'Template:Moderation/Block Message',
            title: 'Block Notice'
          }
        },
    allowedGroups: ['sysop']
};

/*** Back To Top Button Config ***/
window.BackToTopModern = true;
window.BackToTopStart = 200;

/*** Tooltips Customization ***/
window.tooltips_config = {
    noCSS: true,
}

/*** User Account Age tag ***/
window.customUserAccountAge = {
  showFullDate: true
};

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

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
	$('.page-header__languages .wds-dropdown__toggle ').append('<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>');

// Credits to https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Common.js