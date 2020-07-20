/* Change label on the "Create blog post" button on the main page */
 
$(".mainpage-news .WikiaBlogListingBox .wikia-button").html('<img width="0" height="0" class="sprite blog" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"> Create news');
 
/* End change label on the "Create blog post" button on the main page */

/* Add class to bottom of poll texts */
$('.mainpage-box-poll .total').parent().addClass('pollText');
/* End add class to bottom of poll texts */

/* Social media buttons */

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');

/* End social media buttons */
 
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
 
//Add fields
$('.modalWrapper .fields').prepend('<label>Certification #5<br /><input type="text" name="loadoutCertification5" value="" name="loadoutCertification5"><span class="loadout-characters">You have <input readonly type="text" class="loadout-characters-box" name="loadoutCert5Characters" size="3" value="27"> characters left.</span><br /><select name="loadoutCertification5-1"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> of <select name="loadoutCertification5-2"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Certification #4<br /><input type="text" name="loadoutCertification4" value="" name="loadoutCertification4"><span class="loadout-characters">You have <input readonly type="text" class="loadout-characters-box" name="loadoutCert4Characters" size="3" value="27"> characters left.</span><br /><select name="loadoutCertification4-1"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> of <select name="loadoutCertification4-2"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Certification #3<br /><input type="text" name="loadoutCertification3" value="" name="loadoutCertification3"><span class="loadout-characters">You have <input readonly type="text" class="loadout-characters-box" name="loadoutCert3Characters" size="3" value="27"> characters left.</span><br /><select name="loadoutCertification3-1"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> of <select name="loadoutCertification3-2"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Certification #2<br /><input type="text" name="loadoutCertification2" value="" name="loadoutCertification2"><span class="loadout-characters">You have <input readonly type="text" class="loadout-characters-box" name="loadoutCert2Characters" size="3" value="27"> characters left.</span><br /><select name="loadoutCertification2-1"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> of <select name="loadoutCertification2-2"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Certification #1<br /><input type="text" name="loadoutCertification1" value="" name="loadoutCertification1"> <span class="loadout-characters">You have <input readonly type="text" class="loadout-characters-box" name="loadoutCert1Characters" size="3" value="27"> characters left.</span><br /><select name="loadoutCertification1-1"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> of <select name="loadoutCertification1-2"><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Melee<br /><select name="loadoutMelee"><option></option><option value="Chainblade">Chainblade</option><option value="Ripper">Ripper</option><option value="Auraxium Chainblade">Auraxium Chainblade</option><option value="Hexedge">Hexedge</option><option value="Mag-Cutter">Mag-Cutter</option><option value="Carver">Carver</option><option value="Auraxium Mag-Cutter">Auraxium Mag-Cutter</option><option value="Hardlight Dagger">Hardlight Dagger</option><option value="Force-Blade">Force-Blade</option><option value="Lumine Edge">Lumine Edge</option><option value="Auraxium Force-Blade">Auraxium Force-Blade</option><option value="Damascus Edge">Damascus Edge</option><option value="NS AutoBlade">NS AutoBlade</option><option value="MAX Punch">MAX Punch</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Implant<br /><select name="loadoutImplant"><option></option><option value="Enhanced Targeting">Enhanced Targeting</option><option value="Awareness">Awareness</option><option value="Battle Hardened">Battle Hardened</option><option value="Battle Hardened 2">Battle Hardened 2</option><option value="Battle Hardened 3">Battle Hardened 3</option><option value="Battle Hardened 4">Battle Hardened 4</option><option value="Clear Vision 1">Clear Vision 1</option><option value="Clear Vision 2">Clear Vision 2</option><option value="Clear Vision 3">Clear Vision 3</option><option value="Clear Vision 4">Clear Vision 4</option><option value="Counter-Intelligence">Counter-Intelligence</option><option value="EMP Shield 1">EMP Shield 1</option><option value="EMP Shield 2">EMP Shield 2</option><option value="EMP Shield 3">EMP Shield 3</option><option value="EMP Shield 4">EMP Shield 4</option><option value="EOD HUD 1">EOD HUD 1</option><option value="EOD HUD 2">EOD HUD 2</option><option value="EOD HUD 3">EOD HUD 3</option><option value="EOD HUD 4">EOD HUD 4</option><option value="Hold Breath 1">Hold Breath 1</option><option value="Hold Breath 2">Hold Breath 2</option><option value="Hold Breath 3">Hold Breath 3</option><option value="Hold Breath 4">Hold Breath 4</option><option value="Marker">Marker</option><option value="Rangefinder">Rangefinder</option><option value="Regeneration 1">Regeneration 1</option>Regeneration 1<option value="Regeneration 2">Regeneration 2</option><option value="Regeneration 3">Regeneration 3</option><option value="Regeneration 4">Regeneration 4</option><option value="Safe Landing 1">Safe Landing 1</option><option value="Safe Landing 2">Safe Landing 2</option><option value="Safe Landing 3">Safe Landing 3</option><option value="Safe Landing 4">Safe Landing 4</option><option value="Sensor Shield 3">Sensor Shield 3</option><option value="Sensor Shield 4">Sensor Shield 4</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Utility<br /><select name="loadoutUtility"><option></option><option value="Ammunition Package">Ammunition Package</option><option value="C-4">C-4</option><option value="C-4 ARX">C-4 ARX</option><option value="Medical Kit">Medical Kit</option><option value="Restoration Kit">Restoration Kit</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Suit<br /><select name="loadoutSuit"><option></option><option value="Advanced Shield Capacitor">Advanced Shield Capacitor</option><option value="Adrenaline Pump">Adrenaline Pump</option><option value="Ammunition Belt">Ammunition Belt</option><option value="Flak Armor">Flak Armor</option><option value="Grenade Bandolier">Grenade Bandolier</option><option value="Nanoweave Armor">Nanoweave Armor</option><option value="Utility Pouch">Utility Pouch</option><option value="Munitions Pouch">Munitions Pouch</option><option value="MAX Flak Armor">MAX Flak Armor</option><option value="Kinetic Armor">Kinetic Armor</option><option value="MAX Nanite Auto Repair System">Nanite Auto Repair System</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Grenade<br /><select name="loadoutGrenade"><option></option><option value="Anti-Vehicle Grenade">Anti-Vehicle Grenade</option><option value="Concussion Grenade">Concussion Grenade</option><option value="EMP Grenade">EMP Grenade</option><option value="Nanite Healing Grenade">Nanite Healing Grenade</option><option value="Nanite Revive Grenade">Nanite Revive Grenade</option><option value="Flash Grenade">Flash Grenade</option><option value="Frag Grenade">Frag Grenade</option><option value="Smoke Grenade">Smoke Grenade</option><option value="Sticky Grenade">Sticky Grenade</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Ability<br /><select name="loadoutAbility"><option></option><option value="Hunter Cloaking Device">Hunter Cloaking Device</option><option value="Nano-Armor Cloaking">Nano-Armor Cloaking</option><option value="Stalker Cloak">Stalker Cloak</option><option value="Jump Jets">Jump Jets</option><option value="Icarus Jump Jets">Icarus Jump Jets</option><option value="Drifter jump jets">Drifter jump jets</option><option value="Nano-Regen Device">Nano-Regen Device</option><option value="Regeneration Field">Regeneration Field</option><option value="Anti-Infantry MANA Turret">Anti-Infantry MANA Turret</option><option value="Anti-Vehicle MANA Turret">Anti-Vehicle MANA Turret</option><option value="Spitfire Auto-Turret">Spitfire Auto-Turret</option><option value="Nanite Mesh Generator">Nanite Mesh Generator</option><option value="Adrenaline Shield">Adrenaline Shield</option><option value="Resist Shield">Resist Shield</option><option value="Ammo Storage Container">Ammo Storage Container</option><option value="Charge">Charge</option><option value="Lockdown">Lockdown</option><option value="Aegis Shield">Aegis Shield</option><option value="Zealot Overdrive">Zealot Overdrive</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Tool<br /><select name="loadoutTool"><option></option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Secondary weapon<br /><select name="loadoutSecondaryWeapon"><option></option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Primary weapon<br /><select name="loadoutPrimaryWeapon"><option></option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Primary weapon type<br /><select name="loadoutPrimaryWeaponType"><option value=""></option><option value="Assault Rifles">Assault Rifles</option><option value="Carbines">Carbines</option><option value="Light Machine Guns">Light Machine Guns</option><option value="Sniper Rifles">Sniper Rifles</option><option value="Specialized Heavy Assault Weaponry">Specialized Heavy Assault Weaponry</option><option value="Scout Rifles">Scout Rifles</option><option value="Rocket Launchers">Rocket Launchers</option><option value="Battle Rifles">Battle Rifles</option><option value="Shotguns">Shotguns</option><option value="Submachine Guns">Submachine Guns</option><option value="MAX Anti-Infantry">MAX Anti-Infantry</option><option value="MAX Anti-Vehicle">MAX Anti-Vehicle</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Character level<input type="number" value="" name="loadoutLevel"></label>');
$('.modalWrapper .fields').prepend('<label>Class<br /><select name="loadoutClass"><option value=""></option><option value="Infiltrator">Infiltrator</option><option value="Light Assault">Light Assault</option><option value="Combat Medic">Combat Medic</option><option value="Engineer">Engineer</option><option value="Heavy Assault">Heavy Assault</option><option value="MAX">MAX</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Empire<br /><select name="loadoutEmpire"><option value=""></option><option value="Terran Republic">Terran Republic</option><option value="New Conglomerate">New Conglomerate</option><option value="Vanu Sovereignty">Vanu Sovereignty</option></select></label><br />');
$('.modalWrapper .fields').prepend('<label>Loadout name<input type="text" value="" name="loadoutName"></label><span class="loadout-characters">You have <input readonly type="text" class="loadout-characters-box" name="loadoutNameCharacters" size="3" value="47"> characters left.</span><br />');
 
