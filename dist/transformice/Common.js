/*
Any JavaScript here will be loaded for all users on every page load.
See MediaWiki:Wikia.js for scripts that only affect the oasis skin.
See also: MediaWiki:Chat.js
*/
 
/* Table of Contents
-----------------------
 * (A00) Custom Scripts
 * * (A01) topicons
 * (X00) importArticle pre-script actions
 * * (X01) Less
 * * (X02) LastEdited
 * (Y00) importArticles
 * (Z00) Chinese New Year 2016 Nickname generator
 * (Z01) Nickname Avatar Retreival
*/

//##############################################################
/* ==Custom Scripts== (A00)*/
// The code in this section is for a script imported below. Moves ".topicons" outside #mw-content-text to get around alignment / cropping issues. Requires additional common.css to position.
 
//###########################################
/* ===topicons=== (A01) */
// Taken from / inspired by RS wiki. 
$(document).ready(function(){
	var toprighticons = $('.topright-icon');
	if(toprighticons.length) {
		var iconsCont = $('<div>', { id: 'tfm-header-icons' })
		if($('#PageHeader').length) {
            iconsCont.css({ right: ($('#PageHeader').width()-$('#WikiaArticle').width())+"px" });
            $('#PageHeader').append(iconsCont);
		} else {
            $('#firstHeading').append(iconsCont);
            $('#firstHeading').css({ position:"relative" });
            iconsCont.css({ bottom:"0" });
		}
		

		toprighticons.each(function() {
			iconsCont.append($(this));
		});
	}
});
 
//##############################################################
/* ==importArticle pre-script actions== (X00)*/
// The code in this section is for a script imported below
 
//###########################################
/* ===Less=== (X01) */

window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Common.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Custom-common.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [ 'MediaWiki:Common.css', 'MediaWiki:Custom-common.less' ],
    // target page header
    header: 'MediaWiki:Custom-css-header/common'
} );
window.lessOpts.push( {
    target: 'MediaWiki:Handheld.css',
    source: 'MediaWiki:Custom-handheld.less',
    load: [ 'MediaWiki:Handheld.css', 'MediaWiki:Custom-handheld.less' ],
    header: 'MediaWiki:Custom-css-header/handheld'
} );
 
//###########################################
/* ===LastEdited=== (X02) */
 
window.lastEdited = {
	avatar: true,
	size: false,
	diff: true,
	comment: true,
	time: false
};
 
//##############################################################
/* ==importArticles== (Y00)*/
// Imports scripts from other pages/wikis.
 
importArticles({
	type: 'script',
	articles: [
		'u:dev:Less/code.2.js',
		'MediaWiki:Common.js/cellTemplate.js',
		'u:dev:MediaWiki:LastEdited/code.js',
		'u:dev:MediaWiki:WallGreetingButton/code.js',
	]
});

//##############################################################
/* ==Chinese New Year 2016 Nickname generator== (Z00) */
// Nickname generator to the enigma of the Chinese New Year 2016
$("span.asciipseudo").replaceWith('<input type="text" id="asciipseudo"/> <div id="asciiresult">');
 
$("#asciipseudo").on("change keyup paste", function(){
    str = $("#asciipseudo").val().toLowerCase();
    newstr = "";
    for (var i = 0, len = str.length; i < len; i++) {
      newstr += String.fromCharCode((str[i].charCodeAt(0) + 2));
    }
    $("#asciiresult").html(newstr);
});

//##############################################################
/* ==Nickname Avatar Retreival== (Z01) */
// Get official avatar for a nickname
$(".atelier801-nickname").each(function(i, o){
    var userid = $(this).data("userid");
    $("<span/>", { style:"white-space:nowrap;" }).prependTo($(this)).prepend($("<img/>", {
		//src: "//projects.fewfre.com/a801/tools/api/avatar.php?nickname="+$(this).data("nickname")+"%23"+$(this).data("id"),
		src: "//projects.fewfre.com/a801/tools/api/avatar_proxyonly.php?id="+userid,
		width: 21,
		height: 21
	})
	.on("load", function(){ $(this).after($(document.createTextNode("\u00a0"))) })
	.on("error", function(){ $(this).remove(); }));
});