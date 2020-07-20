// <nowiki>
// BEGIN MW GADGET
// *********
// Edit buttons to add warnings
// Made by Callofduty4
// *********
 
if (wgAction == "edit" || wgAction == "submit") {
 
	if (mwCustomEditButtons) {
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/7/70/Support_button.png",
			"speedTip": "Support Template",
			"tagOpen": "{{Support",
			"tagClose": "}}",
			"sampleText": ""
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/a/a3/Oppose_button.png",
			"speedTip": "Oppose Template",
			"tagOpen": "{{Oppose",
			"tagClose": "}}",
			"sampleText": ""
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/f/f5/Neutral_button.png",
			"speedTip": "Leaked Template",
			"tagOpen": "{{Neutral",
			"tagClose": "}}",
			"sampleText": ""
		};
	}
}

// END MW GADGET
// </nowiki>