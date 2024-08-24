/*
Note:

Any JavaScript here will be loaded for all users on every page load.
Actually wish that was the case.
Disabled JS in browser will not run this at all!

All functions get triggered below and include error handling.
When a function does error it is logged to developer mode.
A function will also error when it can not function/be used on a page.
Use comment syntax to enable/disable any of the functions.

Please contact admins maintaining this wiki in case of issues!
*/

/* ------------------------- */
/* FUNCTION CALLS START HERE */
/* ------------------------- */

//To fix an issue with Gamepedia script to allow console to at least show my output ( console.log() )
// fixConsole(); // May be required when console logging is intentionally broken again.

// Maintenance Popup. Comment out to disable!
// addMaintenancePopup(); // Currently disabled

// Adding some scripts to the <head>
// addScripts(); // Not used right now!

// Change Category names to translated name
transCatName();

// Changing mw-head left/right navigation
changeTopNavigation();

// Create a button to show/hide the left navigation and add to HTML
createLeftNavButton();

// Load save-state for show/hide left navigation using localStorage
getLeftNavValue();

// Add a speaker icon with audio form AudioExample template
addAudioIcon(); // Have to check results if JS disabled!

// Create a 3 button System Requirement table with show/hide
setTabs(); // Have to check results if JS is disabled!

// Check language to prevent editing when selected language is not supported
checkLanguage(); // Disable JS allows editing in any language! BS!

// Add a new section (Savage Lands Game) to the profile page right column for Steam Achievements.
// Show some text with it to explain linking the Wiki with a Steam Account.
// addSectionSteamASLG(); // Broken

// Create Show/Hide buttons for right column on profile page to HTML
profileShowHideButtons();

// Load save-state for show/hide right column profile parts using localStorage
getProfilePartsValues();

// Code to receive Steam achievements for Savage Lands if user has linked Steam account with the wiki.
// getSteamAchievements(); // Broken

// Get map settings for Snowmere
// getMapSettings();

// Adding all code required for interactive maps
// addMapCode();

// Adds snow to wiki
// addSnowWiki();


/* -------------------------- */
/* FUNCTIONS CODE STARTS HERE */
/* -------------------------- */

// Console fix
function fixConsole() {
    delete console.log;
}

// Add Maintenance Popup.
function addMaintenancePopup() {
    var MaintenancePopup = sessionStorage.getItem("MaintenancePopup");
    try {
        if (MaintenancePopup != "false") {
            $( "body" ).prepend( "<div id='alertMaintenancePopup' onclick='hideMaintenancePopup()'><span class='alertHeader'>Maintenance alert!</span><br /><br/><span class='alertTxt1'>The Savage Lands Wiki is currently undergoing maintenance.<br />We suggest checking back soon...</span><br /><br /><span class='alertTxt2'>Thank you for your patience.</span><br /><br /><span class='alertClose'>click to close</span></div>" );
        }
    }
    catch (error) {
        console.log("addMaintenancePopup > " + error);
        return;
    }
    finally {
        return;
    }
}

// To hide maintenance message box.
function hideMaintenancePopup() {
    $( "div#alertMaintenancePopup" ).remove();
    sessionStorage.setItem("MaintenancePopup", "false");
}

// Add scripts
function addScripts() {
    var scripts = ["https://code.jquery.com/ui/1.11.4/jquery-ui.js"];
    for (index = 0; index < scripts.length; ++index) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = scripts[index];
        $("head").append(s);
    };
}

// Changing Category names to translated name
function transCatName() {
    var $catlinks = $( '.catlinks ul' );
    $( '.TCat' ).each( function() {
        var catName = $( this ).data( 'name' );
        console.log("Test: " + catName);
        var catTrans = $( this ).data( 'translated' );
        console.log("Test: " + catTrans);
        $catlinks.find( 'a' ).each( function() {
            if ( this.text === catName ) {
                $( this ).text( catTrans );
                return false;
            }
        });
    });
}

// Changing mw-head, moving parts from right- to left-navigation
function changeTopNavigation() {
    try {
        // Create new <div> and move watch/unwatch into it
        var newID = document.createElement("div"); // Create new <div>
        newID.setAttribute("id", "watchlink"); // Give the new <div> an id
        // Add attributes it used to have
        newID.setAttribute("role", "navigation"); // Give the new <div> a role
        newID.setAttribute("class", "vectorTabs"); // Give the new <div> a class
        newID.setAttribute("aria-labelledby", "p-views-label"); // Give the new <div> an aria-labelledby
        var newList = document.createElement("ul"); // Create new <ul>
        var moveWatch = document.querySelector(".icon.mw-watchlink"); // The watch/unwatch icon to be moved
        newList.appendChild(moveWatch); // Add watch/unwatch to new <ul>
        newID.appendChild(newList); // Add the new <ul> to the new <div>
        var newLocation = document.getElementById("p-search"); // New location
        newLocation.parentNode.insertBefore(newID, newLocation); // Prepend new <div> with watch/unwatch before <div id="p-search">
        
        // Move several parts from right-navigation to left-navigation
        var movePart = document.getElementById("p-views");
        document.getElementById("left-navigation").appendChild(movePart); // Move p-views (Edit source / History) to the left-navigation
    }
	catch (error) {
		console.log("changeTopNavigation > " + error);
		return;
	}
	finally {
		return;
	}
}

// add audio icon if template used on page
function addAudioIcon() {
	try {
		var audioURL = document.querySelector("span.AudioExample span#AudioExampleFileName a").href;
		document.getElementById("AudioExampleFileName").style.display = 'none';
		document.getElementById("AudioExample").innerHTML = "<audio id='AudioFile'><source src='" + audioURL + "'></audio><img id='AudioIcon' onmouseover='audioIconMouseOver()' onmouseout='audioIconMouseOut()' src='https://savagelands.gamepedia.com/media/savagelands.gamepedia.com/2/25/Speaker_Icon.png'></img>";
		document.getElementById("AudioFile").volume = 0.2; // Volume from 0 - 1
	}
	catch (error) {
		console.log("addAudioIcon > " + error);
		return;
	}
	finally {
		return;
	}
}

// play audio when mouse hovers over audio icon
function audioIconMouseOver() {
	document.getElementById("AudioFile").play();
	document.getElementById("AudioFile").loop = true; // Comment out for no loop
}

// stop and reset audio when mouse is moved away from audio icon
function audioIconMouseOut() {
	document.getElementById("AudioFile").pause();
	document.getElementById("AudioFile").currentTime = 0;
}

// Create 3 tabs for System Requirements
function setTabs() {
	try {
		document.getElementById("tabOS").innerHTML = "<button id='tabWindows' style='font-size:1.1em;height:50px;width:150px' onclick='tabWindows()'>Windows</button><button id='tabMacOSX' style='font-size:1.1em;height:50px;width:150px' onclick='tabMacOSX()'>Mac OS X</button><button id='tabSteamOSLinux' style='font-size:1.1em;height:50px;width:150px' onclick='tabSteamOSLinux()'>SteamOS + Linux</button>";
		tabWindows();
	}
	catch (error) {
		console.log("setTabs > " + error);
		return;
	}
	finally {
		return;
	}
}

// create tab for Windows
function tabWindows() {
	document.getElementById("Windows").style.display = "inline";
	document.getElementById("tabWindows").style.backgroundColor = "#F0F0F0";
	document.getElementById("tabWindows").style.color = "black";
	document.getElementById("MacOSX").style.display = "none";
	document.getElementById("tabMacOSX").style.backgroundColor = "rgba(94,106,102,0.1)";
	document.getElementById("tabMacOSX").style.color = "white";
	document.getElementById("SteamOSLinux").style.display = "none";
	document.getElementById("tabSteamOSLinux").style.backgroundColor = "rgba(94,106,102,0.1)";
	document.getElementById("tabSteamOSLinux").style.color = "white";
}

// create tab for MacOSX
function tabMacOSX() {
	document.getElementById("Windows").style.display = "none";
	document.getElementById("tabWindows").style.backgroundColor = "rgba(94,106,102,0.1)";
	document.getElementById("tabWindows").style.color = "white";
	document.getElementById("MacOSX").style.display = "inline";
	document.getElementById("tabMacOSX").style.backgroundColor = "#F0F0F0";
	document.getElementById("tabMacOSX").style.color = "black";
	document.getElementById("SteamOSLinux").style.display = "none";
	document.getElementById("tabSteamOSLinux").style.backgroundColor = "rgba(94,106,102,0.1)";
	document.getElementById("tabSteamOSLinux").style.color = "white";
}

// create tab for SteamOS and Linux
function tabSteamOSLinux() {
	document.getElementById("Windows").style.display = "none";
	document.getElementById("tabWindows").style.backgroundColor = "rgba(94,106,102,0.1)";
	document.getElementById("tabWindows").style.color = "white";
	document.getElementById("MacOSX").style.display = "none";
	document.getElementById("tabMacOSX").style.backgroundColor = "rgba(94,106,102,0.1)";
	document.getElementById("tabMacOSX").style.color = "white";
	document.getElementById("SteamOSLinux").style.display = "inline";
	document.getElementById("tabSteamOSLinux").style.backgroundColor = "#F0F0F0";
	document.getElementById("tabSteamOSLinux").style.color = "black";
}

// Create a button to show/hide left navigation with onclick event
function createLeftNavButton () {
    var btn = document.createElement("button");
    btn.setAttribute("id", "buttonShowHideLeftNav");
    btn.setAttribute("class", "buttonShowHide btnLeftNav");
    btn.onclick = function(){changeLeftNavState();};
    document.querySelector("#mw-page-base.noprint").appendChild(btn);
}

// Some magic to store a value locally to check if left navigation menu should be shown/hidden
function getLeftNavValue() {
	try {
		var leftNavValue = localStorage.getItem("leftNavValue");
		if (leftNavValue == "show") {
			leftNavState = "show";
			showLeftNav();
		}
		else if (leftNavValue == "hide") {
			leftNavState = "hide";
			hideLeftNav();
		}
		else {
			leftNavState = "show";
			showLeftNav();
		}
	}
	catch (error) {
		console.log("getLeftNavValue > " + error);
		return;
	}
	finally {
		return;
	}
}

// Function to show left navigation menu
function showLeftNav() {
	$("#p-logo").removeAttr("class");
        $("#pageWrapper").removeAttr("class");
	$("#buttonShowHideLeftNav").html("Hide Navigation");
}

// Function to hide left navigation menu
function hideLeftNav() {
	$("#p-logo").attr("class", "hideLeftNav");
        $("#pageWrapper").attr("class", "hideLeftNav");
	$("#buttonShowHideLeftNav").html("Show Navigation");
}

