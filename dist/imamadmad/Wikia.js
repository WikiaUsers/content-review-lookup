
// Question mark to end of rephrase box
$('#wpNewTitleMain').after('<span style="font-size:17px;"> ?</span>');

//Extra nav menus
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

//Social Media
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color"
};
importScriptPage('SocialIcons/code.js','dev');

/* Add extra classes based on category
 * @author: UltimateSupreme (http://c.wikia.com/wiki/User:UltimateSupreme)
 */
(function ($, mw) {
    function categorycheck() {
        if ($(this).text() === "Dreamworld levels") {
            $(".wikia-infobox").addClass("dreamworld");
            mw.log("Category found!");
            return;
        }
    }
    if (mw.config.get("skin") === "oasis") {
        $("li.category > span.name > a").each(categorycheck);
    } else {
        $(".mw-normal-catlinks a").each(categorycheck);
    }
}(jQuery, mediaWiki));


//Site notice code originally stolen from tardis.wikia.com and then modified by me, Imamadmad.
$('#WikiaPageHeader').before('<div style="width:97%; border-style:solid; border-width:3px; border-radius:15px; border-color:#AAAEAF; background-color:#111723; padding:10px; color:#3586C7; text-align:center; font-family:Georgia; font-size:1.1em; margin-bottom:5px;">Hello everybody!  Welcome to my test wiki!  Please be aware that this is a playground for me, Imamadmad, and that you probably shouldn\'t change anything here unless you are either me or I have given you permission.  Thanks!</div>');


// Random Page Generator
// @author: UltimateSupreme (http://dev.wikia.com/wiki/User:UltimateSupreme)
// Has since been edited by Imamadmad
(function ($, mw) {
	"use strict";
	var str = '<section class="WikiaActivityModule module" id="WikiaRandomPages">' +
                        '<div id="mosbox" style="margin-top:0px; align:center"><img src="https://images.wikia.nocookie.net/__cb20140712142620/imamadmad/images/a/af/Question_mark.png" width="50px" style="float:left;"><div class="mosbox-heading">Keep Track of Your Questions</div><br />See what questions you\'ve asked and if they\'ve been answered yet! Just check out <a href="/wiki/Special:MyPage">your userpage</a> to see how they\'re going.  <br /><br /><span style="font-size:13px;">Note: you must be logged in to track your questions. <a href="/wiki/Special:SignUp">Sign up</a> for an account now to get the most out of your DWA experience!</span><br /><div style="font-size:10px; text-align:right;"><a href="/wiki/Help:Question_tracker">Don\'t see the tracker?</a></div></div>' + 
			'<h2 class="random-heading" style="margin-bottom:0;">Read More</h2>' +  '<p style="font-size:13px;">Explore random questions from other users:</p>' +
			'<ul style="list-style-type:disc; list-style-position:inside;">';
 
	function getRandom () {
		new mw.Api().get({
			action : "query",
			list : "random",
			rnnamespace: "0",
			rnlimit: "4"
		})
		.done(function (data) {
			var q = data.query.random;
			q.forEach(function (v) {
				str += "<li style='padding:3px 3px 3px 15px; font-size:15px;'><a href = '/wiki/" + v.title + "'>" + v.title + "</a></li>";
			});
			str += "</ul>";
		});                      
	}
 
	function addRandom () {
		$("#WikiaRecentActivity").before(str);
	}
 
	function init() {
		getRandom();
		if (window.MutationObserver) {
			var observer = new MutationObserver(function() {
				addRandom();
				this.disconnect();
			}),
			target = document.querySelector('#WikiaRail'),
			config = { attributes: true, childList: true, characterData: true };
			observer.observe(target, config);
		} else $(window).load(addRandom);
	}
	init();
}(jQuery, mediaWiki));