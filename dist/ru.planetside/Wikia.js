/* Change label on the "Create blog post" button on the main page */

$(".mainpage-news .WikiaBlogListingBox .wikia-button").html('<img width="0" height="0" class="sprite blog" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"> Create news');

/* End change label on the "Create blog post" button on the main page */

/* Add "Create loadout" option to Contribute menu */

$('.contribute .WikiaMenuElement').prepend('<li><a class="createloadout" data-id="createloadout" href="/wiki/Special:CreatePage?preload=Template:Loadout/preload&editintro=Template:Loadout/editintro&useeditor=mediawiki">Create loadout</a></li>');

/* End add "Create loadout" option to Contribute menu */

/* Edit intro for loadout pages */

// ============================================================
// EDIT-INTRO for Loadout pages
//
// This script is modified from English Wikipedia 
// Source: http://en.wikipedia.org/wiki/User:RockMFR/disambigeditintro.js
// Taken from: http://runescape.wikia.com/wiki/MediaWiki:Common.js/exchangeintro.js
// Function: Adds EditIntro to all Loadout pages 
//           when "edit this page" link is clicked
// ============================================================
 
$(function() {
	if (wgCanonicalNamespace == 'Loadout') {   
		$editLinks = $('a#ca-edit,#ca-edit a,#WikiaPageHeader .wikia-menu-button > li > a');
		$editLinks.attr('href', $editLinks.attr('href') + '&editintro=Template:Loadout/editintro');
	}
});

/* End edit intro for loadout pages */

/* Add loadout options to create page modal */

$(document).ready(function () {
    if(window.location.href.indexOf("preload=Template:Loadout/preload&editintro=Template:Loadout/editintro&useeditor=mediawiki") > -1 && wgPageName == "Special:CreatePage") {

var editField = $('textarea[name="wpTextbox1"]');

//Hide pagename field
$('.fields label:last-child').css('display', 'none');

//Add fields
$('.modalWrapper .fields').prepend('<label>Character level<input type="number" data-required="1" value="" name="loadoutLevel"></label>');
$('.modalWrapper .fields').prepend('<label>Empire<br /><select name="loadoutEmpire"><option value="Terran Republic">Terran Republic</option><option value="New Conglomerate">New Conglomerate</option><option value="Vanu Sovereignty">Vanu Sovereignty</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Class<br /><select name="loadoutClass"><option value="Light Assault">Light Assault</option><option value="Heavy Assault">Heavy Assault</option><option value="Combat Medic">Combat Medic</option><option value="Engineer">Engineer</option><option value="Infiltrator">Infiltrator</option><option value="MAX">MAX</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Loadout name<input type="text" data-required="1" value="" name="loadoutName"></label>');

//Name
$('.modalWrapper input[name="loadoutName"]').keyup(function() {
var loadoutName = $('.modalWrapper input[name="loadoutName"]').val();
var loadoutClass = $('.modalWrapper select[name="loadoutClass"]').val();
var nameRegex = /\|Name.*=.*/;

$('.modalWrapper input[name="wpTitle"]').attr('value','Loadout:' + loadoutName + ':' + loadoutClass);
editField.val( editField.val().replace(nameRegex,'|Name 				= ' + loadoutName) );
});

//Class
$('.modalWrapper select[name="loadoutClass"]').on('change click keyup', function() {
var loadoutName = $('.modalWrapper input[name="loadoutName"]').val();
var loadoutClass = $('.modalWrapper select[name="loadoutClass"]').val();
var classRegex = /\|Class.*=.*/;

$('.modalWrapper input[name="wpTitle"]').attr('value','Loadout:' + loadoutName + ':' + loadoutClass);
editField.val( editField.val().replace(classRegex,'|Class 				= ' + loadoutClass) );
});

//Empire
$('.modalWrapper select[name="loadoutEmpire"]').on('change click keyup', function() {
var loadoutEmpire = $('.modalWrapper select[name="loadoutEmpire"]').val();
var empireRegex = /\|Empire.*=.*/;

editField.val( editField.val().replace(empireRegex,'|Empire 			= ' + loadoutEmpire) );
});

//Level
$('.modalWrapper input[name="loadoutLevel"]').keyup(function() {
var loadoutLevel = $('.modalWrapper input[name="loadoutLevel"]').val();
var levelRegex = /\|Level.*=.*/;

editField.val( editField.val().replace(levelRegex,'|Level 				= ' + loadoutLevel) );
});

}
});
 
/* End add loadout options to create page modal */