// Some magic to change the left navigation menu state and store the value locally
function changeLeftNavState() {
	if (leftNavState == "show") {
		leftNavState = "hide";
		try {
			localStorage.setItem("leftNavValue", leftNavState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			hideLeftNav();
		}
	}
	else if (leftNavState == "hide") {
		leftNavState = "show";
		try {
			localStorage.setItem("leftNavValue", leftNavState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			showLeftNav();
		}
	}
}

// Show an alert box with message when an unsupported translation language is currently selected to remind changing
function checkLanguage() {
	try {
        var supportedLanguages = [ // Array of supported languages!
            "fr",
            "it",
            "de",
            "es",
            "pt",
            "pl",
            "ru",
            "ko",
            "zh",
            "ja"
        ];
	var selectedLanguage = document.querySelector("span.uls").getAttribute("lang");
        var support = false;
        for (var i=0, tot=supportedLanguages.length; i < tot; i++) {
            if (selectedLanguage == supportedLanguages[i]) {
                var support = true;
                console.log("Language support : " + support);
            }
        }
        if (support === false) {
            console.log("Language support : " + support);
            // addLanguagePopup(); Currently disabled, popup appears to be too intrusive!
            $(".row.tux-messagetable-header").hide();
            $(".row.tux-messagelist").hide();
            $(".tux-action-bar").hide();
        } else {
            $(".row.tux-messagetable-header").show();
            $(".row.tux-messagelist").show();
            $(".tux-action-bar").show();
        }
        checkChangeLanguage();
	}
	catch (error) {
		console.log("checkLanguage > " + error);
		return;
	}
	finally {
		return;
	}
}

// Add Language Popup.
function addLanguagePopup() {
    try {
        $( "body" ).prepend( "<div id='alertLanguagePopup' onclick='hideLanguagePopup()'><span class='alertHeader'>Language alert!</span><br /><br/><span class='alertTxt1'>Please make sure to select a supported language.</span><br /><br /><span class='alertTxt2'>Thank you.</span><br /><br /><span class='alertClose'>click to close</span></div>" );
    }
    catch (error) {
        console.log("addLanguagePopup > " + error);
        return;
    }
    finally {
        return;
    }
}

// To remove Language Popup.
function hideLanguagePopup() {
    $( "div#alertLanguagePopup" ).remove();
}

// Check for a change to the selected translation language
function checkChangeLanguage () {
    $("span.uls[lang]").one('DOMSubtreeModified', function () {
        console.log("Language changed!");
        setTimeout( function () {
            checkLanguage()
        }, 0);
    });
    console.log("checkChangeLanguage activated");
}

// Add a new section on profile page right column for Achievements SL Game (ASLG).
function addSectionSteamASLG() {
    if (document.querySelector(".curseprofile .rightcolumn")) { // Check if on profile page with the right column
        var newSectionHTML = document.createElement("div"); // create div
        newSectionHTML.setAttribute("class", "section steamASLG"); // create class for div
        document.querySelector(".curseprofile .rightcolumn").appendChild(newSectionHTML); // Add new div with class to the right column on profile
        var newHeader = document.createElement("h4"); // create new header h4
        var newText = document.createTextNode("Savage Lands Game"); // create text for header
        newHeader.appendChild(newText); // add text to header h4
        document.querySelector(".curseprofile .rightcolumn .section.steamASLG").appendChild(newHeader); // Add new header to the div created above
    }
}

// Create the show/hide buttons on profile for:
function profileShowHideButtons() {
    // Total Statistics
    if (document.querySelector(".curseprofile .rightcolumn .section.stats h3")) {
        var btnTS = document.createElement("button");
        btnTS.setAttribute("id", "buttonShowHideTS");
        btnTS.setAttribute("class", "buttonShowHide btnTS");
        btnTS.onclick = function(){changeTSState();};
        document.querySelector(".curseprofile .rightcolumn .section.stats h3").appendChild(btnTS);
    }
    // Friends
    if (document.querySelector(".curseprofile .rightcolumn .section.friends h3")) {
        var btnF = document.createElement("button");
        btnF.setAttribute("id", "buttonShowHideF");
        btnF.setAttribute("class", "buttonShowHide btnF");
        btnF.onclick = function(){changeFState();};
        document.querySelector(".curseprofile .rightcolumn .section.friends h3").appendChild(btnF);
    }
    // Achievements Savage Lands Wiki (icons)
    if (document.querySelector(".curseprofile .rightcolumn .section.achievements h4")) {
        var btnASLW = document.createElement("button");
        btnASLW.setAttribute("id", "buttonShowHideASLW");
        btnASLW.setAttribute("class", "buttonShowHide btnASLW");
        btnASLW.onclick = function(){changeASLWState();};
        document.querySelector(".curseprofile .rightcolumn .section.achievements h4").appendChild(btnASLW);
    }
    // Achievements Savage Lands Game (icons name description) Broken!
    /*
    if (document.querySelector(".curseprofile .rightcolumn .section.steamASLG h4")) {
        var btnASLG = document.createElement("button");
        btnASLG.setAttribute("id", "buttonShowHideASLG");
        btnASLG.setAttribute("class", "buttonShowHide btnASLG");
        btnASLG.onclick = function(){changeASLGState();};
        document.querySelector(".curseprofile .rightcolumn .section.steamASLG h4").appendChild(btnASLG);
    }
    */
}

// Some magic to store values locally to check if right column parts should be shown/hidden
function getProfilePartsValues() {
	try {
        if (document.getElementById("buttonShowHideTS")) {
            var profileTSValue = localStorage.getItem("profileTSValue");
            if (profileTSValue == "show") {
                profileTSState = "show";
                showProfileTS();
            }
            else if (profileTSValue == "hide") {
                profileTSState = "hide";
                hideProfileTS();
            }
            else {
                profileTSState = "show";
                showProfileTS();
            }
        }
        if (document.getElementById("buttonShowHideF")) {
            var profileFValue = localStorage.getItem("profileFValue");
            if (profileFValue == "show") {
                profileFState = "show";
                showProfileF();
            }
            else if (profileFValue == "hide") {
                profileFState = "hide";
                hideProfileF();
            }
            else {
                profileFState = "show";
                showProfileF();
            }
        }
        if (document.getElementById("buttonShowHideASLW")) {
            var profileASLWValue = localStorage.getItem("profileASLWValue");
            if (profileASLWValue == "show") {
                profileASLWState = "show";
                showProfileASLW();
            }
            else if (profileASLWValue == "hide") {
                profileASLWState = "hide";
                hideProfileASLW();
            }
            else {
                profileASLWState = "show";
                showProfileASLW();
            }
        }
        if (document.getElementById("buttonShowHideASLG")) {
            var profileASLGValue = localStorage.getItem("profileASLGValue");
            if (profileASLGValue == "show") {
                profileASLGState = "show";
                showProfileASLG();
            }
            else if (profileASLGValue == "hide") {
                profileASLGState = "hide";
                hideProfileASLG();
            }
            else {
                profileASLGState = "show";
                showProfileASLG();
            }
        }
	}
	catch (error) {
		console.log("getProfilePartsValues > " + error);
		return;
	}
	finally {
		return;
	}
}

// Function to show Total Statistics on profile page
function showProfileTS() {
	document.querySelector(".section.stats").setAttribute("class", "section stats");
	document.getElementById("buttonShowHideTS").innerHTML = "Hide";
}

// Function to hide Total Statistics on profile page
function hideProfileTS() {
	document.querySelector(".section.stats").setAttribute("class", "section stats hidden");
	document.getElementById("buttonShowHideTS").innerHTML = "Show";
}

// Function to show Friends on profile page
function showProfileF() {
	document.querySelector(".section.friends").setAttribute("class", "section friends");
	document.getElementById("buttonShowHideF").innerHTML = "Hide";
}

// Function to hide Friends on profile page
function hideProfileF() {
	document.querySelector(".section.friends").setAttribute("class", "section friends hidden");
	document.getElementById("buttonShowHideF").innerHTML = "Show";
}

// Function to show Achievements Savage Lands Wiki on profile page
function showProfileASLW() {
	document.querySelector(".section.achievements").setAttribute("class", "section achievements");
	document.getElementById("buttonShowHideASLW").innerHTML = "Hide";
}

// Function to hide Achievements Savage Lands Wiki on profile page
function hideProfileASLW() {
	document.querySelector(".section.achievements").setAttribute("class", "section achievements hidden");
	document.getElementById("buttonShowHideASLW").innerHTML = "Show";
}

// Function to show Achievements Savage Lands Game on profile page
function showProfileASLG() {
	document.querySelector(".section.steamASLG").setAttribute("class", "section steamASLG");
	document.getElementById("buttonShowHideASLG").innerHTML = "Hide";
}

// Function to hide Achievements Savage Lands Game on profile page
function hideProfileASLG() {
	document.querySelector(".section.steamASLG").setAttribute("class", "section steamASLG hidden");
	document.getElementById("buttonShowHideASLG").innerHTML = "Show";
}

// Some magic to change the profile Total Statistics state and store the value locally
function changeTSState() {
	if (profileTSState == "show") {
		profileTSState = "hide";
		try {
			localStorage.setItem("profileTSValue", profileTSState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			hideProfileTS();
		}
	}
	else if (profileTSState == "hide") {
		profileTSState = "show";
		try {
			localStorage.setItem("profileTSValue", profileTSState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			showProfileTS();
		}
	}
}

// Some magic to change the profile Friends state and store the value locally
function changeFState() {
	if (profileFState == "show") {
		profileFState = "hide";
		try {
			localStorage.setItem("profileFValue", profileFState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			hideProfileF();
		}
	}
	else if (profileFState == "hide") {
		profileFState = "show";
		try {
			localStorage.setItem("profileFValue", profileFState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			showProfileF();
		}
	}
}

// Some magic to change the profile Achievements Savage Lands Wiki state and store the value locally
function changeASLWState() {
	if (profileASLWState == "show") {
		profileASLWState = "hide";
		try {
			localStorage.setItem("profileASLWValue", profileASLWState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			hideProfileASLW();
		}
	}
	else if (profileASLWState == "hide") {
		profileASLWState = "show";
		try {
			localStorage.setItem("profileASLWValue", profileASLWState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			showProfileASLW();
		}
	}
}

// Some magic to change the profile Achievements Savage Lands Game state and store the value locally
function changeASLGState() {
	if (profileASLGState == "show") {
		profileASLGState = "hide";
		try {
			localStorage.setItem("profileASLGValue", profileASLGState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			hideProfileASLG();
		}
	}
	else if (profileASLGState == "hide") {
		profileASLGState = "show";
		try {
			localStorage.setItem("profileASLGValue", profileASLGState);
		}
		catch (error) {
			console.log("Local Storage: Can not store value" + error);
			return;
		}
		finally {
			showProfileASLG();
		}
	}
}

function getSteamAchievements() {
    if (document.querySelector(".curseprofile .rightcolumn")) {
        if (document.querySelector(".curseprofile .profilelinks .steam")) {
            var hrefSteam = document.querySelector(".curseprofile .profilelinks .steam a").href;
            console.log("Steam Profile URL: " + hrefSteam);
            var urlCreate = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27" + hrefSteam + "/stats/307880/achievements/?xml=1%27";
            console.log("Yahoo SteamAPI URL: " + urlCreate);
            parseSteamData(urlCreate);
        } else {
            addInfoSteamASLG();
        }
    } else {
        console.log("getSteamAchievements > Most likely not on Profile page");
    }
}

// Add info to ASLG on profile right column with Info about this feature.
function addInfoSteamASLG() {
    var newInfoHTML = document.createElement("div"); // create div element
    newInfoHTML.setAttribute("id", "infoASLG"); // create id for div
    var newInfoText1HTML = document.createElement("p"); // create p element
    newInfoText1HTML.setAttribute("id", "infoText1"); // create id for p
    var newInfoText1 = document.createTextNode("Link your Steam account to unlock this feature."); // create infoText1 for p
    newInfoText1HTML.appendChild(newInfoText1); // add infoText1 with text to p
    newInfoHTML.appendChild(newInfoText1HTML); // Add p with infoText1 to div
    document.querySelector(".curseprofile .rightcolumn .section.steamASLG").appendChild(newInfoHTML); // Add the div after the header for section steamASLG
    $("#infoASLG").append("<p id='infoText2'>On your <a href='https://savagelands.gamepedia.com/Special:Preferences'>Edit Profile</a> page, scroll down until you locate 'Other Profiles' which will list Steam below it.<br />Make sure the URL you use for it looks like this: http://steamcommunity.com/id/&lt;NAME&gt;, which is the 'Custom URL' you have set for your Steam account.<br />Your achievements may take time to fully load in upon adding your Steam account.</p>"); // Add p with infoText2 to div
}

function parseSteamData(urlYahooSteamAPI) {
    $.ajax({
    url: urlYahooSteamAPI,
    dataType:'xml',
    crossDomain:true,
    success: parse
    });
}

function parse(xml) {
    console.log("Parsing Steam API Data for Achievements");
    var listAchievements = document.createElement("div"); // create new div for listAchievements
    listAchievements.setAttribute("id", "listASLG"); // add id listASLG to div
    document.querySelector(".curseprofile .rightcolumn .section.steamASLG").appendChild(listAchievements); // Add div listAchievements to the div steamASLG
    // The actual parsing
    if ($(xml).find("error").length == 0) { // If no error tag is found
        var achArray = {
            ach_creature_kills_1:"3/38/",
            ach_deer_kills_5:"0/05/",
            ach_wolf_kills_5:"e/e2/",
            ach_skeleton_kills_5:"d/d2/",
            ach_creature_kills_25:"a/af/",
            ach_plaguewolf_kills_3:"5/53/",
            ach_undeadfuries_kills_10:"8/8d/",
            ach_forestgiant_kills_1:"8/8b/",
            ach_day1tasks:"8/8d/",
            ach_build_campfire:"7/77/",
            ach_chop_trees_10:"4/42/",
            ach_build_leanto:"5/54/",
            ach_build_woodenshack:"6/6c/",
            ach_build_blacksmith:"b/bf/",
            ach_build_townhall:"c/c8/",
            ach_mine_items_25:"1/1f/",
            ach_craft_weapon:"b/bd/",
            ach_craft_compass:"f/f4/",
            ach_craft_wolfsbanesword:"7/7c/",
            ach_joinserver:"0/00/"
        };
        _gameAchievements = $(xml).find("achievement[closed='1']").each(function() { // Accomplished achievements
            var $nameAch = $(this).find("name").text(); // get Achievement name
            var $apiName = $(this).find("apiname").text(); // get Achievement apiname
            var $partURL = achArray[$apiName]; // Get partURL needed for imgURL construct
            var $imgURL = "https://savagelands.gamepedia.com/media/savagelands.gamepedia.com/" + $partURL + $apiName + ".jpg";; // Constructing image URL
            var $descrAch = $(this).find("description").text(); // get Achievement description
            var $timestampAch = $(this).find("unlockTimestamp").text(); // get Achievement Unlock timestamp in 10 digit UNIX epoch
            var timestampConverted = new Date($timestampAch*1000); // converts to millisecond format
            var dateUnlock = timestampConverted.toDateString(); // Date of unlocked achievement in Day(3) Month(3) Day Year
            var fullTimeUnlock = timestampConverted.toTimeString(); // Time of unlocked achievement including timezone with or without DST
            var timeUnlock = fullTimeUnlock.substr(0,8); // Substract only the time (hh:mm:ss)
            var timezoneUnlock = fullTimeUnlock.substr(9); // Substract only the timezone with or without DST
            $("#listASLG").append("<div id='steamAch'><img src='" + $imgURL + "'><div id='nameAch'>" + $nameAch + "</div><div id='descrAch'>" + $descrAch + "</div><div id='datetimeAch'>Unlocked on: " + dateUnlock + " at " + timeUnlock + "</div><div id='timezoneAch'>" + timezoneUnlock + "</div></div>"); // Add all this info in separate div tags with their own id
        });
        console.log("Parsing Done!");
        if (_gameAchievements.length === 0) { // No error tag, but no unlocked achievements found
            $("#listASLG").append("<div id='steamNoAch'>No Steam achievements unlocked yet!</div>");
        }
    } else { // Error tag found, Steam URL is most likely not entered correctly
        addInfoSteamASLG();
    }
}

// Getting required interactive map settings and toggle code depending on page
function getMapSettings() {
    if (document.querySelector(".page-Snowmere")) { // Map Snowmere
        getMapSettingsSnowmere();
        getTogglesCodeSnowmere();
    }
    if (document.querySelector(".page-Freydalyn")) { // Map Freydalyn
        getMapSettingsFreydalyn();
        getTogglesCodeFreydalyn();
    }
    if (document.querySelector(".page-Jormungahr")) { // Map Jormungahr
        getMapSettingsJormungahr();
        getTogglesCodeJormungahr();
    }
    console.log("No map page class found > No map loaded");
}

/* ******************** */
/* *** MAP SNOWMERE *** */
/* ******************** */
// Getting the map settings as stored locally for Snowmere
function getMapSettingsSnowmere() {
    if (document.querySelector(".page-Snowmere")) {
        try {
            /* var mapSareas = localStorage.getItem("mapSareas");
            var mapSiconLordKruul = localStorage.getItem("mapSiconLordKruul");
            var mapSdropLordKruul = localStorage.getItem("mapSdropLordKruul");
            var mapSiconRycnth = localStorage.getItem("mapSiconRycnth");
            var mapSiconPortalFreydalyn = localStorage.getItem("mapSiconPortalFreydalyn");
            var mapSreqFreydalyn = localStorage.getItem("mapSreqFreydalyn");
            var mapSiconsLore = localStorage.getItem("mapSiconsLore");
            var mapSspoiler = localStorage.getItem("mapSspoiler"); */

            var arrayNames = ["mapSareas", "mapSiconLordKruul", "mapSdropLordKruul", "mapSiconRycnth", "mapSiconPortalFreydalyn", "mapSreqFreydalyn", "mapStoggleNodes", "mapSiconsFlint", "mapSiconsCoal", "mapSiconsTin", "mapSiconsLore", "mapSspoiler"];
            for (var i = 0; i < arrayNames.length; i++) {
                eval("var " + arrayNames[i] + "= localStorage.getItem(arrayNames[i]);");
            }

            if (mapSareas == "true") {
                $("input[name=mapAreas]").prop("checked", true);
            }
            else {
                $("input[name=mapAreas]").prop("checked", false);
                mapSareas = "false";
            }
            if (mapSiconLordKruul == "true") {
                $("input[name=iconLordKruul]").prop("checked", true);
            }
            else {
                $("input[name=iconLordKruul]").prop("checked", false);
                mapSiconLordKruul = "false"
            }
            if (mapSdropLordKruul == "true") {
                $("input[name=iconLordKruulDrop]").prop("checked", true);
            }
            else {
                $("input[name=iconLordKruulDrop]").prop("checked", false);
                mapSdropLordKruul = "false"
            }
            if (mapSiconRycnth == "true") {
                $("input[name=iconRycnth]").prop("checked", true);
            }
            else {
                $("input[name=iconRycnth]").prop("checked", false);
                mapSiconRycnth = "false"
            }
            if (mapSiconPortalFreydalyn == "true") {
                $("input[name=iconPortalFreydalyn]").prop("checked", true);
            }
            else {
                $("input[name=iconPortalFreydalyn]").prop("checked", false);
                mapSiconPortalFreydalyn = "false";
            }
            if (mapSreqFreydalyn == "true") {
                $("input[name=iconPortalFreydalynReq]").prop("checked", true);
            }
            else {
                $("input[name=iconPortalFreydalynReq]").prop("checked", false);
                mapSreqFreydalyn = "false";
            }
            if (mapStoggleNodes == "true") {
                $("input[name=toggleNodes]").prop("checked", true);
            }
            else {
                $("input[name=toggleNodes]").prop("checked", false);
                mapStoggleNodes = "false";
            }
            if (mapSiconsFlint == "true") {
                $("input[name=iconsFlint]").prop("checked", true);
            }
            else {
                $("input[name=iconsFlint]").prop("checked", false);
                mapSiconsFlint = "false";
            }
            if (mapSiconsCoal == "true") {
                $("input[name=iconsCoal]").prop("checked", true);
            }
            else {
                $("input[name=iconsCoal]").prop("checked", false);
                mapSiconsCoal = "false";
            }
            if (mapSiconsTin == "true") {
                $("input[name=iconsTin]").prop("checked", true);
            }
            else {
                $("input[name=iconsTin]").prop("checked", false);
                mapSiconsTin = "false";
            }
            if (mapSiconsLore == "true") {
                $("input[name=iconsLore]").prop("checked", true);
            }
            else {
                $("input[name=iconsLore]").prop("checked", false);
                mapSiconsLore = "false"
            }
            if (mapSspoiler == "true") {
                $("input[name=mapSpoiler]").prop("checked", true);
                $("#mapLegend").show();
                $("#fullSVG").show();
                $("#mapIsland").show();
                $("#buttonReset").show();
                if (mapSareas == "true") {
                    $(".mapArea").show();
                }
                else {
                    $(".mapArea").hide();
                }
                if (mapSiconLordKruul == "true") {
                    $("#iconKruul").show();
                    $("#dropLordKruul").show();
                    if (mapSdropLordKruul == "true") {
                        $("#iconKruulDrop").show();
                    }
                    else {
                        $("#iconKruulDrop").hide();
                    }
                }
                else {
                    $("#iconKruul").hide();
                    $("#iconKruulDrop").hide();
                    $("#dropLordKruul").hide();
                }
                if (mapSiconRycnth == "true") {
                    $("#iconRycnth").show();
                }
                else {
                    $("#iconRycnth").hide();
                }
                if (mapSiconPortalFreydalyn == "true") {
                    $("#iconPortalFreydalyn").show();
                    $("#reqFreydalyn").show();
                    if (mapSreqFreydalyn == "true") {
                        $("#iconPortalFreydalynReq").show();
                    }
                    else {
                        $("#iconPortalFreydalynReq").hide();
                    }
                }
                else {
                    $("#iconPortalFreydalyn").hide();
                    $("#reqFreydalyn").hide();
                    $("#iconPortalFreydalynReq").hide();
                }
                if (mapStoggleNodes == "true") {
                    $("#toggleNodes").show();
                    if (mapSiconsFlint == "true") {
                        $("#groupFlint").show();
                    }
                    else {
                        $("#groupFlint").hide();
                    }
                    if (mapSiconsCoal == "true") {
                        $("#groupCoal").show();
                    }
                    else {
                        $("#groupCoal").hide();
                    }
                    if (mapSiconsTin == "true") {
                        $("#groupTin").show();
                    }
                    else {
                        $("#groupTin").hide();
                    }
                }
                else {
                    $("#toggleNodes").hide();
                    $("#groupFlint").hide();
                    $("#groupCoal").hide();
                    $("#groupTin").hide();
                }
                if (mapSiconsLore == "true") {
                    $("#groupLore").show();
                }
                else {
                    $("#groupLore").hide();
                }
            }
            else {
                $("input[name=mapSpoiler]").prop("checked", false);
                $("td#tableMap").css({ "background": "url('https://savagelands.gamepedia.com/media/savagelands.gamepedia.com/b/b4/Tarvhas_Maps.png') no-repeat", "background-size": "cover" });
                $("#mapLegend").hide();
                $("#fullSVG").hide();
                $("#mapIsland").hide();
                $(".mapArea").hide();
                $("#iconKruul").hide();
                $("#iconKruulDrop").hide();
                $("#iconRycnth").hide();
                $("#iconPortalFreydalyn").hide();
                $("#iconPortalFreydalynReq").hide();
                $("#toggleNodes").hide();
                $("#groupFlint").hide();
                $("#groupCoal").hide();
                $("#groupTin").hide();
                $("#groupLore").hide();
                $("#buttonReset").hide();
                $(".mapControls").hide();
            }
        }
        catch (error) {
            console.log("Issue loading getMapSettingsSnowmere() > " + error);
        }
        finally {
            return;
        }
    }
}

// Map toggle functionality for interactive map Snowmere
function getTogglesCodeSnowmere() {
    if (document.querySelector(".page-Snowmere")) {
        $("input[name=mapSpoiler]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("td#tableMap").css({ "background": "none" });
                $("#mapLegend").show();
                $("#fullSVG").show();
                $("#mapIsland").show();
                $("#buttonReset").show();
                $(".mapControls").show();
                localStorage.setItem("mapSspoiler", true);
                if ($("input[name=mapAreas]").prop("checked") === true) {
                    $(".mapArea").show();
                }
                if ($("input[name=iconLordKruul]").prop("checked") === true) {
                    $("#iconKruul").show();
                    $("#dropLordKruul").show();
                }
                else {
                    $("#dropLordKruul").hide();
                }
                if ($("input[name=iconLordKruulDrop]").prop("checked") === true) {
                    $("#iconKruulDrop").show();
                }
                if ($("input[name=iconRycnth]").prop("checked") === true) {
                    $("#iconRycnth").show();
                }
                if ($("input[name=iconPortalFreydalyn]").prop("checked") === true) {
                    $("#iconPortalFreydalyn").show();
                    $("#reqFreydalyn").show();
                }
                else {
                    $("#reqFreydalyn").hide();
                }
                if ($("input[name=iconPortalFreydalynReq]").prop("checked") === true) {
                    $("#iconPortalFreydalynReq").show();
                }
                if ($("input[name=toggleNodes]").prop("checked") === true) {
                    $("#toggleNodes").show();
                    if ($("input[name=iconsFlint]").prop("checked") === true) {
                        $("#groupFlint").show();
                    }
                    if ($("input[name=iconsCoal]").prop("checked") === true) {
                        $("#groupCoal").show();
                    }
                    if ($("input[name=iconsTin]").prop("checked") === true) {
                        $("#groupTin").show();
                    }
                }
                if ($("input[name=iconsLore]").prop("checked") === true) {
                    $("#groupLore").show();
            }
            }
            else {
                $("td#tableMap").css({ "background": "url('https://savagelands.gamepedia.com/media/savagelands.gamepedia.com/b/b4/Tarvhas_Maps.png') no-repeat", "background-size": "cover" });
                $("#mapLegend").hide();
                $("#fullSVG").hide();
                $("#mapIsland").hide();
                $(".mapArea").hide();
                $("#iconKruul").hide();
                $("#iconKruulDrop").hide();
                $("#iconRycnth").hide();
                $("#iconPortalFreydalyn").hide();
                $("#iconPortalFreydalynReq").hide();
                $("#toggleNodes").hide();
                $("#groupFlint").hide();
                $("#groupCoal").hide();
                $("#groupTin").hide();
                $("#groupLore").hide();
                $("#buttonReset").hide();
                $(".mapControls").hide();
                localStorage.setItem("mapSspoiler", false);
            }
        });

        $("input[name=mapAreas]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $(".mapArea").show();
                localStorage.setItem("mapSareas", true);
            }
            else {
                $(".mapArea").hide();
                localStorage.setItem("mapSareas", false);
            }
        });

        $("input[name=iconLordKruul]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconKruul").show();
                $("#dropLordKruul").show();
                if ($("input[name=iconLordKruulDrop]").prop("checked") === true) {
                    $("#iconKruulDrop").show();
                }
                localStorage.setItem("mapSiconLordKruul", true);
            }
            else {
                $("#iconKruul").hide();
                $("#iconKruulDrop").hide();
                $("#dropLordKruul").hide();
                localStorage.setItem("mapSiconLordKruul", false);
            }
        });

        $("input[name=iconLordKruulDrop]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconKruulDrop").show();
                localStorage.setItem("mapSdropLordKruul", true);
            }
            else {
                $("#iconKruulDrop").hide();
                localStorage.setItem("mapSdropLordKruul", false);
            }
        });

        $("input[name=iconRycnth]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconRycnth").show();
                localStorage.setItem("mapSiconRycnth", true);
            }
            else {
                $("#iconRycnth").hide();
                localStorage.setItem("mapSiconRycnth", false);
            }
        });

        $("input[name=iconPortalFreydalyn]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconPortalFreydalyn").show();
                $("#reqFreydalyn").show();
                if ($("input[name=iconPortalFreydalynReq]").prop("checked") === true) {
                    $("#iconPortalFreydalynReq").show();
                }
                localStorage.setItem("mapSiconPortalFreydalyn", true);
            }
            else {
                $("#iconPortalFreydalyn").hide();
                $("#iconPortalFreydalynReq").hide();
                $("#reqFreydalyn").hide();
                localStorage.setItem("mapSiconPortalFreydalyn", false);
            }
        });

        $("input[name=iconPortalFreydalynReq]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconPortalFreydalynReq").show();
                localStorage.setItem("mapSreqFreydalyn", true);
            }
            else {
                $("#iconPortalFreydalynReq").hide();
                localStorage.setItem("mapSreqFreydalyn", false);
            }
        });

        $("input[name=toggleNodes]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleNodes").show();
                if ($("input[name=iconsFlint]").prop("checked") === true) {
                    $("#groupFlint").show();
                }
                if ($("input[name=iconsCoal]").prop("checked") === true) {
                    $("#groupCoal").show();
                }
                if ($("input[name=iconsTin]").prop("checked") === true) {
                    $("#groupTin").show();
                }
                localStorage.setItem("mapStoggleNodes", true);
            }
            else {
                $("#toggleNodes").hide();
                $("#groupFlint").hide();
                $("#groupCoal").hide();
                $("#groupTin").hide();
                localStorage.setItem("mapStoggleNodes", false);
            }
        });

        $("input[name=iconsFlint]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupFlint").show();
                localStorage.setItem("mapSiconsFlint", true);
            }
            else {
                $("#groupFlint").hide();
                localStorage.setItem("mapSiconsFlint", false);
            }
        });

        $("input[name=iconsCoal]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupCoal").show();
                localStorage.setItem("mapSiconsCoal", true);
            }
            else {
                $("#groupCoal").hide();
                localStorage.setItem("mapSiconsCoal", false);
            }
        });

        $("input[name=iconsTin]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupTin").show();
                localStorage.setItem("mapSiconsTin", true);
            }
            else {
                $("#groupTin").hide();
                localStorage.setItem("mapSiconsTin", false);
            }
        });

        $("input[name=iconsLore]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupLore").show();
                localStorage.setItem("mapSiconsLore", true);
            }
            else {
                $("#groupLore").hide();
                localStorage.setItem("mapSiconsLore", false);
            }
        });
    }
}

