importArticles({
	type: "script",
	articles: [
		"w:dev:ReferencePopups/code.js",
		"w:dev:RevealAnonIP/code.js",
                "w:dev:WallGreetingButton/code.js",
                "w:c:dev:UserTags/code.js",
	]
});

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* LOCK OLD COMMENTS */
window.lockOldComments.limit = 60;
window.lockOldComments.addNoteAbove = true;
window.lockOldComments.namespaceNumbers = [0];