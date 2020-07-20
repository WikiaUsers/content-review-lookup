// Adds a way to quickly move a file
// Authored by http://cod.wikia.com/wiki/User:Sactage <sactage@sactage.com> 2012

function quickMoveFile () {
	$("#filetoc").append("<input type='text' id='qm-name' value='File:'> <button id='qm-button' title='Move'>Move</button>");
	$("#qm-button").click( function () {
		var fileEnding = /File:.+\.(png|svg|ogv|ogg|jpe?g|gif|pdf|ico)$/i;
		var newname = $("#qm-name").val().replace(' ', '_');
		var result = wgPageName.match(fileEnding);
		var isVideo = result ? false : true;
		if (newname == "File:" || newname == "") {
			alert("You must choose a new filename.");
			return;
		} else if (newname.indexOf("File:") != 0) { 
			alert("The new name must start with 'File:'");
			return;
		} else if (!isVideo && result) {
			var res2 = newname.match(fileEnding);
			if (!res2) {
				alert("The new filename must end with ." + result[1]);
				return;
			} else if (res2[1].toLowerCase() != result[1].toLowerCase()) {
				alert("The new filename must end with '." + result[1] + "', not '." + res2[1] + "'");
				return;
			}
		} else if (isVideo) {
			var res2 = newname.match(fileEnding);
			if (res2) {
				alert("Videos cannot end with '." + res2[1] + "'");
				return;
			}
		}
		$.post("/api.php", {action: "move", from: wgPageName, to: newname, token: mw.user.tokens.values.editToken, noredirect: '', movetalk: '', reason: "Moving " + wgPageName + " to " + newname}, function () {
			window.location.href = wgServer + "/wiki/" + newname;
		});
	});
}
if (wgCanonicalNamespace == "File") {
	addOnloadHook(quickMoveFile);
}