// To reset all toggles for Snowmere
function resetTogglesSnowmere() {
    // to turn all toggles off
    $("button.buttonReset").css("color", "#006600");
    $("button.buttonReset").css("border", "1px solid #006600");
    $(".mapArea").hide();
    $("input[name=mapAreas]").prop("checked", false);
    localStorage.setItem("mapSareas", false);
    $("#iconKruul").hide();
    $("input[name=iconLordKruul]").prop("checked", false);
    localStorage.setItem("mapSiconLordKruul", false);
    $("#iconKruulDrop").hide();
    $("input[name=iconLordKruulDrop]").prop("checked", false);
    $("#dropLordKruul").hide();
    localStorage.setItem("mapSdropLordKruul", false);
    $("#iconRycnth").hide();
    $("input[name=iconRycnth]").prop("checked", false);
    localStorage.setItem("mapSiconRycnth", false);
    $("#iconPortalFreydalyn").hide();
    $("input[name=iconPortalFreydalyn]").prop("checked", false);
    localStorage.setItem("mapSiconPortalFreydalyn", false);
    $("#iconPortalFreydalynReq").hide();
    $("input[name=iconPortalFreydalynReq]").prop("checked", false);
    $("#reqFreydalyn").hide();
    localStorage.setItem("mapSreqFreydalyn", false);
    $("#groupFlint").hide();
    $("input[name=iconsFlint]").prop("checked", false);
    localStorage.setItem("mapSiconsFlint", false);
    $("#groupCoal").hide();
    $("input[name=iconsCoal]").prop("checked", false);
    localStorage.setItem("mapSiconsCoal", false);
    $("#groupTin").hide();
    $("input[name=iconsTin]").prop("checked", false);
    localStorage.setItem("mapSiconsTin", false);
    $("#toggleNodes").hide();
    $("input[name=toggleNodes]").prop("checked", false);
    localStorage.setItem("mapStoggleNodes", false);
    $("#groupLore").hide();
    $("input[name=iconsLore]").prop("checked", false);
    localStorage.setItem("mapSiconsLore", false);
    window.setTimeout(resetButtonAnimation, 500);
}


/* ********************* */
/* *** MAP FREYDALYN *** */
/* ********************* */
// Getting the map settings as stored locally for Freydalyn
function getMapSettingsFreydalyn() {
    if (document.querySelector(".page-Freydalyn")) {
        try {
            var arrayNames = ["mapFareas", "mapFtoggleGiants", "mapFiconFGEldair", "mapFdropFGEldair", "mapFiconFGKet", "mapFdropFGKet", "mapFiconFGGrot", "mapFdropFGGrot", "mapFiconFGThuum", "mapFdropFGThuum", "mapFiconDevourer", "mapFiconEriandhor", "mapFiconKiffi", "mapFtoggleIslandPortals", "mapFiconPortalSnowmere", "mapFreqPortalSnowmere", "mapFiconPortalJormungahr", "mapFreqPortalJormungahr", "mapFtoggleSpecialWeapons", "mapFiconDonsStaff", "mapFiconFleshRipper", "mapFiconTheNeedle", "mapFtoggleNodes", "mapFiconsFlint", "mapFiconsCoal", "mapFiconsTin", "mapFiconsCopper", "mapFiconsIron", "mapFiconsLore", "mapFspoiler"];
            for (var i = 0; i < arrayNames.length; i++) {
                eval("var " + arrayNames[i] + "= localStorage.getItem(arrayNames[i]);");
            }

            /* Remove all 'elses' below?
             * Maybe fully initiate everything once and only leave the on change functionality
             * Should not even rely on first 'spoiler' true/false
             * The full code can certainly be shortened */
            if (mapFareas == "true") {
                $("input[name=mapAreas]").prop("checked", true);
            }
            else {
                $("input[name=mapAreas]").prop("checked", false);
                mapFareas = "false";
            }
            if (mapFtoggleGiants == "true") {
                $("input[name=toggleGiants]").prop("checked", true);
            }
            else {
                $("input[name=toggleGiants]").prop("checked", false);
                mapFtoggleGiants = "false";
            }
            if (mapFiconFGEldair == "true") {
                $("input[name=iconFGEldair]").prop("checked", true);
            }
            else {
                $("input[name=iconFGEldair]").prop("checked", false);
                mapFiconFGEldair = "false"
            }
            if (mapFdropFGEldair == "true") {
                $("input[name=iconFGEldairDrop]").prop("checked", true);
            }
            else {
                $("input[name=iconFGEldairDrop]").prop("checked", false);
                mapFdropFGEldair = "false"
            }
            if (mapFiconFGKet == "true") {
                $("input[name=iconFGKet]").prop("checked", true);
            }
            else {
                $("input[name=iconFGKet]").prop("checked", false);
                mapFiconFGKet = "false"
            }
            if (mapFdropFGKet == "true") {
                $("input[name=iconFGKetDrop]").prop("checked", true);
            }
            else {
                $("input[name=iconFGKetDrop]").prop("checked", false);
                mapFdropFGKet = "false"
            }
            if (mapFiconFGGrot == "true") {
                $("input[name=iconFGGrot]").prop("checked", true);
            }
            else {
                $("input[name=iconFGGrot]").prop("checked", false);
                mapFiconFGGrot = "false"
            }
            if (mapFdropFGGrot == "true") {
                $("input[name=iconFGGrotDrop]").prop("checked", true);
            }
            else {
                $("input[name=iconFGGrotDrop]").prop("checked", false);
                mapFdropFGGrot = "false"
            }
            if (mapFiconFGThuum == "true") {
                $("input[name=iconFGThuum]").prop("checked", true);
            }
            else {
                $("input[name=iconFGThuum]").prop("checked", false);
                mapFiconFGThuum = "false"
            }
            if (mapFdropFGThuum == "true") {
                $("input[name=iconFGThuumDrop]").prop("checked", true);
            }
            else {
                $("input[name=iconFGThuumDrop]").prop("checked", false);
                mapFdropFGThuum = "false"
            }
            if (mapFiconDevourer == "true") {
                $("input[name=iconDevourer]").prop("checked", true);
            }
            else {
                $("input[name=iconDevourer]").prop("checked", false);
                mapFiconDevourer = "false";
            }
            if (mapFiconEriandhor == "true") {
                $("input[name=iconEriandhor]").prop("checked", true);
            }
            else {
                $("input[name=iconEriandhor]").prop("checked", false);
                mapFiconEriandhor = "false";
            }
            if (mapFiconKiffi == "true") {
                $("input[name=iconKiffi]").prop("checked", true);
            }
            else {
                $("input[name=iconKiffi]").prop("checked", false);
                mapFiconKiffi = "false";
            }
            if (mapFtoggleIslandPortals == "true") {
                $("input[name=toggleIslandPortals]").prop("checked", true);
            }
            else {
                $("input[name=toggleIslandPortals]").prop("checked", false);
                mapFtoggleIslandPortals = "false";
            }
            if (mapFiconPortalSnowmere == "true") {
                $("input[name=iconPortalSnowmere]").prop("checked", true);
            }
            else {
                $("input[name=iconPortalSnowmere]").prop("checked", false);
                mapFiconPortalSnowmere = "false";
            }
            if (mapFreqPortalSnowmere == "true") {
                $("input[name=iconPortalSnowmereReq]").prop("checked", true);
            }
            else {
                $("input[name=iconPortalSnowmereReq]").prop("checked", false);
                mapFreqPortalSnowmere = "false";
            }
            if (mapFiconPortalJormungahr == "true") {
                $("input[name=iconPortalJormungahr]").prop("checked", true);
            }
            else {
                $("input[name=iconPortalJormungahr]").prop("checked", false);
                mapFiconPortalJormungahr = "false";
            }
            if (mapFreqPortalJormungahr == "true") {
                $("input[name=iconPortalJormungahrReq]").prop("checked", true);
            }
            else {
                $("input[name=iconPortalJormungahrReq]").prop("checked", false);
                mapFreqPortalJormungahr = "false";
            }
            if (mapFtoggleSpecialWeapons == "true") {
                $("input[name=toggleSpecialWeapons]").prop("checked", true);
            }
            else {
                $("input[name=toggleSpecialWeapons]").prop("checked", false);
                mapFtoggleSpecialWeapons = "false";
            }
            if (mapFiconDonsStaff == "true") {
                $("input[name=iconDonsStaff]").prop("checked", true);
            }
            else {
                $("input[name=iconDonsStaff]").prop("checked", false);
                mapFiconDonsStaff = "false";
            }
            if (mapFiconFleshRipper == "true") {
                $("input[name=iconFleshRipper]").prop("checked", true);
            }
            else {
                $("input[name=iconFleshRipper]").prop("checked", false);
                mapFiconFleshRipper = "false";
            }
            if (mapFiconTheNeedle == "true") {
                $("input[name=iconTheNeedle]").prop("checked", true);
            }
            else {
                $("input[name=iconTheNeedle]").prop("checked", false);
                mapFiconTheNeedle = "false";
            }
            if (mapFtoggleNodes == "true") {
                $("input[name=toggleNodes]").prop("checked", true);
            }
            else {
                $("input[name=toggleNodes]").prop("checked", false);
                mapFtoggleNodes = "false";
            }
            if (mapFiconsFlint == "true") {
                $("input[name=iconsFlint]").prop("checked", true);
            }
            else {
                $("input[name=iconsFlint]").prop("checked", false);
                mapFiconsFlint = "false";
            }
            if (mapFiconsCoal == "true") {
                $("input[name=iconsCoal]").prop("checked", true);
            }
            else {
                $("input[name=iconsCoal]").prop("checked", false);
                mapFiconsCoal = "false";
            }
            if (mapFiconsTin == "true") {
                $("input[name=iconsTin]").prop("checked", true);
            }
            else {
                $("input[name=iconsTin]").prop("checked", false);
                mapFiconsTin = "false";
            }
            if (mapFiconsCopper == "true") {
                $("input[name=iconsCopper]").prop("checked", true);
            }
            else {
                $("input[name=iconsCopper]").prop("checked", false);
                mapFiconsCopper = "false";
            }
            if (mapFiconsIron == "true") {
                $("input[name=iconsIron]").prop("checked", true);
            }
            else {
                $("input[name=iconsIron]").prop("checked", false);
                mapFiconsIron = "false";
            }
            if (mapFiconsLore == "true") {
                $("input[name=iconsLore]").prop("checked", true);
            }
            else {
                $("input[name=iconsLore]").prop("checked", false);
                mapFiconsLore = "false"
            }
            if (mapFspoiler == "true") {
                $("input[name=mapSpoiler]").prop("checked", true);
                $("#mapLegend").show();
                $("#fullSVG").show();
                $("#mapIsland").show();
                $("#buttonReset").show();
                if (mapFareas == "true") {
                    $(".mapArea").show();
                }
                else {
                    $(".mapArea").hide();
                }
                if (mapFtoggleGiants == "true") {
                    $("#toggleGiants").show();
                    if (mapFiconFGEldair == "true") {
                        $("#toggleDropFGEldair").show();
                        $("#iconFGEldair").show();
                        if (mapFdropFGEldair == "true") {
                            $("#iconFGEldairDrop").show();
                        }
                        else {
                            $("#iconFGEldairDrop").hide();
                        }
                    }
                    else {
                        $("#toggleDropFGEldair").hide();
                    }
                    if (mapFiconFGKet == "true") {
                        $("#toggleDropFGKet").show();
                        $("#iconFGKet").show();
                        if (mapFdropFGKet == "true") {
                            $("#iconFGKetDrop").show();
                        }
                        else {
                            $("#iconFGKetDrop").hide();
                        }
                    }
                    else {
                        $("#toggleDropFGKet").hide();
                    }
                    if (mapFiconFGGrot == "true") {
                        $("#toggleDropFGGrot").show();
                        $("#iconFGGrot").show();
                        if (mapFdropFGGrot == "true") {
                            $("#iconFGGrotDrop").show();
                        }
                        else {
                            $("#iconFGGrotDrop").hide();
                        }
                    }
                    else {
                        $("#toggleDropFGGrot").hide();
                    }
                    if (mapFiconFGThuum == "true") {
                        $("#toggleDropFGThuum").show();
                        $("#iconFGThuum").show();
                        if (mapFdropFGThuum == "true") {
                            $("#iconFGThuumDrop").show();
                        }
                        else {
                            $("#iconFGThuumDrop").hide();
                        }
                    }
                    else {
                        $("#toggleDropFGThuum").hide();
                    }
                }
                else {
                    $("#toggleGiants").hide();
                    $("#iconFGEldair").hide();
                    $("#iconFGEldairDrop").hide();
                    $("#iconFGKet").hide();
                    $("#iconFGKetDrop").hide();
                    $("#iconFGGrot").hide();
                    $("#iconFGGrotDrop").hide();
                    $("#iconFGThuum").hide();
                    $("#iconFGThuumDrop").hide();
                }

                if (mapFiconDevourer == "true") {
                    $("#iconDevourer").show();
                }
                else {
                    $("#iconDevourer").hide();
                }

                if (mapFiconEriandhor == "true") {
                    $("#iconEriandhor").show();
                }
                else {
                    $("#iconEriandhor").hide();
                }

                if (mapFiconKiffi == "true") {
                    $("#iconKiffi").show();
                }
                else {
                    $("#iconKiffi").hide();
                }

                if (mapFtoggleIslandPortals == "true") {
                    $("#toggleIslandPortals").show();
                    if (mapFiconPortalSnowmere == "true") {
                        $("#iconPortalSnowmere").show();
                        $("#toggleReqPortalSnowmere").show();
                        if (mapFreqPortalSnowmere == "true") {
                            $("#iconPortalSnowmereReq").show();
                        }
                        else {
                            $("#iconPortalSnowmereReq").hide();
                        }
                    }
                    else {
                        $("#iconPortalSnowmere").hide();
                        $("#toggleReqPortalSnowmere").hide();
                        $("#iconPortalSnowmereReq").hide();
                    }
                    if (mapFiconPortalJormungahr == "true") {
                        $("#iconPortalJormungahr").show();
                        $("#toggleReqPortalJormungahr").show();
                        if (mapFreqPortalJormungahr == "true") {
                            $("[id^='iconPortalJormungahrReq']").show();
                        }
                        else {
                            $("[id^='iconPortalJormungahrReq']").hide();
                        }
                    }
                    else {
                        $("#iconPortalJormungahr").hide();
                        $("#toggleReqPortalJormungahr").hide();
                        $("[id^='iconPortalJormungahrReq']").hide();
                    }
                }
                else {
                    $("#toggleIslandPortals").hide();
                    $("#iconPortalSnowmere").hide();
                    $("#iconPortalSnowmereReq").hide();
                    $("#iconPortalJormungahr").hide();
                    $("[id^='iconPortalJormungahrReq']").hide();
                }
                if (mapFtoggleSpecialWeapons == "true") {
                    $("#toggleSpecialWeapons").show();
                    if (mapFiconDonsStaff == "true") {
                        $("#iconDonsStaff").show();
                    }
                    if (mapFiconFleshRipper == "true") {
                        $("#iconFleshRipper").show();
                    }
                    if (mapFiconTheNeedle == "true") {
                        $("#iconTheNeedle").show();
                    }
                }
                else {
                    $("#toggleSpecialWeapons").hide();
                    $("#iconDonsStaff").hide();
                    $("#iconFleshRipper").hide();
                    $("#iconTheNeedle").hide();
                }
                if (mapFtoggleNodes == "true") {
                    $("#toggleNodes").show();
                    if (mapFiconsFlint == "true") {
                        $("#groupFlint").show();
                    }
                    else {
                        $("#groupFlint").hide();
                    }
                    if (mapFiconsCoal == "true") {
                        $("#groupCoal").show();
                    }
                    else {
                        $("#groupCoal").hide();
                    }
                    if (mapFiconsTin == "true") {
                        $("#groupTin").show();
                    }
                    else {
                        $("#groupTin").hide();
                    }
                    if (mapFiconsCopper == "true") {
                        $("#groupCopper").show();
                    }
                    else {
                        $("#groupCopper").hide();
                    }
                    if (mapFiconsIron == "true") {
                        $("#groupIron").show();
                    }
                    else {
                        $("#groupIron").hide();
                    }
                }
                else {
                    $("#toggleNodes").hide();
                    $("#groupFlint").hide();
                    $("#groupCoal").hide();
                    $("#groupTin").hide();
                    $("#groupCopper").hide();
                    $("#groupIron").hide();
                }
                if (mapFiconsLore == "true") {
                    $("#groupLore").show();
                }
                else {
                    $("#groupLore").hide();
                }
            }
            else {
                $("input[name=mapSpoiler]").prop("checked", false);
                mapFspoiler = "false";
                $("td#tableMap").css({ "background": "url('https://savagelands.gamepedia.com/media/savagelands.gamepedia.com/b/b4/Tarvhas_Maps.png') no-repeat", "background-size": "cover" });
                $("#mapLegend").hide();
                $("#fullSVG").hide();
                $("#mapIsland").hide();
                /* !!! Wonder if below hiding of multiple other parts is needed
                 * Hiding main parts should still keep correct states? */
                $(".mapArea").hide();
                $("#toggleGiants").hide();
                $("#iconFGEldair").hide();
                $("#iconFGEldairDrop").hide();
                $("#iconFGKet").hide();
                $("#iconFGKetDrop").hide();
                $("#iconFGGrot").hide();
                $("#iconFGGrotDrop").hide();
                $("#iconFGThuum").hide();
                $("#iconFGThuumDrop").hide();
                $("#iconDevourer").hide();
                $("#iconEriandhor").hide();
                $("#iconKiffi").hide();
                $("#toggleIslandPortals").hide();
                $("#iconPortalSnowmere").hide();
                $("#iconPortalSnowmereReq").hide();
                $("#iconPortalJormungahr").hide();
                $("[id^='iconPortalJormungahrReq']").hide();
                $("#toggleSpecialWeapons").hide();
                $("#iconDonsStaff").hide();
                $("#iconFleshRipper").hide();
                $("#iconTheNeedle").hide();
                $("#toggleNodes").hide();
                $("#groupFlint").hide();
                $("#groupCoal").hide();
                $("#groupTin").hide();
                $("#groupCopper").hide();
                $("#groupIron").hide();
                $("#groupLore").hide();
                $("#buttonReset").hide();
                $(".mapControls").hide();
            }
        }
        catch (error) {
            console.log("Issue loading getMapSettingsFreydalyn() > " + error);
        }
        finally {
            return;
        }
    }
}

