/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.min.js'});
	type: 'script',
	articles: [
		"w:c:dev:Countdown/code.js"
		'w:c:dev:SignatureCheck/code.js',
	]
});

// Adds DisplayClock
importScript('MediaWiki:Common.js/displayClock.js');
// END Adds DisplayClock

window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: 'Looks like there are some problems with your edits\n',
	noForumheader: 'There is no forum header on this forum page. You should not create forum pages without the header since they will not actually show up in the forum list\n',
	noSignature: 'It looks like you forgot to sign your reply. Use <nowiki>~~~~</nowiki> to sign before publishing.\n',
 
	// Other stuff
	forumheader: 'Forumheader', // The name of the Forumheader template, can be set to an empty string or false to disable
	checkSignature: true // Enable the signature check function

// Adding links to On the Wiki tab
// Modified to add links to the end of the tab instead of the beginning by Sactage
// Please note that he in no way endorses this code and is not liable for any issues which may arise from its use, legal or otherwise
// Per http://mycool64testing.wikia.com/wiki/Message_Wall:MyCool64
$(function() {
    if ( skin == 'oasis' ) {
        $('.WikiHeaderRestyle nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/MyCool64_Testing_Wiki:About">About this Wiki</a></li><li><a class="subnav-2a" href="/wiki/MyCool64_Testing_Wiki_Policies">Disclaimer</a></li>');
    },
});

/* Tabber tweaks */
 
.tabberlive .tabbertab h2,
.tabberlive .tabbertab h3 { display: block !important; }
 
ul.tabbernav li a:link { color: #FFFFFF !important; }
 
ul.tabbernav li a:hover {
 color: #FFFFFF !important;
 background: #808080 !important;
 border-color: #000000 !important;
 text-shadow: 0em 0em 0.5em #000000!important;
}
 
ul.tabbernav li.tabberactive a { background-color: #C0C0C0 !important; }
 
ul.tabbernav li a {
    background: #000000 !important;
    color: #FFFFFF !important;
    border: 1px solid #333333 !important;
    margin-left: 0px !important;
    margin-right: 3px;
    -moz-border-radius:1em;
    -khtml-border-radius: 1em;
    -webkit-border-radius:1em;
    border-radius: 1em;
    text-shadow: 0em 0em 0.5em #000000!important;
}
 
.tabberlive .tabbertab { border: none !important; }
 
ul.tabbernav { border-bottom: none !important; }
 
.tabberlive .editsection { display: none; }
 
/* End Tabber Tweaks */

/* Countdown Template Manager*/

$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});