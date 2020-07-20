/* Credits to Sam and Cat Wiki and Dev Wiki */
 
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