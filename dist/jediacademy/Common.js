/* Any JavaScript here will be loaded for all users on every page load. */


/* Refresh button */
PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');


/*custom edit buttons*/
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/jediacademy/images/0/08/Button_black.png",
		"speedTip": "Black color",
		"tagOpen": "<span style='color:orange'>",
		"tagClose": "</span>",
		"sampleText": "Orange-colored text"
	};