/* Any JavaScript here will be loaded for all users on every page load. */

if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
		"speedTip": "Line break",
		"tagOpen": "<br/>",
		"tagClose": "",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/liverpoolfc/images/3/3a/Soccerbase.png",
		"speedTip": "Insert Template:Soccerbase",
		"tagOpen": "*{{Soccerbase||}}",
	};

        mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/liverpoolfc/images/c/c7/Lfchistory.png",
		"speedTip": "Insert Template:LFCHistory",
		"tagOpen": "*{{LFCHistory||}}",
	};
}