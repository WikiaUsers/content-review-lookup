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