//Hide pagename field
$('.fields label:last-child').css('display', 'none');
 
//Name
$('.modalWrapper input[name="loadoutName"]').keyup(function() {
var loadoutName = $('.modalWrapper input[name="loadoutName"]').val();
var loadoutClass = $('.modalWrapper select[name="loadoutClass"]').val();
var nameRegex = /\|Name.*=.*/;

var loadoutNameLength = this.value.length;
if (loadoutNameLength > 47) {
this.value = this.value.substring(0, 47);
}
else {
$('.modalWrapper input[name="wpTitle"]').attr('value','Loadout:' + loadoutName + ':' + loadoutClass);
editField.val( editField.val().replace(nameRegex,'|Name 				= ' + loadoutName) );
}
$('input[name="loadoutNameCharacters"]').val(47 - loadoutNameLength);
});
 
//Class
$('.modalWrapper select[name="loadoutClass"]').on('change click keyup', function() {
var loadoutName = $('.modalWrapper input[name="loadoutName"]').val();
var loadoutClass = $('.modalWrapper select[name="loadoutClass"]').val();
var classRegex = /\|Class.*=.*/;
 
$('.modalWrapper input[name="wpTitle"]').attr('value','Loadout:' + loadoutName + ':' + loadoutClass);
editField.val( editField.val().replace(classRegex,'|Class 				= ' + loadoutClass) );
 
//Tool type
if(loadoutClass == "Infiltrator") {
var loadoutToolSelect = '<option></option><option value="Recon Detect Device">Recon Detect Device</option><option value="Motion Spotter">Motion Spotter</option>';
$('select[name="loadoutTool"]').html(loadoutToolSelect);
}
else if(loadoutClass == "Combat Medic") {
var loadoutToolSelect = '<option value=""></option><option value="Medical Applicator">Medical Applicator</option></select>';
$('select[name="loadoutTool"]').html(loadoutToolSelect);
}
else if(loadoutClass == "Engineer") {
var loadoutToolSelect = '<option value=""></option><option value="Nano-Armor Kit">Nano-Armor Kit</option>';
$('select[name="loadoutTool"]').html(loadoutToolSelect);
}
});
 
