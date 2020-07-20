// <nowiki>
// BEGIN MW GADGET
// *********
// Edit buttons to add various templates and stuff
// *********
 
if (wgAction == "edit" || wgAction == "submit") {
 
	if (mwCustomEditButtons) {
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/__cb20150510022713/evolve/images/6/61/Leaked_button.png",
			"speedTip": "Leaked Template",
			"tagOpen": "{{Subst:"+"Leaked",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/__cb20150510022728/evolve/images/e/e5/Licensing_button.png",
			"speedTip": "Leaked Template",
			"tagOpen": "{{Subst:"+"Bad Edit|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "PAGE"
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/__cb20150510022554/evolve/images/0/0e/Bad_Page_button.png",
			"speedTip": "Bad Page Template",
			"tagOpen": "{{Subst:"+"Bad Page|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "PAGE"
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "http://http://img4.wikia.nocookie.net/__cb20150510022821/evolve/images/d/db/Vandalism_button.png",
			"speedTip": "Vandalism Template",
			"tagOpen": "{{Subst:"+"Vandalism|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "PAGE"
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/__cb20150510022634/evolve/images/c/ce/Trolling_button.png",
			"speedTip": "Trolling Template",
			"tagOpen": "{{Subst:"+"Trolling",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/__cb20150510022747/evolve/images/0/0a/NoIRL_button.png",
			"speedTip": "No IRL Template",
			"tagOpen": "{{Subst:"+"No IRL|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": wgUserName
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/__cb20150510022654/evolve/images/7/7b/DDD_button.png",
			"speedTip": "DDD Template",
			"tagOpen": "{{Subst:"+"DDD",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "http://evolve.wikia.com/wiki/File:Licensing_button.png",
			"speedTip": "Bad Licensing Template",
			"tagOpen": "{{Subst:"+"Licensing Images",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": ""
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/__cb20150510022537/evolve/images/e/e2/Bad_Image_Title_button.png",
			"speedTip": "Bad Image Template",
			"tagOpen": "{{Subst:"+"Bad Image|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "NAME OF IMAGE"
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "http://evolve.wikia.com/wiki/File:Unused_Image_button.png",
			"speedTip": "Unused Image Template",
			"tagOpen": "{{Subst:"+"Unused File|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "NAME OF DELETED IMAGE"
		};
 
		mwCustomEditButtons[mwCustomEditButtons.length] = {
			"imageFile": "https://images.wikia.nocookie.net/__cb20150510022508/evolve/images/c/c5/Bad_Image_button.png",
			"speedTip": "Bad Image Title Template",
			"tagOpen": "{{Subst:"+"Bad Image Title|",
			"tagClose": "|~"+"~~"+"~}}",
			"sampleText": "NAME OF IMAGE"
		};
	}
}
 
// END MW GADGET
// </nowiki>