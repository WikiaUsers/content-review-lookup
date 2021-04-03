/* Any JavaScript here will be loaded for users using the mobile site */

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

// Add a speaker icon with audio form AudioExample template
addAudioIcon(); // Have to check results if JS disabled!

// Create a 3 button System Requirement table with show/hide
setTabs(); // Have to check results if JS is disabled!



/* -------------------------- */
/* FUNCTIONS CODE STARTS HERE */
/* -------------------------- */

// add audio icon if template used on page
function addAudioIcon() {
	try {
		var audioURL = document.querySelector("span.AudioExample span#AudioExampleFileName a").href;
		document.getElementById("AudioExampleFileName").style.display = 'none';
		document.getElementById("AudioExample").innerHTML = "<audio id='AudioFile'><source src='" + audioURL + "'></audio><img id='AudioIcon' src='https://hydra-media.cursecdn.com/savagelands.gamepedia.com/2/25/Speaker_Icon.png'></img>";
		document.getElementById("AudioFile").volume = 0.2; // Volume from 0 - 1
                document.getElementById("AudioIcon").addEventListener("click", audioIconClickStart);
	}
	catch (error) {
		console.log("addAudioIcon > " + error);
		return;
	}
	finally {
		return;
	}
}

// play audio audio icon is clicked on
function audioIconClickStart() {
        document.getElementById("AudioIcon").removeEventListener("click", audioIconClickStart); // To enable a new click
	document.getElementById("AudioFile").play();
	document.getElementById("AudioFile").loop = true; // Comment out for no loop
        document.getElementById("AudioIcon").addEventListener("click", audioIconClickAgain); // To stop audio with new click
}

// stop and reset audio when audio icon is clicked on again
function audioIconClickAgain() {
	document.getElementById("AudioFile").pause();
	document.getElementById("AudioFile").currentTime = 0;
        document.getElementById("AudioIcon").addEventListener("click", audioIconClickStart); // To start audio on click again
}

// Create 3 tabs for System Requirements
function setTabs() {
	try {
		document.getElementById("tabOS").innerHTML = "<button id='tabWindows' style='font-size:1.1em;height:50px;width:150px'>Windows</button><button id='tabMacOSX' style='font-size:1.1em;height:50px;width:150px'>Mac OS X</button><button id='tabSteamOSLinux' style='font-size:1.1em;height:50px;width:150px'>SteamOS + Linux</button>";
                document.getElementById("tabWindows").addEventListener("click", clickTabWindows);
                document.getElementById("tabMacOSX").addEventListener("click", clickTabMacOSX);
                document.getElementById("tabSteamOSLinux").addEventListener("click", clickTabSteamOSLinux);
		clickTabWindows();
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
function clickTabWindows() {
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
function clickTabMacOSX() {
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
function clickTabSteamOSLinux() {
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