//Empire
$('.modalWrapper select[name="loadoutEmpire"]').on('change click keyup', function() {
var loadoutEmpire = $('.modalWrapper select[name="loadoutEmpire"]').val();
var empireRegex = /\|Empire.*=.*/;
 
$('.modalWrapper select[name="loadoutPrimaryWeaponType"]').val("");
$('select[name="loadoutPrimaryWeapon"]').html('<option></option>');
 
editField.val( editField.val().replace(empireRegex,'|Empire 			= ' + loadoutEmpire) );
 
//Secondary weapon type
if(loadoutEmpire == "Terran Republic") {
var loadoutSecondarySelect = '<option></option><option value="TX1 Repeater">TX1 Repeater</option><option value="TX2 Emperor">TX2 Emperor</option><option value="TS2 Inquisitor">TS2 Inquisitor</option><option value="The President">The President</option><option value="NS-357 Underboss">NS-357 Underboss</option><option value="NS-44 Commissioner">NS-44 Commissioner</option><option value="NS-44L Blackhand">NS-44L Blackhand</option><option value="Hunter QCX">Hunter QCX</option><option value="Hunter QCX-B">Hunter QCX-B</option><option value="Hunter QCX-G">Hunter QCX-G</option><option value="Heartstring">Heartstring</option><option value="Blackheart">Blackheart</option><option value="NS Patriot Flare Gun">NS Patriot Flare Gun</option><option value="NS Deep Freeze">NS Deep Freeze</option>';
$('select[name="loadoutSecondaryWeapon"]').html(loadoutSecondarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutSecondarySelect = '<option></option><option value="NC4 Mag-Shot">NC4 Mag-Shot</option><option value="LA8 Rebel">LA8 Rebel</option><option value="LA3 Desperado">LA3 Desperado</option><option value="The Executive">The Executive</option><option value="NS-357 Underboss">NS-357 Underboss</option><option value="NS-44 Commissioner">NS-44 Commissioner</option><option value="NS-44L Blackhand">NS-44L Blackhand</option><option value="Hunter QCX">Hunter QCX</option><option value="Hunter QCX-B">Hunter QCX-B</option><option value="Hunter QCX-G">Hunter QCX-G</option><option value="Heartstring">Heartstring</option><option value="Blackheart">Blackheart</option><option value="NS Patriot Flare Gun">NS Patriot Flare Gun</option><option value="NS Deep Freeze">NS Deep Freeze</option>';
$('select[name="loadoutSecondaryWeapon"]').html(loadoutSecondarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutSecondarySelect = '<option></option><option value="Beamer VS3">Beamer VS3</option><option value="Manticore SX40">Manticore SX40</option><option value="Cerberus">Cerberus</option><option value="The Immortal">The Immortal</option><option value="NS-357 Underboss">NS-357 Underboss</option><option value="NS-44 Commissioner">NS-44 Commissioner</option><option value="NS-44L Blackhand">NS-44L Blackhand</option><option value="Hunter QCX">Hunter QCX</option><option value="Hunter QCX-B">Hunter QCX-B</option><option value="Hunter QCX-G">Hunter QCX-G</option><option value="Heartstring">Heartstring</option><option value="Blackheart">Blackheart</option><option value="NS Patriot Flare Gun">NS Patriot Flare Gun</option><option value="NS Deep Freeze">NS Deep Freeze</option>';
$('select[name="loadoutSecondaryWeapon"]').html(loadoutSecondarySelect);
}
 
//Utility, Utility 4
if(loadoutEmpire == "Terran Republic") {
$('.modalWrapper option[value="Claymore"]').remove();
$('.modalWrapper select[name="loadoutUtility"]').append('<option value="Claymore">Claymore</option>');
$('.modalWrapper option[value="Bouncing Betty"]').remove();
$('.modalWrapper option[value="Proximity Mine"]').remove();
}
else if(loadoutEmpire == "New Conglomerate") {
$('.modalWrapper option[value="Bouncing Betty"]').remove();
$('.modalWrapper select[name="loadoutUtility"]').append('<option value="Bouncing Betty">Bouncing Betty</option>');
$('.modalWrapper option[value="Claymore"]').remove();
$('.modalWrapper option[value="Proximity Mine"]').remove();
}
else if(loadoutEmpire == "Vanu Sovereignty") {
$('.modalWrapper option[value="Proximity Mine"]').remove();
$('.modalWrapper select[name="loadoutUtility"]').append('<option value="Proximity Mine">Proximity Mine</option>');
$('.modalWrapper option[value="Claymore"]').remove();
$('.modalWrapper option[value="Bouncing Betty"]').remove();
}
});

//Level
$('.modalWrapper input[name="loadoutLevel"]').keyup(function() {
var loadoutLevel = $('.modalWrapper input[name="loadoutLevel"]').val();
var levelRegex = /\|Level.*=.*/;
 
if(loadoutLevel > 0) {
editField.val( editField.val().replace(levelRegex,'|Level 				= ' + loadoutLevel) );
}
else {
$('.modalWrapper input[name="loadoutLevel"]').val('');
alert("Character level must be a positive number.");
}
});
 
//Primary weapon
$('.modalWrapper select[name="loadoutPrimaryWeapon"]').on('change click keyup', function() {
var loadoutPrimary = $('.modalWrapper select[name="loadoutPrimaryWeapon"]').val();
var primaryRegex = /\|Primary Weapon.*=.*/;
 
editField.val( editField.val().replace(primaryRegex,'|Primary Weapon 		= ' + loadoutPrimary) );
});
 
//Secondary weapon
$('.modalWrapper select[name="loadoutSecondaryWeapon"]').on('change click keyup', function() {
var loadoutSecondary = $('.modalWrapper select[name="loadoutSecondaryWeapon"]').val();
var secondaryRegex = /\|Secondary Weapon.*=.*/;
 
editField.val( editField.val().replace(secondaryRegex,'|Secondary Weapon 		= ' + loadoutSecondary) );
});
 
//Tool
$('.modalWrapper select[name="loadoutTool"]').on('change click keyup', function() {
var loadoutTool = $('.modalWrapper select[name="loadoutTool"]').val();
var toolRegex = /\|Tool.*=.*/;
 
editField.val( editField.val().replace(toolRegex,'|Tool 				= ' + loadoutTool) );
});
 
//Ability, Utility 1
$('.modalWrapper select[name="loadoutAbility"]').on('change click keyup', function() {
var loadoutAbility = $('.modalWrapper select[name="loadoutAbility"]').val();
var utility1Regex = /\|Ability.*=.*/;
 
editField.val( editField.val().replace(utility1Regex,'|Ability 			= ' + loadoutAbility) );
});
 
//Grenade, Utility 2
$('.modalWrapper select[name="loadoutGrenade"]').on('change click keyup', function() {
var loadoutGrenade = $('.modalWrapper select[name="loadoutGrenade"]').val();
var utility2Regex = /\|Grenade.*=.*/;
 
editField.val( editField.val().replace(utility2Regex,'|Grenade 			= ' + loadoutGrenade) );
});
 
//Suit, Utility 3
$('.modalWrapper select[name="loadoutSuit"]').on('change click keyup', function() {
var loadoutSuit = $('.modalWrapper select[name="loadoutSuit"]').val();
var utility3Regex = /\|Suit.*=.*/;
 
editField.val( editField.val().replace(utility3Regex,'|Suit 			= ' + loadoutSuit) );
});
 
//Utility, Utility 4
$('.modalWrapper select[name="loadoutUtility"]').on('change click keyup', function() {
var loadoutUtility = $('.modalWrapper select[name="loadoutUtility"]').val();
var utility4Regex = /\|Utility.*=.*/;
 
editField.val( editField.val().replace(utility4Regex,'|Utility 			= ' + loadoutUtility) );
});
 
//Melee, Utility 5
$('.modalWrapper select[name="loadoutMelee"]').on('change click keyup', function() {
var loadoutMelee = $('.modalWrapper select[name="loadoutMelee"]').val();
var utility5Regex = /\|Melee.*=.*/;
 
editField.val( editField.val().replace(utility5Regex,'|Melee 			= ' + loadoutMelee) );
});

//Implant, Utility 6
$('.modalWrapper select[name="loadoutImplant"]').on('change click keyup', function() {
var loadoutImplant = $('.modalWrapper select[name="loadoutImplant"]').val();
var utility6Regex = /\|Implant.*=.*/;
 
editField.val( editField.val().replace(utility6Regex,'|Implant 			= ' + loadoutImplant) );
});
 
//Certification 1
$('.modalWrapper input[name="loadoutCertification1"]').keyup(function() {
var loadoutCertification1 = $('.modalWrapper input[name="loadoutCertification1"]').val();
var loadoutCertification11 = $('.modalWrapper select[name="loadoutCertification1-1"]').val();
var loadoutCertification12 = $('.modalWrapper select[name="loadoutCertification1-2"]').val();
var certification1Regex = /\|Certification 1.*=.*/;
var certification1LevelRegex = /\|Certification Level 1.*=.*/;

var loadoutCert1Length = this.value.length;
if (loadoutCert1Length > 27) {
this.value = this.value.substring(0, 27);
}
else {
editField.val( editField.val().replace(certification1Regex,'|Certification 1 		= ' + loadoutCertification1) );
 
if (loadoutCertification11 == '') {
$('.modalWrapper select[name="loadoutCertification1-1"]').val("1");
}
 
if (loadoutCertification12 == '') {
$('.modalWrapper select[name="loadoutCertification1-2"]').val("1");
}
 
if (loadoutCertification11 == '' && loadoutCertification12 == '') {
editField.val( editField.val().replace(certification1LevelRegex,'|Certification Level 1 		= 1/1') );
}
}
$('input[name="loadoutCert1Characters"]').val(27 - loadoutCert1Length);
});
 
$('.modalWrapper select[name="loadoutCertification1-1"]').on('change click keyup', function() {
var loadoutCertification11 = $('.modalWrapper select[name="loadoutCertification1-1"]').val();
var loadoutCertification12 = $('.modalWrapper select[name="loadoutCertification1-2"]').val();
var loadoutCertification1Level = loadoutCertification12 + '/' + loadoutCertification11;
var certification1LevelRegex = /\|Certification Level 1.*=.*/;
 
editField.val( editField.val().replace(certification1LevelRegex,'|Certification Level 1 			= ' + loadoutCertification1Level) );
});
 
$('.modalWrapper select[name="loadoutCertification1-2"]').on('change click keyup', function() {
var loadoutCertification11 = $('.modalWrapper select[name="loadoutCertification1-1"]').val();
var loadoutCertification12 = $('.modalWrapper select[name="loadoutCertification1-2"]').val();
var loadoutCertification1Level = loadoutCertification1-1 + '/' + loadoutCertification1-2;
var certification1LevelRegex = /\|Certification Level 1.*=.*/;
 
editField.val( editField.val().replace(certification1LevelRegex,'|Certification Level 1		= ' + loadoutCertification1Level) );
});
 
//Certification 2
$('.modalWrapper input[name="loadoutCertification2"]').keyup(function() {
var loadoutCertification2 = $('.modalWrapper input[name="loadoutCertification2"]').val();
var loadoutCertification21 = $('.modalWrapper select[name="loadoutCertification2-1"]').val();
var loadoutCertification22 = $('.modalWrapper select[name="loadoutCertification2-2"]').val();
var certification2Regex = /\|Certification 2.*=.*/;
var certification2LevelRegex = /\|Certification Level 2.*=.*/;

var loadoutCert2Length = this.value.length;
if (loadoutCert2Length > 27) {
this.value = this.value.substring(0, 27);
}
else { 
editField.val( editField.val().replace(certification2Regex,'|Certification 2 		= ' + loadoutCertification2) );
 
if (loadoutCertification21 == '') {
$('.modalWrapper select[name="loadoutCertification2-1"]').val("1");
}
 
if (loadoutCertification22 == '') {
$('.modalWrapper select[name="loadoutCertification2-2"]').val("1");
}
 
if (loadoutCertification21 == '' && loadoutCertification22 == '') {
editField.val( editField.val().replace(certification2LevelRegex,'|Certification Level 2 		= 1/1') );
}
}
$('input[name="loadoutCert2Characters"]').val(27 - loadoutCert2Length);
});
 
$('.modalWrapper select[name="loadoutCertification2-1"]').on('change click keyup', function() {
var loadoutCertification21 = $('.modalWrapper select[name="loadoutCertification2-1"]').val();
var loadoutCertification22 = $('.modalWrapper select[name="loadoutCertification2-2"]').val();
var loadoutCertification2Level = loadoutCertification21 + '/' + loadoutCertification22;
var certification2LevelRegex = /\|Certification Level 2.*=.*/;
 
editField.val( editField.val().replace(certification2LevelRegex,'|Certification Level 2 		= ' + loadoutCertification2Level) );
});
 
$('.modalWrapper select[name="loadoutCertification2-2"]').on('change click keyup', function() {
var loadoutCertification21 = $('.modalWrapper select[name="loadoutCertification2-1"]').val();
var loadoutCertification22 = $('.modalWrapper select[name="loadoutCertification2-2"]').val();
var loadoutCertification2Level = loadoutCertification21 + '/' + loadoutCertification22;
var certification2LevelRegex = /\|Certification Level 2.*=.*/;
 
editField.val( editField.val().replace(certification2LevelRegex,'|Certification Level 2 		= ' + loadoutCertification2Level) );
});
 
//Certification 3
$('.modalWrapper input[name="loadoutCertification3"]').keyup(function() {
var loadoutCertification3 = $('.modalWrapper input[name="loadoutCertification3"]').val();
var loadoutCertification31 = $('.modalWrapper select[name="loadoutCertification3-1"]').val();
var loadoutCertification32 = $('.modalWrapper select[name="loadoutCertification3-2"]').val();
var certification3Regex = /\|Certification 3.*=.*/;
var certification3LevelRegex = /\|Certification Level 3.*=.*/;

var loadoutCert3Length = this.value.length;
if (loadoutCert3Length > 27) {
this.value = this.value.substring(0, 27);
}
else { 
editField.val( editField.val().replace(certification3Regex,'|Certification 3 		= ' + loadoutCertification3) );
 
if (loadoutCertification31 == '') {
$('.modalWrapper select[name="loadoutCertification3-1"]').val("1");
}
 
if (loadoutCertification32 == '') {
$('.modalWrapper select[name="loadoutCertification3-2"]').val("1");
}
 
if (loadoutCertification31 == '' && loadoutCertification32 == '') {
editField.val( editField.val().replace(certification3LevelRegex,'|Certification Level 3 		= 1/1') );
}
}
$('input[name="loadoutCert3Characters"]').val(27 - loadoutCert3Length);
});
 
$('.modalWrapper select[name="loadoutCertification3-1"]').on('change click keyup', function() {
var loadoutCertification31 = $('.modalWrapper select[name="loadoutCertification3-1"]').val();
var loadoutCertification32 = $('.modalWrapper select[name="loadoutCertification3-2"]').val();
var loadoutCertification3Level = loadoutCertification31 + '/' + loadoutCertification32;
var certification3LevelRegex = /\|Certification Level 3.*=.*/;
 
editField.val( editField.val().replace(certification3LevelRegex,'|Certification Level 3 		= ' + loadoutCertification3Level) );
});
 
$('.modalWrapper select[name="loadoutCertification3-2"]').on('change click keyup', function() {
var loadoutCertification31 = $('.modalWrapper select[name="loadoutCertification3-1"]').val();
var loadoutCertification32 = $('.modalWrapper select[name="loadoutCertification3-2"]').val();
var loadoutCertification3Level = loadoutCertification31 + '/' + loadoutCertification32;
var certification3LevelRegex = /\|Certification Level 3.*=.*/;
 
editField.val( editField.val().replace(certification3LevelRegex,'|Certification Level 3 		= ' + loadoutCertification3Level) );
});
 
//Certification 4
$('.modalWrapper input[name="loadoutCertification4"]').keyup(function() {
var loadoutCertification4 = $('.modalWrapper input[name="loadoutCertification4"]').val();
var loadoutCertification41 = $('.modalWrapper select[name="loadoutCertification4-1"]').val();
var loadoutCertification42 = $('.modalWrapper select[name="loadoutCertification4-2"]').val();
var certification4Regex = /\|Certification 4.*=.*/;
var certification4LevelRegex = /\|Certification Level 4.*=.*/;

var loadoutCert4Length = this.value.length;
if (loadoutCert4Length > 27) {
this.value = this.value.substring(0, 27);
}
else { 
editField.val( editField.val().replace(certification4Regex,'|Certification 4 		= ' + loadoutCertification4) );
 
if (loadoutCertification41 == '') {
$('.modalWrapper select[name="loadoutCertification4-1"]').val("1");
}
 
if (loadoutCertification42 == '') {
$('.modalWrapper select[name="loadoutCertification4-2"]').val("1");
}
 
if (loadoutCertification41 == '' && loadoutCertification42 == '') {
editField.val( editField.val().replace(certification4LevelRegex,'|Certification Level 4 		= 1/1') );
}
}
$('input[name="loadoutCert4Characters"]').val(27 - loadoutCert4Length);
});
 
$('.modalWrapper select[name="loadoutCertification4-1"]').on('change click keyup', function() {
var loadoutCertification41 = $('.modalWrapper select[name="loadoutCertification4-1"]').val();
var loadoutCertification42 = $('.modalWrapper select[name="loadoutCertification4-2"]').val();
var loadoutCertification4Level = loadoutCertification41 + '/' + loadoutCertification42;
var certification4LevelRegex = /\|Certification Level 4.*=.*/;
 
editField.val( editField.val().replace(certification4LevelRegex,'|Certification Level 4 		= ' + loadoutCertification4Level) );
});
 
$('.modalWrapper select[name="loadoutCertification4-2"]').on('change click keyup', function() {
var loadoutCertification41 = $('.modalWrapper select[name="loadoutCertification4-1"]').val();
var loadoutCertification42 = $('.modalWrapper select[name="loadoutCertification4-2"]').val();
var loadoutCertification4Level = loadoutCertification41 + '/' + loadoutCertification42;
var certification4LevelRegex = /\|Certification Level 4.*=.*/;
 
editField.val( editField.val().replace(certification4LevelRegex,'|Certification Level 4 		= ' + loadoutCertification4Level) );
});
 
//Certification 5
$('.modalWrapper input[name="loadoutCertification5"]').keyup(function() {
var loadoutCertification5 = $('.modalWrapper input[name="loadoutCertification5"]').val();
var loadoutCertification51 = $('.modalWrapper select[name="loadoutCertification5-1"]').val();
var loadoutCertification52 = $('.modalWrapper select[name="loadoutCertification5-2"]').val();
var certification5Regex = /\|Certification 5.*=.*/;
var certification5LevelRegex = /\|Certification Level 5.*=.*/;

var loadoutCert5Length = this.value.length;
if (loadoutCert5Length > 27) {
this.value = this.value.substring(0, 27);
}
else { 
editField.val( editField.val().replace(certification5Regex,'|Certification 5 		= ' + loadoutCertification5) );
 
if (loadoutCertification51 == '') {
$('.modalWrapper select[name="loadoutCertification5-1"]').val("1");
}
 
if (loadoutCertification52 == '') {
$('.modalWrapper select[name="loadoutCertification5-2"]').val("1");
}
 
if (loadoutCertification51 == '' && loadoutCertification52 == '') {
editField.val( editField.val().replace(certification5LevelRegex,'|Certification Level 5 		= 1/1') );
}
}
$('input[name="loadoutCert5Characters"]').val(27 - loadoutCert5Length);
});
 
$('.modalWrapper select[name="loadoutCertification5-1"]').on('change click keyup', function() {
var loadoutCertification51 = $('.modalWrapper select[name="loadoutCertification5-1"]').val();
var loadoutCertification52 = $('.modalWrapper select[name="loadoutCertification5-2"]').val();
var loadoutCertification5Level = loadoutCertification51 + '/' + loadoutCertification52;
var certification5LevelRegex = /\|Certification Level 5.*=.*/;
 
editField.val( editField.val().replace(certification5LevelRegex,'|Certification Level 5 		= ' + loadoutCertification5Level) );
});
 
$('.modalWrapper select[name="loadoutCertification5-2"]').on('change click keyup', function() {
var loadoutCertification51 = $('.modalWrapper select[name="loadoutCertification5-1"]').val();
var loadoutCertification52 = $('.modalWrapper select[name="loadoutCertification5-2"]').val();
var loadoutCertification5Level = loadoutCertification51 + '/' + loadoutCertification52;
var certification5LevelRegex = /\|Certification Level 5.*=.*/;
 
editField.val( editField.val().replace(certification5LevelRegex,'|Certification Level 5 		= ' + loadoutCertification5Level) );
});
 
//Primary weapon type
$('.modalWrapper select[name="loadoutPrimaryWeaponType"]').on('change click keyup', function() {
var loadoutPrimaryWeaponType = $('.modalWrapper select[name="loadoutPrimaryWeaponType"]').val();
var loadoutEmpire = $('.modalWrapper select[name="loadoutEmpire"]').val();
 
//Primary weapon
if(loadoutPrimaryWeaponType == "Assault Rifles") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="Cycler TRV">Cycler TRV</option><option value="SABR-13">SABR-13</option><option value="T1 Cycler">T1 Cycler</option><option value="T1B Cycler">T1B Cycler</option><option value="T1S Cycler">T1S Cycler</option><option value="TAR">TAR</option><option value="TORQ-9">TORQ-9</option><option value="T1A Unity">T1A Unity</option><option value="NS-11A">NS-11A</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="GR-22">GR-22</option><option value="NC1 Gauss Rifle">NC1 Gauss Rifle</option><option value="Gauss Rifle Burst">Gauss Rifle Burst</option><option value="Gauss Rifle S">Gauss Rifle S</option><option value="Reaper DMR">Reaper DMR</option><option value="Carnage BR">Carnage BR</option><option value="NC-9 A-Tross">NC-9 A-Tross</option><option value="Gauss Prime">Gauss Prime</option><option value="NS-11A">NS-11A</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="CME">CME</option><option value="Equinox VE2">Equinox VE2</option><option value="Equinox VE2 Burst">Equinox VE2 Burst</option><option value="Pulsar VS1">Pulsar VS1</option><option value="H-V45">H-V45</option><option value="Corvus VA55">Corvus VA55</option><option value="Terminus VX-9">Terminus VX-9</option><option value="Darkstar">Darkstar</option><option value="NS-11A">NS-11A</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "Light Machine Guns") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="MSW-R">MSW-R</option><option value="T9 CARV">T9 CARV</option><option value="T9 CARV-S">T9 CARV-S</option><option value="T16 Rhino">T16 Rhino</option><option value="TMG-50">TMG-50</option><option value="T32 Bull">T32 Bull</option><option value="T9A "Butcher"">T9A "Butcher"</option><option value="NS-15M2">NS-15M2</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="EM1">EM1</option><option value="EM6">EM6</option><option value="Gauss SAW S">Gauss SAW S</option><option value="GD-22S">GD-22S</option><option value="NC6 Gauss SAW">NC6 Gauss SAW</option><option value="NC6A GODSAW">NC6A GODSAW</option><option value="NS-15M2">NS-15M2</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Flare VE6">Flare VE6</option><option value="Orion VS54">Orion VS54</option><option value="Pulsar LSW">Pulsar LSW</option><option value="SVA-88">SVA-88</option><option value="VX29 Polaris">VX29 Polaris</option><option value="Ursa">Ursa</option><option value="Betelgeuse 54-A">Betelgeuse 54-A</option><option value="NS-15M2">NS-15M2</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "Carbines") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="LC2 Lynx">LC2 Lynx</option><option value="T5 AMC">T5 AMC</option><option value="TRAC-5">TRAC-5</option><option value="TRAC-5 Burst">TRAC-5 Burst</option><option value="TRAC-5 S">TRAC-5 S</option><option value="LC3 Jaguar">LC3 Jaguar</option><option value="HC1 Cougar">HC1 Cougar</option><option value="TRAC-Shot">TRAC-Shot</option><option value="NS-11C">NS-11C</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="AF-19 Mercenary">AF-19 Mercenary</option><option value="GD-7F">GD-7F</option><option value="AC-X11">AC-X11</option><option value="Gauss Compact Burst">Gauss Compact Burst</option><option value="Gauss Compact S">Gauss Compact S</option><option value="Razor GD-23">Razor GD-23</option><option value="AF-4A Bandit">AF-4A Bandit</option><option value="19A Fortuna">19A Fortuna</option><option value="NS-11C">NS-11C</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Atlas">Atlas</option><option value="Pulsar C">Pulsar C</option><option value="VX6-7">VX6-7</option><option value="Solstice VE3">Solstice VE3</option><option value="Solstice Burst">Solstice Burst</option><option value="Solstice SF">Solstice SF</option><option value="Serpent VE92">Serpent VE92</option><option value="Zenith VX-5">Zenith VX-5</option><option value="Eclipse VE3A">Eclipse VE3A</option><option value="NS-11C">NS-11C</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "Specialized Heavy Assault Weaponry") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="T7 Mini-Chaingun">T7 Mini-Chaingun</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="NC05 Jackhammer">NC05 Jackhammer</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Lasher X2">Lasher X2</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "Sniper Rifles") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="99SV">99SV</option><option value="KSR-35">KSR-35</option><option value="M77-B">M77-B</option><option value="SR-7">SR-7</option><option value="TSAR-42">TSAR-42</option><option value="RAMS .50M">RAMS .50M</option><option value="TRAP-M1">TRAP-M1</option><option value="Bighorn .50M">Bighorn .50M</option><option value="NS-AM7 Archer">NS-AM7 Archer</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="NC14 Bolt Driver">NC14 Bolt Driver</option><option value="Gauss SPR">Gauss SPR</option><option value="LA80">LA80</option><option value="SAS-R">SAS-R</option><option value="Impetus">Impetus</option><option value="EM4 Longshot">EM4 Longshot</option><option value="AF-8 RailJack">AF-8 RailJack</option><option value="The Moonshot">The Moonshot</option><option value="NS-AM7 Archer">NS-AM7 Archer</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Ghost">Ghost</option><option value="Phantom VA23">Phantom VA23</option><option value="V10">V10</option><option value="VA39 Spectre">VA39 Spectre</option><option value="XM98 Orbit">XM98 Orbit</option><option value="Parallax VX3">Parallax VX3</option><option value="Phaseshift VX-S">Phaseshift VX-S</option><option value="Parsec VX3-A">Parsec VX3-A</option><option value="NS-AM7 Archer">NS-AM7 Archer</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "Scout Rifles") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="HSR-1">HSR-1</option><option value="SOAS-20">SOAS-20</option><option value="NS-30 Vandal">NS-30 Vandal</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="AF-6 Shadow">AF-6 Shadow</option><option value="AF-18 Stalker">AF-18 Stalker</option><option value="NS-30 Vandal">NS-30 Vandal</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Artemis VX26">Artemis VX26</option><option value="Nyx VX31">Nyx VX31</option><option value="NS-30 Vandal">NS-30 Vandal</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "Shotguns") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="AS16 NightHawk">AS16 NightHawk</option><option value="FA1 Barrage">FA1 Barrage</option><option value="TS4 Haymaker">TS4 Haymaker</option><option value="TRS-12 Uppercut">TRS-12 Uppercut</option><option value="TAS-16 Blackjack">TAS-16 Blackjack</option><option value="Havoc">Havoc</option><option value="NS Baron G5">NS Baron G5</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="Mauler S6">Mauler S6</option><option value="AF-57 Piston">AF-57 Piston</option><option value="NC12 Sweeper">NC12 Sweeper</option><option value="GD-66 Claw">GD-66 Claw</option><option value="LA39 Bruiser">LA39 Bruiser</option><option value="The Brawler">The Brawler</option><option value="NS Baron G5">NS Baron G5</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Nova">Nova</option><option value="Pandora VX25">Pandora VX25</option><option value="Thanatos VE70">Thanatos VE70</option><option value="Phobos VX86">Phobos VX86</option><option value="Deimos VA29">Deimos VA29</option><option value="Chaos">Chaos</option><option value="NS Baron G5">NS Baron G5</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}

