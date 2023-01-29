mw.loader.using(['site']).done(function() {
	if(document.getElementById("wpTextbox2")) {
		var myTextBox = document.getElementById('wpTextbox2');
		var myText = myTextBox.value;
		
		var a = new mw.Api();
		
		var ns = mw.config.get("wgCanonicalNamespace");
		if (ns != "") {
			ns = ns + ":";
		}
		var title = mw.config.get("wgTitle");
		var fulltitle = ns + title;
		
		var currentUser = mw.config.get('wgUserName');
		
		var backupLocation = "User:" + currentUser + "/Edit Conflict/" + fulltitle;
		a.postWithToken("csrf",{
			action:"edit",
			title:backupLocation,
			text:myText,
			tags:"edit_conflict",
			summary:"Automatically backing up edit conflict"
		}).done(function(data) {
			displayColor("gadget-action-success");
			console.log('Done!');
			return;
		}).fail(function(data) {
			displayColor("gadget-action-fail");
			console.log('Failed to back up editing conflict oh no');
			return;
		})
		
	}
});