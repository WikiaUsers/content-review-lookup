/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {}
    };
    UserTagsJS.modules.inactive = 30;
    UserTagsJS.modules.newuser = true;
    UserTagsJS.modules.autoconfirmed = true;
 
    UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
    UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
        rollback: ['sysop', 'bureaucrat'],
        bot: ['sysop', 'bureaucrat'],
        bot-global: ['sysop', 'bureaucrat']
    };

jQuery(function($) {
    "use strict";
    var mw = window.mediaWiki || { config: { get: function(p) { return window[p]; } } };
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'WikiActivity') return;
    var pagelist = ["Legendary Wars Wiki"]; // <-- Put pages in this list
    $("#wikiactivity-main a.title").each(function() {
         var i, l = pagelist.length, $this = $(this), t = $this.text();
         for (i = 0 ; i < l ; ++i) if (t === pagelist[i]) $this.closest('li').css('display', 'none');
    });
});
/* Script Import */
/********************************************************************************/
importArticles({
    type: "script",
    articles: [
        "external:dev:RevealAnonIP/code.js",
        "external:dev:Countdown/code.js",
        "external:dev:FixWantedFiles/code.js",
        "external:dev:EditIntroButton/code.js",
        "MediaWiki:Common.js/BackToTopButton.js",
        "external:dev:UserBadges/code.js",
        "MediaWiki:DynamicFunctions.js"
    ]
});

SpoilerAlert = {
    question: 'Would You like to enter page?',
    yes: 'Yes Please!',
    no: 'No, thank you.',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

// http://clash-of-clans-future-ideas.wikia.com/wiki/
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

function sillyFounder(){
var d=document.getElementsByClassName('tag')[0];
var f=document.getElementsByClassName('masthead-info')[0].getElementsByTagName('hgroup')[0];
var e=f.getElementsByTagName('h1')[0].innerHTML;
var sp=document.createElement('span');
sp.setAttribute('class','tag');
if(d.innerHTML=='Admin'){
d.innerHTML='Admin';
f.appendChild(sp);
}else if(e=='Pokemaster360'){
d.innerHTML='Admin';
sp.innerHTML='Inactive';
f.appendChild(sp);
}
}
addOnloadHook(sillyFounder);