if(loadoutPrimaryWeaponType == "Submachine Guns") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="SMG-46 Armistice">SMG-46 Armistice</option><option value="PDW-16 Hailstorm">PDW-16 Hailstorm</option><option value="Shuriken">Shuriken</option><option value="NS-7 PDW">NS-7 PDW</option><option value="MKV Suppressed">MKV Suppressed</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="AF-4 Cyclone">AF-4 Cyclone</option><option value="Blitz GD-10">Blitz GD-10</option><option value="Tempest">Tempest</option><option value="NS-7 PDW">NS-7 PDW</option><option value="MKV Suppressed">MKV Suppressed</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Eridani SX5">Eridani SX5</option><option value="Sirius SX12">Sirius SX12</option><option value="Skorpios">Skorpios</option><option value="NS-7 PDW">NS-7 PDW</option><option value="MKV Suppressed">MKV Suppressed</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "Rocket Launchers") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="ML-7">ML-7</option><option value="M9 SKEP Launcher">M9 SKEP Launcher</option><option value="ASP-30 Grounder">ASP-30 Grounder</option><option value="T2 Striker">T2 Striker</option><option value="NS Decimator">NS Decimator</option><option value="The Kraken">The Kraken</option><option value="NS Annihilator">NS Annihilator</option><option value="NS R3 Swarm">NS R3 Swarm</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="Shrike">Shrike</option><option value="AF-22 Crow">AF-22 Crow</option><option value="Hawk GD-68">Hawk GD-68</option><option value="NC15 Phoenix">NC15 Phoenix</option><option value="NS Decimator">NS Decimator</option><option value="The Kraken">The Kraken</option><option value="NS Annihilator">NS Annihilator</option><option value="NS R3 Swarm">NS R3 Swarm</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="S1">S1</option><option value="Hades VSH4">Hades VSH4</option><option value="Nemesis VSH9">Nemesis VSH9</option><option value="Lancer VS22">Lancer VS22</option><option value="NS Decimator">NS Decimator</option><option value="The Kraken">The Kraken</option><option value="NS Annihilator">NS Annihilator</option><option value="NS R3 Swarm">NS R3 Swarm</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "Battle Rifles") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="AMR-66">AMR-66</option><option value="DMR-99">DMR-99</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="Warden">Warden</option><option value="GD Guardian">GD Guardian/option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Eidolon VE33">Eidolon VE33</option><option value="Revenant">Revenant</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "MAX Anti-Infantry") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="M2 Mutilator">M2 Mutilator</option><option value="M6 Onslaught">M6 Onslaught</option><option value="MRC3 Mercy">MRC3 Mercy</option><option value="M1 Heavy Cycler">M1 Heavy Cycler</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="AF-41 Hacksaw">AF-41 Hacksaw</option><option value="AF-23 Grinder">AF-23 Grinder</option><option value="AF-34 Mattock">AF-34 Mattock</option><option value="NCM1 Scattercannon">NCM1 Scattercannon</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Blueshift VM5">Blueshift VM5</option><option value="Cosmos VM3">Cosmos VM3</option><option value="Nebula VM20">Nebula VM20</option><option value="Quasar VM1">Quasar VM1</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
 