// Map toggle functionality for interactive map Freydalyn
function getTogglesCodeFreydalyn() {
    if (document.querySelector(".page-Freydalyn")) {
        $("input[name=mapSpoiler]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("td#tableMap").css({ "background": "none" });
                $("#mapLegend").show();
                $("#fullSVG").show();
                $("#mapIsland").show();
                $("#buttonReset").show();
                $(".mapControls").show();
                localStorage.setItem("mapFspoiler", true);
                /* !!! Wonder if below checking for most parts is actually needed again
                * With showing main parts again, states should still be correct? */
                if ($("input[name=mapAreas]").prop("checked") === true) {
                    $(".mapArea").show();
                }
                if ($("input[name=toggleGiants]").prop("checked") === true) {
                    $("#toggleGiants").show();
                    if ($("input[name=iconFGEldair]").prop("checked") === true) {
                        $("#toggleDropFGEldair").show();
                        $("#iconFGEldair").show();
                        if ($("input[name=iconFGEldairDrop]").prop("checked") === true) {
                            $("#iconFGEldairDrop").show();
                        }
                    }
                    else {
                        $("#toggleDropFGEldair").hide();
                    }
                    if ($("input[name=iconFGKet]").prop("checked") === true) {
                        $("#toggleDropFGKet").show();
                        $("#iconFGKet").show();
                        if ($("input[name=iconFGKetDrop]").prop("checked") === true) {
                            $("#iconFGKetDrop").show();
                        }
                    }
                    else {
                        $("#toggleDropFGKet").hide();
                    }
                    if ($("input[name=iconFGGrot]").prop("checked") === true) {
                        $("#toggleDropFGGrot").show();
                        $("#iconFGGrot").show();
                        if ($("input[name=iconFGGrotDrop]").prop("checked") === true) {
                            $("#iconFGGrotDrop").show();
                        }
                    }
                    else {
                        $("#toggleDropFGGrot").hide();
                    }
                    if ($("input[name=iconFGThuum]").prop("checked") === true) {
                        $("#toggleDropFGThuum").show();
                        $("#iconFGThuum").show();
                        if ($("input[name=iconFGThuumDrop]").prop("checked") === true) {
                            $("#iconFGThuumDrop").show();
                        }
                    }
                    else {
                        $("#toggleDropFGThuum").hide();
                    }
                }
                if ($("input[name=iconDevourer]").prop("checked") === true) {
                    $("#iconDevourer").show();
                }
                if ($("input[name=iconEriandhor]").prop("checked") === true) {
                    $("#iconEriandhor").show();
                }
                if ($("input[name=iconKiffi]").prop("checked") === true) {
                    $("#iconKiffi").show();
                }
                if ($("input[name=toggleIslandPortals]").prop("checked") === true) {
                    $("#toggleIslandPortals").show();
                    if ($("input[name=iconPortalSnowmere]").prop("checked") === true) {
                        $("#iconPortalSnowmere").show();
                        $("#toggleReqPortalSnowmere").show();
                        if ($("input[name=iconPortalSnowmereReq]").prop("checked") === true) {
                            $("#iconPortalSnowmereReq").show();
                        }
                    }
                    else {
                        $("#toggleReqPortalSnowmere").hide();
                    }
                    if ($("input[name=iconPortalJormungahr]").prop("checked") === true) {
                        $("#iconPortalJormungahr").show();
                        $("#toggleReqPortalJormungahr").show();
                        if ($("input[name=iconPortalJormungahrReq]").prop("checked") === true) {
                            $("[id^='iconPortalJormungahrReq']").show();
                        }
                    }
                    else {
                        $("#toggleReqPortalJormungahr").hide();
                    }
                }
                if ($("input[name=toggleSpecialWeapons]").prop("checked") === true) {
                    $("#toggleSpecialWeapons").show();
                    if ($("input[name=iconDonsStaff]").prop("checked") === true) {
                        $("#iconDonsStaff").show();
                    }
                    if ($("input[name=iconFleshRipper]").prop("checked") === true) {
                        $("#iconFleshRipper").show();
                    }
                    if ($("input[name=iconTheNeedle]").prop("checked") === true) {
                        $("#iconTheNeedle").show();
                    }
                }
                if ($("input[name=toggleNodes]").prop("checked") === true) {
                    $("#toggleNodes").show();
                    if ($("input[name=iconsFlint]").prop("checked") === true) {
                        $("#groupFlint").show();
                    }
                    if ($("input[name=iconsCoal]").prop("checked") === true) {
                        $("#groupCoal").show();
                    }
                    if ($("input[name=iconsTin]").prop("checked") === true) {
                        $("#groupTin").show();
                    }
                    if ($("input[name=iconsCopper]").prop("checked") === true) {
                        $("#groupCopper").show();
                    }
                    if ($("input[name=iconsIron]").prop("checked") === true) {
                        $("#groupIron").show();
                    }
                }
                if ($("input[name=iconsLore]").prop("checked") === true) {
                    $("#groupLore").show();
                }
            }
            else {
                $("td#tableMap").css({ "background": "url('https://savagelands.gamepedia.com/media/savagelands.gamepedia.com/b/b4/Tarvhas_Maps.png') no-repeat", "background-size": "cover" });
                $("#mapLegend").hide();
                $("#fullSVG").hide();
                $("#mapIsland").hide();
                $(".mapArea").hide();
                $("#toggleGiants").hide();
                $("#iconFGEldair").hide();
                $("#iconFGEldairDrop").hide();
                $("#iconFGKet").hide();
                $("#iconFGKetDrop").hide();
                $("#iconFGGrot").hide();
                $("#iconFGGrotDrop").hide();
                $("#iconFGThuum").hide();
                $("#iconFGThuumDrop").hide();
                $("#iconDevourer").hide();
                $("#iconEriandhor").hide();
                $("#iconKiffi").hide();
                $("#toggleIslandPortals").hide();
                $("#iconPortalSnowmere").hide();
                $("#iconPortalSnowmereReq").hide();
                $("#iconPortalJormungahr").hide();
                $("[id^='iconPortalJormungahrReq']").hide();
                $("#toggleSpecialWeapons").hide();
                $("#iconDonsStaff").hide();
                $("#iconFleshRipper").hide();
                $("#iconTheNeedle").hide();
                $("#toggleNodes").hide();
                $("#groupFlint").hide();
                $("#groupCoal").hide();
                $("#groupTin").hide();
                $("#groupCopper").hide();
                $("#groupIron").hide();
                $("#groupLore").hide();
                $("#buttonReset").hide();
                $(".mapControls").hide();
                localStorage.setItem("mapFspoiler", false);
            }
        });

        $("input[name=mapAreas]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $(".mapArea").show();
                localStorage.setItem("mapFareas", true);
            }
            else {
                $(".mapArea").hide();
                localStorage.setItem("mapFareas", false);
            }
        });

        $("input[name=toggleGiants]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleGiants").show();
                if ($("input[name=iconFGEldair]").prop("checked") === true) {
                    $("#toggleDropFGEldair").show();
                    $("#iconFGEldair").show();
                    if ($("input[name=iconFGEldairDrop]").prop("checked") === true) {
                        $("#iconFGEldairDrop").show();
                    }
                }
                else {
                    $("#toggleDropFGEldair").hide();
                }
                if ($("input[name=iconFGKet]").prop("checked") === true) {
                    $("#toggleDropFGKet").show();
                    $("#iconFGKet").show();
                    if ($("input[name=iconFGKetDrop]").prop("checked") === true) {
                        $("#iconFGKetDrop").show();
                    }
                }
                else {
                    $("#toggleDropFGKet").hide();
                }
                if ($("input[name=iconFGGrot]").prop("checked") === true) {
                    $("#toggleDropFGGrot").show();
                    $("#iconFGGrot").show();
                    if ($("input[name=iconFGGrotDrop]").prop("checked") === true) {
                        $("#iconFGGrotDrop").show();
                    }
                }
                else {
                    $("#toggleDropFGGrot").hide();
                }
                if ($("input[name=iconFGThuum]").prop("checked") === true) {
                    $("#toggleDropFGThuum").show();
                    $("#iconFGThuum").show();
                    if ($("input[name=iconFGThuumDrop]").prop("checked") === true) {
                        $("#iconFGThuumDrop").show();
                    }
                }
                else {
                    $("#toggleDropFGThuum").hide();
                }
                localStorage.setItem("mapFtoggleGiants", true);
            }
            else {
                $("#toggleGiants").hide();
                $("#iconFGEldair").hide();
                $("#iconFGEldairDrop").hide();
                $("#iconFGKet").hide();
                $("#iconFGKetDrop").hide();
                $("#iconFGGrot").hide();
                $("#iconFGGrotDrop").hide();
                $("#iconFGThuum").hide();
                $("#iconFGThuumDrop").hide();
                localStorage.setItem("mapFtoggleGiants", false);
            }
        });

        $("input[name=iconFGEldair]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleDropFGEldair").show();
                $("#iconFGEldair").show();
                if ($("input[name=iconFGEldairDrop]").prop("checked") === true) {
                    $("#iconFGEldairDrop").show();
                }
                localStorage.setItem("mapFiconFGEldair", true);
            }
            else {
                $("#toggleDropFGEldair").hide();
                $("#iconFGEldairDrop").hide();
                $("#iconFGEldair").hide();
                localStorage.setItem("mapFiconFGEldair", false);
            }
        });

        $("input[name=iconFGKet]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleDropFGKet").show();
                $("#iconFGKet").show();
                if ($("input[name=iconFGKetDrop]").prop("checked") === true) {
                    $("#iconFGKetDrop").show();
                }
                localStorage.setItem("mapFiconFGKet", true);
            }
            else {
                $("#toggleDropFGKet").hide();
                $("#iconFGKetDrop").hide();
                $("#iconFGKet").hide();
                localStorage.setItem("mapFiconFGKet", false);
            }
        });

        $("input[name=iconFGGrot]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleDropFGGrot").show();
                $("#iconFGGrot").show();
                if ($("input[name=iconFGGrotDrop]").prop("checked") === true) {
                    $("#iconFGGrotDrop").show();
                }
                localStorage.setItem("mapFiconFGGrot", true);
            }
            else {
                $("#toggleDropFGGrot").hide();
                $("#iconFGGrotDrop").hide();
                $("#iconFGGrot").hide();
                localStorage.setItem("mapFiconFGGrot", false);
            }
        });

        $("input[name=iconFGThuum]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleDropFGThuum").show();
                $("#iconFGThuum").show();
                if ($("input[name=iconFGThuumDrop]").prop("checked") === true) {
                    $("#iconFGThuumDrop").show();
                }
                localStorage.setItem("mapFiconFGThuum", true);
            }
            else {
                $("#toggleDropFGThuum").hide();
                $("#iconFGThuumDrop").hide();
                $("#iconFGThuum").hide();
                localStorage.setItem("mapFiconFGThuum", false);
            }
        });

        $("input[name=iconFGEldairDrop]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconFGEldairDrop").show();
                localStorage.setItem("mapFdropFGEldair", true);
            }
            else {
                $("#iconFGEldairDrop").hide();
                localStorage.setItem("mapFdropFGEldair", false);
            }
        });

        $("input[name=iconFGKetDrop]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconFGKetDrop").show();
                localStorage.setItem("mapFdropFGKet", true);
            }
            else {
                $("#iconFGKetDrop").hide();
                localStorage.setItem("mapFdropFGKet", false);
            }
        });

        $("input[name=iconFGGrotDrop]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconFGGrotDrop").show();
                localStorage.setItem("mapFdropFGGrot", true);
            }
            else {
                $("#iconFGGrotDrop").hide();
                localStorage.setItem("mapFdropFGGrot", false);
            }
        });

        $("input[name=iconFGThuumDrop]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconFGThuumDrop").show();
                localStorage.setItem("mapFdropFGThuum", true);
            }
            else {
                $("#iconFGThuumDrop").hide();
                localStorage.setItem("mapFdropFGThuum", false);
            }
        });

        $("input[name=toggleIslandPortals]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleIslandPortals").show();
                if ( $("input[name=iconPortalSnowmere]").prop("checked") === true) {
                    $("#toggleReqPortalSnowmere").show();
                    $("#iconPortalSnowmere").show();
                    if ($("input[name=iconPortalSnowmereReq]").prop("checked") === true) {
                        $("#iconPortalSnowmereReq").show();
                    }
                }
                else {
                    $("#toggleReqPortalSnowmere").hide();
                }
                if ( $("input[name=iconPortalJormungahr]").prop("checked") === true) {
                    $("#toggleReqPortalJormungahr").show();
                    $("#iconPortalJormungahr").show();
                    if ($("input[name=iconPortalJormungahrReq]").prop("checked") === true) {
                        $("[id^='iconPortalJormungahrReq']").show();
                    }
                }
                else {
                    $("#toggleReqPortalJormungahr").hide();
                }
                localStorage.setItem("mapFtoggleIslandPortals", true);
            }
            else {
                $("#toggleIslandPortals").hide();
                $("#iconPortalSnowmere").hide();
                $("#iconPortalSnowmereReq").hide();
                $("#iconPortalJormungahr").hide();
                $("[id^='iconPortalJormungahrReq']").hide();
                localStorage.setItem("mapFtoggleIslandPortals", false);
            }
        });

        $("input[name=iconDevourer]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconDevourer").show();
                localStorage.setItem("mapFiconDevourer", true);
            }
            else {
                $("#iconDevourer").hide();
                localStorage.setItem("mapFiconDevourer", false);
            }
        });

        $("input[name=iconEriandhor]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconEriandhor").show();
                localStorage.setItem("mapFiconEriandhor", true);
            }
            else {
                $("#iconEriandhor").hide();
                localStorage.setItem("mapFiconEriandhor", false);
            }
        });

        $("input[name=iconKiffi]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconKiffi").show();
                localStorage.setItem("mapFiconKiffi", true);
            }
            else {
                $("#iconKiffi").hide();
                localStorage.setItem("mapFiconKiffi", false);
            }
        });

        $("input[name=iconPortalSnowmere]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleReqPortalSnowmere").show();
                $("#iconPortalSnowmere").show();
                if ($("input[name=iconPortalSnowmereReq]").prop("checked") === true) {
                    $("#iconPortalSnowmereReq").show();
                }
                localStorage.setItem("mapFiconPortalSnowmere", true);
            }
            else {
                $("#toggleReqPortalSnowmere").hide();
                $("#iconPortalSnowmereReq").hide();
                $("#iconPortalSnowmere").hide();
                localStorage.setItem("mapFiconPortalSnowmere", false);
            }
        });

        $("input[name=iconPortalJormungahr]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleReqPortalJormungahr").show();
                $("#iconPortalJormungahr").show();
                if ($("input[name=iconPortalJormungahrReq]").prop("checked") === true) {
                    $("[id^='iconPortalJormungahrReq']").show();
                }
                localStorage.setItem("mapFiconPortalJormungahr", true);
            }
            else {
                $("#toggleReqPortalJormungahr").hide();
                $("[id^='iconPortalJormungahrReq']").hide();
                $("#iconPortalJormungahr").hide();
                localStorage.setItem("mapFiconPortalJormungahr", false);
            }
        });

        $("input[name=iconPortalSnowmereReq]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconPortalSnowmereReq").show();
                localStorage.setItem("mapFreqPortalSnowmere", true);
            }
            else {
                $("#iconPortalSnowmereReq").hide();
                localStorage.setItem("mapFreqPortalSnowmere", false);
            }
        });

        $("input[name=iconPortalJormungahrReq]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("[id^='iconPortalJormungahrReq']").show();
                localStorage.setItem("mapFreqPortalJormungahr", true);
            }
            else {
                $("[id^='iconPortalJormungahrReq']").hide();
                localStorage.setItem("mapFreqPortalJormungahr", false);
            }
        });

        $("input[name=toggleSpecialWeapons]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleSpecialWeapons").show();
                if ($("input[name=iconDonsStaff]").prop("checked") === true) {
                    $("#iconDonsStaff").show();
                }
                if ($("input[name=iconFleshRipper]").prop("checked") === true) {
                    $("#iconFleshRipper").show();
                }
                if ($("input[name=iconTheNeedle]").prop("checked") === true) {
                    $("#iconTheNeedle").show();
                }
                localStorage.setItem("mapFtoggleSpecialWeapons", true);
            }
            else {
                $("#toggleSpecialWeapons").hide();
                $("#iconDonsStaff").hide();
                $("#iconFleshRipper").hide();
                $("#iconTheNeedle").hide();
                localStorage.setItem("mapFtoggleSpecialWeapons", false);
            }
        });

        $("input[name=iconDonsStaff]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconDonsStaff").show();
                localStorage.setItem("mapFiconDonsStaff", true);
            }
            else {
                $("#iconDonsStaff").hide();
                localStorage.setItem("mapFiconDonsStaff", false);
            }
        });

        $("input[name=iconFleshRipper]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconFleshRipper").show();
                localStorage.setItem("mapFiconFleshRipper", true);
            }
            else {
                $("#iconFleshRipper").hide();
                localStorage.setItem("mapFiconFleshRipper", false);
            }
        });

        $("input[name=iconTheNeedle]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconTheNeedle").show();
                localStorage.setItem("mapFiconTheNeedle", true);
            }
            else {
                $("#iconTheNeedle").hide();
                localStorage.setItem("mapFiconTheNeedle", false);
            }
        });

        $("input[name=toggleNodes]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleNodes").show();
                if ($("input[name=iconsFlint]").prop("checked") === true) {
                    $("#groupFlint").show();
                }
                if ($("input[name=iconsCoal]").prop("checked") === true) {
                    $("#groupCoal").show();
                }
                if ($("input[name=iconsTin]").prop("checked") === true) {
                    $("#groupTin").show();
                }
                if ($("input[name=iconsCopper]").prop("checked") === true) {
                    $("#groupCopper").show();
                }
                if ($("input[name=iconsIron]").prop("checked") === true) {
                    $("#groupIron").show();
                }
                localStorage.setItem("mapFtoggleNodes", true);
            }
            else {
                $("#toggleNodes").hide();
                $("#groupFlint").hide();
                $("#groupCoal").hide();
                $("#groupTin").hide();
                $("#groupCopper").hide();
                $("#groupIron").hide();
                localStorage.setItem("mapFtoggleNodes", false);
            }
        });

        $("input[name=iconsFlint]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupFlint").show();
                localStorage.setItem("mapFiconsFlint", true);
            }
            else {
                $("#groupFlint").hide();
                localStorage.setItem("mapFiconsFlint", false);
            }
        });

        $("input[name=iconsCoal]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupCoal").show();
                localStorage.setItem("mapFiconsCoal", true);
            }
            else {
                $("#groupCoal").hide();
                localStorage.setItem("mapFiconsCoal", false);
            }
        });

        $("input[name=iconsTin]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupTin").show();
                localStorage.setItem("mapFiconsTin", true);
            }
            else {
                $("#groupTin").hide();
                localStorage.setItem("mapFiconsTin", false);
            }
        });

        $("input[name=iconsCopper]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupCopper").show();
                localStorage.setItem("mapFiconsCopper", true);
            }
            else {
                $("#groupCopper").hide();
                localStorage.setItem("mapFiconsCopper", false);
            }
        });

        $("input[name=iconsIron]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupIron").show();
                localStorage.setItem("mapFiconsIron", true);
            }
            else {
                $("#groupIron").hide();
                localStorage.setItem("mapFiconsIron", false);
            }
        });

        $("input[name=iconsLore]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupLore").show();
                localStorage.setItem("mapFiconsLore", true);
            }
            else {
                $("#groupLore").hide();
                localStorage.setItem("mapFiconsLore", false);
            }
        });
    }
}

