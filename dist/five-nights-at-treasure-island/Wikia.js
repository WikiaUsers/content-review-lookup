/********************* Five Nights at Treasure Island JS ********************/
/* Before use any code of this wiki and of this or any other MediaWiki Page */
/*  You should have the permission of Tobias Alcaraz. Your wiki should have */
/*   At least 10 pages. Remember to put the link of the wiki when you're    */
/*                        saging the Administrator.                         */
/********************************************************* Thanks! **********/

/* Custom community message bubble 
var WikiaNotificationMessage = "<a href='/wiki/Thread:31225'>We got 100 FB Likes and we made a event to you! See more.</a>";
var WikiaNotificationexpiry = 7;
importScriptPage('WikiaNotification/code.js', 'dev');
*/

/** Social Media icons
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default",
	wikiTwitterAccount: "default"
};
importScriptPage('SocialIcons/code.js','dev');
**/

// Inactividad
InactiveUsers = { 
	months: 2,
        text: 'inactive'};
importScriptPage('InactiveUsers/code.js', 'dev');

// Tag
 
$(function addMastheadTags() {
  if ($('#UserProfileMasthead')) {
    var rights = {};
// Burócratas
    rights["GMstudio"]  = ["Diamante"];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
      $('.UserProfileMasthead .masthead-info span.tag').remove();
        for( var i=0, len=rights[user].length; i < len; i++) {
          $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
  }
});
 
$(".image-resize").each(function() {
	var a = $(this).children(".image-resize-new").text().split("_")
		img = $(this).find("img");
	if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
		img.attr({
			width: a[0],
			height: a[1]
		});
	}
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js',
        'u:dev:DisableBotMessageWalls/code.js'
    ]
});
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // GROUP 2
 
 rights["Cutupuss"] = ["Founder"];
  rights["Tobias Alcaraz"] = ["Bureaucrat","Administrator", "Coder", "Event Maker"];
  rights["ClockworkSpirit2343"] = ["Administrator", "Bureaucrat"];
  rights["Gerardluis23"] = ["Rollback"];
  rights["Amir999990"] = ["Chat Moderator"];
  rights["Dragonspiller"] = ["Chat Moderator","Moderator"];
  rights["Simplenoise8"] = ["Moderator"];
  rights["Freddy Fazwolf7"] = ["Moderator"];
  rights["Avatar Light"] = ["Administrator"];
  rights["Gametime8889"] = ["Moderator"];
  rights["AnArt1996 Matthew Phoenix Rodriguez"] = ["Game Developer", "Voice Actor"];
  rights["ChanceyPants"] = ["Voice Actor"];
  rights["KeebBot"] = ["Wiki bot"];
  rights["BlackAntoITA"] = ["Administrator"];
 if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

// Disable votes when a thread is closed.
$(function() {
    if ($(".deleteorremove-infobox").is('*')) {
        $('input[name="wpVote"]').attr('disabled','disabled')
                                 .attr('value','Votación finalizada');
    }
});

// Button to check the page with Monobook skin (w:c:es.clubpenguin)
 
$(function() {
 $('.wikinav2 .WikiaPageHeader > .comments').before('&nbsp; <a class="wikia-menu-button primary" href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook">View in Monobook</a>');
 });
$(function() {
 $('.wikinav2 .WikiaPageHeader > .comments').before('&nbsp; &nbsp;<a class="wikia-menu-button primary" href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook&action=edit">Edit in Monobook</a>');
 });

// ************************************************************************
// ************************* NEW IMAGES MODULE ****************************
// * This script will be temporaly used, when we get informed that the... *
// *** original module gets back, the script will be automatly removed. ***
// ********* The script was taken from: dev.wikia.com/Thread:6226 *********
// ************************************************************************
/*
//var NewFilesModuleCompact = 1; //optional compact mode
if ($('#WikiaRail').length) { //only on pages where the rail is present
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
    if ($('.ChatModule').length && !$("#NewFilesModule").length) { // Only add it ''once''
      if (typeof $temp == "undefined") { // Only load it ''once''
        $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
        $temp.load("/Special:NewFiles/13" + " #gallery-", function () {
          $('.ChatModule').after("<section id='NewFilesModule' class='module'><h1><a href='/Special:NewFiles'>New Files</a><a class='wikia-button' href='/Special:Upload'>Upload</a></h1>");
          if (typeof NewFilesModuleCompact != "undefined" && NewFilesModuleCompact) {
            $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
            $("#NewFilesModule").addClass("compact");
          }
          $("#NewFilesModule").append($('#gallery-', $temp));
          $("#NewFilesModule .wikia-photogallery-add").remove();
          delete $temp; //delete it, in case the rail is wiped after this point.
        });
      }
    }
  });  //end of DOMNodeInserted block
  $('head').append('<style type="text/css">\n#gallery- { height:452px; overflow-y:auto; clear: both; text-align:center; padding-bottom: 5em;}\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; border:none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display: block; }\n#NewFilesModule.compact .wikia-gallery-item:hover .lightbox-caption { display: none; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; }\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');
}
*/
// ********************************
// END of Images module (temporal)
// ********************************