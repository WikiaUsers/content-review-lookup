// <nowiki>
// BEGIN MW GADGET
// *********
// Edit buttons to add various templates and stuff
// Made by Callofduty4
// *********

if (wgAction == "edit" || wgAction == "submit") {

	if (mwCustomEditButtons) {
	
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/6/61/Leaked_button.png",
			"speedTip": "Leaked Template",
			"tagOpen": "{{Subst:"+"Leaked",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/4/4c/Bad_Edit_button.png",
			"speedTip": "Leaked Template",
			"tagOpen": "{{Subst:"+"Bad Edit|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "PAGE"
		};

		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/0/0e/Bad_Page_button.png",
			"speedTip": "Bad Page Template",
			"tagOpen": "{{Subst:"+"Bad Page|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "PAGE"
		};

		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/d/db/Vandalism_button.png",
			"speedTip": "Vandalism Template",
			"tagOpen": "{{Subst:"+"Vandalism|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "PAGE"
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/c/ce/Trolling_button.png",
			"speedTip": "Trolling Template",
			"tagOpen": "{{Subst:"+"Trolling",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/0/0a/NoIRL_button.png",
			"speedTip": "No IRL Template",
			"tagOpen": "{{Subst:"+"No IRL|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": wgUserName
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/7/7b/DDD_button.png",
			"speedTip": "DDD Template",
			"tagOpen": "{{Subst:"+"DDD",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/e/e5/Licensing_button.png",
			"speedTip": "Bad Licensing Template",
			"tagOpen": "{{Subst:"+"Licensing Images",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/c/c5/Bad_Image_button.png",
			"speedTip": "Bad Image Template",
			"tagOpen": "{{Subst:"+"Bad Image|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "NAME OF IMAGE"
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/e/e9/Unused_Image_button.png",
			"speedTip": "Unused Image Template",
			"tagOpen": "{{Subst:"+"Unused File|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "NAME OF DELETED IMAGE"
		};
		
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/callofduty/images/e/e2/Bad_Image_Title_button.png",
			"speedTip": "Bad Image Title Template",
			"tagOpen": "{{Subst:"+"Bad Image Title|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "NAME OF IMAGE"
		};
	}
}

// END MW GADGET
// </nowiki>