if(loadoutPrimaryWeaponType == "Max Anti-Vehicle") {
if(loadoutEmpire == "Terran Republic") {
var loadoutPrimarySelect = '<option></option><option value="M3 Pounder HEG">M3 Pounder HEG</option><option value="MR1 Fracture">MR1 Fracture</option><option value="NS-10 Burster">NS-10 Burster</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "New Conglomerate") {
var loadoutPrimarySelect = '<option></option><option value="NCM2 Falcon">NCM2 Falcon</option><option value="NCM3 Raven">NCM3 Raven</option><option value="NS-10 Burster">NS-10 Burster</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
else if(loadoutEmpire == "Vanu Sovereignty") {
var loadoutPrimarySelect = '<option></option><option value="Comet VM2">Comet VM2</option><option value="Vortex VM21">Vortex VM21</option><option value="NS-10 Burster">NS-10 Burster</option>';
$('select[name="loadoutPrimaryWeapon"]').html(loadoutPrimarySelect);
}
}
});
 
}
});
 
/* End add loadout options to create page modal */

 
/* Begin Census on hover infobox */
 
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
 
/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" );
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		}
	}
	return "";
}
 
// auto-zebra stripe for tables
function zebraStripe() {
if ($("table.zebra > tbody > tr").eq(1).css("background-color") == "transparent" && $("table.zebra > tbody > tr").eq(2).css("background-color") == "transparent") {
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#2c2c2c");
$(".sortheader").bind("click", function() {
$("table.zebra > tbody > tr").not(".nozebra").css("background-color","transparent");
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#2c2c2c");
});
}
}
 