// To reset all toggles for Freydalyn
function resetTogglesFreydalyn() {
    // to turn all toggles off
    $("button.buttonReset").css("color", "#006600");
    $("button.buttonReset").css("border", "1px solid #006600");
    $(".mapArea").hide();
    $("input[name=mapAreas]").prop("checked", false);
    localStorage.setItem("mapFareas", false);
    $("#iconFGEldairDrop").hide();
    $("input[name=iconFGEldairDrop]").prop("checked", false);
    $("#toggleDropFGEldair").hide();
    localStorage.setItem("mapFdropFGEldair", false);
    $("#iconFGEldair").hide();
    $("input[name=iconFGEldair]").prop("checked", false);
    localStorage.setItem("mapFiconFGEldair", false);
    $("#iconFGKetDrop").hide();
    $("input[name=iconFGKetDrop]").prop("checked", false);
    $("#toggleDropFGKet").hide();
    localStorage.setItem("mapFdropFGKet", false);
    $("#iconFGKet").hide();
    $("input[name=iconFGKet]").prop("checked", false);
    localStorage.setItem("mapFiconFGKet", false);
    $("#iconFGGrotDrop").hide();
    $("input[name=iconFGGrotDrop]").prop("checked", false);
    $("#toggleDropFGGrot").hide();
    localStorage.setItem("mapFdropFGGrot", false);
    $("#iconFGGrot").hide();
    $("input[name=iconFGGrot]").prop("checked", false);
    localStorage.setItem("mapFiconFGGrot", false);
    $("#iconFGThuumDrop").hide();
    $("input[name=iconFGThuumDrop]").prop("checked", false);
    $("#toggleDropFGThuum").hide();
    localStorage.setItem("mapFdropFGThuum", false);
    $("#iconFGThuum").hide();
    $("input[name=iconFGThuum]").prop("checked", false);
    localStorage.setItem("mapFiconFGThuum", false);
    $("#toggleGiants").hide();
    $("input[name=toggleGiants]").prop("checked", false);
    localStorage.setItem("mapFtoggleGiants", false);
    $("#iconDevourer").hide();
    $("input[name=iconDevourer]").prop("checked", false);
    localStorage.setItem("mapFiconDevourer", false);
    $("#iconEriandhor").hide();
    $("input[name=iconEriandhor]").prop("checked", false);
    localStorage.setItem("mapFiconEriandhor", false);
    $("#iconKiffi").hide();
    $("input[name=iconKiffi]").prop("checked", false);
    localStorage.setItem("mapFiconKiffi", false);
    $("#iconPortalSnowmereReq").hide();
    $("input[name=iconPortalSnowmereReq]").prop("checked", false);
    $("#toggleReqPortalSnowmere").hide();
    localStorage.setItem("mapFreqPortalSnowmere", false);
    $("#iconPortalSnowmere").hide();
    $("input[name=iconPortalSnowmere]").prop("checked", false);
    localStorage.setItem("mapFiconPortalSnowmere", false);
    $("[id^='iconPortalJormungahrReq']").hide();
    $("input[name=iconPortalJormungahrReq]").prop("checked", false);
    $("#toggleReqPortalJormungahr").hide();
    localStorage.setItem("mapFreqPortalJormungahr", false);
    $("#iconPortalJormungahr").hide();
    $("input[name=iconPortalJormungahr]").prop("checked", false);
    localStorage.setItem("mapFiconPortalJormungahr", false);
    $("#toggleIslandPortals").hide();
    $("input[name=toggleIslandPortals]").prop("checked", false);
    localStorage.setItem("mapFtoggleIslandPortals", false);
    $("#iconDonsStaff").hide();
    $("input[name=iconDonsStaff]").prop("checked", false);
    localStorage.setItem("mapFiconDonsStaff", false);
    $("#iconFleshRipper").hide();
    $("input[name=iconFleshRipper]").prop("checked", false);
    localStorage.setItem("mapFiconFleshRipper", false);
    $("#iconTheNeedle").hide();
    $("input[name=iconTheNeedle]").prop("checked", false);
    localStorage.setItem("mapFiconTheNeedle", false);
    $("#toggleSpecialWeapons").hide();
    $("input[name=toggleSpecialWeapons]").prop("checked", false);
    localStorage.setItem("mapFtoggleSpecialWeapons", false);
    $("#groupFlint").hide();
    $("input[name=iconsFlint]").prop("checked", false);
    localStorage.setItem("mapFiconsFlint", false);
    $("#groupCoal").hide();
    $("input[name=iconsCoal]").prop("checked", false);
    localStorage.setItem("mapFiconsCoal", false);
    $("#groupTin").hide();
    $("input[name=iconsTin]").prop("checked", false);
    localStorage.setItem("mapFiconsTin", false);
    $("#groupCopper").hide();
    $("input[name=iconsCopper]").prop("checked", false);
    localStorage.setItem("mapFiconsCopper", false);
    $("#groupIron").hide();
    $("input[name=iconsIron]").prop("checked", false);
    localStorage.setItem("mapFiconsIron", false);
    $("#toggleNodes").hide();
    $("input[name=toggleNodes]").prop("checked", false);
    localStorage.setItem("mapFtoggleNodes", false);
    $("#groupLore").hide();
    $("input[name=iconsLore]").prop("checked", false);
    localStorage.setItem("mapFiconsLore", false);
    window.setTimeout(resetButtonAnimation, 500);
}


