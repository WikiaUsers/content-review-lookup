/* Any JavaScript here will be loaded for all users on every page load. */
if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirect",
		"tagOpen": "#REDIRECT [" + "[",
		"tagClose": "]]",
		"sampleText": "Insert text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/c/c9/Button_strike.png",
		"speedTip": "Strike",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/1/13/Button_enter.png",
		"speedTip": "Line break",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://piskel-imgstore-b.appspot.com/img/435a45d4-f177-11e7-9a4e-cbca66980a19.gif",
		"speedTip": "Slideshow",
		"tagOpen": "<slideshow>",
		"tagClose": "</slideshow>",
		"sampleText": "Slideshow image.png"
	};
}

//discordapp.com/api/guilds/402934833036263427/widget.json