// add scribblemap processing
function wwScribbleMaps() {
$("#WikiaArticle div.wwSM").each(function () {
mapID = $(this).attr("class").replace("wwSM map-","");
if (mapID.length > 20) mapID = "";
$(this).html('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="550" height="400" id="smwidget" align="middle"><param name="allowFullScreen" value="true" /><param name="FlashVars" value="id='+mapID+'&p=true&mt=false&d=true&z=true" /><param name="movie" value="http://widgets.scribblemaps.com/wowsmwidget.swf"/><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><embed src="http://widgets.scribblemaps.com/wowsmwidget.swf" FlashVars="id='+mapID+'&p=true&mt=false&d=true&z=true" "quality="high" bgcolor="#000000" width="550" height="400" name="smwidget" align="middle" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
});
}
 
function aCharLoad() {
$("#WikiaArticle .aChar").each(function () {
data = $(this).text().split(";");
realm = data[0];
loc = (data[1].toLowerCase()=="eu")?"eu":"www";
character = data[2];
height = (data[3])?588:444;
$(this).html('<iframe src="http://'+loc+'.wowarmory.com/character-model-embed.xml?r='+realm+'&amp;cn='+character+'&amp;rhtml=true" scrolling="no" height="'+height+'" width="321" frameborder="0"></iframe>');
});
$("#WikiaArticle .aChar").css("display","block");
}