/* ********************* */
/* *** MAP JORMUNGAHR *** */
/* ********************* */
// Getting the map settings as stored locally for Jormungahr
function getMapSettingsJormungahr() {
    if (document.querySelector(".page-Jormungahr")) {
        try {
            var arrayNames = ["mapJareas", "mapJiconKur", "mapJiconGong", "mapJreqGong", "mapJiconPortalFreydalyn", "mapJreqPortalFreydalyn", "mapJiconsLore", "mapJspoiler"];
            for (var i = 0; i < arrayNames.length; i++) {
                eval("var " + arrayNames[i] + "= localStorage.getItem(arrayNames[i]);");
            }

            /* Remove all 'elses' below?
             * Maybe fully initiate everything once and only leave the on change functionality
             * Should not even rely on first 'spoiler' true/false
              * The full code can certainly be shortened */
            if (mapJareas == "true") {
                $("input[name=mapAreas]").prop("checked", true);
            }
            else {
                $("input[name=mapAreas]").prop("checked", false);
                mapJareas = "false";
            }
            if (mapJiconKur == "true") {
                $("input[name=iconKur]").prop("checked", true);
            }
            else {
                $("input[name=iconKur]").prop("checked", false);
                mapJiconKur = "false";
            }
            if (mapJiconGong == "true") {
                $("input[name=iconGong]").prop("checked", true);
            }
            else {
                $("input[name=iconGong]").prop("checked", false);
                mapJiconGong = "false"
            }
            if (mapJreqGong == "true") {
                $("input[name=iconGongReq]").prop("checked", true);
            }
            else {
                $("input[name=iconGongReq]").prop("checked", false);
                mapJreqGong = "false"
            }
            if (mapJiconPortalFreydalyn == "true") {
                $("input[name=iconPortalFreydalyn]").prop("checked", true);
            }
            else {
                $("input[name=iconPortalFreydalyn]").prop("checked", false);
                mapJiconPortalFreydalyn = "false"
            }
            if (mapJreqPortalFreydalyn == "true") {
                $("input[name=iconPortalFreydalynReq]").prop("checked", true);
            }
            else {
                $("input[name=iconPortalFreydalynReq]").prop("checked", false);
                mapJreqPortalFreydalyn = "false"
            }
            if (mapJiconsLore == "true") {
                $("input[name=iconsLore]").prop("checked", true);
            }
            else {
                $("input[name=iconsLore]").prop("checked", false);
                mapJiconsLore = "false"
            }
            if (mapJspoiler == "true") {
                $("input[name=mapSpoiler]").prop("checked", true);
                $("#mapLegend").show();
                $("#fullSVG").show();
                $("#mapIsland").show();
                $("#buttonReset").show();
                if (mapJareas == "true") {
                    $(".mapArea").show();
                }
                else {
                    $(".mapArea").hide();
                }
                if (mapJiconKur == "true") {
                    $("#iconKur").show();
                }
                else {
                    $("#iconKur").hide();
                }
                if (mapJiconGong == "true") {
                    $("#iconGong").show();
                    $("#toggleReqGong").show();
                    if (mapJreqGong == "true") {
                        $("#iconEverwood").show();
                    }
                    else {
                        $("#iconEverwood").hide();
                    }
                }
                else {
                    $("#iconGong").hide();
                    $("#toggleReqGong").hide();
                    $("#iconEverwood").hide();
                }
                if (mapJiconPortalFreydalyn == "true") {
                    $("#iconPortalFreydalyn").show();
                    $("#toggleReqPortalFreydalyn").show();
                    if (mapJreqPortalFreydalyn == "true") {
                        $("[id^='iconPortalFreydalynReq']").show();
                    }
                    else {
                        $("[id^='iconPortalFreydalynReq']").hide();
                    }
                }
                else {
                    $("#iconPortalFreydalyn").hide();
                    $("#toggleReqPortalFreydalyn").hide();
                    $("[id^='iconPortalFreydalynReq']").hide();
                }
                if (mapJiconsLore == "true") {
                    $("#groupLore").show();
                }
                else {
                    $("#groupLore").hide();
                }
            }
            else {
                $("input[name=mapSpoiler]").prop("checked", false);
                mapJspoiler = "false";
                $("td#tableMap").css({ "background": "url('https://savagelands.gamepedia.com/media/savagelands.gamepedia.com/b/b4/Tarvhas_Maps.png') no-repeat", "background-size": "cover" });
                $("#mapLegend").hide();
                $("#fullSVG").hide();
                $("#mapIsland").hide();
                $("#groupLore").hide();
                $("#buttonReset").hide();
                $(".mapControls").hide();
            }
        }
        catch (error) {
            console.log("Issue loading getMapSettingsJormungahr() > " + error);
        }
        finally {
            return;
        }
    }
}

// Map toggle functionality for interactive map Jormungahr
function getTogglesCodeJormungahr() {
    if (document.querySelector(".page-Jormungahr")) {
        $("input[name=mapSpoiler]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("td#tableMap").css({ "background": "none" });
                $("#mapLegend").show();
                $("#fullSVG").show();
                $("#mapIsland").show();
                $("#buttonReset").show();
                $(".mapControls").show();
                localStorage.setItem("mapJspoiler", true);
                /* !!! Wonder if below checking for most parts is actually needed again
                * With showing main parts again, states should still be correct? */
                if ($("input[name=mapAreas]").prop("checked") === true) {
                    $(".mapArea").show();
                }
                if ($("input[name=iconKur]").prop("checked") === true) {
                    $("#iconKur").show();
                }
                if ($("input[name=iconGong]").prop("checked") === true) {
                    $("#iconGong").show();
                    $("#toggleReqGong").show();
                    if ($("input[name=iconGongReq]").prop("checked") === true) {
                        $("#iconEverwood").show();
                    }
                }
                else {
                    $("#toggleReqGong").hide();
                }
                if ($("input[name=iconPortalFreydalyn]").prop("checked") === true) {
                    $("#iconPortalFreydalyn").show();
                    $("#toggleReqPortalFreydalyn").show();
                    if ($("input[name=iconPortalFreydalynReq]").prop("checked") === true) {
                        $("[id^='iconPortalFreydalynReq']").show();
                    }
                }
                else {
                    $("#toggleReqPortalFreydalyn").hide();
                }
                if ($("input[name=iconsLore]").prop("checked") === true) {
                    $("#groupLore").show();
                }
            }
            else {
                $("td#tableMap").css({ "background": "url('https://savagelands.gamepedia.com/media/savagelands.gamepedia.com/b/b4/Tarvhas_Maps.png') no-repeat", "background-size": "cover" });
                $("#mapLegend").hide();
                $("#fullSVG").hide();
                $("#mapIsland").hide();
                $(".mapArea").hide();
                $("#iconKur").hide();
                $("#iconGong").hide();
                $("#iconEverwood").hide();
                $("#iconPortalFreydalyn").hide();
                $("[id^='iconPortalFreydalynReq']").hide();
                $("#groupLore").hide();
                $("#buttonReset").hide();
                $(".mapControls").hide();
                localStorage.setItem("mapJspoiler", false);
            }
        });

        $("input[name=mapAreas]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $(".mapArea").show();
                localStorage.setItem("mapJareas", true);
            }
            else {
                $(".mapArea").hide();
                localStorage.setItem("mapJareas", false);
            }
        });

        $("input[name=iconKur]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconKur").show();
                localStorage.setItem("mapJiconKur", true);
            }
            else {
                $("#iconKur").hide();
                localStorage.setItem("mapJiconKur", false);
            }
        });

        $("input[name=iconGong]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleReqGong").show();
                $("#iconGong").show();
                if ($("input[name=iconGongReq]").prop("checked") === true) {
                    $("#iconEverwood").show();
                }
                localStorage.setItem("mapJiconGong", true);
            }
            else {
                $("#toggleReqGong").hide();
                $("#iconEverwood").hide();
                $("#iconGong").hide();
                localStorage.setItem("mapJiconGong", false);
            }
        });

        $("input[name=iconGongReq]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#iconEverwood").show();
                localStorage.setItem("mapJreqGong", true);
            }
            else {
                $("#iconEverwood").hide();
                localStorage.setItem("mapJreqGong", false);
            }
        });

        $("input[name=iconPortalFreydalyn]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#toggleReqPortalFreydalyn").show();
                $("#iconPortalFreydalyn").show();
                if ($("input[name=iconPortalFreydalynReq]").prop("checked") === true) {
                    $("[id^='iconPortalFreydalynReq']").show();
                }
                localStorage.setItem("mapJiconPortalFreydalyn", true);
            }
            else {
                $("#toggleReqPortalFreydalyn").hide();
                $("[id^='iconPortalFreydalynReq']").hide();
                $("#iconPortalFreydalyn").hide();
                localStorage.setItem("mapJiconPortalFreydalyn", false);
            }
        });

        $("input[name=iconPortalFreydalynReq]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("[id^='iconPortalFreydalynReq']").show();
                localStorage.setItem("mapJreqPortalFreydalyn", true);
            }
            else {
                $("[id^='iconPortalFreydalynReq']").hide();
                localStorage.setItem("mapJreqPortalFreydalyn", false);
            }
        });

        $("input[name=iconsLore]").change(function() {
            var $input = $(this);
            if ($input.prop("checked") === true) {
                $("#groupLore").show();
                localStorage.setItem("mapJiconsLore", true);
            }
            else {
                $("#groupLore").hide();
                localStorage.setItem("mapJiconsLore", false);
            }
        });
    }
}

// To reset all toggles for Jormungahr
function resetTogglesJormungahr() {
    // to turn all toggles off
    $("button.buttonReset").css("color", "#006600");
    $("button.buttonReset").css("border", "1px solid #006600");
    $(".mapArea").hide();
    $("input[name=mapAreas]").prop("checked", false);
    localStorage.setItem("mapJareas", false);
    $("#iconKur").hide();
    $("input[name=iconKur]").prop("checked", false);
    localStorage.setItem("mapJiconKur", false);
    $("#iconGong").hide();
    $("input[name=iconGong]").prop("checked", false);
    localStorage.setItem("mapJiconGong", false);
    $("#iconEverwood").hide();
    $("input[name=iconGongReq]").prop("checked", false);
    $("#toggleReqGong").hide();
    localStorage.setItem("mapJreqGong", false);
    $("[id^='iconPortalFreydalynReq']").hide();
    $("input[name=iconPortalFreydalynReq]").prop("checked", false);
    $("#toggleReqPortalFreydalyn").hide();
    localStorage.setItem("mapJreqPortalFreydalyn", false);
    $("#iconPortalFreydalyn").hide();
    $("input[name=iconPortalFreydalyn]").prop("checked", false);
    localStorage.setItem("mapJiconPortalFreydalyn", false);
    $("#groupLore").hide();
    $("input[name=iconsLore]").prop("checked", false);
    localStorage.setItem("mapJiconsLore", false);
    window.setTimeout(resetButtonAnimation, 500);
}

// To animate the Reset Button on all interactive maps
function resetButtonAnimation() {
    $("button.buttonReset").css("color", "#ffffff");
    $("button.buttonReset").css("border", "1px solid #000000");
}


