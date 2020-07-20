/* The code on this page is for the extra side-rail module containing the question tracker announcement and the random question generator. */


// @author: UltimateSupreme (http://dev.wikia.com/wiki/User:UltimateSupreme)
// Has since been edited by Imamadmad
(function ($, mw) {
	"use strict";
	var str = '<section class="WikiaActivityModule module" id="WikiaRandomPages">' +
                        '<div id="mosbox" style="margin-top:0px; align:center"><img src="https://images.wikia.nocookie.net/__cb20140712142620/imamadmad/images/a/af/Question_mark.png" width="50px" style="float:left;"><div class="mosbox-heading">Keep Track of Your Questions</div><br />See what questions you"ve asked and if they"ve been answered yet! Just check out <a href="/wiki/Special:MyPage">your userpage</a> to see how they"re going.  <br /><br /><span style="font-size:13px;">Note: you must be logged in to track your questions. <a href="/wiki/Special:SignUp">Sign up</a> for an account now to get the most out of your DWA experience!</span><br /><div style="font-size:10px; text-align:right;"><a href="/wiki/Help:Question_tracker">Don"t see the tracker?</a></div></div>' + 
			'<h1 class="random-heading" style="margin-bottom:0;">Read More</h1>' +  '<p style="font-size:13px;">Explore random questions from other users:</p>' +
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