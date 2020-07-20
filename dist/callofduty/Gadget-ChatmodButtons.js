// <nowiki>
// BEGIN MW GADGET
// *********
// Edit buttons to add chatban/chatunban templates
// Made by Callofduty4
// *********

if (wgAction == "edit" || wgAction == "submit") {

	if (mwCustomEditButtons) {
	
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/5/53/Banned_button.png",
			"speedTip": "Banned from Chat Template",
			"tagOpen": "{{Subst:"+"Banned",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/1/12/Unbanned_button.png",
			"speedTip": "Unbanned from Chat Template",
			"tagOpen": "{{Subst:"+"Expired",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
	}
}

// END MW GADGET
// </nowiki>