/* ************************ */
/* *** GENERAL MAP CODE *** */
/* ************************ */
function addMapCode() {
    // Do a page check to see if loading is required
    if (document.querySelector(".page-Snowmere") || document.querySelector(".page-Freydalyn") || document.querySelector(".page-Jormungahr")) {
        // Adding Stylesheet
        var lS = document.createElement("link");
        lS.rel = "stylesheet";
        lS.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css";
        $("head").append(lS);
        
        // Generated by CoffeeScript 1.10.0

        /*
         jQuery SVG Pan Zoom v1.0.2, June 2015

         Author: Daniel Hoffmann Bernardes (daniel.hoffmann.bernardes@gmail.com)

         Repository: https://github.com/DanielHoffmann/jquery-svg-pan-zoom/

         jQuery plugin to enable pan and zoom in SVG images either programmatically or through mouse/touch events.

         [Demo page](http://danielhoffmann.github.io/jquery-svg-pan-zoom/)

         * Features
         - Programmatically manipulate the SVG viewBox
         - Mouse and touch events to pan the SVG viewBox
         - Mousewheel events to zoom in or out the SVG viewBox
         - Animations
         - Mousewheel zooming keeps the cursor over the same coordinates relative to the image (A.K.A. GoogleMaps-like zoom)
         - Limiting the navigable area

         * Requirements

         jQuery

         SVG-enabled browser (does not work with SVG work-arounds that use Flash)

         Copyright (C) 2014 Daniel Hoffmann Bernardes, Ícaro Technologies
         Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
         The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
         THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
         */

        (function() {
            var hasProp = {}.hasOwnProperty;

            (function($) {
                var checkLimits, defaultOptions, defaultViewBox, getViewBoxCoordinatesFromEvent, parseViewBoxString;
                defaultOptions = {
                    events: {
                        mouseWheel: true,
                        doubleClick: false,
                        drag: true,
                        dragCursor: "move"
                    },
                    animationTime: 300,
                    zoomFactor: 0.25,
                    maxZoom: 15,
                    panFactor: 100,
                    initialViewBox: null,
                    limits: { // the limits in which the image can be moved. If null or undefined will use the initialViewBox plus 15% in each direction
                        x: 0,
                        y: 0,
                        x2: 5686.2,
                        y2: 3996
                    }
                };
                defaultViewBox = {
                    x: 0,
                    y: 0,
                    width: 1000,
                    height: 1000
                };

                /**
                 * Check the limits of the view box, return a new viewBox that respects the limits while keeping
                 * the original view box size if possible. If the view box needs to be reduced, the returned view
                 * box will keep the aspect ratio of the original view box.
                 *
                 * @param {Object} viewBox
                 *   The original view box. Takes numbers, in the format `{x, y, width, height}`.
                 *
                 * @param {Object} limits
                 *   Extents which can be shown, in the view box coordinate system. Takes numbers in the format
                 *   `{x, y, x2, y2}`.
                 *
                 * @return {Object} viewBox
                 *   A new view box object, squeezed into the limits. Contains numbers, in the format `{x, y,
                 *   width, height}`.
                 */
                checkLimits = function(viewBox, limits) {
                    var limitsHeight, limitsWidth, reductionFactor, vb;
                    vb = $.extend({}, viewBox);
                    limitsWidth = Math.abs(limits.x2 - limits.x);
                    limitsHeight = Math.abs(limits.y2 - limits.y);
                    if (vb.width > limitsWidth) {
                        if (vb.height > limitsHeight) {
                            if (limitsWidth > limitsHeight) {
                                reductionFactor = limitsHeight / vb.height;
                                vb.height = limitsHeight;
                                vb.width = vb.width * reductionFactor;
                            } else {
                                reductionFactor = limitsWidth / vb.width;
                                vb.width = limitsWidth;
                                vb.height = vb.height * reductionFactor;
                            }
                        } else {
                            reductionFactor = limitsWidth / vb.width;
                            vb.width = limitsWidth;
                            vb.height = vb.height * reductionFactor;
                        }
                    } else if (vb.height > limitsHeight) {
                        reductionFactor = limitsHeight / vb.height;
                        vb.height = limitsHeight;
                        vb.width = vb.width * reductionFactor;
                    }
                    if (vb.x < limits.x) {
                        vb.x = limits.x;
                    }
                    if (vb.y < limits.y) {
                        vb.y = limits.y;
                    }
                    if (vb.x + vb.width > limits.x2) {
                        vb.x = limits.x2 - vb.width;
                    }
                    if (vb.y + vb.height > limits.y2) {
                        vb.y = limits.y2 - vb.height;
                    }
                    return vb;
                };

                /**
                 * Parse the viewbox string as defined in the spec for the svg tag.
                 *
                 * @param {String} viewBoxString
                 *   A valid value of the `viewBox` attribute.
                 *
                 * @return {Object} viewBox
                 *   A view box object. Contains numbers, in the format `{x, y, width, height}`.
                 */
                parseViewBoxString = function(string) {
                    var vb;
                    vb = string.replace("\s+", " ").split(" ");
                    return vb = {
                        x: parseFloat(vb[0]),
                        y: parseFloat(vb[1]),
                        width: parseFloat(vb[2]),
                        height: parseFloat(vb[3])
                    };
                };

                /**
                 * Get the mouse or first touch position from the `event`, relative to the SVG viewBox.
                 *
                 * @param {SVGElement} svgRoot
                 *   The `<svg>` DOM object
                 *
                 * @param {MouseEvent|TouchEvent|jQueryEvent} event
                 *   The DOM or jQuery event.
                 *
                 * @return {Object}
                 *   Coordinates of the event. Contains numbers, in the format `{x, y}`.
                 */
                getViewBoxCoordinatesFromEvent = function(svgRoot, event) {
                    var ctm, foo, pos;
                    foo = {
                        x: null,
                        y: null
                    };
                    if (event.type === "touchstart" || event.type === "touchmove") {
                        if ((event.originalEvent != null) && (event.touches == null)) {
                            foo.x = event.originalEvent.touches[0].clientX;
                            foo.y = event.originalEvent.touches[0].clientY;
                        } else {
                            foo.x = event.touches[0].clientX;
                            foo.y = event.touches[0].clientY;
                        }
                    } else {
                        if (event.clientX != null) {
                            foo.x = event.clientX;
                            foo.y = event.clientY;
                        } else {
                            foo.x = event.originalEvent.clientX;
                            foo.y = event.originalEvent.clientY;
                        }
                    }
                    pos = svgRoot.createSVGPoint();
                    pos.x = parseInt(foo.x, 10);
                    pos.y = parseInt(foo.y, 10);
                    ctm = svgRoot.getScreenCTM();
                    ctm = ctm.inverse();
                    pos = pos.matrixTransform(ctm);
                    return pos;
                };
                return $.fn.svgPanZoom = function(options) {
                    var ret;
                    ret = [];
                    this.each(function() {
                        var $animationDiv, dragStarted, horizontalSizeIncrement, key, opts, preventClick, preventLinking, linkClicked, value, vb, verticalSizeIncrement, viewBox;
                        $(".mapLink").on("mousedown", function() {
                            linkClicked = $(this).attr("data-link");
                            console.log("Got link: " + linkClicked);
                        });
                        opts = $.extend(true, {}, defaultOptions, options);
                        opts.$svg = $(this);
                        if (opts.animationTime == null) {
                            opts.animationTime = 0;
                        }
                        opts.$svg[0].setAttribute("preserveAspectRatio", "xMidYMid meet");
                        vb = $.extend({}, this.viewBox.baseVal);
                        if (vb.x == null) {
                            vb.x = 0;
                        }
                        if (vb.y == null) {
                            vb.y = 0;
                        }
                        if (vb.width == null) {
                            vb.width = 0;
                        }
                        if (vb.height == null) {
                            vb.height = 0;
                        }
                        if (opts.initialViewBox != null) {
                            if (typeof opts.initialViewBox === "string") {
                                vb = parseViewBoxString(opts.initialViewBox);
                            } else if (typeof opts.initialViewBox === "object") {
                                vb = $.extend({}, defaultViewBox, opts.initialViewBox);
                            } else {
                                throw "initialViewBox is of invalid type";
                            }
                        } else if (vb.x === 0 && vb.y === 0 && vb.width === 0 && vb.height === 0) {
                            vb = defaultViewBox;
                        }
                        viewBox = vb;
                        opts.initialViewBox = $.extend({}, viewBox);
                        if (opts.limits == null) {
                            horizontalSizeIncrement = viewBox.width * 0.15;
                            verticalSizeIncrement = viewBox.height * 0.15;
                            opts.limits = {
                                x: viewBox.x - horizontalSizeIncrement,
                                y: viewBox.y - verticalSizeIncrement,
                                x2: viewBox.x + viewBox.width + horizontalSizeIncrement,
                                y2: viewBox.y + viewBox.height + verticalSizeIncrement
                            };
                        }
                        opts.reset = function() {
                            var inivb;
                            inivb = this.initialViewBox;
                            this.setViewBox(inivb.x, inivb.y, inivb.width, inivb.height, 0);
                        };
                        opts.getViewBox = function() {
                            return $.extend({}, viewBox);
                        };
                        $animationDiv = $("<div></div>");
                        opts.setViewBox = function(x, y, width, height, animationTime) {
                            if (animationTime == null) {
                                animationTime = this.animationTime;
                            }
                            if (animationTime > 0) {
                                $animationDiv.css({
                                    left: viewBox.x + "px",
                                    top: viewBox.y + "px",
                                    width: viewBox.width + "px",
                                    height: viewBox.height + "px"
                                });
                            }
                            viewBox = {
                                x: x != null ? x : viewBox.x,
                                y: y != null ? y : viewBox.y,
                                width: width ? width : viewBox.width,
                                height: height ? height : viewBox.height
                            };
                            viewBox = checkLimits(viewBox, this.limits);
                            if (animationTime > 0) {
                                $animationDiv.stop().animate({
                                    left: viewBox.x,
                                    top: viewBox.y,
                                    width: viewBox.width,
                                    height: viewBox.height
                                }, {
                                    duration: animationTime,
                                    easing: "linear",
                                    step: (function(value, properties) {
                                        var $div;
                                        $div = $animationDiv;
                                        this.$svg[0].setAttribute("viewBox", ($div.css("left").slice(0, -2)) + " " + ($div.css("top").slice(0, -2)) + " " + ($div.css("width").slice(0, -2)) + " " + ($div.css("height").slice(0, -2)));
                                    }).bind(this)
                                });
                            } else {
                                this.$svg[0].setAttribute("viewBox", viewBox.x + " " + viewBox.y + " " + viewBox.width + " " + viewBox.height);
                            }
                        };
                        opts.panLeft = function(amount, animationTime) {
                            if (amount == null) {
                                amount = this.panFactor;
                            }
                            if (animationTime == null) {
                                animationTime = this.animationTime;
                            }
                            this.panRight(-amount, animationTime);
                        };
                        opts.panRight = function(amount, animationTime) {
                            if (amount == null) {
                                amount = this.panFactor;
                            }
                            if (animationTime == null) {
                                animationTime = this.animationTime;
                            }
                            this.setViewBox(viewBox.x + amount, null, null, null, animationTime);
                        };
                        opts.panUp = function(amount, animationTime) {
                            if (amount == null) {
                                amount = this.panFactor;
                            }
                            if (animationTime == null) {
                                animationTime = this.animationTime;
                            }
                            this.panDown(-amount, animationTime);
                        };
                        opts.panDown = function(amount, animationTime) {
                            if (amount == null) {
                                amount = this.panFactor;
                            }
                            if (animationTime == null) {
                                animationTime = this.animationTime;
                            }
                            this.setViewBox(null, viewBox.y + amount, null, null, animationTime);
                        };
                        opts.zoomIn = function(amount, animationTime) {
                            if (amount == null) {
                                amount = this.zoomFactor;
                            }
                            if (animationTime == null) {
                                animationTime = this.animationTime;
                            }
                            this.zoomOut(-amount, animationTime);
                        };
                        opts.zoomOut = function(amount, animationTime) {
                            var center, newHeight, newWidth;
                            if (amount == null) {
                                amount = this.zoomFactor;
                            }
                            if (animationTime == null) {
                                animationTime = this.animationTime;
                            }
                            if (amount === 0) {
                                return;
                            } else if (amount < 0) {
                                amount = Math.abs(amount);
                                newWidth = viewBox.width / (1 + amount);
                                newHeight = viewBox.height / (1 + amount);
                                if (newWidth < (this.initialViewBox.width / this.maxZoom) || newHeight < (this.initialViewBox.height / this.maxZoom)) {
                                    newWidth = this.initialViewBox.width / this.maxZoom;
                                    newHeight = this.initialViewBox.height / this.maxZoom;
                                }
                            } else {
                                newWidth = viewBox.width * (1 + amount);
                                newHeight = viewBox.height * (1 + amount);
                            }
                            center = {
                                x: viewBox.x + viewBox.width / 2,
                                y: viewBox.y + viewBox.height / 2
                            };
                            this.setViewBox(center.x - newWidth / 2, center.y - newWidth / 2, newWidth, newHeight, animationTime);
                        };
                        opts.setCenter = function(x, y, animationTime) {
                            if (animationTime == null) {
                                animationTime = this.animationTime;
                            }
                            this.setViewBox(x - viewBox.width / 2, y - viewBox.height / 2, viewBox.width, viewBox.height, animationTime);
                        };
                        for (key in opts) {
                            if (!hasProp.call(opts, key)) continue;
                            value = opts[key];
                            if (typeof value === "function") {
                                opts.key = value.bind(opts);
                            }
                        }
                        opts.$svg.on("mousewheel DOMMouseScroll MozMousePixelScroll", (function(ev) {
                            var delta, minHeight, minWidth, newMousePosition, newViewBox, newcenter, oldDistanceFromCenter, oldMousePosition, oldViewBox, oldcenter, reductionFactor;
                            delta = parseInt(ev.originalEvent.wheelDelta || -ev.originalEvent.detail);
                            if (delta === 0 || opts.events.mouseWheel !== true) {
                                return;
                            }
                            oldViewBox = this.getViewBox();
                            ev.preventDefault();
                            ev.stopPropagation();
                            oldMousePosition = getViewBoxCoordinatesFromEvent(this.$svg[0], ev);
                            oldcenter = {
                                x: viewBox.x + viewBox.width / 2,
                                y: viewBox.y + viewBox.height / 2
                            };
                            oldDistanceFromCenter = {
                                x: oldcenter.x - oldMousePosition.x,
                                y: oldcenter.y - oldMousePosition.y
                            };
                            if (delta > 0) {
                                this.zoomIn(void 0, 0);
                                minWidth = this.initialViewBox.width / this.maxZoom;
                                minHeight = this.initialViewBox.height / this.maxZoom;
                                if (viewBox.width < minWidth) {
                                    reductionFactor = minWidth / viewBox.width;
                                    viewBox.width = minWidth;
                                    viewBox.height = viewBox.height * reductionFactor;
                                }
                                if (viewBox.height < minHeight) {
                                    reductionFactor = minHeight / viewBox.height;
                                    viewBox.height = minHeight;
                                    viewBox.width = viewBox.width * reductionFactor;
                                }
                            } else {
                                this.zoomOut(void 0, 0);
                            }
                            newMousePosition = getViewBoxCoordinatesFromEvent(this.$svg[0], ev);
                            newcenter = {
                                x: oldcenter.x + (oldMousePosition.x - newMousePosition.x),
                                y: oldcenter.y + (oldMousePosition.y - newMousePosition.y)
                            };
                            this.setCenter(newcenter.x, newcenter.y, 0);
                            newViewBox = this.getViewBox();
                            this.setViewBox(oldViewBox.x, oldViewBox.y, oldViewBox.width, oldViewBox.height, 0);
                            this.setViewBox(newViewBox.x, newViewBox.y, newViewBox.width, newViewBox.height);
                        }).bind(opts));
                        opts.$svg.dblclick((function(ev) {
                            if (opts.events.doubleClick !== true) {
                                return;
                            }
                            ev.preventDefault();
                            ev.stopPropagation();
                            return this.zoomIn();
                        }).bind(opts));
                        opts.$svg[0].addEventListener("click", function(ev) {
                            console.log("preventClick: " + preventClick + "\npreventLinking: " + preventLinking + "\nlinkClicked: " + linkClicked);
                            var preventClick;
                            if (preventClick) {
                                preventClick = false;
                                ev.stopPropagation();
                                return ev.preventDefault();
                            }
                            if (preventLinking === false && typeof(linkClicked) === "string") {
                                alert("Visit link: " + linkClicked + "\n\nThis is to simulate a link to another wiki page\nLinks are not yet available");
                            }
                            linkClicked = undefined;
                        }, true);
                        dragStarted = false;
                        preventClick = false;
                        preventLinking = false;
                        opts.$svg.on("mousedown touchstart", (function(ev) {
                            var $body, domBody, initialViewBox, mouseMoveCallback, mouseUpCallback, oldCursor;
                            if (dragStarted) {
                                return;
                            }
                            if (opts.events.drag !== true || (ev.type === "mousedown" && ev.which !== 1)) {
                                return;
                            }
                            dragStarted = true;
                            preventClick = false;
                            preventLinking = false;
                            ev.preventDefault();
                            ev.stopPropagation();
                            initialViewBox = $.extend({}, viewBox);
                            $body = $(window.document.body);
                            domBody = $body[0];
                            oldCursor = $body.css("cursor");
                            if (this.events.dragCursor != null) {
                                $body.css("cursor", this.events.dragCursor);
                            }
                            mouseMoveCallback = (function(ev2) {
                                var currentMousePosition, initialMousePosition;
                                ev2.preventDefault();
                                ev2.stopPropagation();
                                initialMousePosition = getViewBoxCoordinatesFromEvent(this.$svg[0], ev);
                                currentMousePosition = getViewBoxCoordinatesFromEvent(this.$svg[0], ev2);
                                if (Math.sqrt(Math.pow(ev.pageX + ev2.pageX, 2) + Math.pow(ev.pageY + ev2.pageY, 2)) > 3) {
                                    preventClick = true;
                                    preventLinking = true;
                                }
                                this.setViewBox(initialViewBox.x + initialMousePosition.x - currentMousePosition.x, initialViewBox.y + initialMousePosition.y - currentMousePosition.y, null, null, 0);
                            }).bind(opts);
                            mouseUpCallback = (function(ev2) {
                                if (ev2.type === "mouseout" && ev2.target !== ev2.currentTarget) {
                                    return;
                                }
                                ev2.preventDefault();
                                ev2.stopPropagation();
                                domBody.removeEventListener("mousemove", mouseMoveCallback, true);
                                domBody.removeEventListener("touchmove", mouseMoveCallback, true);
                                domBody.removeEventListener("mouseup", mouseUpCallback, true);
                                domBody.removeEventListener("touchend", mouseUpCallback, true);
                                domBody.removeEventListener("touchcancel", mouseUpCallback, true);
                                domBody.removeEventListener("mouseout", mouseUpCallback, true);
                                if (this.events.dragCursor != null) {
                                    $body.css("cursor", oldCursor);
                                }
                                dragStarted = false;
                            }).bind(opts);
                            domBody.addEventListener("mousemove", mouseMoveCallback, true);
                            domBody.addEventListener("touchmove", mouseMoveCallback, true);
                            domBody.addEventListener("mouseup", mouseUpCallback, true);
                            domBody.addEventListener("touchend", mouseUpCallback, true);
                            domBody.addEventListener("touchcancel", mouseUpCallback, true);
                            domBody.addEventListener("mouseout", mouseUpCallback, true);
                        }).bind(opts));
                        opts.setViewBox(vb.x, vb.y, vb.width, vb.height, 0);
                        ret.push(opts);
                    });
                    if (ret.length === 0) {
                        return null;
                    }
                    if (ret.length === 1) {
                        return ret[0];
                    } else {
                        return ret;
                    }
                };
            })(jQuery);

        }).call(this);

        //# sourceMappingURL=jquery.svg.pan.zoom.js.map

        // Map controls
        var mapControls;
        $(function() {
            "use strict";
            var examples = $("svg").svgPanZoom();
            var callback = function(mapControl) {
                return function(event) {
                    var button = $(this);
                    if ($(event.target).hasClass("fa-chevron-up")) {
                        mapControl.panUp();
                        mapPanButton(button);
                    }
                    if ($(event.target).hasClass("fa-chevron-down")) {
                        mapControl.panDown();
                        mapPanButton(button);
                    }
                    if ($(event.target).hasClass("fa-chevron-left")) {
                        mapControl.panLeft();
                        mapPanButton(button);
                    }
                    if ($(event.target).hasClass("fa-chevron-right")) {
                        mapControl.panRight();
                        mapPanButton(button);
                    }
                    if ($(event.target).hasClass("fa-plus")) {
                        mapControl.zoomIn();
                        mapZoomButton(button);
                    }
                    if ($(event.target).hasClass("fa-minus")) {
                        mapControl.zoomOut();
                        mapZoomButton(button);
                    }
                    if ($(event.target).hasClass("fa-refresh")) {
                        mapControl.reset();
                        mapZoomButton(button);
                    }
                }
            };

            mapControls = examples; //Funny how examples[0] wont work, because there is no array of objects!!??

            $(".mapControls i").click(callback(mapControls));
        });

        // Button animation
        function mapZoomButton(button) {
            button.css("color", "#006600");
            button.css("border", "1px solid #006600");
            window.setTimeout(mapZoomButtonsAnimate, 500, button);
        }

        function mapZoomButtonsAnimate(button) {
            button.css("color", "#ffffff");
            button.css("border", "1px solid #000000");
        }

        function mapPanButton(button) {
            button.css("color", "#006600");
            window.setTimeout(mapPanButtonsAnimate, 500, button);
        }

        function mapPanButtonsAnimate(button) {
            button.css("color", "#ffffff");
        }

    }
}


