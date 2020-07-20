if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://community.wikia.com/wiki/File:B.BIG.PNG",
		"speedTip": "((subst:Artist))",
		"tagOpen": "{{subst:Artist",
		"tagClose": "}}",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://community.wikia.com/wiki/File:B.BIG.PNG",
		"speedTip": "((subst:Album))",
		"tagOpen": "{{subst:Album",
		"tagClose": "}}",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://community.wikia.com/wiki/File:B.BIG.PNG",
		"speedTip": "((subst:VA))",
		"tagOpen": "{{subst:Various Artists",
		"tagClose": "}}",
		"sampleText": ""
	};
}

EditIntroButtonText = 'intro';
importScriptPage('EditIntroButton/code.js', 'dev');