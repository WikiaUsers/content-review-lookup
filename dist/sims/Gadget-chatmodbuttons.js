// <nowiki>
// BEGIN MW GADGET
// *********
 
if (wgAction == "edit" || wgAction == "submit") {
 
	if (mwCustomEditButtons) {
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
                        "imageFile": "https://images.wikia.nocookie.net/sims/images/5/53/Banned_button.png",
			"speedTip": "Banned from Chat Template",
			"tagOpen": "{{Subst:"+"Bannedfromchat|<duration goes here>",
			"tagClose": "|<reason goes here>|~"+"~~"+"~}}",
                        "sampleText": ""
		};
 
	}
}
 
//END MW GADGET
//</nowiki>