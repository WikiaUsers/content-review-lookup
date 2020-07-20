// <nowiki>
// BEGIN MW GADGET
// *********
// Edit buttons to add various editing tags and shit
// Made by Callofduty4
// *********

if (wgAction == "edit" || wgAction == "submit") {

	if (mwCustomEditButtons) {
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/e/e5/Center_button.png",
			"speedTip": "Centered text",
			"tagOpen": "<div style='text-align:center;'>",
			"tagClose": "</div>",
			"sampleText": "TEXT"
		};

		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/9/91/I_button.png",
			"speedTip": "Italic text",
			"tagOpen": "''",
			"tagClose": "''",
			"sampleText": "TEXT"
		};

		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/5/5c/Noinclude_button.png",
			"speedTip": "Noinclude",
			"tagOpen": "<noinclude>",
			"tagClose": "</noinclude>",
			"sampleText": "TEXT"
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/8/85/Ref_button.png",
			"speedTip": "Reference",
			"tagOpen": "<ref>",
			"tagClose": "</ref>",
			"sampleText": "TEXT"
		};

		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/5/56/S_button.png",
			"speedTip": "Struck out text",
			"tagOpen": "<s>",
			"tagClose": "</s>",
			"sampleText": "TEXT"
		};

		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/9/9d/Sub_button.png",
			"speedTip": "Subscript",
			"tagOpen": "<sub>",
			"tagClose": "</sub>",
			"sampleText": "TEXT"
		};

		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/4/4d/Sup_button.png",
			"speedTip": "Superscript",
			"tagOpen": "<sup>",
			"tagClose": "</sup>",
			"sampleText": "TEXT"
		};

		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/4/4e/U_button.png",
			"speedTip": "Underlined text",
			"tagOpen": "<u>",
			"tagClose": "</u>",
			"sampleText": "TEXT"
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/4/46/Redirect_button.png",
			"speedTip": "Redirect",
			"tagOpen": "#Redirect[[",
			"tagClose": "]]",
			"sampleText": "PAGE"
		};
	}
}

// END MW GADGET
// </nowiki>