function addSnowWiki() {
/** @license
 * DHTML Snowstorm! JavaScript-based snow for web pages
 * Making it snow on the internets since 2003. You're welcome.
 * -----------------------------------------------------------
 * Version 1.44.20131208 (Previous rev: 1.44.20131125)
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License
 * http://schillmania.com/projects/snowstorm/license.txt
 */

/*jslint nomen: true, plusplus: true, sloppy: true, vars: true, white: true */
/*global window, document, navigator, clearInterval, setInterval */

var snowStorm = (function(window, document) {

  // --- common properties ---

  this.autoStart = true;          // Whether the snow should start automatically or not.
  this.excludeMobile = false;     // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) Enable at your own risk.
  this.flakesMax = 128;           // Limit total amount of snow made (falling + sticking)
  this.flakesMaxActive = 64;      // Limit amount of snow falling at once (less = lower CPU use)
  this.animationInterval = 33;    // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
  this.useGPU = true;             // Enable transform-based hardware acceleration, reduce CPU load.
  this.className = null;          // CSS class name for further customization on snow elements
  this.excludeMobile = false;     // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
  this.flakeBottom = null;        // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
  this.followMouse = true;        // Snow movement can respond to the user's mouse
  this.snowColor = '#fff';        // Don't eat (or use?) yellow snow.
  this.snowCharacter = '&bull;';  // &bull; = bullet, &middot; is square on some systems etc.
  this.snowStick = true;          // Whether or not snow should "stick" at the bottom. When off, will never collect.
  this.targetElement = null;      // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
  this.useMeltEffect = true;      // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
  this.useTwinkleEffect = true;  // Allow snow to randomly "flicker" in and out of view while falling
  this.usePositionFixed = false;  // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported
  this.usePixelPosition = false;  // Whether to use pixel values for snow top/left vs. percentages. Auto-enabled if body is position:relative or targetElement is specified.

  // --- less-used bits ---

  this.freezeOnBlur = true;       // Only snow when the window is in focus (foreground.) Saves CPU.
  this.flakeLeftOffset = 0;       // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
  this.flakeRightOffset = 0;      // Right margin/gutter space on edge of container
  this.flakeWidth = 8;            // Max pixel width reserved for snow element
  this.flakeHeight = 8;           // Max pixel height reserved for snow element
  this.vMaxX = 5;                 // Maximum X velocity range for snow
  this.vMaxY = 4;                 // Maximum Y velocity range for snow
  this.zIndex = 0;                // CSS stacking order applied to each snowflake

  // --- "No user-serviceable parts inside" past this point, yadda yadda ---

  var storm = this,
  features,
  // UA sniffing and backCompat rendering mode checks for fixed position, etc.
  isIE = navigator.userAgent.match(/msie/i),
  isIE6 = navigator.userAgent.match(/msie 6/i),
  isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
  isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
  noFixed = (isBackCompatIE || isIE6),
  screenX = null, screenX2 = null, screenY = null, scrollY = null, docHeight = null, vRndX = null, vRndY = null,
  windOffset = 1,
  windMultiplier = 2,
  flakeTypes = 6,
  fixedForEverything = false,
  targetElementIsRelative = false,
  opacitySupported = (function(){
    try {
      document.createElement('div').style.opacity = '0.5';
    } catch(e) {
      return false;
    }
    return true;
  }()),
  didInit = false,
  docFrag = document.createDocumentFragment();

  features = (function() {

    var getAnimationFrame;

    /**
     * hat tip: paul irish
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     * https://gist.github.com/838785
     */

    function timeoutShim(callback) {
      window.setTimeout(callback, 1000/(storm.animationInterval || 20));
    }

    var _animationFrame = (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        timeoutShim);

    // apply to window, avoid "illegal invocation" errors in Chrome
    getAnimationFrame = _animationFrame ? function() {
      return _animationFrame.apply(window, arguments);
    } : null;

    var testDiv;

    testDiv = document.createElement('div');

    function has(prop) {

      // test for feature support
      var result = testDiv.style[prop];
      return (result !== undefined ? prop : null);

    }

    // note local scope.
    var localFeatures = {

      transform: {
        ie:  has('-ms-transform'),
        moz: has('MozTransform'),
        opera: has('OTransform'),
        webkit: has('webkitTransform'),
        w3: has('transform'),
        prop: null // the normalized property value
      },

      getAnimationFrame: getAnimationFrame

    };

    localFeatures.transform.prop = (
      localFeatures.transform.w3 || 
      localFeatures.transform.moz ||
      localFeatures.transform.webkit ||
      localFeatures.transform.ie ||
      localFeatures.transform.opera
    );

    testDiv = null;

    return localFeatures;

  }());

  this.timer = null;
  this.flakes = [];
  this.disabled = false;
  this.active = false;
  this.meltFrameCount = 20;
  this.meltFrames = [];

  this.setXY = function(o, x, y) {

    if (!o) {
      return false;
    }

    if (storm.usePixelPosition || targetElementIsRelative) {

      o.style.left = (x - storm.flakeWidth) + 'px';
      o.style.top = (y - storm.flakeHeight) + 'px';

    } else if (noFixed) {

      o.style.right = (100-(x/screenX*100)) + '%';
      // avoid creating vertical scrollbars
      o.style.top = (Math.min(y, docHeight-storm.flakeHeight)) + 'px';

    } else {

      if (!storm.flakeBottom) {

        // if not using a fixed bottom coordinate...
        o.style.right = (100-(x/screenX*100)) + '%';
        o.style.bottom = (100-(y/screenY*100)) + '%';

      } else {

        // absolute top.
        o.style.right = (100-(x/screenX*100)) + '%';
        o.style.top = (Math.min(y, docHeight-storm.flakeHeight)) + 'px';

      }

    }

  };

  this.events = (function() {

    var old = (!window.addEventListener && window.attachEvent), slice = Array.prototype.slice,
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };

    function getArgs(oArgs) {
      var args = slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1]; // prefix
        if (len > 3) {
          args.pop(); // no capture
        }
      } else if (len === 3) {
        args.push(false);
      }
      return args;
    }

    function apply(args, sType) {
      var element = args.shift(),
          method = [evt[sType]];
      if (old) {
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }
    }

    function addEvent() {
      apply(getArgs(arguments), 'add');
    }

    function removeEvent() {
      apply(getArgs(arguments), 'remove');
    }

    return {
      add: addEvent,
      remove: removeEvent
    };

  }());

  function rnd(n,min) {
    if (isNaN(min)) {
      min = 0;
    }
    return (Math.random()*n)+min;
  }

  function plusMinus(n) {
    return (parseInt(rnd(2),10)===1?n*-1:n);
  }

  this.randomizeWind = function() {
    var i;
    vRndX = plusMinus(rnd(storm.vMaxX,0.2));
    vRndY = rnd(storm.vMaxY,0.2);
    if (this.flakes) {
      for (i=0; i<this.flakes.length; i++) {
        if (this.flakes[i].active) {
          this.flakes[i].setVelocities();
        }
      }
    }
  };

  this.scrollHandler = function() {
    var i;
    // "attach" snowflakes to bottom of window if no absolute bottom value was given
    scrollY = (storm.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || (noFixed ? document.body.scrollTop : 0), 10));
    if (isNaN(scrollY)) {
      scrollY = 0; // Netscape 6 scroll fix
    }
    if (!fixedForEverything && !storm.flakeBottom && storm.flakes) {
      for (i=0; i<storm.flakes.length; i++) {
        if (storm.flakes[i].active === 0) {
          storm.flakes[i].stick();
        }
      }
    }
  };

  this.resizeHandler = function() {
    if (window.innerWidth || window.innerHeight) {
      screenX = window.innerWidth - 16 - storm.flakeRightOffset;
      screenY = (storm.flakeBottom || window.innerHeight);
    } else {
      screenX = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (!isIE ? 8 : 0) - storm.flakeRightOffset;
      screenY = storm.flakeBottom || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
    }
    docHeight = document.body.offsetHeight;
    screenX2 = parseInt(screenX/2,10);
  };

  this.resizeHandlerAlt = function() {
    screenX = storm.targetElement.offsetWidth - storm.flakeRightOffset;
    screenY = storm.flakeBottom || storm.targetElement.offsetHeight;
    screenX2 = parseInt(screenX/2,10);
    docHeight = document.body.offsetHeight;
  };

  this.freeze = function() {
    // pause animation
    if (!storm.disabled) {
      storm.disabled = 1;
    } else {
      return false;
    }
    storm.timer = null;
  };

  this.resume = function() {
    if (storm.disabled) {
       storm.disabled = 0;
    } else {
      return false;
    }
    storm.timerInit();
  };

  this.toggleSnow = function() {
    if (!storm.flakes.length) {
      // first run
      storm.start();
    } else {
      storm.active = !storm.active;
      if (storm.active) {
        storm.show();
        storm.resume();
      } else {
        storm.stop();
        storm.freeze();
      }
    }
  };

  this.stop = function() {
    var i;
    this.freeze();
    for (i=0; i<this.flakes.length; i++) {
      this.flakes[i].o.style.display = 'none';
    }
    storm.events.remove(window,'scroll',storm.scrollHandler);
    storm.events.remove(window,'resize',storm.resizeHandler);
    if (storm.freezeOnBlur) {
      if (isIE) {
        storm.events.remove(document,'focusout',storm.freeze);
        storm.events.remove(document,'focusin',storm.resume);
      } else {
        storm.events.remove(window,'blur',storm.freeze);
        storm.events.remove(window,'focus',storm.resume);
      }
    }
  };

  this.show = function() {
    var i;
    for (i=0; i<this.flakes.length; i++) {
      this.flakes[i].o.style.display = 'block';
    }
  };

  this.SnowFlake = function(type,x,y) {
    var s = this;
    this.type = type;
    this.x = x||parseInt(rnd(screenX-20),10);
    this.y = (!isNaN(y)?y:-rnd(screenY)-12);
    this.vX = null;
    this.vY = null;
    this.vAmpTypes = [1,1.2,1.4,1.6,1.8]; // "amplification" for vX/vY (based on flake size/type)
    this.vAmp = this.vAmpTypes[this.type] || 1;
    this.melting = false;
    this.meltFrameCount = storm.meltFrameCount;
    this.meltFrames = storm.meltFrames;
    this.meltFrame = 0;
    this.twinkleFrame = 0;
    this.active = 1;
    this.fontSize = (10+(this.type/5)*10);
    this.o = document.createElement('div');
    this.o.innerHTML = storm.snowCharacter;
    if (storm.className) {
      this.o.setAttribute('class', storm.className);
    }
    this.o.style.color = storm.snowColor;
    this.o.style.position = (fixedForEverything?'fixed':'absolute');
    if (storm.useGPU && features.transform.prop) {
      // GPU-accelerated snow.
      this.o.style[features.transform.prop] = 'translate3d(0px, 0px, 0px)';
    }
    this.o.style.width = storm.flakeWidth+'px';
    this.o.style.height = storm.flakeHeight+'px';
    this.o.style.fontFamily = 'arial,verdana';
    this.o.style.cursor = 'default';
    this.o.style.overflow = 'hidden';
    this.o.style.fontWeight = 'normal';
    this.o.style.zIndex = storm.zIndex;
    docFrag.appendChild(this.o);

    this.refresh = function() {
      if (isNaN(s.x) || isNaN(s.y)) {
        // safety check
        return false;
      }
      storm.setXY(s.o, s.x, s.y);
    };

    this.stick = function() {
      if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
        s.o.style.top = (screenY+scrollY-storm.flakeHeight)+'px';
      } else if (storm.flakeBottom) {
        s.o.style.top = storm.flakeBottom+'px';
      } else {
        s.o.style.display = 'none';
        s.o.style.bottom = '0%';
        s.o.style.position = 'fixed';
        s.o.style.display = 'block';
      }
    };

    this.vCheck = function() {
      if (s.vX>=0 && s.vX<0.2) {
        s.vX = 0.2;
      } else if (s.vX<0 && s.vX>-0.2) {
        s.vX = -0.2;
      }
      if (s.vY>=0 && s.vY<0.2) {
        s.vY = 0.2;
      }
    };

    this.move = function() {
      var vX = s.vX*windOffset, yDiff;
      s.x += vX;
      s.y += (s.vY*s.vAmp);
      if (s.x >= screenX || screenX-s.x < storm.flakeWidth) { // X-axis scroll check
        s.x = 0;
      } else if (vX < 0 && s.x-storm.flakeLeftOffset < -storm.flakeWidth) {
        s.x = screenX-storm.flakeWidth-1; // flakeWidth;
      }
      s.refresh();
      yDiff = screenY+scrollY-s.y+storm.flakeHeight;
      if (yDiff<storm.flakeHeight) {
        s.active = 0;
        if (storm.snowStick) {
          s.stick();
        } else {
          s.recycle();
        }
      } else {
        if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random()>0.998) {
          // ~1/1000 chance of melting mid-air, with each frame
          s.melting = true;
          s.melt();
          // only incrementally melt one frame
          // s.melting = false;
        }
        if (storm.useTwinkleEffect) {
          if (s.twinkleFrame < 0) {
            if (Math.random() > 0.97) {
              s.twinkleFrame = parseInt(Math.random() * 8, 10);
            }
          } else {
            s.twinkleFrame--;
            if (!opacitySupported) {
              s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 'hidden' : 'visible');
            } else {
              s.o.style.opacity = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 0 : 1);
            }
          }
        }
      }
    };

    this.animate = function() {
      // main animation loop
      // move, check status, die etc.
      s.move();
    };

    this.setVelocities = function() {
      s.vX = vRndX+rnd(storm.vMaxX*0.12,0.1);
      s.vY = vRndY+rnd(storm.vMaxY*0.12,0.1);
    };

    this.setOpacity = function(o,opacity) {
      if (!opacitySupported) {
        return false;
      }
      o.style.opacity = opacity;
    };

    this.melt = function() {
      if (!storm.useMeltEffect || !s.melting) {
        s.recycle();
      } else {
        if (s.meltFrame < s.meltFrameCount) {
          s.setOpacity(s.o,s.meltFrames[s.meltFrame]);
          s.o.style.fontSize = s.fontSize-(s.fontSize*(s.meltFrame/s.meltFrameCount))+'px';
          s.o.style.lineHeight = storm.flakeHeight+2+(storm.flakeHeight*0.75*(s.meltFrame/s.meltFrameCount))+'px';
          s.meltFrame++;
        } else {
          s.recycle();
        }
      }
    };

    this.recycle = function() {
      s.o.style.display = 'none';
      s.o.style.position = (fixedForEverything?'fixed':'absolute');
      s.o.style.bottom = 'auto';
      s.setVelocities();
      s.vCheck();
      s.meltFrame = 0;
      s.melting = false;
      s.setOpacity(s.o,1);
      s.o.style.padding = '0px';
      s.o.style.margin = '0px';
      s.o.style.fontSize = s.fontSize+'px';
      s.o.style.lineHeight = (storm.flakeHeight+2)+'px';
      s.o.style.textAlign = 'center';
      s.o.style.verticalAlign = 'baseline';
      s.x = parseInt(rnd(screenX-storm.flakeWidth-20),10);
      s.y = parseInt(rnd(screenY)*-1,10)-storm.flakeHeight;
      s.refresh();
      s.o.style.display = 'block';
      s.active = 1;
    };

    this.recycle(); // set up x/y coords etc.
    this.refresh();

  };

  this.snow = function() {
    var active = 0, flake = null, i, j;
    for (i=0, j=storm.flakes.length; i<j; i++) {
      if (storm.flakes[i].active === 1) {
        storm.flakes[i].move();
        active++;
      }
      if (storm.flakes[i].melting) {
        storm.flakes[i].melt();
      }
    }
    if (active<storm.flakesMaxActive) {
      flake = storm.flakes[parseInt(rnd(storm.flakes.length),10)];
      if (flake.active === 0) {
        flake.melting = true;
      }
    }
    if (storm.timer) {
      features.getAnimationFrame(storm.snow);
    }
  };

  this.mouseMove = function(e) {
    if (!storm.followMouse) {
      return true;
    }
    var x = parseInt(e.clientX,10);
    if (x<screenX2) {
      windOffset = -windMultiplier+(x/screenX2*windMultiplier);
    } else {
      x -= screenX2;
      windOffset = (x/screenX2)*windMultiplier;
    }
  };

  this.createSnow = function(limit,allowInactive) {
    var i;
    for (i=0; i<limit; i++) {
      storm.flakes[storm.flakes.length] = new storm.SnowFlake(parseInt(rnd(flakeTypes),10));
      if (allowInactive || i>storm.flakesMaxActive) {
        storm.flakes[storm.flakes.length-1].active = -1;
      }
    }
    storm.targetElement.appendChild(docFrag);
  };

  this.timerInit = function() {
    storm.timer = true;
    storm.snow();
  };

  this.init = function() {
    var i;
    for (i=0; i<storm.meltFrameCount; i++) {
      storm.meltFrames.push(1-(i/storm.meltFrameCount));
    }
    storm.randomizeWind();
    storm.createSnow(storm.flakesMax); // create initial batch
    storm.events.add(window,'resize',storm.resizeHandler);
    storm.events.add(window,'scroll',storm.scrollHandler);
    if (storm.freezeOnBlur) {
      if (isIE) {
        storm.events.add(document,'focusout',storm.freeze);
        storm.events.add(document,'focusin',storm.resume);
      } else {
        storm.events.add(window,'blur',storm.freeze);
        storm.events.add(window,'focus',storm.resume);
      }
    }
    storm.resizeHandler();
    storm.scrollHandler();
    if (storm.followMouse) {
      storm.events.add(isIE?document:window,'mousemove',storm.mouseMove);
    }
    storm.animationInterval = Math.max(20,storm.animationInterval);
    storm.timerInit();
  };

  this.start = function(bFromOnLoad) {
    if (!didInit) {
      didInit = true;
    } else if (bFromOnLoad) {
      // already loaded and running
      return true;
    }
    if (typeof storm.targetElement === 'string') {
      var targetID = storm.targetElement;
      storm.targetElement = document.getElementById(targetID);
      if (!storm.targetElement) {
        throw new Error('Snowstorm: Unable to get targetElement "'+targetID+'"');
      }
    }
    if (!storm.targetElement) {
      storm.targetElement = (document.body || document.documentElement);
    }
    if (storm.targetElement !== document.documentElement && storm.targetElement !== document.body) {
      // re-map handler to get element instead of screen dimensions
      storm.resizeHandler = storm.resizeHandlerAlt;
      //and force-enable pixel positioning
      storm.usePixelPosition = true;
    }
    storm.resizeHandler(); // get bounding box elements
    storm.usePositionFixed = (storm.usePositionFixed && !noFixed && !storm.flakeBottom); // whether or not position:fixed is to be used
    if (window.getComputedStyle) {
      // attempt to determine if body or user-specified snow parent element is relatlively-positioned.
      try {
        targetElementIsRelative = (window.getComputedStyle(storm.targetElement, null).getPropertyValue('position') === 'relative');
      } catch(e) {
        // oh well
        targetElementIsRelative = false;
      }
    }
    fixedForEverything = storm.usePositionFixed;
    if (screenX && screenY && !storm.disabled) {
      storm.init();
      storm.active = true;
    }
  };

  function doDelayedStart() {
    window.setTimeout(function() {
      storm.start(true);
    }, 20);
    // event cleanup
    storm.events.remove(isIE?document:window,'mousemove',doDelayedStart);
  }

  function doStart() {
    if (!storm.excludeMobile || !isMobile) {
      doDelayedStart();
    }
    // event cleanup
    storm.events.remove(window, 'load', doStart);
  }

  // hooks for starting the snow
  if (storm.autoStart) {
    storm.events.add(window, 'load', doStart, false);
  }

  return this;

}(window, document));
}