// <nowiki>
// BEGIN MW GADGET
// *********
 
if (wgAction == "edit" || wgAction == "submit") {
 
	if (mwCustomEditButtons) {
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
                        "imageFile": "https://images.wikia.nocookie.net/sims/images/0/02/Blocked_button.png",
			"speedTip": "Blocked Template",
			"tagOpen": "{{Subst:"+"Tempblock|reason=",
			"tagClose": "|duration=|sig=~"+"~~"+"~}}",
			"sampleText": "REASON"
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
                        "imageFile": "https://images.wikia.nocookie.net/sims/images/7/79/Warn_button.png",
			"speedTip": "Warning Template",
			"tagOpen": "{{Subst:"+"Warning|type=",
			"tagClose": "|ip=|sig=~"+"~~"+"~}}",
			"sampleText": ""
		};
 
	}
}
 
//END MW GADGET
//</nowiki>