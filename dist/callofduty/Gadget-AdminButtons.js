// <nowiki>
// BEGIN MW GADGET
// *********
// Edit buttons to add warnings
// Made by Callofduty4
// *********
 
if (wgAction == "edit" || wgAction == "submit") {
 
	if (mwCustomEditButtons) {
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/0/02/Blocked_button.png",
			"speedTip": "Blocked Template",
			"tagOpen": "{{Subst:"+"Blocked|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "REASON"
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/e/e2/Blocked_Username_button.png",
			"speedTip": "Username Blocked Template",
			"tagOpen": "{{Subst:"+"Blocked/Username",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/6/6c/Blocked_Sock_button.png",
			"speedTip": "Sock Blocked Template",
			"tagOpen": "{{Subst:"+"Blocked/Sockpuppet",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
	}
}

//END MW GADGET
//</nowiki>